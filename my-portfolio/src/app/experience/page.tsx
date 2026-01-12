import Image from "next/image";

type Experience = {
  title: string;
  org: string;
  location: string;
  dates: string;
  image: { src: string; alt: string };
  oneLiner: string;
  story: string;
  impact: string;
  stack: string;
  links?: { label: string; href: string }[];
};

const experiences: Experience[] = [
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
      "EWB was my first leadership role in college, and it taught me how to balance big picture vision with day-to-day execution. I learned to listen to team members, delegate effectively, and keep projects on track while adapting to challenges.",
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
      "This was slow, in a good way. I would come in thinking I had a clear question, only to realize after discussion that parts of it were underdefined or poorly measured. Most of the progress came from tightening definitions, questioning assumptions, and rerunning analysis until the results made sense and were defensible.",
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
      "This was mostly reacting in real time. Schedules slipped, rooms weren’t ready, speakers changed plans, and people kept coming to me for decisions that didn’t have a clean answer. I learned to make calls quickly with partial information, communicate the decision clearly, and move on instead of second-guessing. When something broke later, we adjusted and kept the event running.",
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
      "I liked how predictable the workflow was. Tasks were assigned on a weekly basis, and I worked on each feature independently on my own branch. Before opening a pull request, I’d make sure the feature ran locally and include screenshots or short explanations so the project lead could review it quickly. Once approved, the changes were merged, and we moved on to the next task. It felt closer to a real production pipeline than most student projects.",
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
        <div className="relative w-full">
          <Image
            src={exp.image.src}
            alt={exp.image.alt}
            width={1200}
            height={1200}
            sizes="(max-width: 768px) 100vw, 40vw"
            className="w-full h-[40vh]object-cover object-center"
            priority={false}
          />
        </div>
      </div>

      <div className="min-w-0">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <h2 className="truncate text-xl font-semibold">{exp.title}</h2>
            <p className="mt-1 text-sm text-foreground/70">
              <span className="font-medium text-foreground">{exp.org}</span>
              <span className="text-foreground/60">{"  "}</span>
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

      <section className="mt-10 grid gap-6">
        {experiences.map((exp) => (
          <ExperienceCard key={`${exp.title}-${exp.org}`} exp={exp} />
        ))}
      </section>
    </main>
  );
}
