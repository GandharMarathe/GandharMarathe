import { About } from "@/components/About";
import { Capabilities } from "@/components/Capabilities";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Github } from "@/components/Github";
import { Hero } from "@/components/hero/Hero";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/projects/Projects";
import { site } from "@/data/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  description: site.description,
  ...(site.url ? { url: site.url } : {}),
  sameAs: [site.github],
};

export default function Home() {
  return (
    <>
      <a
        href="#about"
        className="label sr-only z-[60] bg-accent px-4 py-3 text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Capabilities />
        <Github />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
