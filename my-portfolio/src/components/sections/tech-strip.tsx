// src/components/sections/tech-strip.tsx
'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ----------------------------- Types & helpers ---------------------------- */

type IconItem = { src: string; label: string };
type ColumnSpec = {
  title: string;
  tone: string; // bg gradient + border classes
  items: IconItem[];
};

/** Small helper so TS doesn't mark arrays as readonly and trip you up later. */
const A = (arr: IconItem[]): IconItem[] => arr;

/* --------------------------------- Data ---------------------------------- */
/** 6 columns – make sure the filenames match what’s in /public/stack */
const COLUMNS: ColumnSpec[] = [
  {
    title: 'Languages',
    tone: 'from-rose-500/25 to-fuchsia-500/25 border-rose-500/30',
    items: A([
      { src: '/stack/c.svg', label: 'C' },
      { src: '/stack/cplusplus.svg', label: 'C++' },
      { src: '/stack/python.svg', label: 'Python' },
      { src: '/stack/javascript.svg', label: 'JavaScript' },
      { src: '/stack/typescript.svg', label: 'TypeScript' },
    ]),
  },
  {
    title: 'Web Stack',
    tone: 'from-purple-500/25 to-indigo-500/25 border-purple-500/30',
    items: A([
      { src: '/stack/next-js.svg', label: 'Next.js' },
      { src: '/stack/react.svg', label: 'React' },
      { src: '/stack/node-js.svg', label: 'Node.js' },
      { src: '/stack/html.svg', label: 'HTML' },
      { src: '/stack/CSS3.svg', label: 'CSS' },
      { src: '/stack/tailwind.svg', label: 'Tailwind' },
      { src: '/stack/shadcnui.svg', label: 'shadcn/ui' },
    ]),
  },
  {
    title: 'Databases',
    tone: 'from-indigo-500/25 to-blue-500/25 border-indigo-500/30',
    items: A([
      { src: '/stack/postgresql.svg', label: 'PostgreSQL' },
      { src: '/stack/mysql.svg', label: 'MySQL' },
      { src: '/stack/mongodb.svg', label: 'MongoDB' },
      { src: '/stack/sqlite.svg', label: 'SQLite' },
    ]),
  },
  {
    title: 'Infra & Deploy',
    tone: 'from-blue-500/25 to-sky-500/25 border-blue-500/30',
    items: A([
      { src: '/stack/vercel.svg', label: 'Vercel' },
      { src: '/stack/github-actions.svg', label: 'GitHub Actions' }, // rename if needed
    ]),
  },
  {
    title: 'Data & ML',
    tone: 'from-sky-500/25 to-cyan-500/25 border-sky-500/30',
    items: A([
      { src: '/stack/apachespark.svg', label: 'Apache Spark' },
      { src: '/stack/pandas.svg', label: 'Pandas' },
      { src: '/stack/scikitlearn.svg', label: 'scikit-learn' },
      { src: '/stack/tensorflow.svg', label: 'TensorFlow' },
      { src: '/stack/pytorch.svg', label: 'PyTorch' },
    ]),
  },
  {
    title: 'Visualization',
    tone: 'from-cyan-500/25 to-teal-500/25 border-cyan-500/30',
    items: A([
      { src: '/stack/matplotlib.svg', label: 'Matplotlib' },
      { src: '/stack/seaborn.svg', label: 'Seaborn' },
      { src: '/stack/plotly.svg', label: 'Plotly' },
      { src: '/stack/tableau.svg', label: 'Tableau' },
    ]),
  },
];

/* ---------------------------- Carousel component -------------------------- */

function ColumnCard({
  title,
  tone,
  items,
  autoMs = 1800,
}: {
  title: string;
  tone: string;
  items: IconItem[];
  autoMs?: number;
}) {
  const [idx, setIdx] = useState(0);
  const [hover, setHover] = useState(false);
  const count = items.length;
  const next = () => setIdx((v) => (v + 1) % count);
  const prev = () => setIdx((v) => (v - 1 + count) % count);

  // Auto-advance
  useEffect(() => {
    if (hover || count <= 1) return;
    const t = setInterval(next, autoMs);
    return () => clearInterval(t);
  }, [hover, count, autoMs]);

  // We render the current + next item and slide between them for a smooth feel
  const current = items[idx];
  const upcoming = items[(idx + 1) % count];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.45 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative rounded-2xl border bg-gradient-to-r ${tone} p-6 min-h-44
                  shadow-sm hover:shadow-md transition-shadow`}
    >
      {/* Title */}
      <div className="mb-4 text-center text-sm font-semibold tracking-wide text-white/90">
        {title}
      </div>

      {/* Carousel viewport */}
      <div className="relative grid h-24 place-items-center overflow-hidden">
        <motion.div
          key={idx} // triggers slide animation
          initial={{ x: 0, opacity: 1 }}
          animate={{ x: '-100%', opacity: 0 }} // slide left
          transition={{ duration: 0.3 }}
          className="absolute inset-0 grid place-items-center"
        > 
          <div className="flex flex-col items-center justify-center gap-2">
            <Image
              src={current.src}
              alt={current.label}
              width={42}
              height={42}
              className="block size-10 sm:size-11 md:size-12 object-contain"
            />
          </div>
          <div className="text-base text-center font-medium leading-none">{current.label}</div>
        </motion.div>

        <motion.div
          key={`${idx}-next`}
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }} // slide next in
          transition={{ duration: 0.3 }}
          className="absolute inset-0 grid place-items-center"
        >
          <Image
            src={upcoming.src}
            alt={upcoming.label}
            width={42}
            height={42}
            className="block size-10 sm:size-11 md:size-12 object-contain"
          />
          <div className="text-base text-center font-medium leading-none">{upcoming.label}</div>
        </motion.div>
      </div>

      {/* Controls (show on hover) */}
      {count > 1 && (
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
          <button
            onClick={prev}
            className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur hover:bg-white/20"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur hover:bg-white/20"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </motion.div>
  );
}

/* ------------------------------- Main block ------------------------------- */

export function TechStrip() {
  const cols = useMemo(() => COLUMNS, []);

  return (
    <section className="py-16">
      <div className="container-max">
        {/* Title */}
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
            The stack I use across coursework, research, and personal projects.
          </p>
        </motion.div>

        {/* Grid – larger tiles, 6 columns on xl */}
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {cols.map((c) => (
            <ColumnCard key={c.title} title={c.title} tone={c.tone} items={c.items}/>
          ))}
        </div>
      </div>
    </section>
  );
}
