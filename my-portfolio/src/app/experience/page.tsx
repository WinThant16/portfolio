import Image from "next/image";
import { Badge } from "@/components/ui/badge";

type Experience = {
  title: string;
  org: string;
  location: string;
  dates: string;
  image?: { src: string; alt: string };
  imageGradient?: string;
  oneLiner: string;
  story: string;
  impact: string;
  stack: string;
  links?: { label: string; href: string }[];
};

const experiences: Experience[] = [
    {
    title: "Web Production Editor",
    org: "USC Annenberg Media",
    location: "Los Angeles, CA",
    dates: "Aug 2026 - Present",
    image: {
      src: "/uscannenberg.jpg",
      alt: "USC Annenberg Logo",
    },
    imageGradient: "from-amber-500/30 to-rose-600/30",
    oneLiner:
      "Leading web production inside a live newsroom's CMS.",
    story:
      "Working inside a real newsroom meant my code had to fit an existing editorial workflow, not the other way around. I started as a volunteer building components in the spring, then moved into the paid Web Production Editor role for the Fall 2026 cycle, where I spend as much time understanding what editors and designers need as I do writing the components themselves.",
    impact:
      "Built a custom triple-column React layout block on Arc XP's Fusion platform and used it to publish a redesigned Annenberg Media homepage, rebuilt the site's navigation with Queryly-powered search, and lead web production for the Fall 2026 cycle across 2+ feature cycles.",
    stack:
      "React, Arc XP Fusion, TypeScript, editorial CMS workflows",
    links: [],
  },
  {
    title: "Web Developer",
    org: "Wise Wish Marine Engineering Training Centre",
    location: "Remote",
    dates: "Jan 2026 - Present",
    imageGradient: "from-sky-500/30 to-blue-700/30",
    oneLiner:
      "Shipped a bilingual site that a non-technical team can actually maintain.",
    story:
      "It was my first time working on a professional website alone. The challenge was trying to understand what the school actually wanted to show and illustrate to prospective clients and then coming up with a detailed mockup to fit its needs.",
    impact:
      "Built and shipped wisewishmetc.com in React, TypeScript, Vite, and Tailwind with English and Burmese support, a Google Sheets-backed intake calendar showing 12 months of availability that updates in real-time.",
    stack:
      "React, TypeScript, Vite, Tailwind CSS, Cloudflare Workers, Google Sheets API",
    links: [{ label: "wisewishmetc.com", href: "https://wisewishmetc.com" }],
  },
  {
    title: "IT Support (Part-Time)",
    org: "Dr. Khin Sandra Oo, Inc. & Associates",
    location: "Yorba Linda, CA",
    dates: "Dec 2024 - Present",
    imageGradient: "from-teal-500/30 to-emerald-600/30",
    oneLiner:
      "Wearing two hats: building the clinic's site and keeping its systems running.",
    story:
      "A small practice where the work varies day to day. Sometimes it's designing a webpage or a poster; other times it's fixing a front-desk workstation before the clinic opens, or fixing internet connectivity issues. It taught me to keep things simple and reliable for people who aren't technical.",
    impact:
      "Design and develop the optometry clinic's informational site in Next.js, TypeScript, and Tailwind with mobile-first layouts, and maintain front-desk workstations, staff accounts, and device backups.",
    stack:
      "Next.js, TypeScript, Tailwind CSS, IT support",
    links: [],
  },
  {
    title: "Vice President",
    org: "Engineers Without Borders at UCR",
    location: "Riverside, CA",
    dates: "Sep 2023 - Jun 2025",
    image: {
      src: "/ewb_highlanderday.jpg",
      alt: "Engineers Without Borders team moment",
    },
    oneLiner:
      "Led planning and execution of student-led projects for the EWB Chapter at UCR.",
    story:
      "EWB was my first leadership role in college, and it taught me how to balance between taking charge and delegating tasks. I learned to listen to team members, delegate effectively, and keep projects on track while adapting to challenges.",
    impact:
      "Coordinated a team of more than 20 engineers to take a fertilizer deposition robot from concept to prototype, and supported fundraising that raised over $500 for the 2024 BCOE Match Challenge.",
    stack:
      "Leadership, prototyping, project planning, cross team communication",
    links: [
      { label: "Engineers Without Borders", href: "https://ewb-usa.org/" },
    ],
  },
  {
    title: "Undergraduate Research Associate",
    org: "Behavioral Economics and Decision Making Lab, UCR School of Business",
    location: "Riverside, CA",
    dates: "Sep 2023 - Jun 2025",
    image: {
      src: "/researchaward.jpg",
      alt: "Research award photo with Professor Ye Li",
    },
    oneLiner:
      "Research taught me patience, and how to turn curiosity into measurable questions.",
    story:
      "This was slow, in a good way. Sometimes, I would feel like I had it all figured out. Other times, I would realize parts of it were underdefined or poorly measured. Most of the progress came from tightening definitions, questioning assumptions, and rerunning analysis until the results made sense and were defensible.",
    impact:
      "Pursued an honors capstone on generative AI adoption in education with mentorship from Professor Ye Li, and contributed feedback on study design plus survey methodology across multiple projects.",
    stack:
      "Python, pandas, matplotlib, Qualtrics, regression analysis, survey design",
    links: [
      { label: "BEDLab", href: "https://sites.google.com/ucr.edu/bedlab" },
    ],
  },
  {
    title: "Operations Lead",
    org: "BearHack",
    location: "Riverside, CA",
    dates: "Jan 2025 - Apr 2025",
    image: {
      src: "/bearhack.jpg",
      alt: "BearHack operations team photo",
    },
    oneLiner:
      "Led operations, logistics, and budgeting for a student-run hackathon.",
    story:
      "I learned no matter how hard we plan meticulously, there can be factors beyond our control that can affect schedules for an event. I learned to make calls quickly with partial information, communicate the decision clearly, and move on instead of second-guessing. When something broke later, we adjusted and kept the event running.",
    impact:
      "Managed grants, budget, and prize distribution for a two day makeathon, and coordinated workshops plus judging and event logistics for more than 100 participants.",
    stack:
      "Operations, budgeting, vendor coordination, run of show planning",
    links: [
      { label: "BearHack", href: "https://www.instagram.com/bearhackucr/" },
    ],
    },
  {
    title: "Frontend Developer",
    org: "ACM at UCR",
    location: "Riverside, CA",
    dates: "Jan 2025 - Mar 2025",
    image: {
      src: "/acm.webp",
      alt: "acm team working on website design",
    },
    oneLiner:
      "Worked on frontend development and UI improvements for a student organization site.",
    story:
      "I liked how predictable the workflow was. Tasks were assigned on a weekly basis, and I worked on each feature independently on my own branch. Before opening a pull request, I would make sure the feature ran locally and include screenshots or short explanations so the project lead could review it quickly. Once approved, the changes were merged, and we moved on to the next task. It felt closer to a real production pipeline than most student projects.",
    impact:
      "Built a modern responsive site for a student run finance club using Next.js, TypeScript, and Tailwind, and collaborated with a team of 13 developers while improving UI motion with Framer Motion.",
    stack:
      "Next.js, React, TypeScript, Tailwind CSS, Framer Motion",
    links: [{ label: "ACM UCR", href: "https://acm.cs.ucr.edu/" }],
  },
];

