import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
	title: "About",
	description:
		"M.S. Computer Science student at USC building production software, full-stack systems, and applied AI/ML projects.",
};

export default function AboutPage() {
	return (
		<main className="wrap pt-12 md:pt-20">
			{/* Intro */}
			<section className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
				<div className="lg:col-span-7">
					<h1 className="heading-1">About</h1>
					<p className="mt-4 text-dim">Software | AI/ML | Research</p>

					<div className="mt-8 max-w-[38rem] space-y-6 text-lg leading-relaxed text-ink/90">
						<p>
							I&apos;m an M.S. Computer Science student at the University of Southern California
							and a Computer Science Honors graduate from the University of California,
							Riverside. I enjoy building software across the stack, from production web
							applications and backend systems to algorithms and applied AI/ML projects.
						</p>
						<p>
							My undergraduate honors capstone at UC Riverside studied how decision-making
							traits and other factors relate to students&apos; use of generative AI in higher
							education, and was{" "}
							<a
								href={profile.research.publicationUrl}
								target="_blank"
								rel="noreferrer"
								className="link"
							>
								published through UC eScholarship
							</a>
							. These days, I&apos;m a Web Production Editor at USC Annenberg Media, where I
							build and ship production components for a live newsroom publishing platform while
							co-leading web production for the Fall 2026 cycle.
						</p>
					</div>

					<div className="mt-10 flex flex-wrap gap-3">
						<Link href="/contact" className="btn btn-primary">
							Let&apos;s work together
						</Link>
						<Link href="/resume" className="btn btn-line">
							View Resume
						</Link>
					</div>
				</div>

				<div className="lg:col-span-5">
					<div className="relative aspect-square overflow-hidden rounded-2xl bg-panel ring-1 ring-line">
						<Image
							src="/avatar.JPEG"
							alt="Win Thant Tin Han"
							fill
							sizes="(min-width:1024px) 440px, 100vw"
							className="object-cover"
							priority
						/>
					</div>
				</div>
			</section>

			{/* Personal */}
			<section className="mt-24 grid gap-6 border-t border-line pt-14 md:grid-cols-[14rem_1fr] md:gap-12">
				<h2 className="heading-3">Other interests</h2>
				<div className="max-w-[38rem]">
					<p className="text-lg leading-relaxed text-ink/90">
						Outside of work, I follow soccer and the NBA and probably play too much Dota 2, which
						is where my current draft-prediction ML project came from. I also tend to build side
						projects no one asked for.
					</p>
					<a href={profile.github} target="_blank" rel="noreferrer" className="text-link mt-6">
						<Github className="size-4" aria-hidden /> GitHub
					</a>
				</div>
			</section>

			{/* CTA */}
			<section className="mt-16 grid gap-6 border-t border-line pt-14 md:grid-cols-[14rem_1fr] md:gap-12">
				<h2 className="heading-3">If you want to work together</h2>
				<div className="max-w-[38rem]">
					<p className="text-lg leading-relaxed text-ink/90">
						I&apos;m looking for software engineering opportunities and am also open to
						interesting AI/ML and research collaborations. If you think I&apos;d be a good fit,
						please reach out.
					</p>
					<div className="mt-8 flex flex-wrap gap-3">
						<Link href="/contact" className="btn btn-primary">
							Get in touch
						</Link>
						<Link href="/resume" className="btn btn-line">
							View resume
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}
