import { profile } from "@/data/profile";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { formatDateRange } from "@/lib/date";

import Link from 'next/link'
import {
  Mail,
  MapPin,
  GraduationCap,
  Building,
  Code,
  Star,
  ExternalLink,
  Calendar,
  Github,
  Linkedin,
  Briefcase,
  Rocket,
  FileText
} from 'lucide-react'

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Win Thant Tin Han, M.S. Computer Science student at USC with experience in software engineering, full-stack development, AI/ML, and research.",
};

/* --------------------------- Professional summary ----------------------- */
const summary = `M.S. Computer Science student at USC and CS Honors graduate (Cum Laude) from UC Riverside, with experience across full-stack software engineering, applied AI/ML, algorithms, and data systems. I build production web applications, from newsroom publishing tooling on Arc XP Fusion to a bilingual maritime training-school site, alongside machine-learning and systems projects. My undergraduate honors capstone on generative AI adoption in education is published through UC eScholarship. I'm seeking software engineering and AI/ML opportunities.`;
const resumeTitle = "M.S. Computer Science Student @ USC"; 

const resumeExperienceIds = [
  "usc-annenberg-media",
  "wise-wish-metc",
  "sandra-oo-clinic",
  "bedlab",
];

const resumeLeadershipIds = [
  "ewb-ucr",
  "bearhack",
];

const resumeProjectIds = [
  "dota-draft-winprob",
  "adversarial-game-agent",
  "poisson-surface-recon",
  "reddit-music-search",
  "genai-higher-ed",
  "qac-website",
  "flappy-dot",
  "crime-analysis",
];

const resumeExperience = experiences.filter((exp) =>
  resumeExperienceIds.includes(exp.id)
);

const resumeLeadership = experiences.filter((exp) =>
  resumeLeadershipIds.includes(exp.id)
);

const resumeProjects = projects.filter((project) =>
  resumeProjectIds.includes(project.id)
);

const groupedSkills = skills.reduce<Record<string, string[]>>(
  (groups, skill) => {
    if (!groups[skill.group]) {
      groups[skill.group] = [];
    }

    groups[skill.group].push(skill.name);

    return groups;
  },
  {}
);

