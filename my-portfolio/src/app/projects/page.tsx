import HeirsBoard from "./heirsboard"
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Github, ExternalLink, Calendar, Clock, Code, CodeXml, Cpu, Microscope, Rocket, Database, Brain, Box } from "lucide-react";
import YouTubeThumb from "@/components/YouTubeThumb";

import { cn } from "@/lib/utils";
import { projects } from "@/data/projects";
import type { Project, ProjectCategory, PortfolioLinkType } from "@/data/types";
import {
  formatProjectTimeline,
  formatProjectYear,
} from "@/lib/date";


/* --------------------------------- SEO --------------------------------- */
export const metadata: Metadata = {
  title: "Projects | Win Thant Tin Han",
  description: "Selected projects in web, embedded, and research.",
};

export const revalidate = 86400; // cache enriched thumbnails for 1 day

import { getOgImage } from '@/lib/getOgImage';

// ...

async function enrichProjectsForThumbs(list: Project[]): Promise<Project[]> {
  return Promise.all(
    list.map(async (p) => {
      // Only fetch if no image is already set:
      if (!p.portfolio?.image) {
        const paperUrl = p.links?.find((l) => l.type === 'paper')?.url;
        // const demoUrl  = p.links?.find((l) => l.type === 'demo')?.url;

        // Prefer demo (YouTube handled already), else use paper page
        const pageToProbe = paperUrl ?? null;

        if (pageToProbe) {
          const og = await getOgImage(pageToProbe).catch(() => null);
          if (og) {
            return { ...p, 
                     portfolio: {
                        ...p.portfolio,
                        image: og,
                        imageMode: "cover" as const,
                     } };
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

/* -------------------------------- UI utils ------------------------------ */
function categoryIcon(c: Category, className = "") {
  switch (c) {
    case "Web":
      return <CodeXml className={`text-white ${className}`} />;

    case "AI/ML":
      return <Brain className={`text-white ${className}`} />;

    case "Algorithms":
      return <Cpu className={`text-white ${className}`} />;

    case "Graphics":
      return <Box className={`text-white ${className}`} />;

    case "Data":
      return <Database className={`text-white ${className}`} />;

    case "Embedded":
      return <Cpu className={`text-white ${className}`} />;

    case "Research":
      return <Microscope className={`text-white ${className}`} />;

    case "Database Systems":
      return <Database className={`text-white ${className}`} />;

    default:
      return <Code className={`text-white ${className}`} />;
  }
}


function linkMeta(type: PortfolioLinkType) {
  switch (type) {
    case "github":
      return {
        label: "View Code",
        icon: <Github className="w-4 h-4 text-white" />,
      };

    case "live":
      return {
        label: "Live Site",
        icon: <ExternalLink className="w-4 h-4 text-white" />,
      };

    case "paper":
      return {
        label: "Paper",
        icon: <ExternalLink className="w-4 h-4 text-white" />,
      };

    case "demo":
      return {
        label: "Watch Demo",
        icon: <ExternalLink className="w-4 h-4 text-white" />,
      };

    case "external":
      return {
        label: "View Link",
        icon: <ExternalLink className="w-4 h-4 text-white" />,
      };
  }
}

function formatStatus(status: Project["status"]){
  return status === "in-progress"
  ? "In Progress"
  : "Completed";
}

/* --------------------------------- Page --------------------------------- */
export default async function ProjectsPage() {
  const counts = Object.fromEntries(
    categories.map((c) => [c, c === "All" ? projects.length : projects.filter((p) => p.category === c).length])
  );
  const enriched = await enrichProjectsForThumbs(projects);
  return (
    <section className="relative min-h-screen pt-20 md:pt-28 pb-16">
      <div className="mx-auto w-full max-w-[min(80rem,80vw)] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Projects</h1>
          {/* <div className="mt-4 flex flex-wrap self-center justify-center gap-2">
            <Badge variant="secondary">{projects.length} projects</Badge>
            <Badge variant="secondary">Built with care</Badge>
          </div> */}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="All" className="mt-10">
          <div className="flex justify-center w-full self-center">
            <TabsList className="rounded-full bg-white/5 backdrop-blur border border-white/10 p-1 gap-1">
              {categories.map((c) => (
                <TabsTrigger key={c} value={c} 
                              className="rounded-full 
                              px-[clamp(0.5rem,1.8vw,0.9rem)]
                              py-[clamp(0.30rem,1.2vw,0.55rem)]
                              data-[state=active]:bg-white/10">
                  <span 
                    className="flex items-center
                                gap-[clamp(0.35rem,1vw,0.5rem)]
                                text-[clamp(0.82rem,1.6vw,0.95rem)]
                                leading-none
                                cursor-pointer">
                    {categoryIcon(c, "w-[1em] h-[1em]")}
                    {/* label disappears < md */}
                    <span className="hidden md:inline cursor-pointer">{c}</span>
                    {/* count disappears < sm and scales with text */}
                    <span className="ml-1 hidden sm:inline rounded-full bg-white/10 px-[0.6em] py-[0.2em] text-[0.72em] cursor-pointer">
                      {counts[c]}
                    </span>
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((c) => {
            const isAll = c === "All";
            const list = isAll ? enriched : enriched.filter((p) => p.category === c);
            return (
              <TabsContent key={c} value={c} className="mt-8">  
                <div className={isAll 
                                ? "grid grid-cols-1 md:grid-cols-7 md:grid-rows-1 gap-6" 
                                :"grid gap-x-6 gap-y-10 [grid-template-columns:repeat(auto-fit,minmax(14rem,1fr))] sm:[grid-template-columns:repeat(auto-fit,minmax(16rem,1fr))] md:[grid-template-columns:repeat(auto-fit,minmax(18rem,1fr))] lg:[grid-template-columns:repeat(auto-fit,minmax(20rem,1fr))] xl:[grid-template-columns:repeat(auto-fit,minmax(22rem,1fr))]"}>
                  {list.map((p) => {
                    const demoUrl = p.links?.find((l) => l.type === "demo")?.url;

                    return (
                      <Card
                        key={p.id}
                        className={cn(
                          "group flex flex-col overflow-hidden bg-white/[0.04] border-white/10 transition-transform duration-300 hover:scale-[1.02]",
                          isAll && "md:col-span-2 md:row-span-2",
                          isAll && p.portfolio?.size === "feature" && "md:col-span-3",
                          )}>
                        {/* Header (image / video thumb / gradient) */}
                        <div className="relative h-44 overflow-hidden">
                          {p.id === "adversarial-game-agent" ? (
                            // ------------------------------------------------------------
                            // HEIRS BOARD
                            // Keep its existing dimensions / aspect exactly as-is
                            // ------------------------------------------------------------
                            <div className="absolute inset-0 flex items-center justify-center p-5 bg-neutral-900">
                              <div className="w-full max-w-[170px]">
                                <HeirsBoard />
                              </div>
                            </div>
                          ) : demoUrl ? (
                            // ------------------------------------------------------------
                            // YOUTUBE THUMBNAIL
                            // ------------------------------------------------------------
                            <Link
                              href={demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute inset-0"
                            >
                              <YouTubeThumb
                                demoUrl={demoUrl}
                                alt={`${p.title} demo thumbnail`}
                                overlay="none"
                              />
                            </Link>
                          ) : p.portfolio?.imageMode === "logo" && p.portfolio?.image ? (
                            // ------------------------------------------------------------
                            // LOGO MODE
                            // ------------------------------------------------------------
                            <div
                              className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${
                                p.portfolio?.imageGradient ?? "from-slate-600 to-slate-800"
                              }`}
                            >
                              <Image
                                src={p.portfolio?.image}
                                alt={p.title}
                                width={p.portfolio?.logoSize ?? 112}
                                height={p.portfolio?.logoSize ?? 112}
                                className="object-contain drop-shadow-sm"
                              />
                            </div>
                          ) : p.portfolio?.imageMode === "contain" && p.portfolio?.image ? (
                            // ------------------------------------------------------------
                            // CONTAIN MODE
                            //
                            // The background is another copy of the image:
                            // enlarged + blurred so there are no ugly empty bars.
                            //
                            // The foreground image uses object-contain so nothing
                            // important gets cropped.
                            // ------------------------------------------------------------
                            <div className="absolute inset-0 bg-neutral-950">
                              {/* Blurred background */}
                              <Image
                                src={p.portfolio?.image}
                                alt=""
                                fill
                                aria-hidden="true"
                                className="object-cover scale-110 blur-xl opacity-40"
                                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                              />

                              {/* Slight dark overlay to keep backdrop subtle */}
                              <div className="absolute inset-0 bg-black/25" />

                              {/* Actual full image */}
                              <div className="absolute inset-0 p-2">
                                <Image
                                  src={p.portfolio?.image}
                                  alt={p.title}
                                  fill
                                  className="object-contain"
                                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                                />
                              </div>
                            </div>
                          ) : p.portfolio?.image ? (
                            // ------------------------------------------------------------
                            // DEFAULT COVER MODE
                            //
                            // Good for images that still look nice when cropped.
                            // ------------------------------------------------------------
                            <Image
                              src={p.portfolio?.image}
                              alt={p.title}
                              fill
                              className="object-cover"
                              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                            />
                          ) : (
                            // ------------------------------------------------------------
                            // FALLBACK GRADIENT
                            // ------------------------------------------------------------
                            <div
                              className={`absolute inset-0 bg-gradient-to-br ${
                                p.portfolio?.imageGradient ?? "from-slate-600 to-slate-800"
                              }`}
                            />
                          )}

                          {/* Status badge */}
                          <div className="absolute top-3 left-3 z-10">
                            <Badge className="text-xs text-white bg-black/45">
                              {formatStatus(p.status)}
                            </Badge>
                          </div>
                        </div>

                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {p.category}
                            </Badge>
                            <div className="flex items-center text-xs text-white/60">
                              {formatProjectYear(p.dates) && (
                                <>
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {formatProjectYear(p.dates)}
                                </>
                              )}
                            </div>
                          </div>
                          <CardTitle className="text-xl">{p.title}</CardTitle>
                          <CardDescription className={cn("text-zinc-300", p.portfolio?.size !== "feature" && "line-clamp-3")}>{p.summary}</CardDescription>
                        </CardHeader>

                        <CardContent className="mt-auto">
                          <div className="flex items-center gap-4 text-xs text-white/60">
                            {formatProjectTimeline(p.dates) && (
                              <>
                                <Clock className="w-3 h-3" /> {formatProjectTimeline(p.dates)}
                              </>
                            )}
                          </div>
                          <div className="mt-3 flex flex-wrap gap-1">
                            {p.technologies.slice(0, 4).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {p.technologies.length > 4 && (
                              <Badge variant="secondary" className="text-xs">
                                +{p.technologies.length - 4}
                              </Badge>
                            )}
                          </div>
                        </CardContent>

                        <CardFooter className="gap-4 border-t border-white/10 pt-4">
                          {(p.links?.length ?? 0) > 0 ? (
                            p.links!.map((l) => {
                              const { label, icon } = linkMeta(l.type);
                              return (
                                <Link
                                  key={l.type}
                                  href={l.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-sm text-white hover:underline"
                                >
                                  {icon}
                                  <span className="ml-2">{label}</span>
                                </Link>
                              );
                            })
                          ) : (
                            <span className="text-sm text-white/60 italic">Links coming soon.</span>
                          )}
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold">Have something you want to build?</h2>
          <p className="text-white/70 mt-2 max-w-xl mx-auto">
            I’m always happy to collaborate on practical web apps, embedded ideas, or research-y explorations.
          </p>
          <div className="mt-6 flex gap-3 justify-center">
            <Button asChild variant="outline">
              <Link href="/contact">Start a conversation</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/resume">View resume</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}