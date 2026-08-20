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
      if (!p.image) {
        const paperUrl = p.links?.find((l) => l.type === 'paper')?.url;
        // const demoUrl  = p.links?.find((l) => l.type === 'demo')?.url;

        // Prefer demo (YouTube handled already), else use paper page
        const pageToProbe = paperUrl ?? null;

        if (pageToProbe) {
          const og = await getOgImage(pageToProbe).catch(() => null);
          if (og) {
            return { ...p, image: og, imageMode: 'cover' as const };
          }
        }
      }
      return p;
    })
  );
}

/* --------------------------------- Data -------------------------------- */
type LinkType = "github" | "live" | "paper" | "demo";
type Category = "All" | "Web" | "AI/ML" | "Graphics" | "Embedded" | "Research" | "Club/Org" | "Database Systems";

type Project = {
  id: string;
  title: string;
  description: string;
  image?: string | null;
  imageGradient?: string | null;
  tags: string[];
  category: Exclude<Category, "All">;
  status: "Completed" | "In Progress";
  timeline?: string;
  year?: string;
  featured?: boolean;
  links?: { type: LinkType; url: string }[];
  imageMode?: "cover" | "logo";
  logoSize?: number; // px
  size?: "feature";
};

const projects: Project[] = [
  {
    id: "dota-draft-winprob",
    title: "Dota 2 Draft Win-Probability Model",
    description:
      "ML pipeline predicting match outcome from hero drafts alone. 150k+ Divine 1 and above ranked matches from the OpenDota API; a logistic-regression baseline hits 55.7% against a 53.7% majority baseline, and a tuned XGBoost ties it near 56%, showing that raw hero features cap out and pointing to synergy and counter features as the next lever.",
    image: "/hero_coefficients.png",
    imageGradient: "from-red-600 to-rose-900",
    tags: ["Python", "scikit-learn", "pandas", "OpenDota API"],
    category: "AI/ML",
    status: "In Progress",
    timeline: "June-",
    year: "2026",
    featured: true,
    links: [{type: "github", url: "https://github.com/WinThant16/d2shenanigans"}],
    size:"feature"
  },
  {
    id: "adversarial-game-agent",
    title: "Adversarial Game Agent (Heirs)",
    description:
      "Search agent for a 12x12 strategic board game with 8 piece types: principal variation search with iterative deepening, Zobrist-hashed transposition tables, killer/history heuristics, and late move reduction. Placed 19th of 201 (top 10%) in a course tournament.",
    image: null,
    imageGradient: "from-violet-600 to-indigo-900",
    tags: ["C++", "Adversarial Search", "Game AI"],
    category: "AI/ML",
    status: "Completed",
    timeline: "Jan-May",
    year: "2026",
    links: [{type:"github", url:"https://github.com/WinThant16/heirs-chess-variant-agent"}],
  },
  {
  id: "sandra-oo-optometry",
  title: "Dr. Khin Sandra Oo Optometry",
  description:
    "Production site for an independent optometry practice: services, doctor profiles, an eye-conditions library, FAQs, and a contact section with an embedded map and hours. Built in Next.js and deployed on Vercel.",
  image: "/optometrysite.png",
  imageGradient: "from-teal-500 to-emerald-800",
  tags: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
  category: "Web",
  status: "Completed",
  timeline: "Apr-Jun",
  year: "2026",
  links: [{ type: "live", url: "https://drsandraooeyecare.com/" }],
  },
  {
    id: "poisson-surface-recon",
    title: "Poisson Surface Reconstruction",
    description:
      "Screened Poisson reconstruction from oriented point clouds on a voxel grid with an FFT solve, trilinear normal splatting, finite-difference divergence, and marching cubes. F-score 0.9999 on the Stanford bunny at depth 7, benchmarked against Alpha Shape and Ball Pivoting.",
    image: "/surface-reconstruction.jpg",
    imageGradient: "from-sky-500 to-blue-800",
    tags: ["Python", "NumPy", "SciPy", "Marching Cubes"],
    category: "Graphics",
    status: "Completed",
    timeline: "Jan-May",
    year: "2026",
    links: [{type: "github", url:"https://github.com/laddertosky/surface_reconstruction"}],
  },
  {
    id: "wise-wish-metc",
    title: "Wise Wish Marine Engineering Training Centre",
    description:
      "Production marketing and enrollment site for a Myanmar marine training school. Course catalog, News section, and a live per-course intake calendar pulling from Google Sheets via OpenSheet. Built solo and deployed on Cloudflare Workers.",
    image: "/wisewishsite.png",
    imageGradient: "from-blue-600 to-cyan-800",
    tags: ["React", "Vite", "TypeScript", "Tailwind", "Cloudflare Workers"],
    category: "Web",
    status: "Completed",
    timeline: "Jan-Jun",
    year: "2026",
    featured: true,
    links: [{ type: "live", url: "https://wisewishmetc.com" }],
    size: "feature",
  },
  
  
  {
    id: "reddit-music-search",
    title: "Reddit Music Search Engine",
    description:
      "PyLucene indexing and retrieval over post titles, bodies, and comments from music subreddits, reranking by Lucene relevance combined with post score and a time-decay recency factor. PRAW pipeline crawls the data into structured JSONL.",
    image: null,
    imageGradient: "from-orange-500 to-rose-700",
    tags: ["Python", "PRAW", "PyLucene", "Information Retrieval"],
    category: "AI/ML",
    status: "Completed",
    timeline: "Apr-Jun",
    year: "2025",
    links: [
      { type: "demo", url: "https://www.youtube.com/watch?v=8V_QhB1leak" },
      { type: "github", url: "https://github.com/WinThant16/reddit-music-search-engine" },
    ],
  },
  {
    id: "container-ship-load-planner",
    title: "Container Ship Load Planner",
    description:
      "Full-stack port-logistics planner built with a team: generates step-by-step container load, unload, and ship-balancing sequences under movement-cost and legal-balance constraints, shown through a React grid interface. Backed by an Express REST API and server-side computation I built, with action logging and updated-manifest output.",
    image: "/kawrgojumper.png",
    imageGradient: "from-amber-500 to-orange-800",
    tags: ["React", "Express", "Node.js", "REST API", "Search/Optimization"],
    category: "Web",
    status: "Completed",
    timeline: "Sep-Dec",
    year: "2024",
    links: [{ type: "github", url: "https://github.com/WinThant16/KawrgoJumper" }],
    size:"feature"
  },
  {
    id: "genai-higher-ed",
    title: "Generative AI in Higher Education (Honors Capstone)",
    description:
      "Survey design + OLS analysis on how decision-making traits (risk preference, time preference and loss aversion) relate to academic use of ChatGPT.",
    image: "/logo_eschol-small.svg",
    imageGradient: "from-rose-200 to-purple-950",
    imageMode: "logo",
    tags: ["Python", "Pandas", "Matplotlib", "OLS"],
    category: "Research",
    status: "Completed",
    timeline: "Multi-term",
    year: "2023-2025",
    links: [ { type: "paper", url: "https://escholarship.org/uc/item/3qp27645" } ],
  },
  {
    id: "qac-website",
    title: "Quantitative Analysis Club Website",
    description:
      "Modern club site with dynamic event listings, team profiles, and mobile-first UI built in Next.js + TypeScript.",
    image: "/logoquant.webp",
    imageGradient: "from-cyan-500 to-purple-950",
    imageMode: "logo",
    logoSize: 64,
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    category: "Web",
    status: "Completed",
    timeline: "Jan-Apr",
    year: "2025",
    featured: true,
    links: [{type: "github", url: "https://github.com/acm-ucr/quant-website/tree/dev"},
      { type: "live", url: "https://quant.ucrhighlanders.org/" }],
  },
  {
    id: "flappy-dot",
    title: "Flappy Dot (Embedded Game)",
    description:
      "Arduino-based Flappy Bird-style game on Uno R3 with TFT LCD, buzzer effects, scoring/collision logic in C.",
    image: null,
    imageGradient: "from-emerald-500 to-teal-600",
    tags: ["C", "Arduino", "Embedded", "TFT LCD"],
    category: "Embedded",
    status: "Completed",
    timeline: "Aug-Dec",
    year: "2024",
    links: [{ type: "demo", url: "https://youtu.be/llS1ihetCOk" }],
    size:"feature"
  },
  {
    id: "crime-analysis",
    title: "Crimes Data Analysis",
    description:
      "Data analysis project exploring U.S. crime datasets with preprocessing, feature engineering, and visualization. Includes models to identify trends and predictive insights, built with Python and data science libraries.",
    image: "/crdatanalysis.png", 
    imageGradient: "from-indigo-500 to-blue-600",
    tags: ["Python", "Pandas", "Matplotlib", "Data Science"],
    category: "Database Systems",
    status: "Completed",
    year: "2024",
    links: [{ type: "github", url: "https://github.com/nguyena537/CrimesDataAnalysis" },
      { type: "demo", url: "https://www.youtube.com/watch?v=GqUESbe_U3w" }
    ],
    size:"feature"
  },
  {
    id: "ucr-chatroom",
    title: "UCR Chatroom",
    description:
      "Collaborative chatroom app built with classmates. Supports Google login, private rooms with access keys, nickname support, and persistent chatrooms stored via MongoDB. Users can message in public or private rooms after authentication.",
    image: null, // again, you could drop in a screenshot if you have one
    imageGradient: "from-cyan-500 to-sky-600",
    tags: ["Node.js", "MongoDB", "Express", "Firebase Auth"],
    category:"Database Systems",
    status: "Completed",
    year: "2024",
    // Repo is private so no public GitHub/demo link — TO DO: make public?"
    links: [],
  },

];

