import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import {
  Github, ExternalLink, Calendar, Clock, Code, Cpu, Microscope, Rocket,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Projects | Win Thant Tin Han",
  description: "Selected projects in web, embedded, and research.",
};

// ---- Data -------------------------------------------------------------------

type LinkType = "github" | "live" | "paper";
type Category = "All" | "Web" | "Embedded" | "Research" | "Club/Org";

type Project = {
  id: string;
  title: string;
  description: string;
  image?: string | null;           // public image path (optional)
  imageGradient?: string | null;   // fallback gradient when no image
  tags: string[];
  category: Exclude<Category, "All">;
  status: "Completed" | "In Progress";
  timeline?: string;
  year?: string;
  featured?: boolean;
  links?: { type: LinkType; url: string }[];
};

const projects: Project[] = [
  {
    id: "qac-website",
    title: "Quantitative Analysis Club Website",
    description:
      "Modern club site with dynamic event listings, team profiles, and mobile-first UI built in Next.js + TypeScript.",
    image: null,
    imageGradient: "from-sky-500 to-blue-600",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    category: "Web",
    status: "Completed",
    timeline: "Jan–Apr",
    year: "2025",
    featured: true,
    links: [
      // fill when ready
      // { type: "github", url: "https://github.com/..." },
      // { type: "live", url: "https://..." },
    ],
  },
  {
    id: "flappy-dot",
    title: "Flappy Dot (Embedded Game)",
    description:
      "Arduino-based Flappy Bird–style game on Uno R3 with TFT LCD, buzzer effects, scoring/collision logic in C.",
    image: null,
    imageGradient: "from-emerald-500 to-teal-600",
    tags: ["C", "Arduino", "Embedded", "TFT LCD"],
    category: "Embedded",
    status: "Completed",
    timeline: "Aug–Dec",
    year: "2024",
    links: [],
  },
  {
    id: "genai-higher-ed",
    title: "Generative AI in Higher Education (Honors Capstone)",
    description:
      "Survey design + OLS analysis on how risk preference and time discounting relate to academic use of ChatGPT.",
    image: null,
    imageGradient: "from-fuchsia-500 to-pink-600",
    tags: ["Python", "Pandas", "Matplotlib", "OLS"],
    category: "Research",
    status: "Completed",
    timeline: "Multi-term",
    year: "2023–2025",
    links: [
      // { type: "paper", url: "https://..." }
    ],
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
];

const categories: Category[] = ["All", "Web", "Embedded", "Research", "Club/Org"];

// Icons for category labels
function categoryIcon(c: Category) {
  switch (c) {
    case "Web": return <Code className="w-4 h-4" />;
    case "Embedded": return <Cpu className="w-4 h-4" />;
    case "Research": return <Microscope className="w-4 h-4" />;
    case "Club/Org": return <Rocket className="w-4 h-4" />;
    default: return <Code className="w-4 h-4" />;
  }
}

function linkMeta(type: LinkType) {
  switch (type) {
    case "github":  return { label: "View Code", icon: <Github className="w-4 h-4" /> };
    case "live":    return { label: "Live Site", icon: <ExternalLink className="w-4 h-4" /> };
    case "paper":   return { label: "Paper / Slides", icon: <ExternalLink className="w-4 h-4" /> };
  }
}

// -----------------------------------------------------------------------------

export default function ProjectsPage() {
  const counts = Object.fromEntries(
    categories.map(c => [
      c,
      c === "All" ? projects.length : projects.filter(p => p.category === c).length,
    ])
  );

  return (
    <section className="relative min-h-screen pt-20 md:pt-28 pb-16">
      <div className="container-max">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Projects</h1>
          <p className="text-white/70 mt-4">
            A small, honest slice of work across web, embedded, and research.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Badge variant="secondary">{projects.length} total</Badge>
            <Badge variant="secondary">Built with care</Badge>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="All" className="mt-10">
          <div className="flex justify-center">
            <TabsList className="rounded-full bg-white/5 backdrop-blur border border-white/10 p-1 gap-1">
              {categories.map((c) => (
                <TabsTrigger
                  key={c}
                  value={c}
                  className="rounded-full px-4 py-2 text-sm data-[state=active]:bg-white/10"
                >
                  <span className="flex items-center gap-2">
                    {categoryIcon(c)} {c}
                    <span className="ml-1 text-[10px] px-2 py-0.5 rounded-full bg-white/10">
                      {counts[c]}
                    </span>
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((c) => {
            const list = c === "All" ? projects : projects.filter(p => p.category === c);
            return (
              <TabsContent key={c} value={c} className="mt-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((p) => (
                    <Card key={p.id} className="flex flex-col overflow-hidden bg-white/[0.04] border-white/10">
                      {/* Image or gradient header */}
                      <div className="relative h-44 overflow-hidden">
                        {p.image ? (
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            className="object-cover"
                            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                          />
                        ) : (
                          <div className={`absolute inset-0 bg-gradient-to-br ${p.imageGradient ?? "from-slate-600 to-slate-800"}`} />
                        )}
                        <div className="absolute top-3 left-3">
                          <Badge className="text-xs">{p.status}</Badge>
                        </div>
                      </div>

                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">{p.category}</Badge>
                          <div className="flex items-center text-xs text-white/60">
                            {p.year && (<><Calendar className="w-3 h-3 mr-1" />{p.year}</>)}
                          </div>
                        </div>
                        <CardTitle className="text-xl">{p.title}</CardTitle>
                        <CardDescription>{p.description}</CardDescription>
                      </CardHeader>

                      <CardContent className="mt-auto">
                        <div className="flex items-center gap-4 text-xs text-white/60">
                          {p.timeline && <><Clock className="w-3 h-3" /> {p.timeline}</>}
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1">
                          {p.tags.slice(0, 4).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                          ))}
                          {p.tags.length > 4 && (
                            <Badge variant="secondary" className="text-xs">+{p.tags.length - 4}</Badge>
                          )}
                        </div>
                      </CardContent>

                      <CardFooter className="gap-4 border-t border-white/10 pt-4">
                        {(p.links?.length ?? 0) > 0 ? (
                          p.links!.map(l => {
                            const { label, icon } = linkMeta(l.type);
                            return (
                              <Link
                                key={l.type}
                                href={l.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm text-rose-300 hover:underline"
                              >
                                {icon}<span className="ml-2">{label}</span>
                              </Link>
                            );
                          })
                        ) : (
                          <span className="text-sm text-white/60 italic">Links coming soon.</span>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
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
            <Button asChild variant="outline"><Link href="/contact">Start a conversation</Link></Button>
            <Button asChild variant="outline"><Link href="/resume">View resume</Link></Button>
          </div>
        </div>
      </div>
    </section>
  );
}
