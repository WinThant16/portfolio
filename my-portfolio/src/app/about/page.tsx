// app/about/page.tsx
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import {
  Code, Coffee, ExternalLink, Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About | Win Thant Tin Han",
  description:
    "MSCS at USC. CS Honors from UC Riverside. I build web apps and work with data.",
};

/* --- Content ---------------------------------------------------------------- */

const values = [
  {
    title: "Readability",
    description:
      "I try to write code that future me or someone else can pick up and understand quickly.",
    gradient: "from-rose-500/20 to-fuchsia-500/20",
  },
  {
    title: "Doing it right",
    description:
      "I don't like cutting corners. If I'm involved, I want the end result to be solid.",
    gradient: "from-blue-500/20 to-indigo-500/20",
  },
  {
    title: "Being thoughtful",
    description:
      "I try to understand how people think and what they care about, not just what they’re responsible for.",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    title: "Working together",
    description:
      "Great products come from great teams. I value clear communication and mutual respect.",
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
                    Software • AI/ML • Research
                  </div>
                </div>

                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  I&apos;m a Master&apos;s student in CS at the University of Southern California, and I graduated with  
                  Honors in CS at University of California - Riverside. I
                  enjoy working on the intersection of software engineering and applied AI/ML: mostly web applications and data-driven backends.
                </p>

                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  My honors capstone at UC Riverside became a{" "}
                  <a
                    href="https://escholarship.org/uc/item/3qp27645"
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-4 hover:text-foreground"
                  >
                    published paper
                  </a>{" "}
                  on decision-making traits and how they potentially shape whether college students decide to use generative AI in their assignments. These days I am mostly
                  building and shipping web apps, and am currently a Web Editor for USC Annenberg Media, where I am redesigning their website!
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
                Outside of work I follow soccer, the NBA, and play a lot of Dota 2, which is where my current ML project came from.
                You will find me building web apps, small ML models, or side projects no one asked for here: 
              </p>
              <a href="https://github.com/WinThant16" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 underline underline-offset-4 hover:text-foreground">
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
                I&apos;m looking for software roles and open to research
                projects in CS. If you think I&apos;d be a good fit, please reach out.
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