"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { sfx } from "@/lib/sfx";
import { EASE } from "../ui/Reveal";

type Level = { slug: string; title: string; kind: string; index: string };

/**
 * Projects as a game level-select: a vertical tab list (arrow keys move the
 * cursor) beside the selected level's panel, rendered on the server.
 */
export function LevelSelect({ levels, panels }: { levels: Level[]; panels: React.ReactNode[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const panel = useRef<HTMLDivElement>(null);

  const select = (i: number) => {
    setActive(i);
    // Stacked layout: bring the panel into view so the change is visible.
    if (window.matchMedia("(max-width: 1023px)").matches) {
      panel.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (active + step + levels.length) % levels.length;
    setActive(next);
    tabs.current[next]?.focus();
    sfx.play("move");
  };

  const current = levels[active];

  return (
    <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Projects"
          onKeyDown={onKeyDown}
          className="flex flex-col border-t border-line lg:sticky lg:top-28"
        >
          {levels.map((level, i) => {
            const on = i === active;
            return (
              <button
                key={level.slug}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`level-tab-${level.slug}`}
                aria-selected={on}
                aria-controls="level-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => select(i)}
                className={`group flex items-center gap-4 border-b border-line px-3 py-4 text-left transition-colors ${
                  on ? "bg-surface" : "hover:bg-surface/60"
                }`}
              >
                <span
                  aria-hidden
                  className={`w-3 text-accent ${on ? "animate-blink" : "opacity-0 group-hover:opacity-60"}`}
                >
                  ▸
                </span>
                <span
                  className={`font-dot text-xl font-black leading-none ${on ? "text-accent" : "text-dim"}`}
                >
                  {level.index}
                </span>
                <span className={`text-lg tracking-tight ${on ? "text-fg" : "text-muted"}`}>
                  {level.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        ref={panel}
        id="level-panel"
        role="tabpanel"
        aria-labelledby={`level-tab-${current.slug}`}
        className="scroll-mt-24 lg:col-span-8"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.slug}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {panels[active]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
