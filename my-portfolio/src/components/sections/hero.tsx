import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { LocalTime } from "@/components/LocalTime";

const socials = [
	{ label: "GitHub", href: profile.github, icon: Github },
	{ label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
	{ label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

const delay = (s: number) => ({ "--delay": `${s}s` }) as React.CSSProperties;

export function HeroSection() {
	return (
		<section className="wrap pb-16 pt-12 md:pb-20 md:pt-20">
			<div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
				<div className="lg:col-span-7">
					<h1 className="heading-1 rise" style={delay(0.05)}>
						Hi, I&apos;m Win.
						<br />
						Software Engineer.
					</h1>

					<div
						className="rise mt-7 max-w-[34rem] space-y-3 text-lg leading-relaxed text-dim"
						style={delay(0.13)}
					>
						<p>I build web applications, full-stack systems, and applied AI/ML projects.</p>
						<p>M.S. in Computer Science at USC, B.S. Honors in Computer Science from UCR.</p>
					</div>

					<div className="rise mt-9 flex flex-wrap items-center gap-3" style={delay(0.21)}>
						<Link href="/resume" className="btn btn-primary">
							View Resume
						</Link>
						<Link href="/contact" className="btn btn-line">
							Get in Touch
						</Link>
					</div>

					<ul className="rise mt-8 flex items-center gap-5" style={delay(0.29)}>
						{socials.map(({ label, href, icon: Icon }) => (
							<li key={label}>
								<a
									href={href}
									{...(href.startsWith("http")
										? { target: "_blank", rel: "noopener noreferrer" }
										: {})}
									className="inline-flex items-center gap-2 text-[0.9375rem] text-dim transition-colors hover:text-ink"
								>
									<Icon className="size-4" aria-hidden />
									{label}
								</a>
							</li>
						))}
					</ul>
				</div>

				<figure className="rise lg:col-span-5" style={delay(0.25)}>
					<div
            role="img"                                                                       // ← moved here
            aria-label="Pixel-art animation of someone coding at a desk late at night"      // ← moved here
            className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-panel ring-1 ring-line"
          >
            <video
              src="/pixel-room.mp4"
              poster="/pixel-room-poster.webp"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden                                                                  // ← was role + aria-label
              className="absolute inset-0 size-full object-cover object-[55%_50%]"
            />
          </div>
					<figcaption className="mt-3 flex items-center justify-between text-sm text-faint">
						<span>{profile.location}</span>
						<LocalTime />
					</figcaption>
				</figure>
			</div>
		</section>
	);
}
