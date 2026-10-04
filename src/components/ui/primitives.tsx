import Link from "next/link";
import { Magnetic } from "./Magnetic";
import { MaskReveal, Reveal } from "./Reveal";

/**
 * Label that swaps to its dot-matrix rendering when the nearest `group`
 * ancestor is hovered or focused.
 */
export function DotSwap({ children }: { children: string }) {
  return (
    <span className="relative inline-block overflow-hidden whitespace-nowrap align-bottom">
      <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full group-focus-visible:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full font-dot font-black tracking-[0.1em] transition-transform duration-500 ease-out-expo group-hover:translate-y-0 group-focus-visible:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

type ButtonLinkProps = {
  href: string;
  children: string;
  variant?: "primary" | "ghost";
  external?: boolean;
};

export function ButtonLink({ href, children, variant = "ghost", external }: ButtonLinkProps) {
  const styles =
    variant === "primary"
      ? "border-accent bg-accent text-bg hover:bg-fg hover:border-fg"
      : "border-line text-fg hover:border-fg/60";
  const className = `group label inline-flex h-12 items-center gap-3 border px-6 transition-colors duration-300 ${styles}`;
  const content = (
    <>
      <DotSwap>{children}</DotSwap>
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
        {external ? "↗" : "→"}
      </span>
    </>
  );
  return (
    <Magnetic>
      {external ? (
        <a href={href} target="_blank" rel="noreferrer" className={className}>
          {content}
        </a>
      ) : (
        <Link href={href} className={className}>
          {content}
        </Link>
      )}
    </Magnetic>
  );
}

export function StatusDot({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block size-1.5 rounded-full bg-accent animate-status ${className}`}
    />
  );
}

/** 3×3 dot-matrix activity indicator. */
export function DotLoader({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`inline-grid grid-cols-3 gap-[3px] ${className}`}>
      {Array.from({ length: 9 }, (_, i) => (
        <span
          key={i}
          className="size-[3px] rounded-full bg-current animate-dot-pulse"
          style={{ animationDelay: `${((i % 3) + Math.floor(i / 3)) * 120}ms` }}
        />
      ))}
    </span>
  );
}

type SectionHeaderProps = {
  index: string;
  label: string;
  title: string[];
  id: string;
};

/** Section identifier row plus a mask-revealed heading, one entry per line. */
export function SectionHeader({ index, label, title, id }: SectionHeaderProps) {
  return (
    <header className="mb-14 lg:mb-24">
      <Reveal className="flex items-center gap-4 border-t border-line pt-5">
        <span className="font-dot text-xl font-black leading-none text-accent">{index}</span>
        <span className="label text-muted">{label}</span>
        <span aria-hidden className="label ml-auto hidden text-dim sm:block">
          SEC.{index} / 05
        </span>
      </Reveal>
      <h2
        id={id}
        className="mt-10 max-w-5xl text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl lg:mt-14 lg:text-7xl"
      >
        {title.map((line, i) => (
          <MaskReveal key={line} delay={i * 0.08}>
            {line}
          </MaskReveal>
        ))}
      </h2>
    </header>
  );
}
