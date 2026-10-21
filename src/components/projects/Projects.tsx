import Link from "next/link";
import { projects, type Project } from "@/data/projects";
import { DotSwap, SectionHeader } from "../ui/primitives";
import { LevelSelect } from "./LevelSelect";
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

function ProjectPanel({ project, position }: { project: Project; position: number }) {
  const index = projectIndex(position);
  const href = `/projects/${project.slug}`;

  return (
    <article aria-labelledby={`project-${project.slug}`}>
      {/* Decorative duplicate of the case-study link below; kept out of the tab order. */}
      <Link href={href} data-cursor="View" tabIndex={-1} aria-hidden className="block">
        <ProjectPlate project={project} index={index} className="aspect-[16/9]" />
      </Link>

      <p className="label mt-10 flex items-center gap-3 text-muted">
        <span className="font-dot text-base font-black leading-none text-accent">{index}</span>
        {project.kind}
      </p>
      <h3
        id={`project-${project.slug}`}
        className="mt-5 text-4xl font-light leading-none tracking-tight sm:text-5xl lg:text-6xl"
      >
        {project.title}
      </h3>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-fg/80">{project.summary}</p>

      <div className="mt-10">
        <ProjectFacts project={project} />
      </div>
      <div className="mt-7">
        <ProjectTags tags={project.tags} />
      </div>
      <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Link
          href={href}
          className="group label inline-flex h-12 items-center gap-3 border border-accent bg-accent px-6 text-bg transition-colors hover:border-fg hover:bg-fg"
        >
          <span aria-hidden>▶</span>
          <DotSwap>Start</DotSwap>
          <span className="sr-only"> — {project.title} case study</span>
        </Link>
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="group label inline-flex items-center gap-3 border-b border-transparent pb-2 text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <DotSwap>Repository</DotSwap>
          <span aria-hidden>↗</span>
          <span className="sr-only"> — {project.title} on GitHub</span>
        </a>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="work" aria-labelledby="work-title" className="shell py-20 lg:py-28">
      <SectionHeader id="work-title" index="02" label="Level select" title={["Select a level."]} />
      <LevelSelect
        levels={projects.map((p, i) => ({ slug: p.slug, title: p.title, kind: p.kind, index: projectIndex(i) }))}
        panels={projects.map((p, i) => (
          <ProjectPanel key={p.slug} project={p} position={i} />
        ))}
      />
    </section>
  );
}