/* ----------------------------- Component -------------------------------- */
export default function ResumePage() {
  return (
    <main className="min-h-screen bg-transparent text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-14">
        {/* ---------- Header ---------- */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">
          {profile.name}
        </h1>

        <h2 className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-600 mb-4">
          {resumeTitle}
        </h2>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-1" />
            {profile.email}
          </div>

          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {profile.location}
          </div>
        </div>
          <div className="flex flex-wrap justify-center gap-3 mt-3">
            <Link
              href={profile.linkedin}
              target="_blank"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-border/60 text-xs hover:bg-muted/40 transition"
            >
              <Linkedin className="w-3.5 h-3.5" />
              linkedin.com/in/win-thant-tin-han
            </Link>
            <Link
              href={profile.github}
              target="_blank"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-border/60 text-xs hover:bg-muted/40 transition"
            >
              <Github className="w-3.5 h-3.5" />
              github.com/WinThant16
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <Link
              href="/win_resume2026.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-400 to-fuchsia-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:opacity-90"
            >
              <FileText className="w-4 h-4" />
              View PDF Resume
            </Link>
          </div>
        </header>

        {/* ---------- Summary ---------- */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold mb-3 flex items-center">
            <Star className="w-5 h-5 mr-2 text-primary" />
            Professional Summary
          </h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed text-justify">
            {summary}
          </p>
        </section>

        <hr className="my-8 border-border/60" />

        {/* ---------- Education ---------- */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <GraduationCap className="w-5 h-5 mr-2 text-primary" />
            Education
          </h3>
          {profile.education.map((edu) => (
            <div key={edu.id} className="mb-6 last:mb-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                <div>
                  <h4 className="font-semibold text-base">{edu.degree}</h4>
                  <p className="text-xs text-muted-foreground">
                    {edu.school} | {edu.location}
                  </p>
                </div>
                <div className="text-xs text-muted-foreground flex items-center mt-1 sm:mt-0">
                  <Calendar className="w-3.5 h-3.5 mr-1" />
                  {formatDateRange(edu.dates)}
                </div>
              </div>
              {edu.id === "ucr-bscs" && (
                <ul className="mt-2 text-[13px] text-muted-foreground leading-relaxed space-y-1.5">
                  <li className="pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent/60">
                    GPA: {edu.gpa}
                  </li>

                  <li className="pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent/60">
                    {profile.research.award}
                  </li>
                </ul>
              )}
            </div>
          ))}
        </section>

        <hr className="my-8 border-border/60" />

        {/* ---------- Leadership ---------- */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <Rocket className="w-5 h-5 mr-2 text-primary" />
            Leadership
          </h3>
          {resumeLeadership.map((role) => (
            <div key={role.id} className="mb-6 last:mb-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                <div>
                  <h4 className="font-semibold text-base">{role.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {role.organization} | {role.location}
                  </p>
                </div>
                <div className="text-xs text-muted-foreground flex items-center mt-1 sm:mt-0">
                  <Calendar className="w-3.5 h-3.5 mr-1" />
                  {formatDateRange(role.dates)}
                </div>
              </div>
              <ul className="mt-2 text-[13px] text-muted-foreground leading-relaxed space-y-1.5 text-justify">
                {role.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary/60"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <hr className="my-8 border-border/60" />

        {/* ---------- Experience ---------- */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <Building className="w-5 h-5 mr-2 text-primary" />
            Experience
          </h3>
          {resumeExperience.map((job) => (
            <div key={job.id} className="mb-6 last:mb-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                <div>
                  <h4 className="font-semibold text-base">{job.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {job.organization} | {job.location}
                  </p>
                </div>
                <div className="text-xs text-muted-foreground flex items-center mt-1 sm:mt-0">
                  <Calendar className="w-3.5 h-3.5 mr-1" />
                  {formatDateRange(job.dates)}
                </div>
              </div>
              <ul className="mt-2 text-[13px] text-muted-foreground leading-relaxed space-y-1.5 text-justify">
                {job.highlights.map((a, j) => (
                  <li
                    key={j}
                    className="pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary/60"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <hr className="my-8 border-border/60" />

        {/* ---------- Projects ---------- */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-primary" />
            Projects
          </h3>
          {resumeProjects.map((proj) => (
            <div key={proj.id} className="mb-6 last:mb-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                <h4 className="font-semibold text-base">
                  {proj.title}
                  <span className="font-normal text-muted-foreground">
                    {" | "}
                    {proj.technologies.join(", ")}
                  </span>
                </h4>
                <p className="text-xs text-muted-foreground flex items-center mt-1 sm:mt-0">
                  <Calendar className="w-3.5 h-3.5 mr-1" />
                  {formatDateRange(proj.dates)}
                </p>
              </div>
              <ul className="mt-2 text-[13px] text-muted-foreground leading-relaxed space-y-1.5 text-justify">
                {proj.highlights.map((d, j) => (
                  <li
                    key={j}
                    className="pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent/60"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <hr className="my-8 border-border/60" />

        {/* ---------- Skills ---------- */}
        <section>
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <Code className="w-5 h-5 mr-2 text-primary" />
            Technical Skills
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(groupedSkills).map(([cat, list]) => (
              <div key={cat}>
                <h4 className="font-semibold mb-2">{cat}</h4>
                <div className="flex flex-wrap gap-2">
                  {list.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-1 text-[11px] rounded-md bg-muted/70 text-foreground/80 uppercase tracking-wide"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Footer ---------- */}
        <footer className="mt-16 pt-8 border-t border-border/60 text-center text-sm text-muted-foreground">
          <p>References available upon request.</p>
          <div className="flex justify-center gap-4 mt-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 border border-border px-4 py-2 rounded-md hover:bg-muted/40 transition text-xs"
            >
              <ExternalLink className="w-4 h-4" /> View Projects
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-border px-4 py-2 rounded-md hover:bg-muted/40 transition text-xs"
            >
              <Mail className="w-4 h-4" /> Contact Me
            </Link>
          </div>
        </footer>
      </div>
    </main>
  )
}