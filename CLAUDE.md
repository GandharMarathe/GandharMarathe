@AGENTS.md

# Gandhar Marathe — Portfolio Website Build Specification

## 0. Mission

Build a premium, highly interactive personal portfolio website for **Gandhar Marathe**, an Information Technology student and software developer interested in full-stack engineering, AI/ML, DevOps, problem-solving, and product design.

The website should feel like a **high-end creative developer portfolio**, not a generic student portfolio template.

Primary objective:
- Make the first 10 seconds memorable.
- Communicate that Gandhar can build real software, not just coursework demos.
- Showcase selected projects with strong storytelling.
- Make recruiters, hackathon judges, collaborators, and developers want to explore the work.
- Keep the UI polished enough to be shared as a personal brand site.

Reference for motion/interaction inspiration:
- https://animos.app/

Use Animos as **inspiration for motion language, transitions, composition, and interactive presentation**. Do not clone layouts, assets, copy, or implementation.

GitHub source of truth:
- https://github.com/GandharMarathe?tab=repositories

When implementing project data, prefer fetching/reading the public GitHub repositories and repository READMEs rather than guessing descriptions, technologies, links, stars, or screenshots.

---

## 1. Product Direction

### Creative direction

Think:
- editorial + futuristic
- dark premium interface
- subtle violet / electric-lavender accent
- large typography
- generous whitespace
- cinematic transitions
- restrained glass effects
- 3D objects used as visual anchors, not decoration everywhere
- smooth scrolling
- strong depth and parallax

Avoid:
- generic developer portfolio cards
- excessive neon
- rainbow gradients
- huge skill clouds
- excessive glassmorphism
- random floating icons
- overuse of rounded cards
- gimmicky loading screens
- animation that makes the site slow or difficult to use

### Brand feeling

The site should communicate:
**Builder. Engineer. Problem solver. Curious technologist.**

It should feel young and ambitious without looking childish.

---

## 2. Recommended Technical Stack

Use a modern production-ready React stack unless the existing project dictates otherwise.

Recommended:
- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion or Motion for UI animation
- GSAP for advanced timeline/scroll choreography where useful
- React Three Fiber + Three.js + @react-three/drei for 3D
- Lenis or an equivalent smooth-scroll solution if compatible with the chosen stack
- Lucide icons or another lightweight icon library

Use the smallest reasonable dependency set. Do not install libraries merely because they are fashionable.

### Engineering requirements

- Componentized architecture
- Reusable animation primitives
- Strong TypeScript types
- Semantic HTML
- Keyboard accessibility
- Responsive design
- Mobile-first fallbacks for expensive 3D effects
- Respect `prefers-reduced-motion`
- Lazy-load 3D and heavy media
- Optimize images and fonts
- Avoid layout shift
- Keep the browser main thread responsive

---

## 3. Information Architecture

The site should be a single immersive experience with clear sections, plus optional detail pages for projects.

Required sections:

1. Navigation
2. Hero
3. About / Identity
4. Selected Projects
5. Technical Stack / Capabilities
6. Experience / Achievements / Highlights
7. GitHub / Open Source activity
8. Contact
9. Footer

Optional pages:
- `/projects/[slug]` for detailed project case studies
- `/resume`

Do not create unnecessary pages if they make the portfolio less cohesive.

---

## 4. Hero Section

The hero is the most important part of the site.

Suggested copy direction:

> Hi, I’m Gandhar.
> I build software, products, and intelligent systems.

Alternative headline style:

> Building things that live somewhere between code, systems, and ideas.

Do not lock in placeholder marketing copy blindly. Refine the wording to sound authentic and technically credible.

### Hero composition

Desktop:
- large left-aligned typography
- 3D object / scene on the opposite side
- subtle background motion
- small metadata line such as `IT • Full Stack • AI/ML • DevOps`
- primary CTA: `View work`
- secondary CTA: `GitHub`

3D concept suggestions:
- abstract metallic/violet orb
- procedural wireframe globe
- floating geometric system made of nodes
- rotating monolithic object with subtle emissive accents
- abstract “code crystal” / translucent geometric sculpture

Pick **one strong central object**, not a collection of unrelated objects.

Interaction ideas:
- object follows pointer subtly
- controlled inertia
- tiny parallax response
- scroll-linked rotation
- lighting changes slightly with cursor movement

Do not make the 3D object block reading or interaction.

---

## 5. Navigation

Navigation should be minimal and elegant.

Desktop options:
- logo/name on left
- Work / About / Stack / Contact links
- GitHub link

Add a small animated menu indicator or progress indicator if it enhances the experience.

Mobile:
- compact menu button
- full-screen or large overlay menu
- smooth open/close animation

Navigation should remain usable while sections animate.

---

## 6. About Section

Write a concise personal story around building software and learning through real projects.

Possible content themes:
- Information Technology student
- full-stack development
- AI/ML experimentation
- systems and problem-solving
- hackathons / competitive builds
- interest in DevOps and deployment
- learning by shipping projects

Keep it personal and specific.

Avoid generic statements such as:
> I am a passionate developer who loves coding.

