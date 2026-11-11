import { Box, Brain, CodeXml, Cpu, Database, Microscope, Server, type LucideIcon } from "lucide-react";
import type { Project, ProjectCategory } from "@/data/types";

/* Each category is a book "type": spine color, a light tint, and an icon */
export const BOOK_TYPES: Record<ProjectCategory, { color: string; tint: string; Icon: LucideIcon }> = {
	Web: { color: "#2f4f86", tint: "#eef2f8", Icon: CodeXml },
	"AI/ML": { color: "#9c3535", tint: "#f8eeec", Icon: Brain },
	Algorithms: { color: "#5b4691", tint: "#f1eef8", Icon: Cpu },
	Graphics: { color: "#2c6f8e", tint: "#ecf4f7", Icon: Box },
	Data: { color: "#a06d18", tint: "#f8f2e6", Icon: Database },
	Embedded: { color: "#466f37", tint: "#eef4ea", Icon: Cpu },
	Research: { color: "#2b6b60", tint: "#ebf4f2", Icon: Microscope },
	"Database Systems": { color: "#505a67", tint: "#eff1f3", Icon: Server },
};

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
	const height = 270;
	return { width: Math.round(width), height };
}

export const spineLabel = (p: Project) => p.portfolio?.spineTitle ?? p.title;

export const pad3 = (n: number) => String(n).padStart(3, "0");
