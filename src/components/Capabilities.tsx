import { capabilities } from "@/data/projects";
import { SectionHeader } from "./ui/primitives";
import { Reveal } from "./ui/Reveal";

export function Capabilities() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="shell py-20 lg:py-28">
      <SectionHeader
        id="stack-title"
        index="03"
        label="Stack / Capabilities"
        title={["What I can build,", "and where I’ve built it."]}
      />

      <ol className="border-b border-line">
        {capabilities.map((cap, i) => (
          <li key={cap.title} className="group/row border-t border-line">
            <Reveal className="grid grid-cols-1 gap-x-10 gap-y-5 py-9 transition-colors duration-500 lg:grid-cols-12 lg:py-12">
              <div className="flex items-baseline gap-5 lg:col-span-4">
                <span className="font-dot text-xl font-black leading-none text-dim transition-colors duration-500 group-hover/row:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl font-light tracking-tight sm:text-3xl">{cap.title}</h3>
              </div>

              <p className="leading-relaxed text-muted lg:col-span-4">{cap.description}</p>

              <div className="lg:col-span-4">
                <ul aria-label="Technologies" className="label flex flex-wrap gap-x-2 gap-y-1.5 text-fg">
                  {cap.tech.map((tech, j) => (
                    <li key={tech} className="flex items-center gap-2">
                      {tech}
                      {j < cap.tech.length - 1 && <span aria-hidden className="text-dim">/</span>}
                    </li>
                  ))}
                </ul>
                <p className="label mt-5 text-dim">
                  Seen in — <span className="text-muted">{cap.seenIn.join(", ")}</span>
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
