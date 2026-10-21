import { site } from "@/data/site";
import { getContributions, getGithubData } from "@/lib/github";
import { ContributionGame } from "./ContributionGame";
import { ButtonLink, SectionHeader, StatusDot } from "./ui/primitives";
import { Reveal } from "./ui/Reveal";

const formatDate = (iso: string) => iso.slice(0, 10).replaceAll("-", ".");

export async function Github() {
  const [data, contributions] = await Promise.all([getGithubData(), getContributions()]);
  const stats = [
    { value: data.publicRepos, label: "Public repositories" },
    { value: data.followers, label: "Followers" },
    { value: data.since, label: "On GitHub since" },
  ];

  return (
    <section id="github" aria-labelledby="github-title" className="shell py-20 lg:py-28">
      <SectionHeader
        id="github-title"
        index="04"
        label="GitHub / Activity"
        title={["The work is public.", "Check it."]}
      />

      <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10">
            {stats.map((stat) => (
              <Reveal key={stat.label} className="flex flex-col-reverse gap-3">
                <dt className="label text-muted">{stat.label}</dt>
                <dd className="font-dot text-6xl font-black leading-none sm:text-7xl lg:text-8xl">
                  {stat.value}
                </dd>
              </Reveal>
            ))}
          </dl>
          <Reveal className="mt-12">
            <ButtonLink href={site.github} external>
              Open profile
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7">
          <div className="label flex items-center justify-between border-b border-line pb-4 text-muted">
            <h3>Recent pushes</h3>
            <span className="flex items-center gap-2">
              {data.live && <StatusDot />}
              {data.live ? "Live / GitHub API" : "Snapshot / 2026.10.04"}
            </span>
          </div>
          <ul>
            {data.recent.map((repo) => (
              <li key={repo.name} className="border-b border-line">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-5 transition-colors hover:bg-surface sm:grid-cols-[1fr_7rem_6.5rem] sm:px-3"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-lg tracking-tight transition-colors group-hover:text-accent">
                      {repo.name}
                    </span>
                    {repo.description && (
                      <span className="mt-1 block truncate text-sm text-muted">
                        {repo.description}
                      </span>
                    )}
                  </span>
                  <span className="label hidden text-muted sm:block">{repo.language ?? "—"}</span>
                  <time dateTime={repo.pushedAt} className="label text-right text-dim">
                    {formatDate(repo.pushedAt)}
                  </time>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {contributions && (
        <Reveal>
          <ContributionGame {...contributions} />
        </Reveal>
      )}
    </section>
  );
}
