// app/about/page.tsx
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Code, Award, Users, Coffee, Globe, BookOpen, ExternalLink, Calendar, Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About | Win Thant Tin Han",
  description:
    "MSCS at USC. Formerly CS Honors at UC Riverside. Interested in software engineering and AI/ML research.",
};

/* --- Content ---------------------------------------------------------------- */

const skills = [
  { category: "Languages", items: ["C", "C++", "Python", "JavaScript", "TypeScript"] },
  { category: "Web Stack", items: ["Next.js", "React", "Node.js", "Tailwind", "HTML/CSS", "shadcn/ui"] },
  { category: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"] },
  { category: "Data & ML", items: ["Apache Spark", "PySpark", "Pandas", "scikit-learn", "TensorFlow", "PyTorch"] },
  { category: "Visualization", items: ["Seaborn", "Matplotlib", "Plotly", "Tableau"] },
];

const values = [
  {
    title: "Build with purpose",
    description:
      "I enjoy turning ideas into practical systems—shipping features, measuring impact, and iterating fast.",
    gradient: "from-rose-500/20 to-fuchsia-500/20",
  },
  {
    title: "Craft & quality",
    description:
      "Readable code, thoughtful abstractions, and tests. Small details compound into big wins.",
    gradient: "from-blue-500/20 to-indigo-500/20",
  },
  {
    title: "Learn relentlessly",
    description:
      "I love exploring new tools and research in AI/ML, systems, and modern web—then apply what sticks.",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    title: "Collaborate openly",
    description:
      "Good software is a team sport. I value clear communication, feedback, and shared ownership.",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
];

/* --- Page ------------------------------------------------------------------- */

export default function AboutPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div className="relative z-10">
        {/* Hero */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Copy */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="outline">About</Badge>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Software • AI/ML
                  </div>
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                  I like building practical things and working with data.
                </h1>

                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  I&apos;m currently pursuing a Master&apos;s Degree in CS at the University of Southern California. 
                  Previously I graduated with a Bachelor&apos;s in CS with Honors at University of California - Riverside. I
                  enjoy working on the intersection of software engineering and applied AI/ML: modern web apps, data-driven backends,
                  and small ML pieces that make products smarter.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" asChild size="lg">
                    <Link href="/contact">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Let&apos;s work together
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/resume">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Resume
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Photo + stats */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-3">
                  <Image
                    src="/avatar.JPEG" 
                    alt="Win Thant Tin Han"
                    width={520}
                    height={640}
                    className="w-full h-auto rounded-xl object-cover shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">What guides my work</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {values.map((v, i) => (
                  <Card
                    key={v.title}
                    className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-0"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${v.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                    <CardContent className="relative p-8">
                      <div className="flex items-start gap-5">
                        <div
                          className={`w-14 h-14 bg-gradient-to-br ${v.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Award className="w-7 h-7 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                              {v.title}
                            </h3>
                            <Badge variant="outline" className="ml-auto text-xs opacity-60">
                              0{i + 1}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {v.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Personal */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Coffee className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-6">Beyond the code</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                I like learning new stacks, tinkering with small ML ideas, and polishing
                UI details. I&apos;m always open to collaborating on projects that blend
                engineering and research.
              </p>
              <div className="flex justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  <span>Global mindset</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span>Always learning</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span>Team-first</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern " />
          <div className="container mx-auto px-4 text-center relative">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8 shadow-lg">
                <Code className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-4xl font-bold mb-6">Let&apos;s build something great</h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                I&apos;m exploring software roles/internships and open to research
                collaborations in CS/AI/ML. If that aligns with what you&apos;re building,
                I&apos;d love to chat.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" asChild size="lg">
                  <Link href="/contact">Get in touch</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/resume">View resume</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
