import { projects } from "@/data/projects";
import { formatProjectYear } from "@/lib/date";
import { ProjectMedia } from "@/components/ProjectMedia";
import { ProjectLinks } from "@/components/ProjectLinks";
import { SectionHeader } from "@/components/SectionHeader";

// Uses the existing `featured` flag in data/projects.ts
const featured = projects.filter((p) => p.portfolio?.featured);

export function SelectedWork() {
  return (
    <section className="wrap py-16 md:py-20">
      <SectionHeader title="Selected work" href="/projects" linkLabel="All projects" />

      <div className="mt-6 divide-y divide-line border-t border-line">
        {featured.map((p) => (
          <article key={p.id} className="grid gap-6 py-10 md:grid-cols-12 md:gap-10 md:py-12">
            <ProjectMedia project={p} className="md:col-span-5" />

            <div className="flex flex-col md:col-span-7">
              <p className="flex flex-wrap gap-x-4 text-sm text-dim">
                <span>{formatProjectYear(p.dates)}</span>
                <span>{p.category}</span>
                {p.status === "in-progress" && <span className="text-live">In progress</span>}
                {p.teamProject && <span>Team project</span>}
              </p>
              <h3 className="heading-3 mt-2">{p.title}</h3>
              <p className="mt-3 max-w-[60ch] text-dim">{p.summary}</p>
              <p className="mt-4 text-sm text-faint">{p.technologies.join(", ")}</p>
              <ProjectLinks links={p.links} className="mt-5" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
