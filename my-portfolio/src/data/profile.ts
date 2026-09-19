import type { DateRange } from "./types";

export const profile = {
  name: "Win Thant Tin Han",
  preferredName: "Win",

  location: "Los Angeles, CA",
  email: "winthant1601@gmail.com",

  linkedin: "https://www.linkedin.com/in/win-thant-tin-han",
  github: "https://github.com/WinThant16",
  portfolio: "https://win-thant-portfolio.vercel.app",

  education: [
    {
      id: "usc-mscs",
      school: "University of Southern California",
      location: "Los Angeles, CA",
      degree: "M.S. Computer Science",
      dates: {
        start: "2025-08",
        end: "2027-05",
      } satisfies DateRange,
    },
    {
      id: "ucr-bscs",
      school: "University of California, Riverside",
      location: "Riverside, CA",
      degree: "B.S. Computer Science, Honors, Cum Laude",
      gpa: "3.89",
      dates: {
        start: "2021-09",
        end: "2025-06",
      } satisfies DateRange,
    },
  ],

  research: {
    capstoneTitle:
      "Decision-Making Traits and the Utilization of Generative AI in Higher Education",

    publicationDescription:
      "Honors capstone published through UC eScholarship",

    publicationUrl:
      "https://escholarship.org/uc/item/3qp27645",

    award:
      "Bourns College of Engineering Best Virtual Research Presentation Award",
  },
} as const;