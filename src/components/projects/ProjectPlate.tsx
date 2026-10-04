"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { Project } from "@/data/projects";
import { EASE } from "../ui/Reveal";

const BAR_DOTS = 48;
const LANGUAGE_TONES = ["bg-accent", "bg-fg", "bg-muted", "bg-dim"];

function languageShares(languages: Project["languages"]) {
  const entries = Object.entries(languages).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, bytes]) => sum + bytes, 0);
  return entries.map(([name, bytes], i) => ({
    name,
    share: bytes / total,
    tone: LANGUAGE_TONES[Math.min(i, LANGUAGE_TONES.length - 1)],
  }));
}

/** Language breakdown drawn as a single row of dots. */
function LanguageBar({ languages }: { languages: Project["languages"] }) {
  const shares = languageShares(languages);
  const dots: string[] = [];
  for (const lang of shares) {
    const count = Math.round(lang.share * BAR_DOTS);
    for (let i = 0; i < count && dots.length < BAR_DOTS; i++) dots.push(lang.tone);
  }
  while (dots.length < BAR_DOTS) dots.push(shares[0].tone);

  return (
    <div>
      <div aria-hidden className="flex justify-between">
        {dots.map((tone, i) => (
          <span key={i} className={`size-[3px] rounded-full sm:size-1 ${tone}`} />
        ))}
      </div>
      <ul className="label mt-3 flex flex-wrap gap-x-5 gap-y-1 text-muted">
        {shares
          .filter((lang) => lang.share >= 0.01)
          .map((lang) => (
            <li key={lang.name} className="flex items-center gap-2">
              <span aria-hidden className={`size-1.5 rounded-full ${lang.tone}`} />
              {lang.name} {Math.round(lang.share * 100)}%
            </li>
          ))}
      </ul>
    </div>
  );
}

/**
 * The visual half of a project panel: a dot-grid plate carrying the project
 * index and real repository metadata. Stands in for screenshots, which the
 * repositories don't provide.
 */
export function ProjectPlate({
  project,
  index,
  className = "aspect-[4/3]",
}: {
  project: Project;
  index: string;
  /** Sizing classes for the plate; defaults to a 4:3 frame. */
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  // Observed on the unclipped wrapper: a fully clipped element never reports as in view.
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div ref={ref}>
      <motion.div
        onPointerMove={onPointerMove}
        className={`group/plate relative isolate flex flex-col justify-between overflow-hidden border border-line bg-surface p-5 sm:p-7 ${className}`}
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: inView ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        <div aria-hidden className="dot-grid absolute inset-0 -z-10" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/plate:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgb(167 139 250 / 0.14), transparent 70%)",
          }}
        />

        <div className="label flex items-start justify-between gap-4 text-muted">
          <span className="min-w-0 truncate">{project.repo}</span>
          <span className="shrink-0">Last push {project.lastPush}</span>
        </div>

        <motion.span
          aria-hidden
          style={{ y }}
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center font-dot text-[clamp(9rem,34vw,22rem)] font-black leading-none text-fg/90 transition-colors duration-700 group-hover/plate:text-accent"
        >
          {index}
        </motion.span>

        <LanguageBar languages={project.languages} />
      </motion.div>
    </div>
  );
}
