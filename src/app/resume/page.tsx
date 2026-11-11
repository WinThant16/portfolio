import Link from "next/link";
import type { Metadata } from "next";
import { FileText, Github, Linkedin, Mail, MapPin } from "lucide-react";

import { profile } from "@/data/profile";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { formatDateRange } from "@/lib/date";

export const metadata: Metadata = {
	title: "Resume",
	description:
		"Resume of Win Thant Tin Han, M.S. Computer Science student at USC with experience in software engineering, full-stack development, AI/ML, and research.",
};

/* --------------------------- Professional summary ----------------------- */
const summary = `M.S. Computer Science student at USC and CS Honors graduate (Cum Laude) from UC Riverside, with experience across full-stack software engineering, applied AI/ML, algorithms, and data systems. I build production web applications, from newsroom publishing tooling on Arc XP Fusion to a bilingual maritime training-school site, alongside machine-learning and systems projects. My undergraduate honors capstone on generative AI adoption in education is published through UC eScholarship. I'm seeking software engineering and AI/ML opportunities.`;
const resumeTitle = "M.S. Computer Science Student @ USC";

const resumeExperienceIds = ["usc-annenberg-media", "wise-wish-metc", "sandra-oo-clinic", "bedlab"];
const resumeLeadershipIds = ["ewb-ucr", "bearhack"];
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

const resumeExperience = experiences.filter((exp) => resumeExperienceIds.includes(exp.id));
const resumeLeadership = experiences.filter((exp) => resumeLeadershipIds.includes(exp.id));
const resumeProjects = projects.filter((project) => resumeProjectIds.includes(project.id));

const groupedSkills = skills.reduce<Record<string, string[]>>((groups, skill) => {
	(groups[skill.group] ??= []).push(skill.name);
	return groups;
}, {});

/* ------------------------------ Building blocks ------------------------- */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<section className="grid gap-5 border-t border-line py-10 md:grid-cols-[11rem_1fr] md:gap-10">
			<h2 className="font-display text-xl text-ink">{title}</h2>
			<div className="min-w-0 space-y-8">{children}</div>
		</section>
	);
}

function Entry({
	title,
	subtitle,
	dates,
	bullets,
}: {
	title: React.ReactNode;
	subtitle?: string;
	dates: string;
	bullets?: readonly string[];
}) {
	return (
		<div>
			<div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
				<h3 className="font-medium text-ink">{title}</h3>
				<p className="shrink-0 text-sm tabular-nums text-dim">{dates}</p>
			</div>
			{subtitle && <p className="text-[0.9375rem] text-dim">{subtitle}</p>}
			{bullets?.length ? (
				<ul className="mt-3 space-y-2 text-[0.9375rem] leading-relaxed text-ink/85">
					{bullets.map((b) => (
						<li key={b} className="relative pl-5">
							<span aria-hidden className="absolute left-0 top-[0.72em] h-px w-2.5 bg-faint" />
							{b}
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
}

/* ----------------------------- Component -------------------------------- */
export default function ResumePage() {
	return (
		<main className="wrap pt-12 md:pt-20">
			<div className="mx-auto max-w-4xl">
				{/* ---------- Header ---------- */}
				<header className="pb-10">
					<h1 className="heading-1">{profile.name}</h1>
					<p className="mt-3 text-lg text-dim">{resumeTitle}</p>

					<ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem] text-dim">
						<li>
							<a
								href={`mailto:${profile.email}`}
								className="inline-flex items-center gap-2 hover:text-ink"
							>
								<Mail className="size-4" aria-hidden />
								{profile.email}
							</a>
						</li>
						<li className="inline-flex items-center gap-2">
							<MapPin className="size-4" aria-hidden />
							{profile.location}
						</li>
						<li>
							<a
								href={profile.linkedin}
								target="_blank"
								rel="noreferrer"
								className="inline-flex items-center gap-2 hover:text-ink"
							>
								<Linkedin className="size-4" aria-hidden />
								linkedin.com/in/win-thant-tin-han
							</a>
						</li>
						<li>
							<a
								href={profile.github}
								target="_blank"
								rel="noreferrer"
								className="inline-flex items-center gap-2 hover:text-ink"
							>
								<Github className="size-4" aria-hidden />
								github.com/WinThant16
							</a>
						</li>
					</ul>

					<Link href="/win_resume2026.pdf" target="_blank" className="btn btn-primary mt-8">
						<FileText className="size-4" aria-hidden />
						View PDF Resume
					</Link>
				</header>

				<Section title="Professional Summary">
					<p className="leading-relaxed text-ink/85">{summary}</p>
				</Section>

				<Section title="Education">
					{profile.education.map((edu) => (
						<Entry
							key={edu.id}
							title={edu.degree}
							subtitle={`${edu.school}, ${edu.location}`}
							dates={formatDateRange(edu.dates)}
							bullets={
								edu.id === "ucr-bscs"
									? [`GPA: ${edu.gpa}`, profile.research.award]
									: undefined
							}
						/>
					))}
				</Section>

				<Section title="Experience">
					{resumeExperience.map((job) => (
						<Entry
							key={job.id}
							title={job.title}
							subtitle={`${job.organization}, ${job.location}`}
							dates={formatDateRange(job.dates)}
							bullets={job.highlights}
						/>
					))}
				</Section>

				<Section title="Projects">
					{resumeProjects.map((proj) => (
						<Entry
							key={proj.id}
							title={proj.title}
							subtitle={proj.technologies.join(", ")}
							dates={formatDateRange(proj.dates)}
							bullets={proj.highlights}
						/>
					))}
				</Section>

				<Section title="Leadership">
					{resumeLeadership.map((role) => (
						<Entry
							key={role.id}
							title={role.title}
							subtitle={`${role.organization}, ${role.location}`}
							dates={formatDateRange(role.dates)}
							bullets={role.highlights}
						/>
					))}
				</Section>

				<Section title="Technical Skills">
					<dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
						{Object.entries(groupedSkills).map(([cat, list]) => (
							<div key={cat}>
								<dt className="font-medium text-ink">{cat}</dt>
								<dd className="mt-1 text-[0.9375rem] text-dim">{list.join(", ")}</dd>
							</div>
						))}
					</dl>
				</Section>

				{/* ---------- Footer ---------- */}
				<footer className="flex flex-col gap-5 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
					<p className="text-dim">References available upon request.</p>
					<div className="flex flex-wrap gap-3">
						<Link href="/projects" className="btn btn-line btn-sm">
							View Projects
						</Link>
						<Link href="/contact" className="btn btn-line btn-sm">
							Contact Me
						</Link>
					</div>
				</footer>
			</div>
		</main>
	);
}
