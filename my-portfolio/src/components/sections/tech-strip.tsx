// src/components/sections/trust-strip.tsx
"use client";

import { motion } from "framer-motion";
import {
  Code,
  Code2,        // Web stack
  Database,     // Data layer
  BrainCircuit, // AI / LLM
  Cloud,        // Infra / DevOps
  ShieldCheck,  // Testing / quality
  Boxes,        // UI / motion
} from "lucide-react";

const items = [
  {
  title: "Languages",
  desc: "C · C++ · Python · JavaScript",
  icon: Code,
  tone: "from-rose-500/15 to-fuchsia-500/15 border-rose-500/20",
 },
  {
    title: "Web Stack",
    desc: "Next.js · Node.js · React · TypeScript · Tailwind · HTML/CSS · shadcn/ui",
    icon: Code2,
    tone: "from-purple-500/15  to-indigo-500/15  border-purple-500/20",
  },
  {
    title: "Databases",
    desc: "Postgres · MySQL · MongoDB · NoSQL · SQLite",
    icon: Database,
    tone: "from-indigo-500/15 to-blue-500/15 border-indigo-500/20",
  },
  {
    title: "Infra & deploy",
    desc: "Vercel · GitHub Actions",
    icon: Cloud,
    tone: "from-blue-500/15 to-sky-500/15 border-blue-500/20",
  },
  {
    title: "Data & ML Tools",
    desc: "Apache Spark · PySpark · Pandas · Scikit-learn · TensorFlow · PyTorch",
    icon: Boxes,
    tone: "from-sky-500/15 to-cyan-500/15 border-sky-500/20",
  },
  {
    title: "Data Visualization",
    desc: "Seaborn · Matplotlib · Plotly · Tableau ",
    icon: ShieldCheck,
    tone: "from-cyan-500/15 to-teal-500/15 border-cyan-500/20",
  },
  
];

export function TechStrip() {
  return (
    <section className="py-16">
      <div className="container-max">
        {/* Title + subtitle */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Tools I <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-600">reach for</span>
          </h2>
          <p className="mt-2 text-sm text-white/70">
            The tools I’m currently learning and using in coursework and personal projects.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5 }}
          className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
        >
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.05 * i }}
              className={`rounded-xl border bg-gradient-to-r ${it.tone} p-4`}
            >
              <div className="flex items-start gap-3">
                <div className="rounded-lg border border-white/10 bg-white/5 p-2">
                  <it.icon className="h-5 w-5 text-white/90" />
                </div>
                <div>
                  <div className="font-medium">{it.title}</div>
                  <div className="text-sm text-white/70">{it.desc}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
