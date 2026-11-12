export type DateRange = {
	// YYYY-MM
	start: string;
	end: string | null;
};

export type PortfolioLinkType = "github" | "live" | "paper" | "demo" | "external";

export type PortfolioLink = {
	type: PortfolioLinkType;
	label?: string;
	url: string;
};

export type Experience = {
	id: string;
	title: string;
	organization: string;
	location: string;
	dates: DateRange;
	highlights: string[];
	// More personal copy used on /experience.
	story?: string;
	technologies: string[];
	links?: PortfolioLink[];
	portfolio?: {
		image?: string;
		imageAlt?: string;
		imageFit?: "cover" | "contain";
	};
};

export type ProjectStatus = "completed" | "in-progress";

export type ProjectCategory = "Web" | "AI & Data" | "Algorithms" | "Systems";

export type Project = {
	id: string;
	title: string;

	dates: DateRange;
	status: ProjectStatus;

	summary: string;
	highlights: string[];

	technologies: string[];
	category: ProjectCategory;

	teamProject?: boolean;
	contribution?: string;

	links?: PortfolioLink[];

	portfolio?: {
		image?: string | null;
		imageMode?: "cover" | "contain" | "logo";
		logoSize?: number;
		featured?: boolean;
		spineTitle?: string; // short label for the bookshelf spine
	};
};

export type SkillGroup = "Languages" | "Web Stack" | "Databases" | "Infra & Deploy" | "Data & ML";

export type Skill = {
	name: string;
	group: SkillGroup;
	icon?: string;
};
