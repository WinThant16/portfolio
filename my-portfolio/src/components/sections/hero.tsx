"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-[78vh] flex items-center pt-20 md:pt-28">
      {/* faint background pattern */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* BIGGER gaps on lg+ screens */}
      <div className="container-max grid items-center gap-12 lg:gap-16 xl:gap-24 lg:grid-cols-12">
        {/* LEFT: visual */}
        <motion.div
          className="order-2 lg:order-1 lg:col-span-5 -ml-4 sm:-ml-6 lg:-ml-16"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] shadow-[0_10px_40px_rgba(0,0,0,.3)]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-rose-400/10 via-transparent to-fuchsia-600/10" />
            <Image
              src="/pixel-room.gif"
              alt="Win Thant Tin Han"
              fill
              priority
              className="object-cover object-center"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </div>
        </motion.div>

        {/* RIGHT: content (right-aligned, with a bit of left padding to push off the GIF) */}
        <motion.div
          className="order-1 lg:order-2 lg:col-span-7 space-y-10 lg:text-right lg:pl-8 xl:pl-16"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* badge aligned to the right on lg+ */}
          <div className="flex lg:justify-end">
            <Badge className="px-4 py-2 bg-gradient-to-r from-rose-400/10 to-fuchsia-600/10 border-rose-300/20 text-white">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                Open to collaboration
              </div>
            </Badge>
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
              Hi, I&apos;m Win.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-600">
                Exploring Software Engineering & AI/ML Research
              </span>
            </h1>

            <p className="max-w-2xl lg:ml-auto text-white/70 text-lg">
              MS in Computer Science at the University of Southern California.
              <br />
              Formerly CS Honors at UC Riverside. Focused on AI/ML, data-driven
              systems, and building practical web applications.
            </p>
          </div>

          {/* buttons right-aligned on lg+ */}
          <div className="mt-2 flex flex-col sm:flex-row gap-4 sm:justify-start lg:justify-end">
            <Button
              size="lg"
              asChild
              className="rounded-full leading-none text-center items-center justify-center bg-gradient-to-r from-rose-400 to-fuchsia-600 text-white shadow-lg hover:from-rose-300 hover:to-fuchsia-600"
            >
              <a href="/resume">
                View Resume <ArrowRight className="ml-1 h-3 w-3" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full">
              <a href="/contact">Get in Touch</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
