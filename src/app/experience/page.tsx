import Image from "next/image";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { experiences } from "@/data/experience";
import { formatDateRange } from "@/lib/date";

export const metadata: Metadata = {
	title: "Experience",
	description: "Professional experience, research, and leadership work by Win Thant Tin Han.",
};

export default function Page() {
	return (
		<main className="wrap pt-12 md:pt-20">
			<header className="max-w-2xl">
				<h1 className="heading-1">Experience</h1>
				<p className="mt-5 text-lg text-dim">
					A more personal look at the roles that shaped how I build, lead, and learn.
				</p>
			</header>

			<div className="mt-14 border-b border-line">
				{experiences.map((exp) => (
					<article
						key={exp.id}
						className="grid gap-4 border-t border-line py-12 md:grid-cols-[14rem_1fr] md:gap-12"
					>
						{/* left rail: when and where */}
						<div className="text-sm md:sticky md:top-24 md:self-start">
							<p className="tabular-nums text-ink">{formatDateRange(exp.dates)}</p>
							<p className="mt-1 text-dim">{exp.location}</p>
							{exp.portfolio?.image && (
								<div
									className={`relative mt-5 aspect-[4/3] max-w-[18rem] overflow-hidden rounded-lg ring-1 ring-line ${
										exp.portfolio.imageFit === "contain" ? "bg-white" : "bg-panel"
									}`}
								>
									<Image
										src={exp.portfolio.image}
										alt={exp.portfolio.imageAlt ?? ""}
										fill
										sizes="(min-width: 768px) 14rem, 18rem"
										className={
											exp.portfolio.imageFit === "contain"
												? "object-contain p-5"
												: "object-cover"
										}
									/>
								</div>
							)}
						</div>

						<div className="max-w-[44rem]">
							<h2 className="heading-3 text-[1.625rem]">{exp.title}</h2>
							<p className="mt-1 text-dim">{exp.organization}</p>

							<ul className="mt-6 space-y-3">
								{exp.highlights.map((h) => (
									<li key={h} className="relative pl-5 leading-relaxed">
										<span
											aria-hidden
											className="absolute left-0 top-[0.7em] h-px w-2.5 bg-faint"
										/>
										{h}
									</li>
								))}
							</ul>

							{exp.story && (
								<blockquote className="font-display mt-8 border-l-2 border-navy/70 pl-5 text-[1.1875rem] leading-[1.6] text-ink/90">
									{exp.story}
								</blockquote>
							)}

							<p className="mt-7 text-sm text-faint">{exp.technologies.join(", ")}</p>

							{exp.links?.length ? (
								<ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
									{exp.links.map((link) => (
										<li key={`${link.type}-${link.url}`}>
											<a
												href={link.url}
												target="_blank"
												rel="noreferrer"
												className="text-link"
											>
												{link.label ?? "View link"}
												<ArrowUpRight className="size-4 text-faint" aria-hidden />
											</a>
										</li>
									))}
								</ul>
							) : null}
						</div>
					</article>
				))}
			</div>
		</main>
	);
}
