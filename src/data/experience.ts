import type { Experience } from "./types";

export const experiences: Experience[] = [
	{
		id: "usc-annenberg-media",

		title: "Web Production Editor",

		organization: "USC Annenberg Media",
		location: "Los Angeles, CA",

		dates: {
			start: "2026-08",
			end: null,
		},

		highlights: [
			"Built and shipped a custom triple-column React layout on Arc XP Fusion for the redesigned Annenberg Media homepage, integrating structured content feeds and responsive styling.",
			"Redesigned the responsive navigation system and integrated Queryly-powered search to improve content discovery across desktop and mobile.",
			"Co-lead Fall 2026 web production, collaborating with designers and project managers to translate requirements into production-ready components and webpages across multiple feature cycles.",
		],

		story: "Working inside a live newsroom means my code has to fit an existing editorial workflow, not the other way around. I spend as much time understanding what editors, designers, and project managers need as I do implementing the components themselves.",

		technologies: ["React", "TypeScript", "Arc XP Fusion", "Queryly"],

		portfolio: {
			image: "/uscannenberg.jpg",
			imageAlt: "USC Annenberg logo",
			imageFit: "contain",
		},
	},

	{
		id: "wise-wish-metc",

		title: "Web Developer",

		organization: "Wise Wish Marine Engineering Training Centre",
		location: "Remote",

		dates: {
			start: "2026-01",
			end: null,
		},

		highlights: [
			"Built and shipped wisewishmetc.com in React, TypeScript, Vite, and Tailwind CSS with responsive English and Burmese layouts.",
			"Integrated a Google Sheets-backed rolling 12-month intake calendar so non-technical staff can update course availability without code changes or redeployment.",
			"Deployed and maintain the site on Cloudflare Workers with automated builds on merge, production releases, custom domain configuration, and DNS.",
		],

		story: "This was my first end-to-end professional client site. I worked directly from the school's requirements, translated them into a site structure and interface, and built a system that staff could continue updating without needing a developer for every schedule change.",

		technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Google Sheets", "Cloudflare Workers"],

		links: [
			{
				type: "live",
				label: "wisewishmetc.com",
				url: "https://wisewishmetc.com",
			},
		],

		portfolio: {
			image: "/wisewish.webp",
			imageAlt: "Wise Wish logo",
			imageFit: "contain",
		},
	},

	{
		id: "sandra-oo-clinic",

		title: "Web Developer / IT Support (Part-Time)",

		organization: "Dr. Khin Sandra Oo, Inc. & Associates",
		location: "Yorba Linda, CA",

		dates: {
			start: "2024-12",
			end: null,
		},

		highlights: [
			"Develop and maintain the clinic's informational website using Next.js, TypeScript, and Tailwind CSS, building responsive service and FAQ components across desktop and mobile.",
			"Maintain front-desk workstations, staff accounts, software updates, and routine device backups.",
		],

		story: "The role moves between software development and practical IT support. Some days I am working on the clinic website; other days I am troubleshooting a workstation or connectivity issue before it affects staff. It has taught me to favor solutions that are understandable and reliable for non-technical users.",

		technologies: ["Next.js", "TypeScript", "Tailwind CSS", "IT Support"],

		links: [
			{
				type: "live",
				label: "Clinic Website",
				url: "https://drsandraooeyecare.com/",
			},
		],

		portfolio: {},
	},

	{
		id: "bedlab",

		title: "Undergraduate Research Associate",

		organization: "Behavioral Economics & Decision-Making Lab, University of California, Riverside",
		location: "Riverside, CA",

		dates: {
			start: "2023-01",
			end: "2025-06",
		},

		highlights: [
			"Conducted independent honors research on generative AI adoption in higher education under Professor Ye Li.",
			"Presented research progress and findings to faculty and graduate researchers.",
			"Presented at the UCR Undergraduate Research Symposium and received the BCOE Best Virtual Research Presentation Award.",
		],

		story: "Research taught me to slow down and question assumptions. A large part of the work was refining definitions, checking whether measurements actually captured what I thought they did, and rerunning analysis until the conclusions were defensible.",

		technologies: ["Python", "pandas", "Matplotlib", "Qualtrics", "Regression Analysis", "Survey Design"],

		links: [
			{
				type: "external",
				label: "BEDLab",
				url: "https://sites.google.com/ucr.edu/bedlab",
			},
			{
				type: "paper",
				label: "UC eScholarship",
				url: "https://escholarship.org/uc/item/3qp27645",
			},
		],

		portfolio: {
			image: "/researchaward.jpg",
			imageAlt:
				"Accepting the BCOE Best Virtual Research Presentation Award in front of the research poster",
		},
	},

	{
		id: "ewb-ucr",

		title: "Vice President",

		organization: "Engineers Without Borders at UCR",
		location: "Riverside, CA",

		dates: {
			start: "2023-09",
			end: "2025-06",
		},

		highlights: [
			"Led more than 20 engineers on a multi-quarter fertilizer deposition robot project from concept through prototype.",
			"Supported chapter fundraising and helped secure more than $500 through the 2024 BCOE Match Challenge.",
		],

		story: "EWB taught me how to balance taking responsibility with delegating work. Keeping a long-running student engineering project moving meant listening to the team, assigning work clearly, and adapting when plans changed.",

		technologies: ["Leadership", "Project Planning", "Prototyping", "Cross-Team Communication"],

		links: [
			{
				type: "external",
				label: "Engineers Without Borders",
				url: "https://ewb-usa.org/",
			},
		],

		portfolio: {
			image: "/ewb_highlanderday.jpg",
			imageAlt: "Engineers Without Borders at UCR members at their tabling booth outdoors",
		},
	},

	{
		id: "bearhack",

		title: "Operations Lead",

		organization: "BearHack",
		location: "Riverside, CA",

		dates: {
			start: "2025-01",
			end: "2025-04",
		},

		highlights: [
			"Managed grants, budget, and prize distribution for a two-day engineering make-a-thon.",
			"Coordinated workshops, judging, and event logistics for more than 100 participants.",
		],

		story: "BearHack taught me that even detailed plans change once an event is live. I learned to make decisions with incomplete information, communicate them clearly, and keep the event moving instead of getting stuck trying to find a perfect solution.",

		technologies: ["Operations", "Budgeting", "Event Logistics", "Planning"],

		links: [
			{
				type: "external",
				label: "BearHack",
				url: "https://www.instagram.com/bearhackucr/",
			},
		],

		portfolio: {
			image: "/bearhack.jpg",
			imageAlt: "BearHack operations team announcement graphic",
		},
	},

	{
		id: "acm-ucr",

		title: "Frontend Developer",

		organization: "ACM at UCR",
		location: "Riverside, CA",

		dates: {
			start: "2025-01",
			end: "2025-03",
		},

		highlights: [
			"Developed responsive UI features using Next.js, React, TypeScript, and Tailwind CSS.",
			"Collaborated with a team of 13 developers through branch-based development, pull requests, and code review.",
			"Implemented UI motion and interaction using Framer Motion.",
		],

		story: "The project gave me experience with a structured collaborative development workflow: working independently on assigned features, testing locally, opening pull requests with context and screenshots, and iterating on review feedback.",

		technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],

		links: [
			{
				type: "external",
				label: "ACM UCR",
				url: "https://acm.cs.ucr.edu/",
			},
		],

		portfolio: {
			image: "/acm.webp",
			imageAlt: "ACM at UCR developers working together at laptops in a meeting room",
		},
	},
];

export function getExperience(id: string) {
	return experiences.find((experience) => experience.id === id);
}
