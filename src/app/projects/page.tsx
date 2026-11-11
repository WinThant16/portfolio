import type { Metadata } from "next";
import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects } from "@/data/projects";
import type { ProjectCategory } from "@/data/types";

import { Bookshelf } from "@/components/shelf/Bookshelf";
import { ProjectList } from "@/components/shelf/ProjectList";
import { ProjectViews, ViewToggle } from "@/components/shelf/ProjectViews";

/* --------------------------------- SEO --------------------------------- */
export const metadata: Metadata = {
	title: "Projects",
	description:
		"Projects by Win Thant Tin Han: production websites, machine learning, game AI, graphics, and data engineering, with code and live links.",
};

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

/* --------------------------------- Page --------------------------------- */
export default function ProjectsPage() {
	const numbers = Object.fromEntries(projects.map((p, i) => [p.id, i + 1]));

	const listFor = (c: Category) => (c === "All" ? projects : projects.filter((p) => p.category === c));
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
						<ViewToggle className="flex-none" />
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
					I&apos;m always happy to collaborate on practical web apps, embedded ideas, or research-y
					explorations.
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
