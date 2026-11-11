import type { Metadata } from "next";
import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectMedia } from "@/components/ProjectMedia";
import { ProjectLinks } from "@/components/ProjectLinks";

import { projects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/data/types";
import { formatProjectYear } from "@/lib/date";
import { getOgImage } from "@/lib/getOgImage";

import { Bookshelf } from "@/components/shelf/Bookshelf";
import { ProjectList } from "@/components/shelf/ProjectList";
import { ProjectViews, ViewToggle } from "@/components/shelf/ProjectViews";

/* --------------------------------- SEO --------------------------------- */
export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects in web, embedded, and research.",
};

export const revalidate = 86400; // cache enriched thumbnails for 1 day

async function enrichProjectsForThumbs(list: Project[]): Promise<Project[]> {
  return Promise.all(
    list.map(async (p) => {
      // Only fetch if no image is already set:
      if (!p.portfolio?.image) {
        const paperUrl = p.links?.find((l) => l.type === "paper")?.url;
        if (paperUrl) {
          const og = await getOgImage(paperUrl).catch(() => null);
          if (og) {
            return {
              ...p,
              portfolio: { ...p.portfolio, image: og, imageMode: "cover" as const },
            };
          }
        }
      }
      return p;
    })
  );
}

type Category = "All" | ProjectCategory;
const categories: Category[] = [
  "All",
  "Web",
  "AI/ML",
  "Algorithms",
  "Graphics",
  "Data",
  "Embedded",
  "Research",
  "Database Systems",
];

/* ------------------------------ Project card ----------------------------- */
function ProjectItem({ project: p }: { project: Project }) {
  return (
    <article className="flex flex-col">
      <ProjectMedia project={p} />
      <div className="mt-5 flex flex-1 flex-col">
        <p className="flex flex-wrap gap-x-4 text-sm text-dim">
          <span>{formatProjectYear(p.dates)}</span>
          <span>{p.category}</span>
          {p.status === "in-progress" && <span className="text-live">In progress</span>}
          {p.teamProject && <span>Team project</span>}
        </p>
        <h2 className="heading-3 mt-2">{p.title}</h2>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-dim">{p.summary}</p>
        <p className="mt-4 text-sm text-faint">{p.technologies.join(", ")}</p>
        <ProjectLinks links={p.links} className="mt-auto pt-5" />
      </div>
    </article>
  );
}

/* --------------------------------- Page --------------------------------- */
export default async function ProjectsPage() {
  const enriched = await enrichProjectsForThumbs(projects);
  const numbers = Object.fromEntries(enriched.map((p, i) => [p.id, i + 1]));

  const listFor = (c: Category) => (c === "All" ? enriched : enriched.filter((p) => p.category === c));
  // Only show filters that have something in them
  const visible = categories.filter((c) => listFor(c).length > 0);

  return (
    <main className="wrap pt-12 md:pt-20">
      <header className="max-w-2xl">
        <h1 className="heading-1">Projects</h1>
      </header>

      
        <ProjectViews>
          <Tabs defaultValue="All" className="mt-10 gap-0">
            <div className="flex items-start gap-3">
              <div className="-ml-5 min-w-0 flex-1 overflow-x-auto pl-5 [scrollbar-width:none] sm:ml-0 sm:overflow-visible sm:pl-0 [&::-webkit-scrollbar]:hidden">
              <TabsList
                aria-label="Filter projects by category"
                className="flex h-auto w-max justify-start gap-2 rounded-none bg-transparent p-0 sm:w-full sm:flex-wrap"
              >
                {visible.map((c) => (
                  <TabsTrigger
                    key={c}
                    value={c}
                    className="h-9 flex-none cursor-pointer gap-2 rounded-full border border-line px-4 text-sm font-normal text-dim shadow-none transition-colors hover:border-dim/40 hover:text-ink data-[state=active]:border-ink data-[state=active]:bg-ink data-[state=active]:text-paper data-[state=active]:shadow-none"
                  >
                    {c}
                    <span className="tabular-nums opacity-60">{listFor(c).length}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              </div>
            <ViewToggle className="flex-none"/>
            </div>

            {visible.map((c) => (
              <TabsContent key={c} value={c} className="mt-12">
                <div className="group-data-[view=list]/views:hidden">
                  <Bookshelf projects={listFor(c)} numbers={numbers} />
                </div>
                <div className="hidden group-data-[view=list]/views:block">
                  <ProjectList projects={listFor(c)} numbers={numbers} />
                </div>
              </TabsContent>
            ))}
          </Tabs>
      </ProjectViews>

      {/* CTA */}
      <section className="mt-24 border-t border-line pt-14">
        <h2 className="heading-2">Have something you want to build?</h2>
        <p className="mt-3 max-w-xl text-dim">
          I&apos;m always happy to collaborate on practical web apps, embedded ideas, or research-y explorations.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-primary">
            Start a conversation
          </Link>
          <Link href="/resume" className="btn btn-line">
            View resume
          </Link>
        </div>
      </section>
    </main>
  );
}
