import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import 'server-only';

export const runtime = 'nodejs';

const resend = new Resend(process.env.RESEND_API_KEY);

// basic validation
const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(2).max(150),
  message: z.string().min(10).max(5000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: 'Invalid input', issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parsed.data;

    // craft a simple text + html email
    const html = `
      <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5">
        <h2 style="margin:0 0 8px">New portfolio contact</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p style="white-space:pre-wrap"><strong>Message:</strong><br>${escapeHtml(message)}</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM!,         // verified sender
      to: [process.env.CONTACT_TO!],           // your inbox
      replyTo: email,                          // so you can reply directly
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
