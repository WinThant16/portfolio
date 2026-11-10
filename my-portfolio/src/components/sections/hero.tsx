"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { LocalTime } from "@/components/LocalTime";

// The one orchestrated motion moment on the site: a short staggered entrance.
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const socials = [
  { label: "GitHub", href: profile.github, icon: Github },
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

export function HeroSection() {
  return (
    <section className="wrap pb-16 pt-12 md:pb-20 md:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
        <motion.div
          className="lg:col-span-7"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.h1 variants={item} className="heading-1">
            Hi, I&apos;m Win.
            <br />
            Software Engineer.
          </motion.h1>

          <motion.div variants={item} className="mt-7 max-w-[34rem] space-y-3 text-lg leading-relaxed text-dim">
            <p>I build web applications, full-stack systems, and applied AI/ML projects.</p>
            <p>M.S. in Computer Science at USC, B.S. Honors in Computer Science from UCR.</p>
          </motion.div>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/resume" className="btn btn-primary">
              View Resume
            </Link>
            <Link href="/contact" className="btn btn-line">
              Get in Touch
            </Link>
          </motion.div>

          <motion.ul variants={item} className="mt-8 flex items-center gap-5">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-center gap-2 text-[0.9375rem] text-dim transition-colors hover:text-ink"
                >
                  <Icon className="size-4" aria-hidden />
                  {label}
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.figure
          className="lg:col-span-5"
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-panel ring-1 ring-line">
            <Image
              src="/pixel-room.gif"
              alt="Pixel-art animation of someone coding at a desk late at night"
              fill
              priority
              unoptimized
              className="object-cover object-[55%_50%]"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </div>
          <figcaption className="mt-3 flex items-center justify-between text-sm text-faint">
            <span>{profile.location}</span>
            <LocalTime />
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
