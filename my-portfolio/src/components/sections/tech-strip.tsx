'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { skills } from "@/data/skills";
import type { SkillGroup } from "@/data/types";

type IconItem = { src: string; label: string };
type ColumnSpec = { title: string; tone: string; items: IconItem[] };

const ICON_HOVER_SPRING = { type: 'spring' as const, stiffness: 420, damping: 22, mass: 0.3 };

const GROUP_TONES: Record<SkillGroup, string> = {
  Languages:
    "from-rose-500/25 to-fuchsia-500/25 border-rose-500/30",
  "Web Stack":
    "from-purple-500/25 to-indigo-500/25 border-purple-500/30",
  Databases:
    "from-indigo-500/25 to-blue-500/25 border-indigo-500/30",
  "Infra & Deploy":
    "from-blue-500/25 to-sky-500/25 border-blue-500/30",
  "Data & ML":
    "from-sky-500/25 to-cyan-500/25 border-sky-500/30",
};


/* --------------------------------- Data ---------------------------------- */
const GROUP_ORDER: SkillGroup[] = [
  "Languages",
  "Web Stack",
  "Databases",
  "Infra & Deploy",
  "Data & ML",
];

const COLUMNS = GROUP_ORDER.map((group) => ({
  title: group,
  tone: GROUP_TONES[group],
  items: skills
    .filter((skill) => skill.group === group)
    .filter((skill) => skill.icon)
    .map((skill) => ({
      src: skill.icon!,
      label: skill.name,
    })),
}));

/* ---------------------------- Column (card) ------------------------------- */
function ColumnCard({ title, tone, items }: ColumnSpec) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.45 }}
      className={`
        relative rounded-2xl border bg-gradient-to-r ${tone}
        p-6 shadow-sm hover:shadow-md transition-shadow
        min-h-[clamp(10rem,18vw,10rem)] h-full
      `}
    >
      <div className="mb-4 text-center text-sm font-semibold tracking-wide text-white/90">
        {title}
      </div>

      {/* FLEX WRAP so the last row centers */}
      <div
        className="
          flex flex-wrap justify-center
          gap-x-3 gap-y-5 sm:gap-x-5 sm:gap-y-6
        "
      >
        {items.map((it, i) => (
          <motion.div
            key={it.label + i}
            whileHover={{ scale: 1.06, y: -2, rotate: 1 }}
            whileTap={{ scale: 0.98 }}
            transition={ICON_HOVER_SPRING}
            className="
              group/icon relative
              flex flex-col items-center justify-center text-center
              /* each tile uses a responsive fixed basis so rows align nicely */
              basis-[clamp(3.75rem,5vw,3.25rem)] grow-0 shrink-0
            "
          >
            {/* icon */}
            <div className="relative aspect-square w-[clamp(3rem,4vw,1rem)]">
              <Image
                src={it.src}
                alt={it.label}
                fill
                sizes="(min-width:1024px) 6vw, 10vw"
                className="
                  object-contain
                  drop-shadow-[0_4px_16px_rgba(255,255,255,0.10)]
                  group-hover/icon:drop-shadow-[0_6px_22px_rgba(0,0,0,0.24)]
                  transition-[filter] duration-300
                "
              />
            </div>

            {/* label */}
            <div
              className="
                mt-2 font-medium leading-none text-white/90 group-hover/icon:text-white
                text-[clamp(0.75rem,1.6vw,0.95rem)]
                transition-colors duration-300
              "
            >
              {it.label}
            </div>

            {/* contained hover glow */}
            <span
              className="
                pointer-events-none absolute inset-1 rounded-xl
                opacity-0 group-hover/icon:opacity-100
                transition-opacity duration-300
                after:absolute after:inset-0 after:rounded-xl after:blur
                after:bg-white/5
              "
              aria-hidden
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ------------------------------- Main block ------------------------------- */
export function TechStrip() {
  const cols = useMemo(() => COLUMNS, []);
  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-[min(110rem,95vw)] px-[clamp(1rem,4vw,2rem)]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Tools I{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-600">
              reach for
            </span>
          </h2>
          <p className="mt-2 text-sm md:text-base text-white/70">
            Tools I use across production work, projects, research, and coursework.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-6">
          {cols.map((c,i) => (
            <div 
              key={c.title}
              className={`
                xl:col-span-2
                ${i === 3 ? "xl:col-start-2" : ""}
                ${i === 4 ? "xl:col-start-4" : ""}
                `}
            >
                <ColumnCard key={c.title} {...c} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
