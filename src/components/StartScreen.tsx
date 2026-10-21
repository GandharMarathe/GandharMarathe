"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { sfx } from "@/lib/sfx";
import { EASE } from "./ui/Reveal";

const noop = () => () => {};
// Set before paint by the inline script in the root layout, once per browser session.
const startedThisSession = () => document.documentElement.classList.contains("started");

/** Title screen shown once per session. Any key, click or tap starts. */
export function StartScreen() {
  const alreadyStarted = useSyncExternalStore(noop, startedThisSession, () => false);
  const [dismissed, setDismissed] = useState(false);
  const open = !alreadyStarted && !dismissed;
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;
    const start = () => {
      try {
        sessionStorage.setItem("gm-started", "1");
      } catch {}
      sfx.play("start");
      setDismissed(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Tab" || e.metaKey || e.ctrlKey || e.altKey) return;
      e.preventDefault();
      start();
    };
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", start);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", start);
    };
  }, [open, lenis]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal
          aria-label="Start screen. Press any key to enter."
          className="start-screen dot-grid fixed inset-0 z-[70] flex flex-col items-center justify-center gap-12 bg-bg print:hidden"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="text-center font-dot text-[clamp(3rem,12vw,9rem)] font-black uppercase leading-[0.88]">
            Gandhar
            <br />
            <span className="text-fg/55">Marathe</span>
          </p>
          <p className="label animate-blink text-base text-accent">
            <span className="hidden sm:inline">▸ Press Enter ◂</span>
            <span className="sm:hidden">▸ Tap to start ◂</span>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
