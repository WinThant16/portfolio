import { experiences } from "@/data/experience";
import { formatDateRange } from "@/lib/date";
import { SectionHeader } from "@/components/SectionHeader";

// The four most recent roles; data/experience.ts is already in that order
const recent = experiences.slice(0, 4);

export function ExperiencePreview() {
  return (
    <section className="wrap py-16 md:py-20">
      <SectionHeader title="Experience" href="/experience" linkLabel="Full experience" />

      <ul className="mt-6 divide-y divide-line border-y border-line">
        {recent.map((exp) => (
          <li key={exp.id} className="grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-10">
            <div className="min-w-0">
              <p className="font-medium text-ink">{exp.title}</p>
              <p className="text-dim">{exp.organization}</p>
            </div>
            <p className="text-sm tabular-nums text-dim sm:text-right">{formatDateRange(exp.dates)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
