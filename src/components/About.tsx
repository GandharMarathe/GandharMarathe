"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { inProgress, site } from "@/data/site";
import { DotLoader, SectionHeader } from "./ui/primitives";
import { Reveal } from "./ui/Reveal";

const STATEMENT =
  "I’m an Information Technology student who learns by shipping. My work runs from the interface down to the systems underneath — a field-service platform on Spring Boot and React, real-time chat with an AI in the room, a neural network written by hand in NumPy. I care less about the stack than about solving the right problem.";

const SPEC = [
  ["Name", site.name],
  ["Location", site.location],
  ["Education", site.education],
  ["Focus", site.focus.join(" / ")],
] as const;

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
function ScrollStatement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className="text-[1.7rem] font-light leading-[1.22] tracking-tight sm:text-4xl lg:text-[2.9rem] lg:leading-[1.16]"
    >
      {reduceMotion
        ? text
        : words.map((word, i) => (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[i / words.length, Math.min(1, (i + 4) / words.length)]}
            >
              {word}
            </Word>
          ))}
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
          <ScrollStatement text={STATEMENT} />
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
