"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { sfx } from "@/lib/sfx";
import { EASE } from "./ui/Reveal";

const SECTIONS = ["about", "work", "stack", "github", "contact"];
const XP_SEGMENTS = 14;

/** Game-style HUD: a section reached is a level up, scroll depth is XP. */
export function Hud() {
  const [visited, setVisited] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [xp, setXp] = useState(0);
  const seen = useRef(new Set<string>());
  const { scrollYProgress } = useScroll();
  const muted = useSyncExternalStore(sfx.subscribe, sfx.isMuted, () => false);

  useMotionValueEvent(scrollYProgress, "change", (v) => setXp(Math.round(v * XP_SEGMENTS)));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (!entry.isIntersecting || seen.current.has(id)) continue;
          seen.current.add(id);
          setVisited([...seen.current]);
          setToast(id);
          sfx.play("level");
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 1600);
    return () => clearTimeout(timer);
  }, [toast]);

  const level = visited.length;

  return (
    <div className="label fixed bottom-4 right-4 z-40 flex select-none flex-col items-end sm:bottom-6 sm:right-8 lg:right-12 print:hidden">
      <AnimatePresence>
        {toast && (
          <motion.p
            key={toast}
            aria-hidden
            className="mb-2 font-dot text-base font-black text-accent"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {level === SECTIONS.length ? "★ All clear" : `+1 ${toast}`}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex h-11 items-center gap-4 border border-accent/50 bg-surface/90 px-4 shadow-[0_0_24px_rgb(167_139_250/0.15)] backdrop-blur-md">
        <span aria-hidden className="flex items-baseline gap-1.5 text-muted">
          LV
          <span className="font-dot text-xl font-black leading-none text-accent">
            {String(level).padStart(2, "0")}
          </span>
        </span>
        <span aria-hidden className="hidden gap-[3px] sm:flex">
          {Array.from({ length: XP_SEGMENTS }, (_, i) => (
            <span key={i} className={`h-3.5 w-1.5 transition-colors ${i < xp ? "bg-accent" : "bg-fg/15"}`} />
          ))}
        </span>
        <span aria-hidden className="flex gap-2">
          {SECTIONS.map((id) => (
            <span
              key={id}
              className={`size-2 rotate-45 transition-colors duration-500 ${
                visited.includes(id) ? "bg-accent" : "bg-fg/20"
              }`}
            />
          ))}
        </span>
        <button
          type="button"
          onClick={sfx.toggle}
          aria-label="Sound"
          aria-pressed={!muted}
          className={`flex h-full items-center border-l border-line pl-4 text-base transition-colors hover:text-accent ${
            muted ? "text-dim line-through" : "text-fg"
          }`}
        >
          ♪
        </button>
        <a
          href="#play"
          aria-label="Go to the Snake game"
          className="hidden h-full items-center border-l border-line pl-4 text-fg transition-colors hover:text-accent md:flex"
        >
          ▶
        </a>
      </div>
    </div>
  );
}
