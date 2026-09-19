import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/data/profile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Github, Linkedin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Win Thant Tin Han for software engineering, AI/ML, and research opportunities.",
};

export default function ContactPage() {
  return (
    <section className="relative min-h-[75vh] pt-20 md:pt-28">
      <div className="container-max">
        {/* Header */}
        <div className="text-center space-y-3">
          <Badge className="px-3 py-1 bg-gradient-to-r from-rose-400/10 to-fuchsia-600/10 border-rose-300/20 text-white">
            Contact
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Let&apos;s build something great
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Open to software engineering opportunities and AI/ML or research collaborations.
            I usually reply within a day.
          </p>
        </div>

        {/* Single centered card */}
        <div className="mt-10 flex justify-center w-fit align-middle mx-auto">
          <Card className="w-full max-w-xl p-6 space-y-10 border-white/10 bg-slate-950/90">
            <div className="space-y-2">
              <div className="font-semibold text-center">Reach me directly:</div>
            </div>

            <div className="flex flex-col gap-5">
              <Button asChild variant="outline" className="justify-start rounded-full">
                <a href={`mailto:${profile.email}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  {profile.email}
                </a>
              </Button>

              <Button asChild variant="outline" className="justify-start rounded-full">
                <Link href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </Link>
              </Button>

              <Button asChild variant="outline" className="justify-start rounded-full">
                <Link href={profile.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
