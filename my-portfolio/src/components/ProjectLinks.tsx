import { ArrowUpRight, Github } from "lucide-react";
import type { PortfolioLink, PortfolioLinkType } from "@/data/types";
import { cn } from "@/lib/utils";

const LABELS: Record<PortfolioLinkType, string> = {
  github: "View Code",
  live: "Live Site",
  paper: "Paper",
  demo: "Watch Demo",
  external: "View Link",
};

export function ProjectLinks({ links, className }: { links?: PortfolioLink[]; className?: string }) {
  if (!links?.length) {
    return <p className={cn("text-sm text-faint", className)}>Links coming soon.</p>;
  }

  return (
    <ul className={cn("flex flex-wrap gap-x-6 gap-y-2", className)}>
      {links.map((l) => (
        <li key={`${l.type}-${l.url}`}>
          <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-link">
            {l.type === "github" ? <Github className="size-4" aria-hidden /> : null}
            {l.label ?? LABELS[l.type]}
            {l.type !== "github" ? <ArrowUpRight className="size-4 text-faint" aria-hidden /> : null}
          </a>
        </li>
      ))}
    </ul>
  );
}
