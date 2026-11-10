import Link from "next/link";
import { profile } from "@/data/profile";

const links = [
  { label: "Email", href: `mailto:${profile.email}`, external: false },
  { label: "LinkedIn", href: profile.linkedin, external: true },
  { label: "GitHub", href: profile.github, external: true },
  { label: "Resume", href: "/resume", external: false },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="wrap flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl text-ink">{profile.name}</p>
          <p className="mt-1 text-dim">{profile.location}</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-[0.9375rem] text-dim transition-colors hover:text-navy"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
