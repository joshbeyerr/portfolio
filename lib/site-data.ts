export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  duration: string;
  role: string;
  headline: string;
  summary: string;
  description: string;
  services: string[];
  stack: string[];
  metrics: { label: string; value: string }[];
  outcomes: string[];
  detailSections: { heading: string; body: string }[];
  palette: {
    base: string;
    accent: string;
    ink: string;
  };
};

export type CursorMode =
  | "default"
  | "crosshair"
  | "grab"
  | "zoom"
  | "alias"
  | "not-allowed";

export type LandingCarouselItem = {
  id: string;
  title: string;
  label: string;
  description: string;
  href?: string;
  variant:
    | "reveri"
    | "trip"
    | "brooklyn"
    | "cadillac"
    | "allup"
    | "music"
    | "signal"
    | "td-securities";
  size: "hero" | "wide" | "square";
};

export const profile = {
  name: "Your Name",
  role: "Product designer and frontend engineer",
  location: "Based in Toronto, working globally",
  availability: "Available for select engagements in Q2 2026",
  email: "hello@yourname.com",
  manifesto:
    "I design digital products that feel calm, precise, and unmistakably useful.",
  introduction:
    "Independent practice focused on product systems, brand-sensitive interfaces, and frontend craft.",
  socialLinks: [
    { label: "GitHub", href: "https://github.com/yourname" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/yourname/" },
    { label: "Email", href: "mailto:hello@yourname.com" },
  ],
};

export const navigationItems = [
  { label: "Work", href: "/" },
  { label: "Information", href: "/about" },
  { label: "News", href: "/writing" },
  { label: "Contact", href: "/contact" },
];

export const cursorModes: { id: CursorMode; label: string }[] = [
  { id: "default", label: "default" },
  { id: "crosshair", label: "crosshair" },
  { id: "grab", label: "grab" },
  { id: "zoom", label: "zoom" },
  { id: "alias", label: "alias" },
  { id: "not-allowed", label: "not-allowed" },
];

export const tickerMessages = [
  "New logo and identity system for Scribd by Mother Design",
  "Selected independent work across product systems, brand, and frontend craft",
  "Now listening support and live cursor modes are scaffolded in this build",
];

export const landingCarouselItems: LandingCarouselItem[] = [
  {
    id: "reveri",
    title: "reveri",
    label: "Reveri",
    description: "Brand refinement and digital product direction",
    href: "/projects/northstar-os",
    variant: "reveri",
    size: "hero",
  },
  {
    id: "trip",
    title: "trip",
    label: "Tripadvisor",
    description: "Interface concept for discovery and travel browsing",
    href: "/projects/meridian-commerce",
    variant: "trip",
    size: "wide",
  },
  {
    id: "brooklyn",
    title: "Brooklyn Org",
    label: "Brooklyn Org",
    description: "Campaign direction with editorial, civic, and identity cues",
    href: "/projects/atlas-health",
    variant: "brooklyn",
    size: "square",
  },
  {
    id: "cadillac",
    title: "Cadillac",
    label: "Cadillac",
    description: "Luxury marque treatment with a restrained black field",
    href: "/projects/northstar-os",
    variant: "cadillac",
    size: "wide",
  },
  {
    id: "allup",
    title: "all up",
    label: "allup",
    description: "Bright campaign tile with compressed wordmark styling",
    href: "/projects/meridian-commerce",
    variant: "allup",
    size: "wide",
  },
  {
    id: "music",
    title: "Mucho",
    label: "Mucho",
    description: "Poster-like art direction with green and paper textures",
    href: "/projects/atlas-health",
    variant: "music",
    size: "square",
  },
  {
    id: "signal",
    title: "Signal",
    label: "Signal",
    description: "Editorial poster tile with a sharper monochrome rhythm",
    href: "/projects/northstar-os",
    variant: "signal",
    size: "wide",
  },
  {
    id: "td-securities",
    title: "TD Securities",
    label: "TD Securities",
    description: "TD Securities",
    href: "/",
    variant: "td-securities",
    size: "wide",
  },
];

export const projects: Project[] = [
  {
    slug: "northstar-os",
    title: "Northstar OS",
    client: "Series B SaaS",
    category: "Product platform",
    year: "2026",
    duration: "14 weeks",
    role: "Lead product designer and frontend partner",
    headline:
      "A workflow platform redesign that aligned operations, reporting, and trust across a fast-scaling B2B team.",
    summary:
      "Northstar OS unified a fragmented internal toolset into one modular workspace for operations and customer success teams.",
    description:
      "The engagement covered product strategy, UI architecture, design system foundations, and frontend pairing. The core challenge was reducing cognitive overhead in a product that had grown through feature additions rather than coherent system thinking.",
    services: [
      "Product strategy",
      "UX architecture",
      "Design systems",
      "Frontend implementation",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Storybook"],
    metrics: [
      { label: "Task completion", value: "+32%" },
      { label: "Time to insight", value: "-41%" },
      { label: "Support tickets", value: "-23%" },
    ],
    outcomes: [
      "Introduced a workspace model that made navigation predictable across reporting, accounts, and activity streams.",
      "Rebuilt the UI with reusable primitives to reduce drift and speed up delivery for the internal team.",
      "Helped leadership align roadmap priorities around operational clarity instead of interface novelty.",
    ],
    detailSections: [
      {
        heading: "Problem",
        body:
          "Users were juggling separate reporting, scheduling, and client management surfaces with inconsistent language and interaction patterns. Important actions were available, but never where people expected them.",
      },
      {
        heading: "Approach",
        body:
          "I audited the highest-friction flows, grouped tasks into repeatable modes, and translated those modes into a compact workspace shell with stable navigation, shared controls, and cleaner content hierarchy.",
      },
      {
        heading: "Result",
        body:
          "The product shifted from feeling like a collection of tools to a coherent operating environment. That change improved adoption and gave the team a durable foundation for future releases.",
      },
    ],
    palette: {
      base: "#ded7ff",
      accent: "#8f7df5",
      ink: "#171717",
    },
  },
  {
    slug: "meridian-commerce",
    title: "Meridian Commerce",
    client: "Retail group",
    category: "Commerce ecosystem",
    year: "2025",
    duration: "10 weeks",
    role: "Design lead",
    headline:
      "A commerce architecture refresh that made merchandising and storytelling work within the same system.",
    summary:
      "Meridian Commerce modernized a premium retail brand's digital storefront and content tooling without losing editorial character.",
    description:
      "The work focused on homepage composition, collection discovery, modular storytelling blocks, and a cleaner mobile purchase path. The challenge was balancing conversion performance with a stronger brand point of view.",
    services: [
      "Experience strategy",
      "Interface design",
      "Content systems",
      "Ecommerce UX",
    ],
    stack: ["Next.js", "Sanity", "Shopify", "Vercel"],
    metrics: [
      { label: "Conversion rate", value: "+18%" },
      { label: "Mobile revenue", value: "+27%" },
      { label: "Content publishing", value: "2.1x faster" },
    ],
    outcomes: [
      "Created a modular system of campaign blocks that marketing could assemble without engineering support.",
      "Reworked navigation and collection logic to reduce dead-end browsing patterns.",
      "Improved product storytelling through typography, spacing, and tighter asset hierarchy.",
    ],
    detailSections: [
      {
        heading: "Problem",
        body:
          "The legacy storefront forced commerce and editorial content into separate templates, which meant the team either sacrificed conversion clarity or brand storytelling every launch cycle.",
      },
      {
        heading: "Approach",
        body:
          "I designed a library of composable content modules and paired them with a more disciplined commerce hierarchy so campaigns could feel expressive without becoming structurally inconsistent.",
      },
      {
        heading: "Result",
        body:
          "The new system gave the brand room to speak visually while keeping shopping flows cleaner, faster, and easier to operate internally.",
      },
    ],
    palette: {
      base: "#b6f2d0",
      accent: "#11b36c",
      ink: "#102117",
    },
  },
  {
    slug: "atlas-health",
    title: "Atlas Health",
    client: "Healthcare startup",
    category: "Service design",
    year: "2024",
    duration: "12 weeks",
    role: "Senior product designer",
    headline:
      "A patient-facing service experience that translated complex healthcare logistics into a dependable digital journey.",
    summary:
      "Atlas Health redesigned onboarding, scheduling, and care coordination into one clearer experience for patients and support staff.",
    description:
      "The work spanned research synthesis, patient journey mapping, interface design, and prototype testing. The goal was to lower anxiety and simplify the service model without hiding necessary complexity.",
    services: [
      "Research synthesis",
      "Service design",
      "Interface design",
      "Prototype testing",
    ],
    stack: ["React", "TypeScript", "Figma", "Maze"],
    metrics: [
      { label: "Appointment booking", value: "+29%" },
      { label: "Drop-off rate", value: "-35%" },
      { label: "Patient confidence", value: "+22 pts" },
    ],
    outcomes: [
      "Reduced ambiguity in onboarding with clearer progress framing and action design.",
      "Improved scheduling comprehension by turning fragmented medical logistics into stepwise guidance.",
      "Gave care coordinators a more consistent operational view of patient status and next actions.",
    ],
    detailSections: [
      {
        heading: "Problem",
        body:
          "Patients were asked to make high-stakes decisions inside a product that assumed too much prior knowledge. That led to hesitation, support overhead, and broken journeys.",
      },
      {
        heading: "Approach",
        body:
          "I reframed the experience around reassurance, sequence, and status visibility. Every screen was designed to answer one essential question: what happens next and why does it matter?",
      },
      {
        heading: "Result",
        body:
          "The product became easier to trust. Patients moved through enrollment with less uncertainty, and internal teams spent less time manually repairing confusion.",
      },
    ],
    palette: {
      base: "#ffd5e7",
      accent: "#ee5d96",
      ink: "#27131c",
    },
  },
];

export const principles = [
  {
    title: "Systems before screens",
    body:
      "The strongest interfaces come from clearer models, language, and structure. I treat visual design as the expression of a product system, not a layer added at the end.",
  },
  {
    title: "Restraint is a feature",
    body:
      "Interfaces should reduce noise, not perform for attention. I prefer hierarchy, pacing, and motion that support understanding instead of competing with it.",
  },
  {
    title: "Design and code should meet early",
    body:
      "I work close to implementation so decisions hold up under real constraints. That usually means better quality, fewer surprises, and a more credible design process.",
  },
];

export const capabilities = [
  "Product strategy and discovery",
  "UX and information architecture",
  "Design systems and component libraries",
  "High-fidelity prototyping",
  "Frontend implementation in React and Next.js",
  "Content design and launch support",
];

export const writing = [
  {
    title: "Designing quieter interfaces",
    description:
      "A short essay on reducing UI noise without reducing capability.",
    href: "/writing#quieter-interfaces",
  },
  {
    title: "What makes a useful design system",
    description:
      "Notes on documentation, governance, and shipping components that teams actually want to use.",
    href: "/writing#useful-design-systems",
  },
  {
    title: "Why product language matters",
    description:
      "A framework for naming, labels, and microcopy that makes software feel more coherent.",
    href: "/writing#product-language",
  },
];

export const contactChannels = [
  {
    label: "Email",
    value: "hello@yourname.com",
    href: "mailto:hello@yourname.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/yourname",
    href: "https://www.linkedin.com/in/yourname/",
  },
  {
    label: "GitHub",
    value: "github.com/yourname",
    href: "https://github.com/yourname",
  },
];
