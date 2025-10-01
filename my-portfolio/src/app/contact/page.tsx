'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Github, Linkedin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const EMAIL = 'winthant@usc.edu';
const LINKEDIN = 'https://www.linkedin.com/in/win-thant-tin-han';
const GITHUB = 'https://github.com/WinThant16';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  // honeypot (should stay empty — bots often fill every field)
  const [website, setWebsite] = useState('');
  const [startedAt, setStartedAt] = useState<number>(Date.now());

  useEffect(() => {
    setStartedAt(Date.now());         //reset when page mounts
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<null | 'ok' | 'error'>(null);
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitted(null);
    setErrorMsg('');

    // If the honeypot has a value, silently pretend success
    if (website.trim().length > 0) {
      setIsSubmitting(false);
      setSubmitted('ok');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: fromEmail,
          subject,
          message,
          website,            //send honeypot
          startedAt,        //send timestamp for spam detection
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to send message');
      }

      setSubmitted('ok');
      setName('');
      setFromEmail('');
      setSubject('');
      setMessage('');
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Something went wrong.';
      setSubmitted('error');
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="relative min-h-[70vh] pt-20 md:pt-28">
      <div className="container-max">
        {/* Header */}
        <div className="text-center space-y-3">
          <Badge className="px-3 py-1 bg-gradient-to-r from-rose-400/10 to-fuchsia-600/10 border-rose-300/20 text-white">
            Contact
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Let’s build something great
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Open to internships, software engineering roles, and research collaborations. I usually reply within a day.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {/* Left: quick ways to reach me */}
          <Card className="lg:col-span-5 p-6 space-y-4 border-white/10 bg-white/[0.04]">
            <div className="space-y-2">
              <div className="font-semibold">Reach me directly</div>
              <p className="text-sm text-white/70">Prefer not to use a form? Use any of these:</p>
            </div>

            <div className="flex flex-col gap-3">
              <Button asChild variant="outline" className="justify-start rounded-full">
                <a href={`mailto:${EMAIL}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  {EMAIL}
                </a>
              </Button>

              <Button asChild variant="outline" className="justify-start rounded-full">
                <Link href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </Link>
              </Button>

              <Button asChild variant="outline" className="justify-start rounded-full">
                <Link href={GITHUB} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </Button>
            </div>

            <div className="pt-4 text-xs text-white/60">
              This form sends email via a serverless route using Resend. You can reply directly to the sender.
            </div>
          </Card>

          {/* Right: the real form (calls /api/contact) */}
          <Card className="lg:col-span-7 p-6 border-white/10 bg-white/[0.04]">
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              {/* success / error banners */}
              {submitted === 'ok' && (
                <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Thanks! Your message has been sent.</span>
                </div>
              )}
              {submitted === 'error' && (
                <div className="flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-rose-300">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* honeypot (hidden) */}
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Your name *</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Your email *</label>
                  <Input
                    type="email"
                    value={fromEmail}
                    onChange={(e) => setFromEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Subject *</label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Opportunity, collaboration, or question…"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Message *</label>
                <Textarea
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me a little about what you have in mind."
                  required
                />
              </div>

              <Button
                variant="outline"
                type="submit"
                className="rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send message
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
