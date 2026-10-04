import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line print:hidden">
      <div className="shell label flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-7 text-muted">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="text-dim">Designed &amp; built in {site.location}</p>
        <a href="#top" className="py-2 transition-colors hover:text-fg">
          Back to top <span aria-hidden>↑</span>
        </a>
      </div>
    </footer>
  );
}
