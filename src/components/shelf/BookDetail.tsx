"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { ProjectMedia } from "@/components/ProjectMedia";
import { ProjectLinks } from "@/components/ProjectLinks";
import type { Project } from "@/data/types";
import { formatProjectTimeline } from "@/lib/date";
import { BOOK_TYPES, pad3 } from "./bookType";

type Props = {
	project: Project;
	number: number;
	onPrev: () => void;
	onNext: () => void;
};

/* The "page" you see once a book is pulled out */
export function BookDetail({ project: p, number, onPrev, onNext }: Props) {
	const { color, tint } = BOOK_TYPES[p.category];

	return (
		<div className="flex max-h-[min(85vh,760px)] flex-col overflow-hidden rounded-r-[10px] rounded-l-[4px] bg-paper">
			<div className="overflow-y-auto p-6 sm:p-8">
				<ProjectMedia project={p} className="aspect-[2/1]" />

				<p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-dim">
					<span className="tabular-nums">No. {pad3(number)}</span>
					<span className="rounded-full px-2.5 py-0.5 text-xs" style={{ background: tint, color }}>
						{p.category}
					</span>
					<span>{formatProjectTimeline(p.dates)}</span>
					{p.status === "in-progress" && <span className="text-live">In progress</span>}
					{p.teamProject && <span>Team project</span>}
				</p>

				<Dialog.Title className="heading-2 mt-3">{p.title}</Dialog.Title>
				<Dialog.Description className="mt-3 text-dim">{p.summary}</Dialog.Description>

				{p.highlights.length > 0 && (
					<ul className="mt-5 list-disc space-y-1.5 pl-5 text-[0.9375rem] marker:text-faint">
						{p.highlights.map((h) => (
							<li key={h}>{h}</li>
						))}
					</ul>
				)}

				{p.contribution && <p className="mt-4 text-sm text-dim">My part: {p.contribution}</p>}

				<p className="mt-5 text-sm text-faint">{p.technologies.join(", ")}</p>
				<ProjectLinks links={p.links} className="mt-5" />
			</div>

			{/* Footer: flip to the neighboring books, or put this one back */}
			<div className="flex items-center justify-between border-t border-line px-6 py-3 sm:px-8">
				<Dialog.Close className="btn btn-line btn-sm">
					<X className="size-4" aria-hidden />
					Put back
				</Dialog.Close>
				<div className="flex gap-2">
					<button
						type="button"
						onClick={onPrev}
						className="btn btn-line btn-sm px-3"
						aria-label="Previous project"
					>
						<ChevronLeft className="size-4" aria-hidden />
					</button>
					<button
						type="button"
						onClick={onNext}
						className="btn btn-line btn-sm px-3"
						aria-label="Next project"
					>
						<ChevronRight className="size-4" aria-hidden />
					</button>
				</div>
			</div>
		</div>
	);
}
