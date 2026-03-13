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
  briefSections?: { heading: string; body: string }[];
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
  tileStyle?: "default" | "logo";
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
  size: "wide" | "square";
};

export const profile = {
  name: "Joshua Beyer",
  role: "Software engineer and product-minded builder",
  location: "Toronto and London, Ontario",
  availability: "Open to internships, full-time roles, and select projects in 2026",
  email: "joshuabeyer2@gmail.com",
  manifesto:
    "I build digital products that feel calm, precise, and unmistakably useful.",
  introduction:
    "Computer science student and software engineer building across finance, AI tooling, maps, and product systems.",
  socialLinks: [
    { label: "GitHub", href: "https://github.com/joshbeyerr" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/joshua-beyer-8541b3199/",
    },
    { label: "Email", href: "mailto:joshuabeyer2@gmail.com" },
  ],
};

export const navigationItems = [
  { label: "Work", href: "/work" },
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
  },

  {
    id: "westernuai",
    title: "WesternU AI",
    label: "WesternU AI",
    description: "Volunteer finance leadership and sponsor outreach tooling",
    group: "work",
    href: "/projects/westernu-ai",
    image: {
      src: "/carousel/westernuai_logo_transparent.png",
      alt: "WesternU AI",
    },
    variant: "image",
    size: "square",
    tileStyle: "logo",
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
    tileStyle: "logo",
  },
  {
    id: "cidel",
    title: "Cidel",
    label: "Cidel Asset Management",
    description: "Software Development Intern: Secure banking platform and automation pipelines",
    group: "work",
    href: "/projects/cidel",
    image: {
      src: "/carousel/cidel.svg",
      alt: "Cidel Asset Management",
    },
    variant: "image",
    size: "square",
    tileStyle: "logo",
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
    tileStyle: "logo",
  },

  {
    id: "cohere-ai",
    title: "Cohere AI",
    label: "Cohere AI",
    description: "Data Annotation: LLM evaluation and dataset annotation",
    group: "work",
    href: "/projects/cohere-ai",
    image: {
      src: "/carousel/cohere_ai_logo.png",
      alt: "Cohere AI",
    },
    variant: "image-bleed",
    size: "square",
    tileStyle: "logo",
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
    role: "Software Engineer Co-op",
    headline: "Market risk tooling across Java services, React workflows, and endpoint reliability.",
    summary:
      "Building Java services, regression testing, and React improvements for TD Securities' Market Risk Insights platform.",
    description:
      "On the Market Risk Insights team, the work spans Java backend development, React feature work, and regression coverage for a trader-facing risk platform. The focus is making core endpoints safer to ship, improving how the product reads for end users and internal testers, and supporting new internal tooling connected through a Solace-backed message queue.",
    services: ["Java backend", "Regression testing", "React frontend", "Platform reliability"],
    stack: ["Java", "React", "Cucumber", "REST APIs", "Regression tests", "Solace"],
    metrics: [
      { label: "Team", value: "MRI" },
      { label: "Focus", value: "Endpoint reliability" },
      { label: "Surface", value: "Trader + internal UI" },
    ],
    outcomes: [
      "Built regression coverage around important endpoints so production issues are caught before release.",
      "Found and fixed an endpoint failure mode that could trigger exponential database calls, causing 30 second responses or crashes in some scenarios.",
      "Reduced that endpoint path to a few seconds while making the broader release process safer for a regulated system.",
    ],
    detailSections: [
      {
        heading: "Backend",
        body:
          "Build Java services and upgrade endpoints that support trader-facing market risk workflows, with a strong emphasis on maintainability, production safety, and predictable performance.",
      },
      {
        heading: "Testing",
        body:
          "Built Cucumber-based regression suites around critical endpoints and used them to catch a high-impact failure mode where certain scenarios caused an endpoint to make an exponential number of database calls.",
      },
      {
        heading: "Frontend",
        body:
          "Work in React to improve the platform's visuals for end users and internal testing teams, and help build a new internal product that manages failures across applications connected by a Solace queue.",
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
    pageMode: "brief",
    year: "2024",
    duration: "Apr 2024 - Sep 2024",
    role: "Software Development Intern",
    headline: "Built secure banking workflows and automation that made financial operations faster and more dependable.",
    summary:
      "Designed a secure internal banking platform and shipped automation pipelines that cut important processing flows from hours to minutes.",
    description:
      "This role combined application development with operational automation. I worked on a secure internal banking platform with strong correctness requirements, while also building Python and C# pipelines that removed manual processing from high-volume financial workflows.",
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
          "Designed and deployed a secure platform for banking workflows where data integrity and correctness were non-negotiable.",
      },
      {
        heading: "Automation",
        body:
          "Built Python and C# pipelines that handled repetitive financial processing work far more quickly and consistently than the old manual flow.",
      },
    ],
    briefSections: [
      {
        heading: "Tools",
        body:
          "Python, C#, internal banking systems, and automation pipelines tied to financial operations.",
      },
      {
        heading: "Built",
        body:
          "I worked on a secure internal banking platform and built automation flows for processing financial data. A big part of the job was translating manual, operations-heavy work into software that was more reliable and much faster to run.",
      },
      {
        heading: "Learned",
        body:
          "This role sharpened how I think about correctness, traceability, and trust in financial software. It also taught me how much value comes from removing small operational bottlenecks when they sit inside a high-volume workflow.",
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
    year: "2025 - Present",
    duration: "Jul 2025 - Present",
    role: "Founding Engineer / Software Engineer",
    headline: "Semantic search, document systems, and enterprise integrations for research workflows.",
    summary:
      "Built backend services and distributed systems for semantic search, document querying, and production-grade storage integrations.",
    description:
      "At Lapis, the work centered on infrastructure for search and document understanding. That included backend services, storage and sync integrations, authentication flows, research dataset querying, and product surfaces built across Node.js, Next.js, PostgreSQL, Azure, LangChain, OpenAI, FastAPI, vector databases, and Redis.",
    services: ["Backend systems", "Search infrastructure", "Integrations", "Authentication"],
    stack: [
      "Node.js",
      "Next.js",
      "PostgreSQL",
      "Azure",
      "LangChain",
      "OpenAI",
      "FastAPI",
      "Vector DB",
      "Redis",
      "OAuth2",
      "GitHub",
      "Google Drive",
      "OneDrive",
    ],
    metrics: [
      { label: "What it does", value: "Search across research work" },
      { label: "Data", value: "Papers, notes, and repos" },
      { label: "Sign-in", value: "Single sign-on (Google, GitHub, etc.)" },
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
          "Built backend services and distributed systems to support semantic search across large research datasets, including retrieval and vector-backed querying workflows.",
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
      {
        heading: "Stack",
        body:
          "The product and platform work spanned Node.js, Next.js, PostgreSQL, Azure, LangChain, OpenAI, FastAPI, vector databases, and Redis alongside the storage and integration layer.",
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
    pageMode: "brief",
    year: "2026",
    duration: "Independent",
    role: "Frontend / Product / Mapping",
    headline:
      "A community-first map for finding third spaces and coworking spots across Toronto.",
    summary:
      "Built with a friend, the site helps people discover places in Toronto to work, gather, and find community outside home and the office.",
    description:
      "The In-Between Spaces is a practical community tool: a live map of third spaces and coworking locations across Toronto. We focused on making the browsing experience feel calm and useful so the map, location details, and discovery flow stayed easy to scan.",
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
    briefSections: [
      {
        heading: "Tools",
        body:
          "Next.js, React, mapping interfaces, location data, and responsive UI work.",
      },
      {
        heading: "Built",
        body:
          "I helped shape the product and frontend for a public-facing map that makes third spaces across Toronto easier to discover. The work was less about visual noise and more about making place browsing, map interactions, and location details feel straightforward.",
      },
      {
        heading: "Learned",
        body:
          "This project reinforced how much product quality comes from information hierarchy. When you are working with maps and place data, small interface decisions have a big effect on whether the product feels inviting or overwhelming.",
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
    pageMode: "brief",
    year: "2026",
    duration: "Independent",
    role: "Product / Frontend / Automation",
    headline:
      "An automatic restaurant reservation tool built for people who book late and move fast.",
    summary:
      "Get Resyd monitors reservation availability and can auto-book openings, making it easier to grab tables without constantly refreshing booking sites.",
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
    briefSections: [
      {
        heading: "Tools",
        body:
          "Next.js, React, reservation monitoring logic, automation workflows, and responsive UI.",
      },
      {
        heading: "Built",
        body:
          "I built the product around a simple but real user need: if a reservation opens up, act on it immediately. The app lets someone set the restaurant and booking preferences, then either watch for openings or auto-book when the right slot appears.",
      },
      {
        heading: "Learned",
        body:
          "This project was a good exercise in reducing a messy real-world workflow into one clear decision path. It also pushed me to think more carefully about how automation should feel in the UI: powerful, but still easy to trust.",
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
    pageMode: "brief",
    year: "2021 - 2025",
    duration: "Nov 2021 - Aug 2025",
    role: "Founder",
    headline: "Built pricing and arbitrage systems that helped grow a founder-led business to $2M in revenue.",
    summary:
      "Engineered pricing, analytics, and reconciliation systems that scaled a founder-led business to $2M in revenue.",
    description:
      "KIC combined software, operations, and decision-making. I built pricing systems, arbitrage logic, and analytics workflows that made the business faster, sharper, and more repeatable as it grew.",
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
    briefSections: [
      {
        heading: "Tools",
        body:
          "Python, analytics pipelines, marketplace automation, pricing logic, and reconciliation tooling.",
      },
      {
        heading: "Built",
        body:
          "I built internal systems for pricing, arbitrage, and operational tracking in a marketplace-driven business. That meant creating software that supported buying decisions, pricing accuracy, and the day-to-day workflows needed to scale without adding the same amount of manual effort.",
      },
      {
        heading: "Learned",
        body:
          "Running this sharpened both my product and engineering instincts. It taught me how to build systems that are useful because they tie directly to a business decision, not because they are technically impressive in isolation.",
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
    headline: "Evaluation and QA work supporting production LLM training and benchmarking.",
    summary:
      "Annotated and evaluated NLP datasets used for LLM training, benchmarking, and quality assurance.",
    description:
      "This contract focused on dataset quality and evaluation inside production language model workflows. The work required consistency, careful judgment, and a clear understanding of how annotation quality affects downstream model performance.",
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
    briefSections: [
      {
        heading: "Tools",
        body:
          "NLP datasets, evaluation workflows, benchmarking processes, and QA review frameworks.",
      },
      {
        heading: "Built",
        body:
          "The work centered on annotation and evaluation for production-facing language model datasets. My job was to apply careful judgment consistently so the resulting data was actually useful for training, benchmarking, and review.",
      },
      {
        heading: "Learned",
        body:
          "It gave me a better feel for how much model quality depends on the discipline of the evaluation pipeline. Good data work is not flashy, but it has a direct effect on how credible the final system is.",
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
    heroTitle: "Student Moving MVP",
    client: "Deloe",
    website: "https://deloe-app.vercel.app/home",
    category: "Project",
    pageMode: "brief",
    year: "2025",
    duration: "Startup MVP",
    role: "Full-Stack Product Build",
    headline:
      "Built a student moving marketplace with user-mover matching, pricing flows, and a mover-side dashboard.",
    summary:
      "A startup MVP built to help students find affordable movers by matching them with other students who had access to a car or truck.",
    description:
      "Deloe was a startup MVP for students who needed help moving houses cheaply. I built the product experience, pricing flows, user-mover matching system, integrations, and a mover-side dashboard so students with a car or truck could take on moving jobs.",
    services: ["Product design", "Frontend development", "Systems integration"],
    stack: ["Matching system", "Pricing", "Mover dashboard"],
    metrics: [],
    outcomes: [
      "Built the core marketplace flow for students booking affordable movers.",
      "Created operations tooling for movers through a dedicated dashboard.",
    ],
    detailSections: [
      {
        heading: "Product",
        body:
          "The product was built around a simple idea: connect students who need moving help with other students who already have a car or truck and can do the job for less than traditional movers.",
      },
    ],
    briefSections: [
      {
        heading: "Tools",
        body:
          "Frontend product work, integrations, pricing logic, dashboard design, and marketplace flow implementation.",
      },
      {
        heading: "Built",
        body:
          "I built the website, user and mover flows, matching logic, pricing structure, and a mover-side dashboard to support the operational side of the marketplace.",
      },
      {
        heading: "Learned",
        body:
          "The project was a good exercise in turning a simple marketplace idea into an end-to-end product flow with both customer and operator needs accounted for.",
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
    headline: "A civic editorial identity study with poster-like composition and stronger contrast.",
    summary:
      "A concept centered on campaign rhythm, typography, and a sharper civic tone.",
    description:
      "This piece explores how an editorial system can feel active and public-facing without becoming visually noisy.",
    services: ["Campaign design", "Editorial layout"],
    stack: ["Typography", "Identity studies"],
    metrics: [],
    outcomes: ["Explored civic and editorial cues.", "Built a tighter poster-inspired composition system."],
    detailSections: [{ heading: "Idea", body: "A brief campaign concept driven by editorial hierarchy and public-interest cues." }],
    briefSections: [
      {
        heading: "Tools",
        body:
          "Typography, editorial layout, campaign studies, and identity exploration.",
      },
      {
        heading: "Built",
        body:
          "This was a short concept exploring how a civic-facing identity could feel serious and public without getting visually loud. The focus was on hierarchy, pacing, and a more editorial composition style.",
      },
      {
        heading: "Learned",
        body:
          "It pushed me to be more deliberate about tone. Public-interest work needs energy, but it also needs clarity and restraint if you want it to feel credible.",
      },
    ],
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
    briefSections: [
      {
        heading: "Tools",
        body:
          "Brand treatments, minimal composition, contrast studies, and art direction experiments.",
      },
      {
        heading: "Built",
        body:
          "This concept was about seeing how little was needed to create a convincing luxury feel. I used a sparse composition, sharp contrast, and restrained detail to keep the marque as the main event.",
      },
      {
        heading: "Learned",
        body:
          "It reinforced how much confidence comes from subtraction. If the core visual idea is strong, the work usually improves when you remove noise instead of adding more styling.",
      },
    ],
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
    headline: "A bright campaign study used to test compressed typography and louder color.",
    summary:
      "A quick visual concept built around oversized wordmark pressure and a hotter palette.",
    description:
      "This exploration is less about system depth and more about testing energy, compression, and immediate recall.",
    services: ["Typography exploration", "Visual experiments"],
    stack: ["Wordmark", "Color", "Layout"],
    metrics: [],
    outcomes: ["Explored a louder campaign voice.", "Tested compressed type as the main visual asset."],
    detailSections: [{ heading: "Idea", body: "A short experiment in compression, color, and oversized type." }],
    briefSections: [
      {
        heading: "Tools",
        body:
          "Typography, color studies, wordmark exploration, and layout experiments.",
      },
      {
        heading: "Built",
        body:
          "This was a fast visual study built around one dominant move: push the wordmark hard enough that it becomes the entire composition. The rest of the system exists to support that pressure and energy.",
      },
      {
        heading: "Learned",
        body:
          "It was a useful exercise in committing to one idea. When the visual thesis is clear, you can move quickly and still end up with something that feels intentional.",
      },
    ],
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
    briefSections: [
      {
        heading: "Tools",
        body:
          "Graphic design, texture studies, typography, and poster composition work.",
      },
      {
        heading: "Built",
        body:
          "This study explored how a more tactile, print-inspired mood could translate into a digital composition. I leaned into texture, color warmth, and a looser poster structure rather than a rigid interface system.",
      },
      {
        heading: "Learned",
        body:
          "It helped me think more deliberately about material cues in digital work. Texture and surface can add personality, but only when the layout still feels controlled.",
      },
    ],
    palette: { base: "#ddf0be", accent: "#4d7f3b", ink: "#18301d" },
  },
  {
    slug: "westernu-ai",
    title: "WesternU AI",
    heroTitle: "Campus AI",
    client: "Western AI, Western University",
    category: "Volunteer",
    pageMode: "brief",
    year: "2023 - 2025",
    duration: "Sep 2023 - Apr 2025",
    role: "Director of Finance",
    headline: "Managed club finances and built AI-assisted Python tools to support sponsor outreach for Western AI events.",
    summary:
      "Handled budgets and reimbursements for Western AI while building Python tools that used AI to help identify and acquire new event sponsors.",
    description:
      "Western AI was a Western University club where I served as Director of Finance. The role covered the practical side of running events, including budget management, reimbursements, and event-related financial oversight, while also giving me room to build Python tools that used AI to support sponsor outreach.",
    services: ["Budget management", "Reimbursements", "Sponsor outreach", "Python tooling"],
    stack: ["Python", "AI workflows", "Budget tracking", "Sponsor research"],
    metrics: [],
    outcomes: [
      "Managed budgets and reimbursements for club operations and events.",
      "Built Python tooling that used AI to help source and approach potential sponsors.",
    ],
    detailSections: [
      {
        heading: "Finance",
        body:
          "Managed budgets, processed reimbursements, and oversaw event-related finances for the club.",
      },
    ],
    briefSections: [
      {
        heading: "Tools",
        body:
          "Python, AI-assisted research workflows, budget tracking, reimbursements, and sponsor outreach work.",
      },
      {
        heading: "Built",
        body:
          "I managed the financial side of the club, including budgets, reimbursements, and event spending, and I also built Python tools that used AI to help identify and acquire new sponsors for Western AI events.",
      },
      {
        heading: "Learned",
        body:
          "It was a good mix of operations and building. I learned how to keep a student organization financially organized while also using lightweight tooling to make outreach work more effective.",
      },
    ],
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
    value: "joshuabeyer2@gmail.com",
    href: "mailto:joshuabeyer2@gmail.com",
    copyValue: "joshuabeyer2@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/joshua-beyer-8541b3199",
    href: "https://www.linkedin.com/in/joshua-beyer-8541b3199/",
    copyValue: "https://www.linkedin.com/in/joshua-beyer-8541b3199/",
  },
  {
    label: "GitHub",
    value: "github.com/joshbeyerr",
    href: "https://github.com/joshbeyerr",
    copyValue: "https://github.com/joshbeyerr",
  },
  {
    label: "X",
    value: "x.com/JoshBeyer8",
    href: "https://x.com/JoshBeyer8",
    copyValue: "https://x.com/JoshBeyer8",
  },
];
