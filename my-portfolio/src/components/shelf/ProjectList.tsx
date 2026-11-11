import { ProjectMedia } from "@/components/ProjectMedia";
import { ProjectLinks } from "@/components/ProjectLinks";
import type { Project } from "@/data/types";
import { formatProjectYear } from "@/lib/date";
import { BOOK_TYPES, pad3 } from "./bookType";

type Props = {
  projects: Project[];
  numbers: Record<string, number>;
};

export function ProjectList({ projects, numbers }: Props) {
  return (
    <ol className="border-t border-line">
      {projects.map((p) => {
        const { color } = BOOK_TYPES[p.category];

        return (
          <li
            key={p.id}
            className="grid gap-x-8 gap-y-4 border-b border-line py-8 md:grid-cols-[4rem_11rem_minmax(0,1fr)]"
          >
            {/* Set number with a colored cap, like the top of a spine */}
            <div className="flex items-center gap-3 md:block">
              <span aria-hidden className="block h-1.5 w-8 rounded-sm" style={{ background: color }} />
              <span className="text-sm text-faint tabular-nums md:mt-2 md:block">No. {pad3(numbers[p.id])}</span>
            </div>

            <ProjectMedia project={p} className="hidden rounded-md md:block" />

            <div className="min-w-0">
              <p className="flex flex-wrap gap-x-4 text-sm text-dim">
                <span>{formatProjectYear(p.dates)}</span>
                <span>{p.category}</span>
                {p.status === "in-progress" && <span className="text-live">In progress</span>}
                {p.teamProject && <span>Team project</span>}
              </p>
              <h2 className="heading-3 mt-1.5">{p.title}</h2>
              <p className="mt-2 max-w-3xl text-[0.9375rem] leading-relaxed text-dim">{p.summary}</p>
              <p className="mt-3 text-sm text-faint">{p.technologies.join(", ")}</p>
              <ProjectLinks links={p.links} className="mt-4" />
            </div>
          </li>
        );
      })}
    </ol>
  );
}