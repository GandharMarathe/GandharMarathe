export const site = {
  name: "Gandhar Marathe",
  shortName: "Gandhar",
  title: "Gandhar Marathe — Software Developer | AI/ML | Full Stack",
  description:
    "Gandhar Marathe is an Information Technology student and software developer building full-stack applications, machine-learning systems, and the infrastructure underneath them.",
  // Set NEXT_PUBLIC_SITE_URL once the site has a domain so Open Graph URLs resolve.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? null,
  location: "Thane, India",
  education: "Information Technology",
  institution: "AP Shah Institute of Technology",
  degree: "B.E. Information Technology",
  studyYears: "2024 – 2028",
  focus: ["AI", "Full Stack", "Linux", "System Design"],
  githubUser: "GandharMarathe",
  github: "https://github.com/GandharMarathe",
  // Only verified links are published (from the resume).
  email: "gandharmarathe09@gmail.com" as string | null,
  phone: "+91 7391903470" as string | null,
  linkedin: "https://www.linkedin.com/in/gandhar-marathe-5b403b333" as string | null,
} as const;

/** From the resume. */
export const experience = [
  {
    role: "Software Engineering Intern",
    org: "Advuman",
    place: "London (Remote), UK",
    period: "Jan 2026 – Jun 2026",
    points: [
      "Built and maintained the frontend of Advuman’s web platform.",
      "Improved SEO through metadata, site structure and on-page optimisation.",
      "Supported AI/ML development with data preparation and feature integration.",
      "Worked with cross-functional teams through Git-based version control and code review.",
    ],
  },
] as const;

export const navLinks = [
  { id: "about", label: "About", index: "01" },
  { id: "work", label: "Work", index: "02" },
  { id: "stack", label: "Stack", index: "03" },
  { id: "contact", label: "Contact", index: "05" },
] as const;

/** From the "Current" block of the GitHub profile README. No public repos yet. */
export const inProgress = [
  { name: "InNeed", note: "AI-assisted emergency response platform" },
  { name: "Kaalnirnay", note: "OCR → calendar automation" },
] as const;
