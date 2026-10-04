import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { ProjectPlate } from "@/components/projects/ProjectPlate";
import { ProjectFacts, ProjectTags, projectIndex } from "@/components/projects/Projects";
import { ButtonLink } from "@/components/ui/primitives";
import { MaskReveal, Reveal } from "@/components/ui/Reveal";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return pageMetadata(`${project.title} — ${site.name}`, project.summary);
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const position = projects.findIndex((p) => p.slug === slug);
  if (position === -1) notFound();

  const project = projects[position];
  const index = projectIndex(position);
  const nextPosition = (position + 1) % projects.length;
  const next = projects[nextPosition];

  const meta = [
    ["Type", project.kind],
    ["Repository", project.repo],
    ["Last push", project.lastPush],
  ];

  return (
    <>
      <Nav />
      <main id="top" className="shell pb-24 pt-28 lg:pt-36">
        <Reveal>
          <Link
            href="/#work"
            className="label inline-flex items-center gap-2 py-2 text-muted transition-colors hover:text-fg"
          >
            <span aria-hidden>←</span> All work
          </Link>
        </Reveal>

        <header className="mt-8 border-t border-line pt-5">
          <Reveal className="flex items-center gap-4">
            <span className="font-dot text-xl font-black leading-none text-accent">{index}</span>
            <span className="label text-muted">Case study</span>
            <span aria-hidden className="label ml-auto hidden text-dim sm:block">
              {index} / {projectIndex(projects.length - 1)}
            </span>
          </Reveal>
          <h1 className="mt-10 text-5xl font-light leading-none tracking-tight sm:text-7xl lg:text-8xl">
            <MaskReveal>{project.title}</MaskReveal>
          </h1>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-3xl text-xl font-light leading-snug text-fg/85 sm:text-2xl lg:text-3xl">
              {project.summary}
            </p>
          </Reveal>
        </header>

        <Reveal delay={0.15} className="mt-12">
          <dl className="grid grid-cols-1 gap-x-10 border-t border-line sm:grid-cols-3">
            {meta.map(([key, value]) => (
              <div key={key} className="min-w-0 border-b border-line py-4">
                <dt className="label text-dim">{key}</dt>
                <dd className="label mt-2 break-words text-fg">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-12">
          <ProjectPlate
            project={project}
            index={index}
            className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
          />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-14 lg:mt-24 lg:grid-cols-12">
          <section aria-labelledby="overview" className="lg:col-span-5">
            <Reveal>
              <h2 id="overview" className="label mb-5 text-muted">
                Overview
              </h2>
              <ProjectFacts project={project} />
              <div className="mt-8">
                <ProjectTags tags={project.tags} />
              </div>
              <div className="mt-10">
                <ButtonLink href={project.url} variant="primary" external>
                  View repository
                </ButtonLink>
              </div>
            </Reveal>
          </section>

          <div className="space-y-14 lg:col-span-6 lg:col-start-7">
            {project.sections.map((section, i) => (
              <Reveal key={section.heading}>
                <section aria-labelledby={`section-${i}`}>
                  <h2
                    id={`section-${i}`}
                    className="flex items-baseline gap-4 text-2xl font-light tracking-tight sm:text-3xl"
                  >
                    <span className="font-dot text-base font-black text-dim">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.heading}
                  </h2>
                  <ul className="mt-6 border-t border-line">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-4 border-b border-line py-4 leading-relaxed text-muted"
                      >
                        <span aria-hidden className="mt-[0.7em] size-1 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            ))}
          </div>
        </div>

        <nav aria-label="Next project" className="mt-24 border-t border-line lg:mt-36">
          <Link
            href={`/projects/${next.slug}`}
            data-cursor="Next"
            className="group flex flex-wrap items-end justify-between gap-6 py-10 lg:py-14"
          >
            <span>
              <span className="label flex items-center gap-3 text-muted">
                <span className="font-dot text-base font-black leading-none text-accent">
                  {projectIndex(nextPosition)}
                </span>
                Next project
              </span>
              <span className="mt-4 block text-4xl font-light leading-none tracking-tight transition-colors group-hover:text-accent sm:text-6xl lg:text-7xl">
                {next.title}
              </span>
            </span>
            <span
              aria-hidden
              className="text-4xl font-light transition-transform duration-500 ease-out-expo group-hover:translate-x-2 lg:text-6xl"
            >
              →
            </span>
          </Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}
