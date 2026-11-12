import { Brain, CodeXml, Cpu, Waypoints, type LucideIcon } from "lucide-react";
import type { Project, ProjectCategory } from "@/data/types";

/* Each category is a book "type": spine color, a light tint, and an icon */
export const BOOK_TYPES: Record<ProjectCategory, { color: string; tint: string; Icon: LucideIcon }> = {
	Web: { color: "#2f4f86", tint: "#eef2f8", Icon: CodeXml },
	"AI & Data": { color: "#9c3535", tint: "#f8eeec", Icon: Brain },
	Algorithms: { color: "#5b4691", tint: "#f1eef8", Icon: Waypoints },
	Systems: { color: "#2b6b60", tint: "#ebf4f2", Icon: Cpu },
};

export const BOOK_HEIGHT = 340;

/* Small stable hash so each book keeps the same size on every render */
function hash(s: string) {
	let h = 0;
	for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
	return h;
}

/* Longer write-ups get thicker spines; height varies a little so the shelf looks real */
export function spineSize(p: Project) {
	const words = p.summary.split(" ").length + p.highlights.join(" ").split(" ").length;
	const width = Math.min(70, Math.max(48, 36 + words * 0.25)) + (hash(p.id) % 6);
	const height = BOOK_HEIGHT;
	return { width: Math.round(width), height };
}

export const spineLabel = (p: Project) => p.portfolio?.spineTitle ?? p.title;

export const pad3 = (n: number) => String(n).padStart(3, "0");