Use evidence through project work instead.

Include a small visual interaction such as:
- animated type labels
- scrolling keywords
- subtle 3D typography
- interactive timeline

---

## 7. Projects — Core Portfolio Section

This should be the strongest section after the hero.

### Important rule
Do not fabricate project facts.

Use the provided GitHub profile as the project source of truth:
https://github.com/GandharMarathe?tab=repositories

At build time:
1. Inspect repositories.
2. Identify the strongest projects.
3. Read README files where available.
4. Confirm technology, purpose, and current repository status.
5. Prefer 5–8 strong projects rather than showing every repository.
6. Skip trivial academic repositories from the main showcase unless they support the story.
7. Use repository links directly.

### Known projects / concepts that may be relevant

These are context hints, not permission to invent repository details. Verify each against GitHub before publishing:

- **InNeed** — platform concept for helping people/NGOs respond to injured or needy people/animals using posts, images, location, and NGO discovery.
- **Advuman** — UK–India trade intelligence platform with alerts, analytics, risk assessment, and a modern web stack.
- **Bite&Byte** — college canteen management system using a Java full-stack architecture.
- **Indian Railways Maintenance Scheduling / KEYSTONE** — maintenance scheduling and optimization concept involving maintenance tasks, blocks/corridors, ML risk prediction, and constraint optimization.
- **Kaalnirnay** — OCR-related web application concept.
- **Commodity Price Prediction** — AI/ML project around agricultural/horticultural commodity price prediction.
- **Rashomon** — AI/ML project; inspect the repository to establish the exact purpose before publishing.

### Project presentation

Do not use a boring grid of identical cards.

Preferred pattern:
- large featured project
- alternating horizontal project panels
- sticky project title while visuals move
- image/video/mockup viewport
- technology tags
- short problem statement
- concise solution statement
- `View project` / GitHub CTA

A project card should answer:
1. What is it?
2. Why does it matter?
3. What did Gandhar build?
4. What technology was used?
5. Where can I see it?

### Project interaction

Use one or more of:
- hover-to-preview
- cursor-following metadata
- magnetic buttons
- image reveal masks
- scroll-based image movement
- card tilt used very subtly
- horizontal scrolling gallery for selected projects

Never sacrifice readability for effects.

---

## 8. GitHub Section

Create a section that proves the portfolio is connected to real development activity.

Possible elements:
- GitHub profile CTA
- repository count if available
- contribution activity if available
- selected repository cards
- language / technology distribution if useful
- animated commit/contribution visualization if data can be obtained reliably

Do not fake GitHub statistics.

If GitHub API integration requires credentials and those are unavailable, use a clean static curated list generated from the public repositories.

---

## 9. Skills / Capabilities

Do not create the typical giant “Skills” wall.

Instead organize around capabilities:

### Full-Stack Engineering
React, Next.js, TypeScript/JavaScript, REST APIs, backend systems, databases

### Backend / Systems
Spring Boot, Express, PostgreSQL/MySQL, API design, authentication, data modeling

### AI / ML
Python, machine learning, prediction systems, OCR / AI experimentation, data processing

### DevOps / Infrastructure
Docker, Git, deployment workflows, cloud experimentation, CI/CD concepts

### UI / Product
Responsive interfaces, interaction design, motion, information hierarchy

Only publish specific technologies that can be verified from the user's actual work or GitHub.

---

## 10. Achievements / Highlights

Use evidence-based highlights.

Potential categories:
- hackathon results
- major academic/technical milestones
- notable projects
- competitions
- open-source work

Do not invent awards, rankings, certifications, or employers.

Use compact visual storytelling:
- timeline
- numbers
- animated milestones
- small editorial cards

---

## 11. 3D System

The 3D should be intentional and performant.

### Preferred implementation

React Three Fiber scene with:
- one hero object
- one optional secondary scene later in the page
- environment lighting
- subtle post-processing only if performance remains good

### Performance

- lazy load the 3D scene
- avoid excessively high-poly meshes
- use compressed/optimized assets
- cap device pixel ratio
- provide reduced-quality settings on mobile
- respect reduced motion
- ensure the site still works if WebGL fails

### Fallback

If 3D is unavailable:
- use an animated CSS/SVG composition
- preserve the same visual hierarchy
- never leave an empty area

---

## 12. Animation Direction

Animation quality matters more than animation quantity.

### Page-load sequence

Use a subtle staged entrance:
1. navigation
2. hero eyebrow
3. headline
4. body copy
5. CTAs
6. 3D object

Avoid a long artificial preloader.

### Scroll choreography

Possible motion system:
- section headings reveal from clip masks
- text moves a few pixels, not huge distances
- images scale slightly on entry
- panels have depth transitions
- background elements drift slowly
- project visuals pin and transition between items

### Micro-interactions

Use:
- magnetic CTA buttons
- underline or line reveals
- smooth hover transitions
- pointer-reactive highlights
- subtle cursor treatment on desktop

Everything should have a reason.

---

## 13. Typography

The typography should take strong inspiration from Nothing's visual language without becoming a direct copy of the Nothing website.

