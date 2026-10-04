import Link from "next/link";
import { projects, type Project } from "@/data/projects";
import { DotSwap, SectionHeader } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { ProjectPlate } from "./ProjectPlate";

export const projectIndex = (position: number) => String(position + 1).padStart(2, "0");

export function ProjectFacts({ project }: { project: Project }) {
  const facts = [
    ["Problem", project.problem],
    ["Approach", project.approach],
    ["Built", project.built],
  ];
  return (
    <dl className="border-t border-line">
      {facts.map(([key, value]) => (
        <div key={key} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[6.5rem_1fr]">
          <dt className="label pt-1 text-dim">{key}</dt>
          <dd className="leading-relaxed text-muted">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <ul aria-label="Technologies" className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag} className="label border border-line px-2.5 py-1.5 text-muted">
          {tag}
        </li>
      ))}
    </ul>
  );
}

const textLinkClass =
  "group label inline-flex items-center gap-3 border-b pb-2 transition-colors hover:border-accent hover:text-accent";

function ProjectPanel({ project, position }: { project: Project; position: number }) {
  const index = projectIndex(position);
  const flipped = position % 2 === 1;
  const href = `/projects/${project.slug}`;

  return (
    <article
      aria-labelledby={`project-${project.slug}`}
      className="grid grid-cols-1 items-start gap-x-12 gap-y-10 border-t border-line py-14 lg:grid-cols-12 lg:py-28"
    >
      <div className={`lg:sticky lg:top-28 lg:col-span-7 ${flipped ? "lg:order-2" : ""}`}>
        {/* Decorative duplicate of the case-study link below; kept out of the tab order. */}
        <Link href={href} data-cursor="View" tabIndex={-1} aria-hidden className="block">
          <ProjectPlate project={project} index={index} />
        </Link>
      </div>

      <div className={`lg:col-span-5 ${flipped ? "lg:order-1" : ""}`}>
        <Reveal>
          <p className="label flex items-center gap-3 text-muted">
            <span className="font-dot text-base font-black leading-none text-accent">{index}</span>
            {project.kind}
          </p>
          <h3
            id={`project-${project.slug}`}
            className="mt-5 text-4xl font-light leading-none tracking-tight sm:text-5xl lg:text-6xl"
          >
            {project.title}
          </h3>
          <p className="mt-6 text-lg leading-relaxed text-fg/80">{project.summary}</p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <ProjectFacts project={project} />
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-7">
            <ProjectTags tags={project.tags} />
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href={href} className={`${textLinkClass} border-fg/40`}>
              <DotSwap>Case study</DotSwap>
              <span aria-hidden>→</span>
              <span className="sr-only"> — {project.title}</span>
            </Link>
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className={`${textLinkClass} border-transparent text-muted`}
            >
              <DotSwap>Repository</DotSwap>
              <span aria-hidden>↗</span>
              <span className="sr-only"> — {project.title} on GitHub</span>
            </a>
          </div>
        </Reveal>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="work" aria-labelledby="work-title" className="shell py-20 lg:py-28">
      <SectionHeader
        id="work-title"
        index="02"
        label="Selected work"
        title={["Six builds,", "read straight from the repos."]}
      />
      <div>
        {projects.map((project, i) => (
          <ProjectPanel key={project.slug} project={project} position={i} />
        ))}
      </div>
    </section>
  );
}