const categories: Category[] = ["All", "Web", "AI/ML", "Graphics", "Embedded", "Research", "Database Systems"];


/* -------------------------------- UI utils ------------------------------ */
function categoryIcon(c: Category, className = "") {
  switch (c) {
    case "Web": return <CodeXml className={`text-white ${className}`} />;
    case "AI/ML": return <Brain className={`text-white ${className}`} />;
    case "Graphics": return <Box className={`text-white ${className}`} />;
    case "Embedded": return <Cpu className={`text-white ${className}`} />;
    case "Research": return <Microscope className={`text-white ${className}`} />;
    case "Club/Org": return <Rocket className={`text-white ${className}`} />;
    case "Database Systems": return <Database className={`text-white ${className}`} />;
    default: return <Code className={`text-white ${className}`} />;
  }
}


function linkMeta(type: LinkType) {
  switch (type) {
    case "github":  return { label: "View Code", icon: <Github className="w-4 h-4 text-white" /> };
    case "live":    return { label: "Live Site", icon: <ExternalLink className="w-4 h-4 text-white" /> };
    case "paper":   return { label: "Paper", icon: <ExternalLink className="w-4 h-4 text-white" /> };
    case "demo":    return { label: "Watch Demo", icon: <ExternalLink className="w-4 h-4 text-white" /> };
    default:        return { label: "Open", icon: <ExternalLink className="w-4 h-4 text-white" /> };
  }
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
          <p className="text-white/70 mt-4">A small, honest slice of work across web dev, embedded systems, and research.</p>
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
                          isAll && p.size === "feature" && "md:col-span-3",
                          )}>
                        {/* Header (image / video thumb / gradient) */}
                        <div className="relative h-44 overflow-hidden">
                          {p.id === "adversarial-game-agent" ? (
                            <div
                              className={`absolute inset-0 flex items-center justify-center p-5 bg-neutral-900`}                    
                            >
                              <div className ="w-full max-w-[170px]">
                                <HeirsBoard />
                              </div>
                            </div>
                          ) :
                          demoUrl ? (
                            <Link href={demoUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0">
                              <YouTubeThumb demoUrl={demoUrl} alt={`${p.title} demo thumbnail`} overlay="none" />
                            </Link>
                          ) : p.imageMode === "logo" && p.image ? (
                            <div
                              className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${
                                p.imageGradient ?? "from-slate-600 to-slate-800"
                              }`}
                            >
                              <Image
                                src={p.image}
                                alt={p.title}
                                width={p.logoSize ?? 112}
                                height={p.logoSize ?? 112}
                                className="object-fill drop-shadow-sm"
                              />
                            </div>
                          ) : p.image ? (
                            <Image
                              src={p.image}
                              alt={p.title}
                              fill
                              className="object-cover"
                              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                            />
                          ) : (
                            <div
                              className={`absolute inset-0 bg-gradient-to-br ${
                                p.imageGradient ?? "from-slate-600 to-slate-800"
                              }`}
                            />
                          )}

                          <div className="absolute top-3 left-3">
                            <Badge className="text-xs text-white bg-black/45">{p.status}</Badge>
                          </div>
                        </div>

                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {p.category}
                            </Badge>
                            <div className="flex items-center text-xs text-white/60">
                              {p.year && (
                                <>
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {p.year}
                                </>
                              )}
                            </div>
                          </div>
                          <CardTitle className="text-xl">{p.title}</CardTitle>
                          <CardDescription className={cn("text-zinc-300", p.size !== "feature" && "line-clamp-3")}>{p.description}</CardDescription>
                        </CardHeader>

                        <CardContent className="mt-auto">
                          <div className="flex items-center gap-4 text-xs text-white/60">
                            {p.timeline && (
                              <>
                                <Clock className="w-3 h-3" /> {p.timeline}
                              </>
                            )}
                          </div>
                          <div className="mt-3 flex flex-wrap gap-1">
                            {p.tags.slice(0, 4).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {p.tags.length > 4 && (
                              <Badge variant="secondary" className="text-xs">
                                +{p.tags.length - 4}
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