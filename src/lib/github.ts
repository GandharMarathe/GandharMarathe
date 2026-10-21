import { site } from "@/data/site";

export type RepoActivity = {
  name: string;
  url: string;
  language: string | null;
  description: string | null;
  /** ISO timestamp of the last push. */
  pushedAt: string;
};

export type GithubData = {
  publicRepos: number;
  followers: number;
  since: number;
  recent: RepoActivity[];
  /** False when the API was unreachable and the snapshot below was used. */
  live: boolean;
};

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
export type Contributions = { total: number; days: ContributionDay[] };

const RECENT_COUNT = 6;

// Snapshot of the public GitHub API taken on 2026-10-04, used when the API is
// unreachable or rate-limited at build time.
const snapshot: GithubData = {
  publicRepos: 19,
  followers: 13,
  since: 2023,
  live: false,
  recent: [
    {
      name: "Project-KEYSTONE-Field-Service-Management-Platform",
      url: `${site.github}/Project-KEYSTONE-Field-Service-Management-Platform`,
      language: "TypeScript",
      description: "Full-stack field service management platform.",
      pushedAt: "2026-09-18T17:21:28Z",
    },
    {
      name: "aiml_final",
      url: `${site.github}/aiml_final`,
      language: "Python",
      description: null,
      pushedAt: "2026-09-07T05:37:43Z",
    },
    {
      name: "Java-training",
      url: `${site.github}/Java-training`,
      language: "Java",
      description: "repo for the project based learning / training conducted for the department",
      pushedAt: "2026-08-03T15:32:17Z",
    },
    {
      name: "devops",
      url: `${site.github}/devops`,
      language: null,
      description: "repo for devops lab",
      pushedAt: "2026-07-14T06:12:18Z",
    },
    {
      name: "OCR",
      url: `${site.github}/OCR`,
      language: null,
      description: "miniproject stuff (test)",
      pushedAt: "2026-03-18T15:03:16Z",
    },
    {
      name: "PythonPractice",
      url: `${site.github}/PythonPractice`,
      language: "Python",
      description: "random python project to brush up",
      pushedAt: "2025-11-24T14:37:04Z",
    },
  ],
};

type ApiUser = { public_repos: number; followers: number; created_at: string };
type ApiRepo = {
  name: string;
  html_url: string;
  language: string | null;
  description: string | null;
  pushed_at: string;
  fork: boolean;
};

async function api<T>(path: string): Promise<T> {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: { Accept: "application/vnd.github+json" },
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status} for ${path}`);
  return res.json() as Promise<T>;
}

/**
 * Last year of the public contribution calendar. The REST API doesn't expose it
 * without a token, so this reads a public mirror of the profile's calendar.
 * Returns null on failure, and the graph is hidden rather than faked.
 */
export async function getContributions(): Promise<Contributions | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${site.githubUser}?y=last`,
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      total: { lastYear: number };
      contributions: ContributionDay[];
    };
    return { total: data.total.lastYear, days: data.contributions };
  } catch {
    return null;
  }
}

export async function getGithubData(): Promise<GithubData> {
  try {
    const [user, repos] = await Promise.all([
      api<ApiUser>(`/users/${site.githubUser}`),
      api<ApiRepo[]>(`/users/${site.githubUser}/repos?per_page=100&sort=pushed`),
    ]);
    return {
      publicRepos: user.public_repos,
      followers: user.followers,
      since: new Date(user.created_at).getUTCFullYear(),
      live: true,
      recent: repos
        .filter((r) => !r.fork && r.name !== site.githubUser)
        .slice(0, RECENT_COUNT)
        .map((r) => ({
          name: r.name,
          url: r.html_url,
          language: r.language,
          description: r.description,
          pushedAt: r.pushed_at,
        })),
    };
  } catch {
    return snapshot;
  }
}
