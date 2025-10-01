import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import 'server-only';

export const runtime = 'nodejs';

// --- Resend client ---
const resend = new Resend(process.env.RESEND_API_KEY);

// --- Upstash Redis + Rate limit (3 requests / 5 minutes per IP) ---
const redis = Redis.fromEnv();
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '5 m'),
  analytics: false,
});

// Grab the first IP in X-Forwarded-For (Vercel/proxies)
function getClientIp(req: Request) {
  const h = req.headers.get('x-forwarded-for') || '';
  const ip = h.split(',')[0]?.trim();
  return ip || 'anonymous';
}

// --- Validation schema (add honeypot + min-fill-time fields) ---
const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(2).max(150),
  message: z.string().min(10).max(5000),
  website: z.string().optional(),      // honeypot (must be empty)
  startedAt: z.number().optional(),    // client start time in ms
});

export async function POST(req: Request) {
  try {
    // 1) Rate limit
    const ip = getClientIp(req);
    const { success } = await ratelimit.limit(`contact:${ip}`);
    if (!success) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // 2) Parse + validate
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: 'Invalid input', issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, subject, message, website, startedAt } = parsed.data;

    // 3) Honeypot: if filled, silently succeed (don’t help bots)
    if (website && website.trim() !== '') {
      return NextResponse.json({ ok: true });
    }

    // 4) Minimum fill time: require at least 3s from page mount to submit
    if (typeof startedAt === 'number') {
      const elapsed = Date.now() - startedAt;
      if (elapsed < 3000) {
        return NextResponse.json({ ok: true });
      }
    }

    // 5) Build email
    const html = `
      <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5">
        <h2 style="margin:0 0 8px">New portfolio contact</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p style="white-space:pre-wrap"><strong>Message:</strong><br>${escapeHtml(message)}</p>
      </div>
    `;

    // 🔁 Small fix: Resend uses `reply_to`, not `replyTo`
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM!,   // e.g. "Portfolio <you@yourdomain.com>"
      to: [process.env.CONTACT_TO!],     // your inbox
      replyTo: email,                   // so you can reply directly to sender
      subject: `Portfolio Contact: ${subject}`,
      html,
    });

    if (error) {
      console.error('Resend error', error);
      return NextResponse.json({ ok: false, error: 'Email failed' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: 'Unexpected error' }, { status: 500 });
  }
}

// minimal HTML escape
function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
