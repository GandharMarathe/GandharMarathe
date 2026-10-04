"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/data/site";
import { EASE } from "./ui/Reveal";

function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A thin band across the middle of the viewport decides the active section.
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ["top", "github", ...navLinks.map((l) => l.id)]) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return active;
}

const pillClass =
  "label hidden h-9 items-center gap-2 border border-line px-4 transition-colors hover:border-fg/60 md:inline-flex";

export function Nav() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const lenis = useLenis();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 print:hidden"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className="border-b border-line bg-bg/70 backdrop-blur-md">
        <div className="shell flex h-16 items-center justify-between">
          {/* Section links are `/#id` so they also work from sub-pages. */}
          <Link href="/#top" className="group flex items-center gap-3" aria-label={`${site.name} — home`}>
            <span className="font-dot text-2xl font-black leading-none tracking-wider transition-colors group-hover:text-accent">
              GM
            </span>
            <span className="label hidden text-muted sm:block">{site.name}</span>
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = active === link.id;
                return (
                  <li key={link.id}>
                    <Link
                      href={`/#${link.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={`label group relative flex items-center gap-2 py-2 transition-colors hover:text-fg ${
                        isActive ? "text-fg" : "text-muted"
                      }`}
                    >
                      <span className={isActive ? "text-accent" : "text-dim"}>{link.index}</span>
                      {link.label}
                      <span
                        aria-hidden
                        className={`absolute inset-x-0 -bottom-px h-px origin-left bg-accent transition-transform duration-500 ease-out-expo group-hover:scale-x-100 ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/resume" className={pillClass}>
              Resume
            </Link>
            <a href={site.github} target="_blank" rel="noreferrer" className={pillClass}>
              GitHub <span aria-hidden>↗</span>
            </a>
            <button
              type="button"
              className="label flex h-11 items-center gap-3 px-2 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"}
              <span aria-hidden className="relative block h-3 w-5">
                <span
                  className={`absolute inset-x-0 top-0 h-px bg-fg transition-transform duration-300 ${
                    open ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute inset-x-0 bottom-0 h-px bg-fg transition-transform duration-300 ${
                    open ? "-translate-y-[5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
          style={{ scaleX: progress }}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="dot-grid fixed inset-x-0 bottom-0 top-16 flex flex-col bg-bg md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <nav aria-label="Mobile" className="shell flex flex-1 flex-col justify-center">
              <ul>
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    className="border-b border-line"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: EASE }}
                  >
                    <Link
                      href={`/#${link.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-5 py-5"
                    >
                      <span className="font-dot text-lg font-black text-accent">{link.index}</span>
                      <span className="text-4xl font-light tracking-tight">{link.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="shell flex items-center justify-between pb-8">
              <div className="flex items-center gap-6">
                <Link href="/resume" onClick={() => setOpen(false)} className="label py-3">
                  Resume
                </Link>
                <a href={site.github} target="_blank" rel="noreferrer" className="label py-3">
                  GitHub ↗
                </a>
              </div>
              <span className="label text-dim">{site.location}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
