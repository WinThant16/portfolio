import { experiences } from "@/data/experience";
import { formatDateRange } from "@/lib/date";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience, research, and leadership work by Win Thant Tin Han.",
};


export default function Page() {
  return (
    <main className="container-max py-16">
      <header className="max-w-2xl justify-center">
        <h1 className="text-3xl m-5 font-semibold">Experience</h1>
        <p className="m-5 text-foreground/70 ">
          A more personal look at the roles that shaped how I build, lead, and
          learn.
        </p>
      </header>

      <section className="mt-10 grid gap-6">
        <ol className="relative ml-3 border-l border-white/10">
          {experiences.map((exp) => (
            <li
              key={exp.id}
              className="ml-6 pb-12 last:pb-0"
            >
              <span className="absolute -left-[6.5px] mt-2 h-3 w-3 rounded-full bg-gradient-to-r from-rose-400 to-fuchsia-600" />

              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                <h2 className="text-xl font-semibold">
                  {exp.title}
                </h2>

                <span className="shrink-0 text-sm text-white/60">
                  {formatDateRange(exp.dates)}
                </span>
              </div>

              <p className="mt-1 text-sm text-white/70">
                <span className="font-medium text-white/90">
                  {exp.organization}
                </span>

                <span className="mx-2 text-white/40">
                  ·
                </span>

                {exp.location}
              </p>

              <div className="mt-3 space-y-1 text-sm text-white/80">
                {exp.highlights.map((highlight) => (
                  <p key={highlight}>{highlight}</p>
                ))}
              </div>

              {exp.story && (
                <p className="mt-2 text-sm italic text-white/50">
                  {exp.story}
                </p>
              )}

              <div className="mt-3 flex flex-wrap gap-1.5">
                {exp.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="text-xs"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              {exp.links?.length ? (
                <div className="mt-3 flex flex-wrap gap-3">
                  {exp.links.map((link) => (
                    <a
                      key={`${link.type}-${link.url}`}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-white/70 underline hover:text-white"
                    >
                      {link.label ?? "View link"}
                    </a>
                  ))}
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}