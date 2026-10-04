"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";
import { Cursor } from "./Cursor";
import "lenis/dist/lenis.css";

export function Providers({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      {reduceMotion ? (
        children
      ) : (
        <ReactLenis root options={{ anchors: true, lerp: 0.11 }}>
          {children}
        </ReactLenis>
      )}
      <Cursor />
    </MotionConfig>
  );
}
