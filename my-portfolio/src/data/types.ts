export type DateRange = {
  // YYYY-MM
  start: string;
  end: string | null;
};

export type PortfolioLinkType =
  | "github"
  | "live"
  | "paper"
  | "demo"
  | "external";

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
  summary: string;
  highlights: string[];
  // More personal copy used on /experience.
  story?: string;
  technologies: string[];
  links?: PortfolioLink[];
  portfolio?: {
    image?: string;
    imageGradient?: string;
  };
};

export type ProjectStatus = "completed" | "in-progress";

export type ProjectCategory =
  | "Web"
  | "AI/ML"
  | "Algorithms"
  | "Graphics"
  | "Data"
  | "Embedded"
  | "Research"
  | "Database Systems";

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
    imageGradient?: string;
    imageMode?: "cover" | "contain" | "logo";
    logoSize?: number;
    size?: "feature";
    featured?: boolean;
  };
};

export type SkillLevel = "core" | "working";

export type SkillGroup =
  | "Languages"
  | "Web Stack"
  | "Databases"
  | "Infra & Deploy"
  | "Data & ML";

export type Skill = {
  name: string;
  group: SkillGroup;
  level: SkillLevel;
  icon?: string;
};