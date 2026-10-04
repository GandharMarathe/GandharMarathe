"use client";

import { useInView, useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import { Component, useRef, useSyncExternalStore } from "react";
import { DotSphere } from "./DotSphere";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <DotSphere />,
});

let webglSupport: boolean | undefined;
function detectWebGL() {
  if (webglSupport === undefined) {
    try {
      const canvas = document.createElement("canvas");
      webglSupport = Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}

const COMPACT_QUERY = "(max-width: 767px)";
function subscribeCompact(onChange: () => void) {
  const mq = window.matchMedia(COMPACT_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const noSubscribe = () => () => {};

/** Falls back to the static orb if the WebGL scene throws at runtime. */
class SceneBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <DotSphere /> : this.props.children;
  }
}

export function HeroVisual({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduceMotion = useReducedMotion();
  const webgl = useSyncExternalStore(noSubscribe, detectWebGL, () => false);
  const compact = useSyncExternalStore(
    subscribeCompact,
    () => window.matchMedia(COMPACT_QUERY).matches,
    () => false,
  );

  return (
    <div ref={ref} aria-hidden className={className}>
      {webgl && !reduceMotion ? (
        <SceneBoundary>
          <HeroScene active={inView} compact={compact} />
        </SceneBoundary>
      ) : (
        <DotSphere />
      )}
    </div>
  );
}
