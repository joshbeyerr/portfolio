export type Project = {
  slug: string;
  title: string;
  heroTitle?: string;
  client: string;
  website?: string;
  category: string;
  pageMode?: "full" | "brief";
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
  | "standard"
  | "magnetic"
  | "project-preview"
  | "blur-glass";

export type LandingCarouselItem = {
  id: string;
  title: string;
  label: string;
  description: string;
  group: "work" | "project";
  href?: string;
  tileHeight?: number;
  tileWidth?: number;
  image?: {
    src: string;
    alt: string;
  };
  variant:
    | "trip"
    | "brooklyn"
    | "cadillac"
    | "allup"
    | "music"
    | "signal"
    | "image"
    | "image-bleed"
    | "lapis"
    | "cidel"
    | "resyd";
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
  { id: "standard", label: "standard" },
  { id: "magnetic", label: "magnetic" },
  { id: "project-preview", label: "project preview" },
  { id: "blur-glass", label: "blur glass" },
];

export const tickerMessages = [
  "New logo and identity system for Scribd by Mother Design",
  "Selected independent work across product systems, brand, and frontend craft",
  "Motion-driven cursor modes now include magnetic, project preview, and blur glass",
];

export const landingCarouselItems: LandingCarouselItem[] = [
  {
    id: "td-securities",
    title: "TD Securities",
    label: "TD Securities",
    description: "Software Engineer Intern: Trader-facing risk platform engineering",
    group: "work",
    href: "/projects/td-securities",
    image: {
      src: "/carousel/td.jpg",
      alt: "TD Securities",
    },
    variant: "image-bleed",
    size: "square",
    tileWidth: 176,
    tileHeight: 176,
  },

  {
    id: "westernuai",
    title: "WesternU AI",
    label: "WesternU AI",
    description: "University AI initiative and experiments",
    group: "project",
    href: "/projects/westernu-ai",
    image: {
      src: "/carousel/westernuai_logo.jpg",
      alt: "WesternU AI",
    },
    variant: "image",
    size: "square",
    tileWidth: 164,
    tileHeight: 164,
  },
  {
    id: "in-between-spaces",
    title: "The In-Between Spaces",
    label: "The In-Between Spaces",
    description:
      "Community map for third spaces and coworking spots across Toronto",
    group: "project",
    href: "/projects/in-between-spaces",
    image: {
      src: "/carousel/in-between.jpg",
      alt: "The In-Between Spaces",
    },
    variant: "image-bleed",
    size: "square",
    tileWidth: 178,
    tileHeight: 178,
  },
  {
    id: "brooklyn",
    title: "Brooklyn Org",
    label: "Brooklyn Org",
    description: "Editorial campaign and identity study",
    group: "project",
    href: "/projects/brooklyn-org",
    variant: "brooklyn",
    size: "square",
  },
  {
    id: "cadillac",
    title: "Cadillac",
    label: "Cadillac",
    description: "Luxury marque visual treatment",
    group: "project",
    href: "/projects/cadillac",
    variant: "cadillac",
    size: "wide",
  },
  {
    id: "allup",
    title: "all up",
    label: "allup",
    description: "Compressed wordmark campaign concept",
    group: "project",
    href: "/projects/allup",
    variant: "allup",
    size: "wide",
  },
  {
    id: "get-resyd",
    title: "Get Resyd",
    label: "Get Resyd",
    description:
      "Automatic restaurant reservation booking for last-minute planners",
    group: "project",
    href: "/projects/get-resyd",
    variant: "resyd",
    size: "wide",
    tileWidth: 194,
    tileHeight: 128,
  },
  {
    id: "music",
    title: "Mucho",
    label: "Mucho",
    description: "Poster-style art direction study",
    group: "project",
    href: "/projects/mucho",
    variant: "music",
    size: "square",
  },
  {
    id: "signal",
    title: "Deloe",
    label: "Deloe",
    description: "Monochrome poster and brand exploration",
    group: "project",
    href: "/projects/deloe",
    variant: "signal",
    size: "wide",
  },

  {
    id: "lapis",
    title: "Lapis",
    label: "Lapis",
    description: "Founding Engineer: AI Native Research Project Management Startup. Full-stack development",
    group: "work",
    href: "/projects/lapis",
    image: {
      src: "/carousel/lapis_logo_.png",
      alt: "Lapis",
    },
    variant: "image",
    size: "square",
    tileWidth: 188,
    tileHeight: 188,
  },
  {
    id: "cidel",
    title: "Cidel",
    label: "Cidel Asset Management",
    description: "Software Development Intern: Secure banking platform and automation pipelines",
    group: "work",
    href: "/projects/cidel",
    image: {
      src: "/carousel/Cidel.jpg",
      alt: "Cidel Asset Management",
    },
    variant: "cidel",
    size: "square",
  },
  {
    id: "kic-product-acquisition",
    title: "KIC Product Acquisition",
    label: "KIC Product Acquisition",
    description: "Founder: Pricing, arbitrage, and analytics systems",
    group: "work",
    href: "/projects/kic-product-acquisition",
    image: {
      src: "/carousel/kic_product_acquisition_logo.jpg",
      alt: "KIC Product Acquisition",
    },
    variant: "image",
    size: "wide",
    tileWidth: 186,
    tileHeight: 122,
  },

  {
    id: "cohere-ai",
    title: "Cohere AI",
    label: "Cohere AI",
    description: "Data Annotation: LLM evaluation and dataset annotation",
    group: "work",
    href: "/projects/cohere-ai",
    image: {
      src: "/carousel/cohere_ai_logo.jpg",
      alt: "Cohere AI",
    },
    variant: "image-bleed",
    size: "square",
    tileWidth: 170,
    tileHeight: 170,
  },

];

export const projects: Project[] = [
  {
    slug: "td-securities",
    title: "TD Securities",
    heroTitle: "Risk Systems",
    client: "TD Securities",
    category: "Work",
    pageMode: "full",
    year: "2026",
    duration: "Jan 2026 - Present",
    role: "Software Engineer Intern",
    headline: "Trader-facing risk tools across backend services and frontend workflows.",
    summary:
      "Built Java backend services, REST APIs, and React features for a trader-facing risk management platform.",
    description:
      "At TD Securities, the work focused on platform reliability and clearer portfolio risk visibility for trading teams. The role spans backend service development, frontend feature delivery, and test coverage inside a regulated financial system.",
    services: ["Backend services", "React frontend", "Testing", "Platform reliability"],
    stack: ["Java", "React", "REST APIs", "Unit tests", "Integration tests"],
    metrics: [
      { label: "Focus", value: "Risk" },
      { label: "Surface", value: "Trader UI" },
      { label: "System", value: "Java APIs" },
    ],
    outcomes: [
      "Improved how portfolio risk and exposure are surfaced for trading teams.",
      "Refactored critical Java paths to reduce latency and improve production stability.",
      "Added unit and integration tests to support safer iteration in a regulated codebase.",
    ],
    detailSections: [
      {
        heading: "Backend",
        body:
          "Built Java backend services and REST APIs for trader-facing risk workflows, with an emphasis on reliability and maintainability.",
      },
      {
        heading: "Frontend",
        body:
          "Owned React feature work that made portfolio risk and exposure easier to read and act on inside the product.",
      },
      {
        heading: "Quality",
        body:
          "Wrote tests and refactored sensitive code paths to make changes safer in production financial systems.",
      },
    ],
    palette: {
      base: "#34c759",
      accent: "#0e8f39",
      ink: "#102117",
    },
  },
  {
    slug: "cidel",
    title: "Cidel Asset Management",
    heroTitle: "Banking Platform",
    client: "Cidel Asset Management",
    category: "Work",
    pageMode: "full",
    year: "2024",
    duration: "Apr 2024 - Sep 2024",
    role: "Software Development Intern",
    headline: "Secure banking workflows and automation for high-volume financial operations.",
    summary:
      "Designed and deployed a secure banking platform and built automation pipelines that reduced processing from hours to minutes.",
    description:
      "The work combined platform design with operational automation. One track focused on a secure ACID-compliant banking platform, while another focused on Python and C# pipelines for financial data processing.",
    services: ["Platform design", "Automation", "Financial data processing"],
    stack: ["Python", "C#", "Banking systems", "Automation pipelines"],
    metrics: [
      { label: "Volume", value: "$5M+" },
      { label: "Speed", value: "Hours -> Minutes" },
      { label: "Model", value: "ACID" },
    ],
    outcomes: [
      "Shipped a secure banking platform with strong correctness guarantees.",
      "Reduced end-to-end processing time from hours to minutes.",
      "Improved operational efficiency for high-volume financial workflows.",
    ],
    detailSections: [
      {
        heading: "Platform",
        body:
          "Designed and deployed a secure platform for banking workflows with strong guarantees around data integrity and correctness.",
      },
      {
        heading: "Automation",
        body:
          "Built Python and C# pipelines to process large volumes of financial data significantly faster.",
      },
    ],
    palette: {
      base: "#efe9de",
      accent: "#8b6d47",
      ink: "#24180f",
    },
  },
  {
    slug: "lapis",
    title: "Lapis",
    heroTitle: "Search Startup",
    client: "Lapis",
    category: "Work",
    pageMode: "full",
    year: "2024 - 2026",
    duration: "Jul 2024 - Present",
    role: "Founding Engineer / Software Engineer",
    headline: "Semantic search, document systems, and enterprise integrations for research workflows.",
    summary:
      "Built backend services and distributed systems for semantic search, document querying, and production-grade storage integrations.",
    description:
      "At Lapis, the work centered on infrastructure for search and document understanding. That included backend services, storage and sync integrations, authentication flows, and research dataset querying.",
    services: ["Backend systems", "Search infrastructure", "Integrations", "Authentication"],
    stack: ["FastAPI", "PostgreSQL", "Azure Storage", "OAuth2", "GitHub", "Google Drive", "OneDrive"],
    metrics: [
      { label: "Core", value: "Search" },
      { label: "Data", value: "Docs" },
      { label: "Auth", value: "OAuth2" },
    ],
    outcomes: [
      "Built systems for semantic search and large-scale document querying.",
      "Implemented integrations across cloud storage providers and GitHub.",
      "Enabled secure user access and scoped permissions with Azure AD flows.",
    ],
    detailSections: [
      {
        heading: "Search",
        body:
          "Built backend services and distributed systems to support semantic search across large research datasets.",
      },
      {
        heading: "Integrations",
        body:
          "Implemented production-grade Google Drive, OneDrive, cloud storage, and GitHub integrations with reliable sync workflows.",
      },
      {
        heading: "Access",
        body:
          "Built Azure Active Directory OAuth2 flows to support secure authentication and scoped third-party access.",
      },
    ],
    palette: {
      base: "#d5e4ff",
      accent: "#3067ad",
      ink: "#102033",
    },
  },
  {
    slug: "in-between-spaces",
    title: "The In-Between Spaces",
    heroTitle: "Toronto Third Spaces",
    client: "Independent Collaboration",
    website: "https://www.inbetweenspace.ca/",
    category: "Project",
    pageMode: "full",
    year: "2026",
    duration: "Independent",
    role: "Frontend / Product / Mapping",
    headline:
      "A community-first map for finding third spaces and coworking spots across Toronto.",
    summary:
      "Built with a friend, the site helps people discover places in Toronto to work, gather, and find community outside home and the office.",
    description:
      "The In-Between Spaces is a practical community tool: a live map of third spaces and coworking locations across Toronto. The product balances utility with a quieter visual identity, making it easy to browse places that support work, social connection, and everyday community-building.",
    services: [
      "Product design",
      "Frontend development",
      "Map UX",
      "Community discovery",
    ],
    stack: ["Next.js", "React", "Maps", "Location data", "Responsive UI"],
    metrics: [
      { label: "City", value: "Toronto" },
      { label: "Focus", value: "Community" },
      { label: "Surface", value: "Map UI" },
    ],
    outcomes: [
      "Created a cleaner way to browse third spaces and coworking options across Toronto.",
      "Turned a community-oriented idea into an accessible public-facing map product.",
      "Shaped the interface to support both quick scanning and exploratory discovery.",
    ],
    detailSections: [
      {
        heading: "Product",
        body:
          "Built the site with a friend as a simple, useful way for people in Toronto to find places to work, meet, and spend time beyond home and the office.",
      },
      {
        heading: "Interface",
        body:
          "Used a restrained visual system so the map, location details, and discovery flow stayed clear rather than feeling overloaded.",
      },
      {
        heading: "Community",
        body:
          "The core value is helping people find community through physical places that support focus, chance encounters, and repeat visits.",
      },
    ],
    palette: {
      base: "#111111",
      accent: "#d9d9d9",
      ink: "#f5f5f2",
    },
  },
  {
    slug: "get-resyd",
    title: "Get Resyd",
    heroTitle: "Reservation Booker",
    client: "Independent Product",
    website: "https://table-finder-sigma.vercel.app/",
    category: "Project",
    pageMode: "full",
    year: "2026",
    duration: "Independent",
    role: "Product / Frontend / Automation",
    headline:
      "An automatic restaurant reservation tool built for last-minute bookers.",
    summary:
      "Get Resyd monitors reservation availability and can auto-book openings, making it easier to grab tables without constantly refreshing restaurant booking sites.",
    description:
      "Get Resyd is a practical booking product built for people who decide late and still want a good shot at getting a reservation. The interface is intentionally direct and utility-first: configure the restaurant, choose whether to monitor or auto-book, and let the product handle the repetitive checking.",
    services: [
      "Product design",
      "Frontend development",
      "Booking automation",
      "Workflow design",
    ],
    stack: [
      "Next.js",
      "React",
      "Automation workflows",
      "Reservation monitoring",
      "Responsive UI",
    ],
    metrics: [
      { label: "Mode", value: "Auto-book" },
      { label: "User", value: "Last-minute" },
      { label: "Flow", value: "Monitor" },
    ],
    outcomes: [
      "Reduced the manual effort of checking restaurant availability over and over.",
      "Designed a straightforward booking flow around monitoring and automatic reservation capture.",
      "Built the product around a real user behavior: deciding late and moving fast when a slot appears.",
    ],
    detailSections: [
      {
        heading: "Use case",
        body:
          "Made for myself and other last-minute bookers who want a better chance at high-demand reservations without babysitting booking pages.",
      },
      {
        heading: "Flow",
        body:
          "The product centers on a simple decision: monitor only, or automatically book the moment an eligible table opens up.",
      },
      {
        heading: "Design",
        body:
          "Kept the interface lightweight and task-focused, using a form-led layout that feels more like a control panel than a marketing site.",
      },
    ],
    palette: {
      base: "#edf3ff",
      accent: "#1f64ff",
      ink: "#12213f",
    },
  },
  {
    slug: "kic-product-acquisition",
    title: "KIC Product Acquisition",
    heroTitle: "Pricing Engine",
    client: "KIC Product Acquisition",
    category: "Work",
    pageMode: "full",
    year: "2021 - 2025",
    duration: "Nov 2021 - Aug 2025",
    role: "Founder",
    headline: "Automated pricing and arbitrage systems for marketplace assets.",
    summary:
      "Engineered pricing, analytics, and reconciliation systems that scaled a founder-led business to $2M in revenue.",
    description:
      "KIC combined software and operations. The core work focused on marketplace pricing systems, arbitrage logic, and analytics pipelines that improved pricing accuracy and decision-making.",
    services: ["Automation", "Analytics", "Pricing systems", "Operations tooling"],
    stack: ["Python", "Analytics pipelines", "Marketplace automation"],
    metrics: [
      { label: "Revenue", value: "$2M" },
      { label: "Model", value: "Arbitrage" },
      { label: "Focus", value: "Pricing" },
    ],
    outcomes: [
      "Built automated pricing systems for StockX-style markets.",
      "Scaled a founder-led business to $2M in revenue.",
      "Improved pricing accuracy and operational efficiency with analytics and reconciliation tooling.",
    ],
    detailSections: [
      {
        heading: "Systems",
        body:
          "Engineered pricing and arbitrage systems for marketplace assets with a focus on timing, accuracy, and operational leverage.",
      },
      {
        heading: "Decisioning",
        body:
          "Built analytics and reconciliation pipelines to support pricing decisions and day-to-day execution.",
      },
    ],
    palette: {
      base: "#f2f2f0",
      accent: "#717171",
      ink: "#161616",
    },
  },
  {
    slug: "cohere-ai",
    title: "Cohere",
    heroTitle: "LLM QA",
    client: "Cohere",
    category: "Work",
    pageMode: "brief",
    year: "2025 - 2026",
    duration: "Sep 2025 - Jan 2026",
    role: "ML Data Annotation (Contract)",
    headline: "Dataset evaluation and QA work supporting production LLM training.",
    summary:
      "Annotated and evaluated NLP datasets for LLM training, benchmarking, and quality assurance.",
    description:
      "Contract work focused on dataset quality and evaluation for production language model workflows.",
    services: ["Dataset annotation", "Benchmarking", "QA"],
    stack: ["NLP datasets", "Evaluation workflows"],
    metrics: [],
    outcomes: [
      "Supported production model training and benchmarking workflows.",
      "Contributed evaluation and QA work across NLP datasets.",
    ],
    detailSections: [
      {
        heading: "Scope",
        body:
          "Annotated and evaluated NLP datasets used in model training, benchmarking, and QA processes.",
      },
    ],
    palette: {
      base: "#ece8e8",
      accent: "#486757",
      ink: "#1a2220",
    },
  },
  {
    slug: "deloe",
    title: "Deloe",
    heroTitle: "Poster Study",
    client: "Self-Initiated",
    category: "Project",
    pageMode: "brief",
    year: "2025",
    duration: "Independent",
    role: "Design / Frontend Exploration",
    headline: "A sharp monochrome poster system used to test hierarchy and rhythm.",
    summary:
      "A self-directed visual study focused on contrast, compressed typography, and editorial pacing.",
    description:
      "Deloe is a compact brand and poster exploration built to test how much personality can come from a restrained monochrome system.",
    services: ["Visual direction", "Typography", "Frontend exploration"],
    stack: ["Type", "Layout", "Brand experiments"],
    metrics: [],
    outcomes: [
      "Explored a more severe monochrome visual rhythm.",
      "Pressure-tested poster-like hierarchy in a digital frame.",
    ],
    detailSections: [
      {
        heading: "Idea",
        body:
          "A short exploration into editorial contrast, narrow spacing, and more aggressive title rhythm.",
      },
    ],
    palette: {
      base: "#f2f2f2",
      accent: "#141414",
      ink: "#141414",
    },
  },
  {
    slug: "brooklyn-org",
    title: "Brooklyn Org",
    heroTitle: "Editorial Civic",
    client: "Self-Initiated",
    category: "Project",
    pageMode: "brief",
    year: "2025",
    duration: "Independent",
    role: "Campaign Exploration",
    headline: "A civic editorial identity study with poster-like composition and harder contrast.",
    summary:
      "A concept centered on campaign rhythm, typography, and stronger civic tone.",
    description:
      "This piece explores how an editorial system can feel active and public-facing without becoming visually noisy.",
    services: ["Campaign design", "Editorial layout"],
    stack: ["Typography", "Identity studies"],
    metrics: [],
    outcomes: ["Explored civic and editorial cues.", "Built a tighter poster-inspired composition system."],
    detailSections: [{ heading: "Idea", body: "A brief campaign concept driven by editorial hierarchy and public-interest cues." }],
    palette: { base: "#dcc2ae", accent: "#7c5034", ink: "#23160f" },
  },
  {
    slug: "cadillac",
    title: "Cadillac",
    heroTitle: "Black Field",
    client: "Self-Initiated",
    category: "Project",
    pageMode: "brief",
    year: "2025",
    duration: "Independent",
    role: "Brand Study",
    headline: "A restrained automotive marque treatment built on contrast and chrome detail.",
    summary:
      "A minimal luxury-brand study exploring a black field, metallic cues, and hard-edged framing.",
    description:
      "The concept focuses on restraint rather than motion, using a sparse field to make the marque do the work.",
    services: ["Brand study", "Art direction"],
    stack: ["Minimal composition", "Brand treatments"],
    metrics: [],
    outcomes: ["Explored a quieter luxury visual system.", "Tested black-field composition with restrained detail."],
    detailSections: [{ heading: "Idea", body: "A short study in restraint, contrast, and minimal luxury framing." }],
    palette: { base: "#111111", accent: "#5d5d5d", ink: "#f2f2ef" },
  },
  {
    slug: "allup",
    title: "allup",
    heroTitle: "Wordmark Push",
    client: "Self-Initiated",
    category: "Project",
    pageMode: "brief",
    year: "2025",
    duration: "Independent",
    role: "Campaign Exploration",
    headline: "A bright campaign tile used to test compressed typography and louder color.",
    summary:
      "A quick visual concept built around oversized wordmark pressure and a hotter palette.",
    description:
      "This exploration is less about system depth and more about testing energy, compression, and immediate recall.",
    services: ["Typography exploration", "Visual experiments"],
    stack: ["Wordmark", "Color", "Layout"],
    metrics: [],
    outcomes: ["Explored a louder campaign voice.", "Tested compressed type as the main visual asset."],
    detailSections: [{ heading: "Idea", body: "A short experiment in compression, color, and oversized type." }],
    palette: { base: "#ff7d57", accent: "#d44818", ink: "#2a140f" },
  },
  {
    slug: "mucho",
    title: "Mucho",
    heroTitle: "Poster Green",
    client: "Self-Initiated",
    category: "Project",
    pageMode: "brief",
    year: "2025",
    duration: "Independent",
    role: "Art Direction Study",
    headline: "A poster-driven exploration using paper textures and a softer green palette.",
    summary:
      "A graphic study that mixes sticker-like typography with warmer paper-inspired surfaces.",
    description:
      "Mucho is a concise visual exploration into texture, print cues, and poster composition translated into a digital tile.",
    services: ["Art direction", "Poster exploration"],
    stack: ["Graphic design", "Texture", "Typography"],
    metrics: [],
    outcomes: ["Explored a more tactile color-and-paper mood.", "Tested poster logic inside a UI-adjacent composition."],
    detailSections: [{ heading: "Idea", body: "A brief poster-style study built around texture and playful composition." }],
    palette: { base: "#ddf0be", accent: "#4d7f3b", ink: "#18301d" },
  },
  {
    slug: "westernu-ai",
    title: "WesternU AI",
    heroTitle: "Campus AI",
    client: "University Project",
    category: "Project",
    pageMode: "brief",
    year: "2025",
    duration: "Independent",
    role: "Technical / Brand Exploration",
    headline: "A compact visual and product exploration for a university AI initiative.",
    summary:
      "A short concept tying academic identity to a cleaner AI-oriented visual system.",
    description:
      "WesternU AI is a lighter-weight concept focused on identity and presentation rather than a full product case study.",
    services: ["Identity study", "Presentation design"],
    stack: ["Brand", "Layout", "Visual systems"],
    metrics: [],
    outcomes: ["Explored a clearer AI initiative identity.", "Used logo-led composition instead of a deeper product system."],
    detailSections: [{ heading: "Idea", body: "A brief identity and interface direction for a university AI initiative." }],
    palette: { base: "#e7ecff", accent: "#719cf0", ink: "#18223d" },
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
