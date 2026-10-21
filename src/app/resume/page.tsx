import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PrintButton } from "@/components/PrintButton";
import { capabilities, projects } from "@/data/projects";
import { experience, inProgress, site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

const title = `Resume — ${site.name}`;
const description = `Resume of ${site.name}: projects, capabilities and current work.`;

export const metadata: Metadata = pageMetadata(title, description, "profile");

const PROFILE =
  "Information Technology student and software developer working across full-stack engineering, machine learning and the systems underneath. Learns by shipping: every project below is a public repository.";

// Only what the portfolio can back up. Contact rows appear once they are set in `site`.
const contact = [
  { label: "GitHub", value: `github.com/${site.githubUser}`, href: site.github as string },
  ...(site.email ? [{ label: "Email", value: site.email as string, href: `mailto:${site.email}` }] : []),
  ...(site.phone ? [{ label: "Phone", value: site.phone as string, href: `tel:${site.phone.replace(/\s/g, "")}` }] : []),
  ...(site.linkedin ? [{ label: "LinkedIn", value: "LinkedIn", href: site.linkedin as string }] : []),
  ...(site.url ? [{ label: "Web", value: site.url.replace(/^https?:\/\//, ""), href: site.url as string }] : []),
];

function Block({ heading, children }: { heading: string; children: React.ReactNode }) {
  const id = `resume-${heading.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <section
      aria-labelledby={id}
      className="grid grid-cols-1 gap-x-10 gap-y-4 border-t border-line py-8 sm:grid-cols-[9rem_1fr] print:py-5"
    >
      <h2 id={id} className="label pt-1 text-muted">
        {heading}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export default function ResumePage() {
  return (
    <>
      <Nav />
      <main id="top" className="shell max-w-[1000px] pb-24 pt-28 lg:pt-36 print:max-w-none print:p-0">
        <header className="flex flex-wrap items-end justify-between gap-8 pb-10 print:pb-6">
          <div>
            <p className="label text-muted">Resume</p>
            <h1 className="mt-4 font-dot text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-7xl print:text-5xl">
              {site.name}
            </h1>
            <p className="mt-5 text-xl font-light tracking-tight text-fg/85 sm:text-2xl print:text-lg">
              Software developer — Full stack / AI-ML / DevOps
            </p>
          </div>
          <PrintButton />
        </header>

        <Block heading="Contact">
          <ul className="space-y-2">
            {contact.map((item) => (
              <li key={item.label} className="flex gap-6">
                <span className="label w-20 shrink-0 pt-0.5 text-dim">{item.label}</span>
                <a href={item.href} className="label break-all transition-colors hover:text-accent">
                  {item.value}
                </a>
              </li>
            ))}
            <li className="flex gap-6">
              <span className="label w-20 shrink-0 pt-0.5 text-dim">Location</span>
              <span className="label">{site.location}</span>
            </li>
          </ul>
        </Block>

        <Block heading="Profile">
          <p className="max-w-2xl leading-relaxed text-fg/85">{PROFILE}</p>
        </Block>

        <Block heading="Education">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <p className="text-lg tracking-tight">{site.institution}</p>
            <span className="label text-dim">{site.studyYears}</span>
          </div>
          <p className="label mt-2 text-muted">{site.degree} — Thane, Maharashtra</p>
        </Block>

        <Block heading="Experience">
          <ul className="space-y-7 print:space-y-4">
            {experience.map((job) => (
              <li key={job.org} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-lg tracking-tight">
                    {job.org}
                    <span className="text-muted"> — {job.role}</span>
                  </h3>
                  <span className="label text-dim">{job.period}</span>
                </div>
                <p className="label mt-2 text-muted">{job.place}</p>
                <ul className="mt-3 max-w-2xl list-disc space-y-1.5 pl-5 leading-relaxed text-muted marker:text-dim">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Block>

        <Block heading="Projects">
          <ul className="space-y-7 print:space-y-4">
            {projects.map((project) => (
              <li key={project.slug} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-lg tracking-tight">
                    {project.title}
                    <span className="text-muted"> — {project.kind}</span>
                  </h3>
                  <span className="label text-dim">{project.lastPush}</span>
                </div>
                <p className="mt-2 max-w-2xl leading-relaxed text-muted">{project.built}</p>
                <p className="label mt-3 text-fg/80">{project.tags.join(" / ")}</p>
                <a
                  href={project.url}
                  className="label mt-2 inline-block break-all text-dim transition-colors hover:text-accent"
                >
                  {project.url.replace("https://", "")}
                </a>
              </li>
            ))}
          </ul>
        </Block>

        <Block heading="Capabilities">
          <dl className="space-y-4 print:space-y-2.5">
            {capabilities.map((cap) => (
              <div key={cap.title} className="break-inside-avoid">
                <dt className="tracking-tight">{cap.title}</dt>
                <dd className="label mt-1.5 text-muted">{cap.tech.join(" / ")}</dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block heading="In progress">
          <ul className="space-y-3">
            {inProgress.map((item) => (
              <li key={item.name}>
                <span className="tracking-tight">{item.name}</span>
                <span className="text-muted"> — {item.note}</span>
              </li>
            ))}
          </ul>
        </Block>
      </main>
      <Footer />
    </>
  );
}
