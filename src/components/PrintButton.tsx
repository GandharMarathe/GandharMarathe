"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="label inline-flex h-12 items-center gap-3 border border-accent bg-accent px-6 text-bg transition-colors duration-300 hover:border-fg hover:bg-fg print:hidden"
    >
      Print / Save PDF <span aria-hidden>↓</span>
    </button>
  );
}
