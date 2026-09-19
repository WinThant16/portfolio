import type { Project } from "./types";

export const projects: Project[] = [
	{
		id: "dota-draft-winprob",
		title: "Dota 2 Draft Win-Probability Model",

		dates: {
		start: "2026-06",
		end: null,
		},

		status: "in-progress",
		category: "AI/ML",

		summary:
		"Machine-learning pipeline predicting match outcomes from hero drafts using 150K+ high-ranked Dota 2 matches.",

		highlights: [
		"Collected and validated 150K+ Divine-ranked matches from the OpenDota API using cursor-based ingestion and resumable collection.",
		"Used a temporal train/test split to reduce leakage from changes in the game meta.",
		"Logistic regression reached 55.7% test accuracy against a 53.7% majority baseline.",
		"Tuned XGBoost reached 56.0%, suggesting that richer hero synergy and counter features are a more promising next step than additional model complexity alone.",
		],

		technologies: [
		"Python",
		"pandas",
		"scikit-learn",
		"XGBoost",
		"OpenDota API",
		],

		links: [
		{
			type: "github",
			url: "https://github.com/WinThant16/d2shenanigans",
		},
		],

		portfolio: {
		image: "/hero_coefficients.png",
		imageGradient: "from-red-600 to-rose-900",
		imageMode: "contain",
		size: "feature",
		featured: true,
		},
	},

	{
		id: "adversarial-game-agent",
		title: "Adversarial Game Agent (Heirs)",

		dates: {
		start: "2026-01",
		end: "2026-05",
		},

		status: "completed",
		category: "Algorithms",

		summary:
		"Search agent for a 12x12 strategic board game with 8 piece types: principal variation search with iterative deepening, Zobrist-hashed transposition tables, killer/history heuristics, and late move reduction. Placed 19th of 201 (top 10%) in a course tournament.",

		highlights: [
		"Implemented Principal Variation Search with alpha-beta pruning and iterative deepening.",
		"Used aspiration windows around the previous iteration's score to improve pruning efficiency.",
		"Implemented Zobrist-hashed transposition tables, killer/history move ordering, and late move reductions.",
		"Placed 19th of 201 agents in the tournament, finishing in the top 10%.",
		],

		technologies: [
		"C++",
		"Adversarial Search",
		"Game AI",
		],

		links: [
		{
			type: "github",
			url: "https://github.com/WinThant16/heirs-chess-variant-agent",
		},
		],

		portfolio: {
		image: null,
		imageGradient: "from-violet-600 to-indigo-900",
		featured: true,
		},
	},

	{
		id: "sandra-oo-optometry",
		title: "Dr. Khin Sandra Oo Optometry",

		dates: {
		start: "2026-04",
		end: "2026-06",
		},

		status: "completed",
		category: "Web",

		summary:
		"Production site for an independent optometry practice: services, doctor profiles, an eye-conditions library, FAQs, and a contact section with an embedded map and hours. Built in Next.js and deployed on Vercel.",

		highlights: [
		"Built responsive service pages, doctor profiles, eye-condition information, FAQs, contact information, and clinic hours.",
		"Developed the site using Next.js, TypeScript, and Tailwind CSS and deployed it on Vercel.",
		],

		technologies: [
		"Next.js",
		"TypeScript",
		"Tailwind CSS",
		"Vercel",
		],

		links: [
		{
			type: "live",
			url: "https://drsandraooeyecare.com/",
		},
		],

		portfolio: {
		image: "/optometrysite.png",
		imageGradient: "from-teal-500 to-emerald-800",
		},
	},

	{
		id: "poisson-surface-recon",
		title: "Poisson Surface Reconstruction",

		dates: {
		start: "2026-01",
		end: "2026-05",
		},

		status: "completed",
		category: "Graphics",

		summary:
		"Screened Poisson reconstruction from oriented point clouds on a voxel grid with an FFT solve, trilinear normal splatting, finite-difference divergence, and marching cubes. F-score 0.9999 on the Stanford bunny at depth 7, benchmarked against Alpha Shape and Ball Pivoting.",

		highlights: [
		"Implemented the team's Poisson reconstruction approach using trilinear normal splatting, finite-difference divergence, an FFT solve, and marching cubes.",
		"Achieved an F-score of 0.9999 on the Stanford bunny at depth 7.",
		"Compared the result with the team's Alpha Shape and Ball Pivoting implementations in a shared rendering and evaluation interface.",
		],

		technologies: [
		"Python",
		"NumPy",
		"SciPy",
		"Marching Cubes",
		],

		teamProject: true,
		contribution:
		"Personally implemented the Poisson reconstruction method; the team jointly built three reconstruction approaches and the final rendering/evaluation interface.",

		links: [
		{
			type: "github",
			url: "https://github.com/laddertosky/surface_reconstruction",
		},
		],

		portfolio: {
		image: "/surface-reconstruction.jpg",
		imageGradient: "from-sky-500 to-blue-800",
		},
	},

	{
		id: "wise-wish-metc",
		title: "Wise Wish Marine Engineering Training Centre",

		dates: {
		start: "2026-01",
		end: "2026-06",
		},

		status: "completed",
		category: "Web",

		summary:
		"Production marketing and enrollment site for a Myanmar marine training school. Course catalog, News section, and a live per-course intake calendar pulling from Google Sheets via OpenSheet. Built solo and deployed on Cloudflare Workers.",

		highlights: [
		"Built responsive English and Burmese interfaces using React, TypeScript, Vite, and Tailwind CSS.",
		"Implemented a Google Sheets-backed rolling intake calendar that can be updated by non-technical staff.",
		"Deployed the production site through Cloudflare Workers with automated builds and custom DNS.",
		],

		technologies: [
		"React",
		"TypeScript",
		"Vite",
		"Tailwind CSS",
		"Google Sheets",
		"Cloudflare Workers",
		],

		links: [
		{
			type: "live",
			url: "https://wisewishmetc.com",
		},
		],

		portfolio: {
		image: "/wisewishsite.png",
		imageGradient: "from-blue-600 to-cyan-800",
		featured: true,
		size: "feature",
		},
	},

	{
		id: "reddit-music-search",
		title: "Reddit Music Search Engine",

		dates: {
		start: "2025-04",
		end: "2025-06",
		},

		status: "completed",
		category: "Algorithms",

		summary:
		"PyLucene indexing and retrieval over post titles, bodies, and comments from music subreddits, reranking by Lucene relevance combined with post score and a time-decay recency factor. PRAW pipeline crawls the data into structured JSONL.",

		highlights: [
		"Built a PRAW collection pipeline that stores music subreddit posts and comment threads as structured JSONL.",
		"Indexed titles, post bodies, and comments with PyLucene.",
		"Reranked search results using Lucene relevance, Reddit post score, and a time-decay recency factor.",
		],

		technologies: [
		"Python",
		"PRAW",
		"PyLucene",
		"Information Retrieval",
		"JSONL",
		],

		links: [
		{
			type: "demo",
			url: "https://www.youtube.com/watch?v=8V_QhB1leak",
		},
		{
			type: "github",
			url: "https://github.com/WinThant16/reddit-music-search-engine",
		},
		],

		portfolio: {
		image: null,
		imageGradient: "from-orange-500 to-rose-700",
		},
	},

	{
		id: "container-ship-load-planner",
		title: "Container Ship Load Planner",

		dates: {
		start: "2024-09",
		end: "2024-12",
		},

		status: "completed",
		category: "Web",

		summary:
		"Full-stack port-logistics planner built with a team: generates step-by-step container load, unload, and ship-balancing sequences under movement-cost and legal-balance constraints, shown through a React grid interface. Backed by an Express REST API and server-side computation I built, with action logging and updated-manifest output.",

		highlights: [
		"Built a multi-step React workflow backed by an Express REST API.",
		"Designed REST endpoints for manifest ingestion, load/unload planning, and balance computation.",
		"Implemented server-side move generation, action logging, and updated-manifest output.",
		],

		technologies: [
		"React",
		"Node.js",
		"Express",
		"JavaScript",
		"REST API",
		"Search/Optimization",
		],

		teamProject: true,
		contribution:
		"Worked on the full-stack application and implemented the REST API and server-side planning workflow consumed by the React client.",

		links: [
		{
			type: "github",
			url: "https://github.com/WinThant16/KawrgoJumper",
		},
		],

		portfolio: {
		image: "/kawrgojumper.png",
		imageGradient: "from-amber-500 to-orange-800",
		imageMode: "contain",
		size: "feature",
		featured: true,
		},
	},

	{
		id: "genai-higher-ed",
		title: "Generative AI in Higher Education (Honors Capstone)",

		dates: {
		start: "2023-01",
		end: "2025-06",
		},

		status: "completed",
		category: "Research",

		summary:
		"Honors capstone studying decision making preferences and their association with student use of generative AI in higher education.",

		highlights: [
		"Designed and deployed a behavioral survey using Qualtrics.",
		"Analyzed survey data using Python and regression-based methods.",
		"Presented the research at the UCR Undergraduate Research Symposium and received the BCO Best Virtual Research Presentation Award.",
		"Published the honors capstone through UC eScholarship.",
		],

		technologies: [
		"Python",
		"pandas",
		"Matplotlib",
		"Qualtrics",
		"Regression Analysis",
		],

		links: [
		{
			type: "paper",
			url: "https://escholarship.org/uc/item/3qp27645",
		},
		],

		portfolio: {
		image: "/logo_eschol-small.svg",
		imageGradient: "from-rose-200 to-purple-950",
		imageMode: "logo",
		},
	},

	{
		id: "qac-website",
		title: "Quantitative Analysis Club Website",

		dates: {
		start: "2025-01",
		end: "2025-04",
		},

		status: "completed",
		category: "Web",

		summary:
		"Modern club site with dynamic event listings, team profiles, and mobile-first UI built in Next.js + TypeScript built collaboratively through ACM at UCR.",

		highlights: [
		"Developed frontend features using Next.js, React, TypeScript, and Tailwind CSS.",
		"Collaborated with a team of 13 developers using Git branches and pull requests.",
		"Added UI animation and interaction using Framer Motion.",
		],

		technologies: [
		"Next.js",
		"React",
		"TypeScript",
		"Tailwind CSS",
		"Framer Motion",
		],

		teamProject: true,

		links: [
		{
			type: "github",
			url: "https://github.com/acm-ucr/quant-website/tree/dev",
		},
		{
			type: "live",
			url: "https://quant.ucrhighlanders.org/",
		},
		],

		portfolio: {
		image: "/logoquant.webp",
		imageGradient: "from-cyan-500 to-purple-950",
		imageMode: "logo",
		logoSize: 64,
		},
	},

	{
		id: "flappy-dot",
		title: "Flappy Dot (Embedded Game)",

		dates: {
		start: "2024-08",
		end: "2024-12",
		},

		status: "completed",
		category: "Embedded",

		summary:
		"Arduino-based Flappy Bird-style game on Uno R3 with TFT LCD, buzzer effects, scoring/collision logic in C.",

		highlights: [
		"Implemented gameplay, collision detection, and scoring logic in C.",
		"Integrated an ST7735 TFT LCD and piezo buzzer for graphics and sound effects.",
		],

		technologies: [
		"C",
		"Arduino",
		"Embedded Systems",
		"ST7735 TFT",
		],

		links: [
		{
			type: "demo",
			url: "https://youtu.be/llS1ihetCOk",
		},
		],

		portfolio: {
		image: null,
		imageGradient: "from-emerald-500 to-teal-600",
		},
	},

	{
		id: "ucr-chatroom",
		title: "UCR Chatroom",

		dates: {
		start: "2024-04",
		end: "2024-06",
		},

		status: "completed",
		category: "Database Systems",

		summary:
		"Collaborative chatroom app built with classmates. Supports Google login, private rooms with access keys, nickname support, and persistent chatrooms stored via MongoDB. Users can message in public or private rooms after authentication.",

		highlights: [
		"Implemented Google authentication and persistent chatrooms.",
		"Supported public rooms, private rooms with access keys, and user nicknames.",
		],

		technologies: [
		"Node.js",
		"Express",
		"MongoDB",
		"Firebase Auth",
		],

		teamProject: true,

		links: [],

		portfolio: {
		image: null,
		imageGradient: "from-cyan-500 to-sky-600",
		},
	},

	{
		id: "crime-analysis",
		title: "Big Data Crime Analysis",

		dates: {
		start: "2024-04",
		end: "2024-06",
		},

		status: "completed",
		category: "Data",

		summary:
		"Data analysis project exploring U.S. crime datasets with preprocessing, feature engineering, and visualization. Includes models to identify trends and predictive insights, built with Python and data science libraries.",

		highlights: [
		"Standardized five city crime datasets in PySpark across millions of records.",
		"Assigned ZIP codes to 22M+ crime records in 1M-row batches using GeoPandas, Shapely, and U.S. Census ZCTA shapefiles.",
		"Joined ZIP-level crime frequency with demographic data to analyze offense-type and neighborhood-level trends.",
		],

		technologies: [
		"PySpark",
		"Python",
		"GeoPandas",
		"Shapely",
		"MySQL",
		],

		teamProject: true,

		links: [
		{
			type: "github",
			url: "https://github.com/nguyena537/CrimesDataAnalysis",
		},
		{
			type: "demo",
			url: "https://www.youtube.com/watch?v=GqUESbe_U3w",
		},
		],

		portfolio: {
		image: "/crdatanalysis.png",
		size: "feature",
		imageGradient: "from-indigo-500 to-blue-600",
		},
	},

	
];

export function getProject(id: string) {
  return projects.find((project) => project.id === id);
}