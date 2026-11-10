import Image from "next/image";
import Link from "next/link";
import HeirsBoard from "@/app/projects/heirsboard";
import YouTubeThumb from "@/components/YouTubeThumb";
import type { Project } from "@/data/types";
import { cn } from "@/lib/utils";

const SIZES = "(min-width:1024px) 34vw, (min-width:640px) 50vw, 100vw";

/**
 * Thumbnail for a project. Same priority order as before:
 * Heirs board > YouTube demo > logo > contain > cover > title card.
 */
export function ProjectMedia({ project: p, className }: { project: Project; className?: string }) {
  const demoUrl = p.links?.find((l) => l.type === "demo")?.url;
  const img = p.portfolio?.image;
  const mode = p.portfolio?.imageMode;

  let inner: React.ReactNode;

  if (p.id === "adversarial-game-agent") {
    inner = (
      <div className="absolute inset-0 flex items-center justify-center p-5">
        <div className="h-full aspect-square">
          <HeirsBoard />
        </div>
      </div>
    );
  } else if (demoUrl && !img) {
    inner = (
      <Link
        href={demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch ${p.title} demo`}
        className="absolute inset-0"
      >
        <YouTubeThumb demoUrl={demoUrl} alt="" overlay="corner" />
      </Link>
    );
  } else if (img && mode === "logo") {
    inner = (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex size-28 items-center justify-center rounded-2xl bg-white p-4 ring-1 ring-line">
          <Image
            src={img}
            alt=""
            width={p.portfolio?.logoSize ?? 96}
            height={p.portfolio?.logoSize ?? 96}
            className="object-contain"
          />
        </div>
      </div>
    );
  } else if (img && mode === "contain") {
    // Matted like a print: the whole image on the plain panel, nothing cropped
    inner = (
      <div className="absolute inset-0 p-5">
        <div className="relative h-full w-full">
          <Image src={img} alt="" fill className="object-contain" sizes={SIZES} />
        </div>
      </div>
    );
  } else if (img) {
    inner = <Image src={img} alt="" fill className="object-cover object-left-top" sizes={SIZES} />;
  } else {
    // No image: a quiet title card instead of a loud gradient
    inner = (
      <div className="absolute inset-0 flex items-end p-5">
        <span className="font-display text-2xl leading-tight text-dim">{p.title}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-xl bg-panel ring-1 ring-line ring-inset",
        className
      )}
    >
      {inner}
      {/* inner ring sits on top so white screenshots don't blend into the page */}
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/[0.07]" />
    </div>
  );
}
