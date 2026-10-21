"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { experience, inProgress, site } from "@/data/site";
import { DotLoader, SectionHeader } from "./ui/primitives";
import { Reveal } from "./ui/Reveal";

// Lit one phrase at a time on scroll; the last phrase lands in the accent color.
const STATEMENT = [
  "I’m an Information Technology student who learns by shipping.",
  "My work runs from the interface down to the systems underneath —",
  "a field-service platform on Spring Boot and React,",
  "real-time chat with an AI in the room,",
  "a neural network written by hand in NumPy.",
  "I care less about the stack than about solving the right problem.",
];

const SPEC = [
  ["Name", site.name],
  ["Location", site.location],
  ["Education", `${site.degree}, ${site.institution} — ${site.studyYears}`],
  ["Experience", `${experience[0].role}, ${experience[0].org} — 2026`],
  ["Focus", site.focus.join(" / ")],
] as const;

function Phrase({
  children,
  progress,
  range,
  className,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}) {
  // Unlit phrases stay legible: the effect is emphasis, not hiding the text.
  const opacity = useTransform(progress, range, [0.35, 1]);
  return (
    <motion.span className={className} style={{ opacity }}>
      {children}{" "}
    </motion.span>
  );
}

/** Paragraph whose phrases light up one by one as it scrolls through the viewport. */
function ScrollStatement({ phrases }: { phrases: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.75"] });
  const last = phrases.length - 1;

  return (
    <p
      ref={ref}
      className="text-[1.7rem] font-light leading-[1.3] tracking-tight sm:text-4xl lg:text-[2.9rem] lg:leading-[1.25]"
    >
      {phrases.map((phrase, i) =>
        reduceMotion ? (
          <span key={i} className={i === last ? "text-accent" : undefined}>
            {phrase}{" "}
          </span>
        ) : (
          <Phrase
            key={i}
            progress={scrollYProgress}
            range={[i / phrases.length, (i + 1) / phrases.length]}
            className={i === last ? "text-accent" : undefined}
          >
            {phrase}
          </Phrase>
        ),
      )}
    </p>
  );
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="shell py-20 lg:py-28">
      <SectionHeader
        id="about-title"
        index="01"
        label="About / Identity"
        title={["Builder first.", "Student second."]}
      />

      <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <ScrollStatement phrases={STATEMENT} />
        </div>

        <aside className="lg:col-span-4 lg:pt-3">
          <Reveal>
            <dl className="border-t border-line">
              {SPEC.map(([key, value]) => (
                <div key={key} className="flex gap-6 border-b border-line py-3.5">
                  <dt className="label w-24 shrink-0 pt-0.5 text-dim">{key}</dt>
                  <dd className="label text-fg">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <h3 className="label flex items-center gap-3 text-muted">
              <DotLoader className="text-accent" />
              Currently building
            </h3>
            <ul className="mt-5 space-y-4">
              {inProgress.map((item) => (
                <li key={item.name}>
                  <p className="text-lg leading-tight">{item.name}</p>
                  <p className="label mt-1 text-muted">{item.note}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2} className="mt-12">
            <pre
              aria-label="Philosophy, as code"
              className="dot-grid overflow-x-auto border border-line bg-surface p-5 font-mono text-xs leading-relaxed text-muted"
            >
              <code>
                <span className="text-accent">while</span> alive:{"\n"}
                {"    "}build(){"\n"}
                {"    "}learn(){"\n"}
                {"    "}improve()
              </code>
            </pre>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}
