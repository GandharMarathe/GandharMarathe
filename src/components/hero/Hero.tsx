"use client";

import { motion } from "motion/react";
import { site } from "@/data/site";
import { ButtonLink, StatusDot } from "../ui/primitives";
import { EASE } from "../ui/Reveal";
import { HeroVisual } from "./HeroVisual";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

const maskUp = (delay: number) => ({
  initial: { y: "105%" },
  animate: { y: 0 },
  transition: { duration: 1.1, delay, ease: EASE },
});

const DISCIPLINES = ["IT", "Full Stack", "AI/ML", "DevOps"];

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh flex-col overflow-hidden">
      <div
        aria-hidden
        className="dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]"
      />

      <motion.div
        className="pointer-events-none absolute -right-[38%] top-[9%] aspect-square w-[118vw] sm:-right-[20%] sm:w-[82vw] lg:-right-[6%] lg:top-1/2 lg:w-[min(58vw,860px)] lg:-translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.9 }}
      >
        <HeroVisual className="size-full opacity-55 md:opacity-100" />
      </motion.div>

      <div className="shell relative z-10 flex flex-1 flex-col justify-end pb-8 pt-28">
        <motion.p {...rise(0.15)} className="label flex items-center gap-3 text-muted">
          <StatusDot />
          <span className="hidden sm:inline">SYS.ONLINE</span>
          <span aria-hidden className="hidden text-dim sm:inline">/</span>
          <span>
            {site.education} — {site.location}
          </span>
        </motion.p>

        <h1 className="mt-6 font-dot text-[clamp(3.4rem,13.5vw,11.5rem)] font-black uppercase leading-[0.86] tracking-tight">
          <span className="block overflow-hidden">
            <motion.span className="block" {...maskUp(0.25)}>
              Gandhar
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span className="block text-fg/45" {...maskUp(0.35)}>
              Marathe
            </motion.span>
          </span>
        </h1>

        <motion.p
          {...rise(0.55)}
          className="mt-8 max-w-2xl text-2xl font-light leading-snug tracking-tight sm:text-3xl lg:text-4xl"
        >
          I build software, products, and{" "}
          <span className="text-accent">intelligent systems</span> — and learn by shipping them.
        </motion.p>

        <motion.div {...rise(0.7)} className="mt-9 flex flex-wrap items-center gap-3">
          <ButtonLink href="#work" variant="primary">
            View work
          </ButtonLink>
          <ButtonLink href={site.github} external>
            GitHub
          </ButtonLink>
        </motion.div>

        <motion.div
          {...rise(0.85)}
          className="label mt-14 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-line pt-5 text-muted lg:mt-20"
        >
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {DISCIPLINES.map((d, i) => (
              <li key={d} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden className="text-accent">•</span>}
                {d}
              </li>
            ))}
          </ul>
          <span className="hidden text-dim sm:block">Portfolio / v1.0</span>
          <a href="#about" className="flex items-center gap-2 transition-colors hover:text-fg">
            Scroll <span aria-hidden>↓</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
