export const site = {
  name: "Gandhar Marathe",
  shortName: "Gandhar",
  title: "Gandhar Marathe — Software Developer | AI/ML | Full Stack",
  description:
    "Gandhar Marathe is an Information Technology student and software developer building full-stack applications, machine-learning systems, and the infrastructure underneath them.",
  // Set NEXT_PUBLIC_SITE_URL once the site has a domain so Open Graph URLs resolve.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? null,
  location: "India",
  education: "Information Technology",
  focus: ["AI", "Full Stack", "Linux", "System Design"],
  githubUser: "GandharMarathe",
  github: "https://github.com/GandharMarathe",
  // Only verified links are published. Fill these in to show them in Contact.
  email: null as string | null,
  linkedin: null as string | null,
} as const;

export const navLinks = [
  { id: "about", label: "About", index: "01" },
  { id: "work", label: "Work", index: "02" },
  { id: "stack", label: "Stack", index: "03" },
  { id: "contact", label: "Contact", index: "05" },
] as const;

/** From the "Current" block of the GitHub profile README. No public repos yet. */
export const inProgress = [
  { name: "Advuman", note: "UK–India trade intelligence platform" },
  { name: "InNeed", note: "AI-assisted emergency response platform" },
  { name: "Kaalnirnay", note: "OCR → calendar automation" },
] as const;