Use a three-level typographic system.

### 1. Display / Hero

Use a dot-matrix-inspired typeface for selected hero text, large numbers, project indexes, and decorative headings.

Preferred:
- Doto Variable, if available
- a legally usable NDot-style alternative
- do NOT download or bundle proprietary Nothing fonts unless their license explicitly permits it

The display typography should feel like an LED/dot-matrix interface:
- geometric
- technical
- futuristic
- slightly industrial
- visually distinctive
- large and spacious
- primarily uppercase for important display elements

### 2. Main headings / content

Use a clean, sophisticated sans-serif for readable headings.

Preferred:
- Space Grotesk
- Inter
- Geist

Headings should have strong hierarchy but remain lightweight rather than heavy/bold everywhere.

### 3. UI / metadata / labels

Use a monospace typeface such as:
- Space Mono
- IBM Plex Mono
- Geist Mono

Use it for:
- navigation labels
- project numbers
- technologies
- dates
- buttons
- status indicators
- small metadata
- coordinates / location-style information
- technical statistics

Use uppercase lettering with modest letter spacing for these elements.

### Typographic character

The typography should communicate:
**engineered + experimental + minimal + futuristic**

Avoid:
- generic startup typography
- excessive bold text
- playful bubble fonts
- excessive gradients in text
- excessive text animation
- huge blocks of centered text
- conventional portfolio typography

Use typography as part of the visual identity.

### Dot-matrix details

Introduce subtle dot-matrix elements throughout the site:
- project numbering such as `01`, `02`, `03`
- small dot-grid backgrounds
- animated loading indicators
- tiny technical labels
- hover states that reveal dot-matrix text
- section identifiers
- small system/status indicators

These details should feel like an engineered interface rather than decoration.

### Typography rules

- very large hero heading
- compact supporting text
- clear hierarchy
- strong line-height control
- avoid too many weights

The portfolio should still look good with the default fallback font before custom fonts load.

### Important

The site should combine:
- Animos-inspired motion and interaction
- Nothing-inspired typography and technical visual language
- a premium creative developer portfolio

Do NOT make the website look like a Nothing product website clone. The result should feel like **Gandhar's own design system**, using these influences as references rather than reproducing another brand's website.

---

## 14. Color System

Base:
- deep near-black / graphite background
- off-white text
- muted gray body text
- violet/lavender accent

Accent should be used strategically:
- buttons
- active navigation
- 3D lighting
- selected metadata
- key links

Do not let the entire site glow purple.

---

## 15. Contact Section

The closing section should be confident and simple.

Suggested direction:

> Have a project, idea, or problem worth building?

Primary CTA:
`Let’s talk`

Include verified links only:
- GitHub
- LinkedIn
- email
- other portfolio/social links if provided

Never invent email addresses or profile URLs.

---

## 16. Responsive Behavior

### Desktop

Use the full visual system:
- 3D
- cursor interactions
- large typography
- advanced scroll choreography

### Tablet

Reduce spacing and 3D complexity.

### Mobile

Priorities:
1. content
2. readability
3. touch targets
4. performance
5. animation

Do not simply shrink the desktop layout.

Disable or simplify heavy effects where appropriate.

---

## 17. Accessibility

Required:
- semantic HTML
- proper heading hierarchy
- visible keyboard focus
- accessible buttons and links
- alt text for meaningful images
- sufficient contrast
- reduced-motion support
- no interaction dependent solely on hover

---

## 18. SEO / Metadata

Create:
- title
- description
- Open Graph metadata
- Twitter/X metadata if appropriate
- favicon
- basic structured metadata if useful

Suggested title:
`Gandhar Marathe — Software Developer | AI/ML | Full Stack`

Refine based on the final positioning.

---

## 19. Content Rules

Never fabricate:
- employers
- internship experience
- awards
- GitHub stars
- project metrics
- users
- revenue
- performance claims
- certifications
- testimonials

When data is missing:
- omit it
- use a neutral placeholder in development
- or write the copy around confirmed facts

No fake testimonials.
No fake client logos.
No fake statistics.

---

## 20. Development Workflow

Before writing substantial code:

1. Inspect the existing repo structure.
2. Determine framework and current dependencies.
3. Inspect GitHub data available from the provided profile.
4. Establish which repositories are worth showcasing.
5. Create the page architecture.
6. Build the design system.
7. Build hero + navigation.
8. Build projects.
9. Add 3D.
10. Add scroll choreography.
11. Add responsive behavior.
12. Add accessibility and SEO.
13. Run lint/type checks/build.
14. Fix visual and runtime issues.
15. Verify links.

Do not rebuild the project from scratch if a suitable existing codebase is already present.

---

## 21. Quality Bar

The final result should look like something a creative developer or product engineer would actually put in their portfolio.

A successful result has:
- excellent first impression
- strong visual hierarchy
- fast enough loading
- purposeful animation
- tasteful 3D
- genuine project evidence
- responsive behavior
- clean code
- no obvious template feel

The guiding principle is:

> **High visual ambition, low visual noise.**

Build the site as a complete, coherent product rather than a collection of effects.
