import Image from "next/image";
import { skills } from "@/data/skills";
import type { SkillGroup } from "@/data/types";
import { SectionHeader } from "@/components/SectionHeader";

const GROUP_ORDER: SkillGroup[] = ["Languages", "Web Stack", "Databases", "Infra & Deploy", "Data & ML"];

const GROUPS = GROUP_ORDER.map((group) => ({
  title: group,
  items: skills.filter((s) => s.group === group),
}));

export function TechStrip() {
  return (
    <section className="wrap py-16 md:py-20">
      <SectionHeader
        title="Tools I reach for"
        description="Tools I use across production work, projects, research, and coursework."
      />

      <dl className="mt-8 divide-y divide-line border-y border-line">
        {GROUPS.map((g) => (
          <div key={g.title} className="grid gap-3 py-5 md:grid-cols-[11rem_1fr] md:gap-8">
            <dt className="pt-1.5 text-dim">{g.title}</dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li
                    key={s.name}
                    className="inline-flex items-center gap-2.5 rounded-lg bg-panel py-1.5 pl-1.5 pr-3 text-[0.9375rem] text-ink"
                  >
                    {/* small white tile keeps every logo on the same neutral ground */}
                    <span className="flex size-7 items-center justify-center rounded-md bg-white ring-1 ring-line">
                      {s.icon ? (
                        <Image src={s.icon} alt="" width={18} height={18} unoptimized className="size-[18px] object-contain" />
                      ) : null}
                    </span>
                    {s.name}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
