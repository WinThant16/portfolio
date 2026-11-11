"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import type { Project } from "@/data/types";
import { BookDetail } from "./BookDetail";
import { BOOK_TYPES, pad3, spineLabel, spineSize } from "./bookType";

type Props = {
  projects: Project[];
  /** Set number for each project id, so numbers stay fixed across filters */
  numbers: Record<string, number>;
};

const LIFT = -26; // how far a book slides up before it comes off the shelf
const LIFT_MS = 170;
const SHELF_ROW = 340; // px per shelf row: tallest book + headroom + the board
const BOARD = 14; // board thickness

/* Everything is sized in px times --s, so phones get slightly smaller books */
const px = (n: number) => `calc(${n}px * var(--s))`;
const morph = { type: "spring", stiffness: 260, damping: 30, mass: 0.9 } as const;

export function Bookshelf({ projects, numbers }: Props) {
	const [lifted, setLifted] = useState<string | null>(null); // sticking up out of the shelf
	const [open, setOpen] = useState<string | null>(null); // off the shelf, shown as the popup
	const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
	const lastOpen = useRef<string | null>(null); // to hand focus back to the right spine

	const [active, setActive] = useState<string | null>(null);
	const [labelId, setLabelId] = useState<string | null>(null);

	const index = open ? projects.findIndex((p) => p.id === open) : -1;
	const current = index >= 0 ? projects[index] : null;

	// 1) slide the spine up, 2) then pull it off the shelf into the popup
	function pull(id: string) {
		clearTimeout(timer.current);
		setLifted(id);
		lastOpen.current = id;
		timer.current = setTimeout(() => setOpen(id), LIFT_MS);
	}

	// Reverse: popup flies back to its slot (still lifted), then drops in
	function putBack() {
		clearTimeout(timer.current);
		setOpen(null);
		timer.current = setTimeout(() => setLifted(null), 420);
	}
	
	function point(id: string) {
		setActive(id);
		setLabelId(id);
		}
		function unpoint(id: string) {
		setActive((cur) => (cur === id ? null : cur));
		}

		// ← / → walk focus along the shelf, like scrolling through a dex
		function onShelfKey(e: KeyboardEvent<HTMLDivElement>) {
		if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
		const i = projects.findIndex((p) => `spine-${p.id}` === document.activeElement?.id);
		if (i < 0) return;
		e.preventDefault();
		const next = projects[(i + (e.key === "ArrowRight" ? 1 : -1) + projects.length) % projects.length];
		document.getElementById(`spine-${next.id}`)?.focus();
		}

		const labelled = projects.find((p) => p.id === labelId);
	
	// Prev/next: put this book back, then pull out the neighbor
	function step(dir: 1 | -1) {
		if (index < 0) return;
		const next = projects[(index + dir + projects.length) % projects.length].id;
		clearTimeout(timer.current);
		setOpen(null); // current book flies home first...
		timer.current = setTimeout(() => pull(next), 380); // ...then the next one comes out
	}

	return (
		<MotionConfig reducedMotion="user">
		{/* The shelf: a board drawn under every row of books */}
		<div
			onKeyDown={onShelfKey}
			className="flex flex-wrap items-end gap-x-1.5 px-3 [--s:0.82] sm:px-6 sm:[--s:1]"
			style={{
			backgroundImage: `repeating-linear-gradient(to bottom,
				transparent 0 ${px(SHELF_ROW - BOARD)},
				var(--shelf) ${px(SHELF_ROW - BOARD)} ${px(SHELF_ROW - 4)},
				var(--shelf-edge) ${px(SHELF_ROW - 4)} ${px(SHELF_ROW)})`,
			}}
		>
			{projects.map((p) => {
			const { width, height } = spineSize(p);
			const { color, Icon } = BOOK_TYPES[p.category];
			const n = numbers[p.id];

			return (
				// Fixed-height slot keeps every row the same height so the boards line up
				<div
				key={p.id}
				className="flex items-end"
				style={{ height: px(SHELF_ROW), width: px(width), paddingBottom: px(BOARD) }}
				>
				{open !== p.id && (
					<motion.button
					type="button"
					id={`spine-${p.id}`}
					layoutId={`book-${p.id}`}
					onClick={() => pull(p.id)}
					onMouseEnter={() => point(p.id)}
					onMouseLeave={() => unpoint(p.id)}
					onFocus={() => point(p.id)}
					onBlur={() => unpoint(p.id)}
					aria-label={`No. ${pad3(n)}: ${p.title}`}
					animate={{ y: lifted === p.id ? LIFT : 0 }}
					whileHover={lifted === p.id ? undefined : { y: -8 }}
					transition={{ y: { duration: LIFT_MS / 1000, ease: "easeOut" }, layout: morph }}
					className="spine relative flex cursor-pointer flex-col items-center justify-between rounded-[3px] pt-4 pb-2.5 text-ink focus-visible:outline-offset-4"
					style={{ width: px(width), height: px(height), borderRadius: 3, "--type": color } as CSSProperties}
					>
					{/* `layout` on children stops them stretching while the book flies back */}
					<motion.span layout className="flex-none" style={{ color }}> 
						<Icon className="size-4" aria-hidden />
					</motion.span>
					<motion.span
						layout
						className="font-display min-h-0 overflow-hidden text-ellipsis whitespace-nowrap text-[0.8125rem] leading-none sm:text-[0.9375rem] [writing-mode:vertical-rl] rotate-180"
						style={{ maxHeight: px(height - 100) }} // stays clear of the printed bands
					>
						{spineLabel(p)}
					</motion.span>
					<motion.span layout className="flex-none text-[0.6875rem] text-faint tabular-nums">
						{pad3(n)}
					</motion.span>
					{p.portfolio?.featured && <span aria-hidden className="spine-foil" />}
					<span aria-hidden className="spine-marker" style={{ opacity: active === p.id ? 1 : 0 }} />
					</motion.button>
				)}
				</div>
			);
			})}

			{/* Bookend holding the row up */}
			<div aria-hidden className="ml-1 flex items-end" style={{ height: px(SHELF_ROW), paddingBottom: px(BOARD) }}>
			<div className="rounded-t-[3px] bg-[var(--shelf-edge)]" style={{ width: px(14), height: px(128) }} />
			</div>
		</div>

		{/* Name label under the shelf: full title of the last book you pointed at */}
		<div aria-hidden className="mt-5 flex min-h-10 justify-center px-3">
		{labelled ? (
			<span className="inline-flex max-w-full items-center gap-3 rounded-full border border-line bg-white px-4 py-1.5">
			<span className="flex-none text-xs text-faint tabular-nums">No. {pad3(numbers[labelled.id])}</span>
			<span className="font-display truncate text-[1.0625rem] text-ink">{labelled.title}</span>
			<span className="size-2 flex-none rounded-full" style={{ background: BOOK_TYPES[labelled.category].color }} />
			</span>
		) : (
			<span className="py-1.5 text-sm text-faint">Pick a book to read about the project</span>
		)}
		</div>

		{/* The pulled-out book */}
		<Dialog.Root open={open !== null} onOpenChange={(o) => !o && putBack()}>
			<AnimatePresence>
			{current && (
				<Dialog.Portal forceMount>
				<Dialog.Overlay asChild forceMount>
					<motion.div
					className="fixed inset-0 z-50 bg-ink/40"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					/>
				</Dialog.Overlay>

				<Dialog.Content
					forceMount
					className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 focus:outline-none"
					onCloseAutoFocus={(e) => {
					// The spine was unmounted while open, so point focus back at it ourselves
					e.preventDefault();
					document.getElementById(`spine-${lastOpen.current}`)?.focus({ preventScroll: true });
					}}
					onKeyDown={(e) => {
					if (e.key === "ArrowRight") step(1);
					if (e.key === "ArrowLeft") step(-1);
					}}
				>
					<motion.div
					key={current.id}
					layoutId={`book-${current.id}`}
					transition={{ layout: morph }}
					className="pointer-events-auto relative w-full max-w-[760px] bg-[var(--spine)] p-0 pl-3.5 shadow-2xl"
					style={{ borderRadius: 10 }}
					>	
						<span
							aria-hidden
							className="absolute inset-y-0 left-0 w-3.5 rounded-l-[10px]"
							style={{ background: BOOK_TYPES[current.category].color }}
						/>
						{/* Page fades in once the book has landed */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, transition: { delay: 0.22, duration: 0.2 } }}
							exit={{ opacity: 0, transition: { duration: 0.08 } }}
						>
							<BookDetail
							project={current}
							number={numbers[current.id]}
							onPrev={() => step(-1)}
							onNext={() => step(1)}
							/>
						</motion.div>
					</motion.div>
				</Dialog.Content>
				</Dialog.Portal>
			)}
			</AnimatePresence>
		</Dialog.Root>
		</MotionConfig>
	);
}