function ExperienceCard({ exp }: { exp: Experience }) {
  return (
    <article className="grid gap-6 rounded-2xl border border-border/60 bg-card p-6 shadow-sm md:grid-cols-[2fr_3fr]">
      <div className="relative self-center overflow-hidden rounded-xl border border-border/60 bg-muted">
        {exp.image ? (
          <div className="relative w-full">
            <Image
              src={exp.image.src}
              alt={exp.image.alt}
              width={1200}
              height={1200}
              sizes="(max-width: 768px) 100vw, 40vw"
              className="w-full h-[40vh] object-contain object-center"
              priority={false}
            />
          </div>
        ) : (
          <div
            className={`flex h-[40vh] w-full items-center justify-center bg-gradient-to-br ${
              exp.imageGradient ?? "from-rose-400/30 to-fuchsia-600/30"
            } p-6`}
          >
            <span className="text-center text-lg font-semibold text-white/90">
              {exp.org}
            </span>
          </div>
        )}
      </div>

      <div className="min-w-0">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <h2 className="text-balance text-xl font-semibold leading-snug">{exp.title}</h2>
            <p className="mt-1 text-sm text-foreground/70">
              <span className="font-medium text-foreground">{exp.org}</span>
              <span className="mx-2 text-foreground/40">·</span>
              <span className="text-foreground/60">{exp.location}</span>
            </p>
          </div>
          <p className="shrink-0 whitespace-nowrap text-sm text-foreground/60">{exp.dates}</p>
        </div>

        <p className="mt-4 text-base text-foreground">{exp.oneLiner}</p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border/60 bg-background/40 p-4">
            <p className="text-sm font-medium">What it felt like</p>
            <p className="mt-2 text-sm text-foreground/70">{exp.story}</p>
          </div>

          <div className="rounded-xl border border-border/60 bg-background/40 p-4">
            <p className="text-sm font-medium">What I delivered</p>
            <p className="mt-2 text-sm text-foreground/70">{exp.impact}</p>

            <p className="mt-4 text-sm font-medium">Tools and skills</p>
            <p className="mt-2 text-sm text-foreground/70">{exp.stack}</p>
          </div>
        </div>

        {exp.links?.length ? (
          <div className="mt-4 flex flex-wrap gap-3">
            {exp.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border/60 px-3 py-1 text-sm text-white underline hover:bg-muted"
              >
                {l.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function Page() {
  return (
    <main className="container-max py-16">
      <header className="max-w-2xl justify-center">
        <h1 className="text-3xl m-5 font-semibold">Experience</h1>
        <p className="m-5 text-foreground/70 ">
          A more personal look at the roles that shaped how I build, lead, and
          learn.
        </p>
      </header>

      <section className="mt-10">
        <ol className="relative ml-3 border-l border-white/10">
          {experiences.map((exp) => (
            <li key={`${exp.title}-${exp.org}`} className="ml-6 pb-12 last:pb-0">
              <span className="absolute -left-[6.5px] mt-2 h-3 w-3 rounded-full bg-gradient-to-r from-rose-400 to-fuchsia-600" />

              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                <h2 className="text-xl font-semibold">{exp.title}</h2>
                <span className="shrink-0 text-sm text-white/60">{exp.dates}</span>
              </div>
              <p className="mt-1 text-sm text-white/70">
                <span className="font-medium text-white/90">{exp.org}</span>
                <span className="mx-2 text-white/40">·</span>{exp.location}
              </p>

              {/* the substance recruiters scan */}
              <p className="mt-3 text-sm text-white/80">{exp.impact}</p>

              {/* the personal voice, kept but quiet */}
              <p className="mt-2 text-sm italic text-white/50">{exp.story}</p>

              {/* skills as their own tag row, not a nested box */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {exp.stack.split(",").map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs">{s.trim()}</Badge>
                ))}
              </div>

              {exp.links?.length ? (
                <div className="mt-3 flex flex-wrap gap-3">{/* your existing link pills */}</div>
              ) : null}
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}