"use client";

import { motion, useMotionValue, useSpring } from "motion/react";

const SPRING = { stiffness: 220, damping: 18, mass: 0.4 };

/** Pulls its child a little toward the mouse pointer while hovered. */
export function Magnetic({
  children,
  strength = 0.28,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);

  const onPointerMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      className="inline-block"
      style={{ x: sx, y: sy }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}
