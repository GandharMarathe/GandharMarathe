"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const INTERACTIVE = "a, button, [data-cursor]";
const SPRING = { stiffness: 380, damping: 32, mass: 0.5 };

function subscribeFinePointer(onChange: () => void) {
  const mq = window.matchMedia(FINE_POINTER);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

type CursorState = { visible: boolean; active: boolean; label: string | null };

function CursorLayer() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, SPRING);
  const ringY = useSpring(y, SPRING);
  const [state, setState] = useState<CursorState>({ visible: false, active: false, label: null });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("custom-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setState((s) => (s.visible ? s : { ...s, visible: true }));
    };
    const onOver = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest<HTMLElement>(INTERACTIVE) ?? null;
      const active = target !== null;
      // `data-cursor="View"` on an element shows that word inside the cursor.
      const label = target?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor || null;
      setState((s) => (s.active === active && s.label === label ? s : { ...s, active, label }));
    };
    const onLeave = () => setState((s) => (s.visible ? { ...s, visible: false } : s));

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  const { visible, active, label } = state;
  const ringSize = label ? 84 : active ? 52 : 30;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] print:hidden">
      <motion.div className="absolute left-0 top-0" style={{ x: ringX, y: ringY }}>
        <motion.div
          className={`label absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-colors duration-300 ${
            label ? "border-accent bg-accent text-bg" : active ? "border-accent" : "border-fg/50"
          }`}
          initial={false}
          animate={{ width: ringSize, height: ringSize, opacity: visible ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
        >
          {label}
        </motion.div>
      </motion.div>
      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <span
          className={`absolute left-0 top-0 block size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg transition-opacity duration-200 ${
            visible && !label ? "opacity-100" : "opacity-0"
          }`}
        />
      </motion.div>
    </div>
  );
}

/** Dot-and-ring cursor for mouse users. Touch and reduced-motion keep the native one. */
export function Cursor() {
  const finePointer = useSyncExternalStore(
    subscribeFinePointer,
    () => window.matchMedia(FINE_POINTER).matches,
    () => false,
  );
  const reduceMotion = useReducedMotion();

  if (!finePointer || reduceMotion) return null;
  return <CursorLayer />;
}
