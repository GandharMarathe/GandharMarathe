import { site } from "@/data/site";
import { ButtonLink } from "./ui/primitives";
import { MaskReveal, Reveal } from "./ui/Reveal";

// Only links that are actually configured in `site` are rendered.
const links = [
  { label: "GitHub", value: `github.com/${site.githubUser}`, href: site.github as string },
  ...(site.linkedin ? [{ label: "LinkedIn", value: "LinkedIn", href: site.linkedin as string }] : []),
  ...(site.email ? [{ label: "Email", value: site.email as string, href: `mailto:${site.email}` }] : []),
  ...(site.phone ? [{ label: "Phone", value: site.phone as string, href: `tel:${site.phone.replace(/\s/g, "")}` }] : []),
];

export function Contact() {
  const primaryHref = site.email ? `mailto:${site.email}` : site.github;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden border-t border-line"
    >
      <div
        aria-hidden
        className="dot-grid absolute inset-0 [mask-image:linear-gradient(to_top,black,transparent_75%)]"
      />
      <div className="shell relative py-28 lg:py-48">
        <Reveal className="flex items-center gap-4">
          <span className="font-dot text-xl font-black leading-none text-accent">05</span>
          <span className="label text-muted">Contact</span>
        </Reveal>

        <h2
          id="contact-title"
          className="mt-10 max-w-6xl text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl lg:text-8xl"
        >
          <MaskReveal>Have a project, idea,</MaskReveal>
          <MaskReveal delay={0.08}>or problem</MaskReveal>
          <MaskReveal delay={0.16}>
            <span className="text-accent">worth building?</span>
          </MaskReveal>
        </h2>

        <Reveal delay={0.2} className="mt-14 flex flex-wrap items-end justify-between gap-10">
          <ButtonLink href={primaryHref} variant="primary" external={!site.email}>
            Let’s talk
          </ButtonLink>

          <ul className="w-full max-w-md border-t border-line">
            {links.map((link) => (
              <li key={link.label} className="border-b border-line">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-6 py-4"
                >
                  <span className="label text-dim">{link.label}</span>
                  <span className="label transition-colors group-hover:text-accent">
                    {link.value} <span aria-hidden>↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
