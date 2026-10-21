"use client";

import { useEffect } from "react";
import { sfx } from "@/lib/sfx";

const TARGETS = "a, button, [role='tab']";

/** Hover and click blips for every interactive element, via two delegated listeners. */
export function Sfx() {
  useEffect(() => {
    let last: Element | null = null;
    const finePointer = window.matchMedia("(hover: hover)").matches;
    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element).closest(TARGETS);
      if (el && el !== last && finePointer) sfx.play("hover");
      last = el;
    };
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest(TARGETS)) sfx.play("select");
    };
    document.addEventListener("pointerover", onOver);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("click", onClick);
    };
  }, []);
  return null;
}
