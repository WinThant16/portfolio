// app/about/page.tsx
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Code, Coffee, ExternalLink, Layers, Github
} from "lucide-react";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About",
  description:
    "M.S. Computer Science student at USC building production software, full-stack systems, and applied AI/ML projects.",
};
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
                    Software | AI/ML | Research
                  </div>
                </div>

                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  I&apos;m an M.S. Computer Science student at the University of Southern
                  California and a Computer Science Honors graduate from the University of
                  California, Riverside. I enjoy building software across the stack, from
                  production web applications and backend systems to algorithms and applied
                  AI/ML projects.
                </p>

                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  My undergraduate honors capstone at UC Riverside studied how
                  decision-making traits and other factors relate to students&apos; use of
                  generative AI in higher education, and was{" "}
                  <a
                    href={profile.research.publicationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-4 hover:text-foreground"
                  >
                    published through UC eScholarship
                  </a>
                  . These days, I&apos;m a Web Production Editor at USC Annenberg Media,
                  where I build and ship production components for a live newsroom publishing
                  platform while co-leading web production for the Fall 2026 cycle.
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

        {/* Personal */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Coffee className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-6">Other interests</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Outside of work, I follow soccer and the NBA and probably play too much
                Dota 2, which is where my current draft-prediction ML project came from.
                I also tend to build side projects no one asked for.
              </p>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 underline underline-offset-4 hover:text-foreground"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
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
              <h2 className="text-4xl font-bold mb-6">If you want to work together</h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                I&apos;m looking for software engineering opportunities and am also open to
                interesting AI/ML and research collaborations. If you think I&apos;d be a
                good fit, please reach out.
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