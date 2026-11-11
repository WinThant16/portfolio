"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { LibraryBig, List } from "lucide-react";
import { cn } from "@/lib/utils";

type View = "shelf" | "list";
const STORAGE_KEY = "projects-view";

const ViewContext = createContext<{ view: View; setView: (v: View) => void } | null>(null);

export function ProjectViews({ children }: { children: ReactNode }) {
  const [view, setViewState] = useState<View>("shelf");

  // Restore the last choice after hydration (localStorage isn't available on the server)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "shelf" || saved === "list") setViewState(saved);
    } catch {}
  }, []);

  function setView(v: View) {
    setViewState(v);
    try {
      localStorage.setItem(STORAGE_KEY, v);
    } catch {}
  }

  return (
    <ViewContext.Provider value={{ view, setView }}>
      <div data-view={view} className="group/views">
        {children}
      </div>
    </ViewContext.Provider>
  );
}

const OPTIONS: { value: View; label: string; Icon: typeof List }[] = [
  { value: "shelf", label: "Shelf", Icon: LibraryBig },
  { value: "list", label: "List", Icon: List },
];

export function ViewToggle({ className }: { className?: string }) {
  const ctx = useContext(ViewContext);
  if (!ctx) throw new Error("ViewToggle must be inside <ProjectViews>");
  const { view, setView } = ctx;

  return (
    <div role="group" aria-label="Project view" className={cn("flex rounded-full border border-line p-0.5", className)}>
      {OPTIONS.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          aria-pressed={view === value}
          onClick={() => setView(value)}
          className={cn(
            "flex h-8 cursor-pointer items-center gap-1.5 rounded-full px-3 text-sm transition-colors",
            view === value ? "bg-ink text-paper" : "text-dim hover:text-ink"
          )}
        >
          <Icon className="size-4" aria-hidden />
          <span className="sr-only sm:not-sr-only">{label}</span>
        </button>
      ))}
    </div>
  );
}