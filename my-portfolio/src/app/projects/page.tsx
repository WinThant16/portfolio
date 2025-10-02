import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Github, ExternalLink, Calendar, Clock, Code, Cpu, Microscope, Rocket, Database } from "lucide-react";
import YouTubeThumb from "@/components/YouTubeThumb";

/* --------------------------------- SEO --------------------------------- */
export const metadata: Metadata = {
  title: "Projects | Win Thant Tin Han",
  description: "Selected projects in web, embedded, and research.",
};

export const revalidate = 60 * 60 * 24; // cache enriched thumbnails for 1 day

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
type Category = "All" | "Web" | "Embedded" | "Research" | "Club/Org" | "Database Systems";

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
};

const projects: Project[] = [
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
    year: "2023–2025",
    links: [ { type: "paper", url: "https://escholarship.org/uc/item/3qp27645" } ],
  },
  {
    id: "ewb-soil-robot",
    title: "Soil Deposition Robot (Engineers Without Borders)",
    description:
      "Team project: C++/Arduino firmware, CAD & 3D printing for a soil deposition prototype (VP on org).",
    image: null,
    imageGradient: "from-amber-500 to-orange-600",
    tags: ["C++", "Arduino", "CAD", "3D Printing"],
    category: "Club/Org",
    status: "Completed",
    year: "2023–2025",
    links: [],
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
  },
  {
    id: "ucr-chatroom",
    title: "UCR Chatroom",
    description:
      "Collaborative chatroom app built with classmates. Supports Google login, private rooms with access keys, nickname support, and persistent chatrooms stored via MongoDB. Users can message in public or private rooms after authentication.",
    image: null, // again, you could drop in a screenshot if you have one
    imageGradient: "from-cyan-500 to-sky-600",
    tags: ["Node.js", "MongoDB", "Express", "Firebase Auth"],
    category: "Web",
    status: "Completed",
    year: "2024",
    // Repo is private so no public GitHub/demo link — TO DO: make public?"
    links: [],
  },

];

const categories: Category[] = ["All", "Web", "Embedded", "Research", "Club/Org", "Database Systems"];

/* -------------------------------- UI utils ------------------------------ */
function categoryIcon(c: Category) {
  switch (c) {
    case "Web": return <Code className="w-4 h-4 text-white" />;
    case "Embedded": return <Cpu className="w-4 h-4 text-white" />;
    case "Research": return <Microscope className="w-4 h-4 text-white" />;
    case "Club/Org": return <Rocket className="w-4 h-4 text-white" />;
    case "Database Systems": return <Database className="w-4 h-4 text-white" />;
    default: return <Code className="w-4 h-4 text-white" />;
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
      <div className="container-max">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Projects</h1>
          <p className="text-white/70 mt-4">A small, honest slice of work across web dev, embedded systems, and research.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Badge variant="secondary">{projects.length} projects</Badge>
            <Badge variant="secondary">Built with care</Badge>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="All" className="mt-10">
          <div className="flex justify-center">
            <TabsList className="rounded-full bg-white/5 backdrop-blur border border-white/10 p-1 gap-1">
              {categories.map((c) => (
                <TabsTrigger key={c} value={c} className="rounded-full px-4 py-2 text-sm data-[state=active]:bg-white/10">
                  <span className="flex items-center gap-2">
                    {categoryIcon(c)} {c}
                    <span className="ml-1 text-[10px] px-2 py-0.5 rounded-full bg-white/10">{counts[c]}</span>
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((c) => {
            const list = c === "All" ? enriched : enriched.filter((p) => p.category === c);
            return (
              <TabsContent key={c} value={c} className="mt-8">  
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((p) => {
                    const demoUrl = p.links?.find((l) => l.type === "demo")?.url;

                    return (
                      <Card
                        key={p.id}
                        className="group flex flex-col overflow-hidden bg-white/[0.04] border-white/10
                                   transition-transform duration-300 hover:scale-[1.02]"
                      >
                        {/* Header (image / video thumb / gradient) */}
                        <div className="relative h-44 overflow-hidden">
                          {demoUrl ? (
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
                                className="object-contain drop-shadow-sm"
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
                            <Badge className="text-xs text-white">{p.status}</Badge>
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
                          <CardDescription className="text-zinc-300">{p.description}</CardDescription>
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
