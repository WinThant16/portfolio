import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { CopyButton } from "@/components/CopyButton";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Win Thant Tin Han for software engineering, AI/ML, and research opportunities.",
};

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, external: false },
  {
    label: "LinkedIn",
    value: profile.linkedin.replace("https://www.", ""),
    href: profile.linkedin,
    external: true,
  },
  { label: "GitHub", value: profile.github.replace("https://", ""), href: profile.github, external: true },
];

export default function ContactPage() {
  return (
    <main className="wrap pt-12 md:pt-20">
      <header className="max-w-3xl">
        <h1 className="heading-1">Let&apos;s build something great</h1>
        <p className="mt-5 max-w-xl text-lg text-dim">
          Open to software engineering opportunities and AI/ML or research collaborations. I usually reply
          within a day.
        </p>
      </header>

      <section className="mt-16 max-w-3xl">
        <h2 className="text-dim">Reach me directly:</h2>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {channels.map((c) => (
            <li key={c.label} className="flex items-center gap-4">
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group grid flex-1 gap-1 py-6 sm:grid-cols-[8rem_1fr_auto] sm:items-center sm:gap-6"
              >
                <span className="text-sm text-dim">{c.label}</span>
                <span className="font-display break-all text-xl text-ink transition-colors group-hover:text-navy sm:text-2xl">
                  {c.value}
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="hidden size-5 text-faint transition-colors group-hover:text-navy sm:block"
                />
              </a>
              {c.label === "Email" && <CopyButton value={profile.email} label="Copy" />}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
