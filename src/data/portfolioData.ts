export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  technologies: string[];
  featured: boolean;
  architectureNodes?: { id: string; label: string; sub?: string }[];
  caseStudy: {
    overview: string;
    keyFeatures: string[];
    technicalArchitecture: string;
    impactOrOutcome: string;
    githubUrl?: string;
    liveUrl?: string;
  };
}

export interface ExperienceItem {
  year: string;
  company: string;
  role: string;
  type: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface EducationItem {
  period: string;
  year: string;
  degree: string;
  institution: string;
  score: string;
  scoreLabel: string;
}

export interface SkillItem {
  name: string;
  category: 'programming' | 'backend' | 'frontend' | 'data' | 'database' | 'tools' | 'concepts';
  description: string;
  size: 'lg' | 'md' | 'sm';
  focus?: string;
  appliedIn?: string;
}

export interface TechNode {
  id: string;
  label: string;
  category: 'center' | 'frontend' | 'backend' | 'data' | 'database' | 'tools';
  connections: string[];
}

export const DEVELOPER_INFO = {
  name: 'GURU PRASATH',
  title: 'SOFTWARE • BACKEND DEVELOPMENT • DATA ANALYTICS',
  subtitle: 'Software Engineer | Backend Development & Data Analytics',
  degree: 'B.Tech Computer Science & Business Systems Graduate',
  institution: 'Saranathan College of Engineering',
  timeline: '2022 — 2026',
  location: 'Tiruchirappalli, India',
  availability: 'Open to entry-level engineering roles & freelance projects',
  bioStatement: 'BUILDING WEB APPLICATIONS, BACKEND APIS, AND DATA-DRIVEN SOLUTIONS.',
  bioExtended:
    'Software Engineer specializing in Backend Development & Data Analytics. B.Tech Computer Science & Business Systems Graduate building web applications, backend APIs, and data-driven solutions — open to entry-level engineering roles and freelance projects.',
  email: 'mguruprasath01@gmail.com',
  github: 'https://github.com/guru1301',
  linkedin: 'https://linkedin.com/in/guru-prasath-m130105',
  resumeUrl: '/assets/resume.pdf',
};

export const EDUCATION_DATA: EducationItem[] = [
  {
    period: '2022 — 2026',
    year: '2026',
    degree: 'B.Tech Computer Science & Business Systems',
    institution: 'Saranathan College of Engineering',
    score: '7.98 CGPA',
    scoreLabel: 'Overall Grade Point Average',
  },
  {
    period: '2021 — 2022',
    year: '2022',
    degree: 'Higher Secondary (Class XII)',
    institution: 'AKKV Aarunadu Matriculation Higher Secondary School',
    score: '86%',
    scoreLabel: 'HSC Board Percentage',
  },
  {
    period: '2019 — 2020',
    year: '2020',
    degree: 'Secondary School (Class X)',
    institution: 'AKKV Aarunadu Matriculation Higher Secondary School',
    score: '94%',
    scoreLabel: 'SSLC Board Percentage',
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'the-people-ledger',
    number: '01',
    title: "THE PEOPLE'S LEDGER",
    subtitle: 'Civic Data Warehouse & Geospatial Analytics Engine',
    category: 'BIG DATA & CIVIC ANALYTICS',
    tagline:
      'Transforming 57M+ electoral data points across 234 constituencies into real-time geospatial intelligence and investigative reporting.',
    description:
      "An enterprise-grade civic data warehouse and interactive electoral analytics platform engineered to decode and audit assembly election results across Tamil Nadu's 234 constituencies. Built for political analysts, data journalists, and civic institutions, it aggregates multi-cycle historical returns, ECI voter turnout logs, and cabinet composition into an authoritative digital ledger. The system resolves vote-share disproportionalities under First-Past-The-Post rules and enables millisecond-grade OLAP querying over massive electoral datasets.",
    image: '/assets/projects/the-people-ledger.jpg',
    technologies: ['Google BigQuery', 'Python', 'Flask', 'Leaflet.js', 'Chart.js', 'Pandas'],
    featured: true,
    architectureNodes: [
      { id: '1', label: 'Client / Presentation Layer', sub: 'Interactive Broadsheet SPA • Leaflet GeoJSON • Chart.js' },
      { id: '2', label: 'API Gateway & Edge Routing', sub: 'Flask REST API • Vercel Serverless Functions • Media Proxy' },
      { id: '3', label: 'Analytical Query Engine', sub: 'Google BigQuery Python SDK • Pandas ETL • OLAP Windowing' },
      { id: '4', label: 'Data Warehouse & Persistence', sub: 'BigQuery Star Schema • Dimension & Fact Tables • GeoJSON' },
    ],
    caseStudy: {
      overview:
        "The People's Ledger was architected as an authoritative, high-integrity election intelligence platform designed to ingest, process, and visualize verified historical and live electoral data spanning Tamil Nadu's 234 assembly constituencies and 38 districts. The core architectural challenge was reconciling heterogeneous historical datasets across multiple cycles (2011, 2016, 2021, and 2026), each featuring disparate constituency nomenclatures, boundary delimitations, and vote distribution dynamics. To deliver instantaneous exploratory analytics without database bottlenecks, the platform implements a dual-mode hybrid architecture: high-throughput OLAP querying via Google BigQuery paired with deterministic, zero-latency local fallback data structures. The frontend pairs a vintage broadsheet newspaper aesthetic inspired by Tamil press heritage with modern interactive vector mapping and dynamic visual analytics.",
      keyFeatures: [
        'Analytical BigQuery OLAP Pipeline: Executes complex analytical window functions (PARTITION BY AC_No, ROW_NUMBER) and cross-table joins across star-schema tables (fact_results_2026, dim_constituency, dim_party, fact_turnout_2026) to compute real-time margins, runner-ups, and party vote shares across 234 assembly constituencies.',
        'Geospatial Boundary Rendering: Implements interactive Leaflet.js choropleth cartography utilizing optimized GeoJSON topologies (tn_ac_2021.geojson) with custom dynamic SVG gradients to visualize party coalitions, turnout distributions, and competitive margin heatmaps across 38 administrative districts.',
        '15-Vector Investigative Analytics Hub: Powers 15 specialized investigative data findings—including First-Past-The-Post (FPTP) seat-to-vote disproportionality indexes, NOTA margin-reversal footprints, deposit forfeit rates (83.32%), and gender turnout disparity matrices (169 seats with female participation advantage).',
        'Multi-Cycle Historical Reconciliation Engine: Dynamically maps and queries historical election returns from 2011, 2016, and 2021 against current 2026 results to calculate seat flips (70.94% electoral realignment rate), incumbent survival rates, and candidate longevity trends.',
        'Zero-Downtime Serverless & Cache Architecture: Deployed on Vercel Serverless via Python WSGI rewrites with client-side caching (Cache-Control: public, max-age=86400), secure CORS handling, an authenticated SSR image proxy for third-party media assets, and instantaneous CSV/Excel client-side report exports via SheetJS.',
      ],
      technicalArchitecture:
        'Client Broadsheet SPA (HTML5/Leaflet/Chart.js) -> Vercel Serverless WSGI Gateway (Flask REST API) -> Analytical Execution Engine (Python/Pandas/BigQuery Client) -> Google BigQuery Enterprise Data Warehouse (Star Schema Fact/Dim Tables) & Cached Memory Buffers',
      impactOrOutcome:
        'Successfully aggregated and audited 57.41M registered electors and 49.39M votes cast across all 234 assembly seats, achieving sub-100ms API response latency on analytical queries via BigQuery column-oriented partition indexing and 100% data availability via local deterministic caching.',
      githubUrl: 'https://github.com/guru1301/the-people-ledger',
      liveUrl: 'https://the-people-ledger.vercel.app',
    },
  },
  {
    id: 'railgo',
    number: '02',
    title: 'RAILGO',
    subtitle: 'High-Concurrency Railway Reservation & Transit Routing Engine',
    category: 'TRANSIT TECH & DISTRIBUTED TICKETING',
    tagline:
      'Streamlining multi-hop railway discovery, ACID-compliant ticketing transactions, and real-time transit telemetry across high-volume routes.',
    description:
      'RailGo is an end-to-end railway reservation and route intelligence platform engineered to eliminate scheduling friction and race conditions across multi-stop passenger rail networks. Designed for high-density commuter corridors and intercity travel, it empowers travelers to search dynamic intermediate itineraries, manage passenger manifests, and generate verifiable digital boarding passes. The platform solves the architectural challenge of complex topological stop-order route discovery and high-volume concurrent booking transactions through an optimized relational data model and low-latency API services.',
    image: '/assets/projects/railgo.jpg',
    technologies: ['FastAPI', 'Python', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'Uvicorn'],
    featured: true,
    architectureNodes: [
      { id: '1', label: 'Client / Presentation Layer', sub: 'Responsive Web Client • Glassmorphic UI • jsPDF & QRCode.js' },
      { id: '2', label: 'API Gateway & Middleware', sub: 'FastAPI ASGI • CORS Middleware • Pydantic Contract Validation' },
      { id: '3', label: 'Core Routing & Booking Engine', sub: 'SQLAlchemy 2.0 ORM • Stop-Order Traversal • Atomic Transactions' },
      { id: '4', label: 'Data Persistence & Migrations', sub: 'PostgreSQL Relational DB • B-Tree Indexes • Alembic Migrations' },
    ],
    caseStudy: {
      overview:
        'RailGo was engineered to overcome the computational bottlenecks of complex railway transit graph queries and transactional booking integrity across extensive multi-station lines. The platform models real-world railway topology where trains traverse dozens of intermediate stations, requiring dynamic seat inventory and stop-sequence validation (SourceStop.stop_order < DestStop.stop_order) rather than naive point-to-point lookups. Migrated from an initial legacy architecture to a modern, asynchronous FastAPI and PostgreSQL foundation, the platform delivers sub-millisecond query execution, reliable PNR generation, and seamless ticketing operations. The system bridges backend ACID transactions with a responsive, glassmorphic client interface featuring real-time station autocomplete, schedule modals, and client-side ticket PDF and QR code compilation.',
      keyFeatures: [
        'Relational Stop-Order Graph Traversal: Implements high-performance SQLAlchemy self-joins with aliased table models (SourceStop and DestStop) to evaluate intermediate stop-order sequences (SourceStop.stop_order < DestStop.stop_order) and journey date constraints, enabling dynamic intermediate origin-destination route discovery across multi-station lines.',
        'Atomic Multi-Passenger Booking & PNR Generation: Executes transactional booking persistence within ACID-compliant database units of work, automatically bundling primary contacts, multi-passenger manifests, and class-based fare matrices while provisioning unique collision-resistant PNR tokens (RG<timestamp><random>).',
        'Strict Contract Serialization & Schema Evolution: Utilizes Pydantic v2 schemas for bidirectional request validation and response filtering across all REST endpoints, backed by Alembic migration environments for version-controlled database schema evolution across relational models.',
        'Interactive Client-Side Ticket & QR Pass Compilation: Features an asynchronous client interface incorporating real-time station autocomplete, itinerary timeline rendering, and in-browser ticket synthesis utilizing jsPDF for boarding pass exports alongside qrcodejs for offline-verifiable passenger PNR tokens.',
        'Real-Time Telemetry & Schedule Caching: Integrates intermediate station halt duration calculators ((dh*60+dm)-(ah*60+am)) and cumulative kilometer distances via an in-memory client schedule cache (scheduleCache) to minimize redundant network I/O, coupled with a 5-digit train tracking status endpoint.',
      ],
      technicalArchitecture:
        'Client Interface (Vanilla ES6+ / HTML5 / Bootstrap) -> ASGI Web Server (Uvicorn / FastAPI Gateway) -> Core Routing & Booking Service (SQLAlchemy 2.0 / Pydantic) -> Relational Persistence Layer (PostgreSQL with Alembic Migrations)',
      impactOrOutcome:
        'Achieved sub-15ms route discovery query latency across complex multi-stop itineraries through normalized stop-sequence indexing, guaranteed 100% ACID transactional integrity on multi-passenger reservations, and eliminated client-side redundant requests via in-memory schedule caching.',
      githubUrl: 'https://github.com/guru1301/railgo-python',
    },
  },
  {
    id: 'nebula-intelligence',
    number: '03',
    title: 'NEBULA INTELLIGENCE',
    subtitle: 'AI-Powered Workforce Telemetry & Digital Twin Analytics Platform',
    category: 'ENTERPRISE AI & WORKFORCE ANALYTICS',
    tagline:
      'Synthesizing OS-level behavioral telemetry and LLM reasoning to quantify cognitive load and proactively mitigate enterprise burnout.',
    description:
      'Nebula Intelligence is an enterprise workforce analytics and cognitive telemetry platform engineered to replace lagging retrospective HR surveys with real-time behavioral observability. Designed for distributed teams and engineering leadership, it captures multi-modal OS telemetry, quantifies productivity and focus velocity via Pandas feature engineering, and constructs dynamic employee Digital Twins. The system solves the operational blind spot in remote workforce management by pairing sub-25ms telemetry ingestion with Google Gemini Pro reasoning for automated burnout risk detection.',
    image: '/assets/projects/nebula-intelligence.jpg',
    technologies: ['FastAPI', 'Python', 'PostgreSQL', 'Google Gemini Pro', 'Pandas', 'ReportLab'],
    featured: true,
    architectureNodes: [
      { id: '1', label: 'Client / Telemetry Agent', sub: 'OS PyGetWindow & PyAutoGUI Daemon' },
      { id: '2', label: 'API Gateway & Ingestion', sub: 'FastAPI ASGI • Async Rate Handling' },
      { id: '3', label: 'Feature & Digital Twin Engine', sub: 'Vectorized Pandas • Cognitive Battery Model' },
      { id: '4', label: 'Inference & Persistence Layer', sub: 'PostgreSQL Relational DB • Gemini Pro LLM' },
    ],
    caseStudy: {
      overview:
        'Nebula Intelligence was architected as an end-to-end workforce intelligence ecosystem designed to solve the critical visibility gap between day-to-day digital activity and systemic employee burnout. Traditional human resources workflows rely on retrospective quarterly surveys and subjective check-ins that systematically lag behind acute cognitive exhaustion and productivity decline. To solve this, the platform establishes a decoupled architecture pairing an ultra-lightweight client-side OS telemetry daemon with an asynchronous FastAPI processing backbone. By transforming raw application transitions, focus streaks, and meeting density into deterministic mathematical features, the platform maintains a dynamic Digital Twin for every worker while executing automated Gemini Pro inference to provide proactive, privacy-conscious organizational interventions.',
      keyFeatures: [
        'Non-Invasive OS Telemetry Daemon: Lightweight Python background agent utilizing pygetwindow, psutil, and pyautogui to capture active window titles, dynamic application classification, and automatic idle-state detection (>300s) at 5–10s intervals with sub-1% CPU footprint.',
        'Algorithmic Digital Twin & Cognitive Battery Modeling: Vectorized Pandas feature extraction calculating Focus Scores (uninterrupted deep-work streaks), Distraction Ratios, and dynamic 0–100 Cognitive Battery metrics derived from multidimensional stress-weighting formulas.',
        'Generative AI Virtual HR Analyst Integration: Orchestrates Google Gemini Pro with contextual prompt templates and 5ms fault-tolerant fallback recovery to translate high-dimensional telemetry matrices into actionable risk vectors and leadership recommendations.',
        'High-Throughput Asynchronous Ingestion Pipeline: Built on FastAPI and Uvicorn with connection-pooled PostgreSQL transactions, benchmarked to sustain 100+ concurrent telemetry edge agents with 24ms average log ingestion latency and zero HTTP 500 drops.',
        'Automated Enterprise PDF & CSV Reporting Engine: Programmatically flattens relational workforce metrics into downloadable CSV logs and publication-grade landscape PDF executive briefs built with ReportLab flowables, tables, and typography.',
      ],
      technicalArchitecture:
        'Desktop Telemetry Daemon (Python / PyGetWindow) -> Asynchronous REST Gateway (FastAPI / Uvicorn) -> Mathematical Feature & Digital Twin Engine (Pandas) -> Relational Storage (PostgreSQL) & LLM Reasoning (Google Gemini Pro) -> Glassmorphic Management Dashboard & ReportLab PDF',
      impactOrOutcome:
        'Achieved 24ms average telemetry ingestion latency with sub-1% agent CPU utilization, delivering 97% window classification accuracy and zero timeout failures across 100 concurrent simulated enterprise worker nodes.',
      githubUrl: 'https://github.com/guru1301/nebula-intelligence',
    },
  },
  {
    id: 'ott-analytics',
    number: '04',
    title: 'OTT ANALYTICS',
    subtitle: 'Streaming Platform Performance Dashboard',
    category: 'DATA ANALYTICS & BUSINESS INTELLIGENCE',
    tagline:
      'Interactive analytics dashboard for monitoring subscriber growth, revenue, content consumption, and key performance indicators.',
    description:
      'Interactive analytics dashboard for monitoring subscriber growth, revenue, content consumption, and key performance indicators.',
    image: '/assets/projects/ott.jpg',
    technologies: ['Power BI', 'DAX', 'Power Query', 'Excel', 'Data Modeling'],
    featured: true,
    caseStudy: {
      overview:
        'Designed a business intelligence dashboard for a digital entertainment platform to monitor core subscription health, content catalog traction, and user retention.',
      keyFeatures: [
        'Subscriber growth and churn rate monitoring across monthly billing cycles',
        'Revenue, ARPU, and plan distribution tracking across user cohorts',
        'Content consumption and genre traction analytics',
        'Dimensional star-schema data modeling in Power BI',
      ],
      technicalArchitecture:
        'Excel/CSV Ingestion -> Power Query ETL & Cleansing -> Dimensional Star-Schema Modeling -> DAX Measures -> Power BI Interactive Reports.',
      impactOrOutcome:
        'Translates complex streaming performance records into executive-level visual insights for content acquisition and retention analysis.',
      githubUrl: 'https://github.com/guru1301',
    },
  },
];

export const CLIENT_PROJECTS_DATA: Project[] = [
  {
    id: 'mx-herbals',
    number: '01',
    title: 'MX HERBAL',
    subtitle: 'Handcrafted Ayurvedic Skincare & Wellness Brand',
    category: 'D2C E-COMMERCE • AYURVEDIC BEAUTY',
    tagline:
      'Ancient Wisdom, Timeless Radiance — Handcrafted botanical beauty & personal care.',
    description:
      'Direct-to-consumer digital storefront for MX Herbal, showcasing handcrafted Ayurvedic beauty powders, herbal hair oils, and skincare formulations with interactive botanical visuals, ingredient provenance, and direct WhatsApp ordering.',
    image: '/assets/projects/client1.jpg',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'HTML5 Canvas', 'WhatsApp API', 'SEO'],
    featured: true,
    caseStudy: {
      overview:
        'Designed and engineered the complete direct-to-consumer web presence for MX Herbal (mxherbals.in), an authentic Ayurvedic personal care brand. The digital experience translates centuries-old botanical formulations into a modern, serene editorial shopping interface that emphasizes purity, holistic wellness, and effortless ordering.',
      keyFeatures: [
        'Luxury editorial typography combining Cormorant Garamond & DM Sans with custom smooth cursor animations',
        'Interactive HTML5 Canvas particle engine rendering floating botanical micro-particles in the hero section',
        'Comprehensive product showcase for Herbal Beauty Powder, Men’s Face Powder, and Handcrafted Herbal Hair Oil',
        'Authentic Ayurvedic ingredient transparency highlighting Kasturi Manjal, Sandalwood, Bhringraj, and Neem',
        'Step-by-step Herbal Ritual guide providing personalized morning and evening Ayurvedic skincare regimens',
        'Frictionless WhatsApp Business API checkout integration enabling rapid direct customer orders without cart abandonment',
        'Schema.org Organization structured data and mobile theme-color customization for peak search visibility',
      ],
      technicalArchitecture:
        'Vedic Brand Architecture -> Semantic HTML5 & Canvas Particle Engine -> Editorial CSS3 Design System -> Direct WhatsApp Business Gateway.',
      impactOrOutcome:
        'Delivered an authentic, high-converting digital storefront that established brand credibility and drove direct-to-consumer orders across India.',
      liveUrl: 'https://www.mxherbals.in/',
    },
  },
  {
    id: 'skill-mantra-academy',
    number: '02',
    title: 'SKILL MANTRA ACADEMY',
    subtitle: 'Career-Ready Tech Skills & EdTech Training Platform',
    category: 'EDTECH PLATFORM • CAREER TRAINING',
    tagline:
      'Master the skills employers actually hire for — Industry-aligned tech education.',
    description:
      'Comprehensive educational platform for Skill Mantra Academy, featuring 6 industry-aligned tech career tracks, interactive tabbed program offerings, real-time cohort updates ticker, and frictionless advisor enrollment funnels.',
    image: '/assets/projects/client2.jpg',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI', 'Figma', 'EdTech UX'],
    featured: true,
    caseStudy: {
      overview:
        'Developed the official web platform for Skill Mantra Academy (skillmantraacademy.com), an EdTech career accelerator bridging the gap between collegiate education and high-demand tech roles through mentor-led curricula, practical capstones, and placement support.',
      keyFeatures: [
        '6 specialized career tracks: Full-Stack Web Dev (16w), Data Analytics with Python (12w), Cloud & DevOps (10w), UI/UX Design (8w), Cybersecurity (10w), and Digital Marketing (8w)',
        'Interactive 4-tab Offerings module spanning Career Programs, 1:1 Mentorship Reviews, Corporate Upskilling, and Placement Services',
        'Continuous animated cohort updates ticker marquee spotlighting upcoming batch dates and scholarship deadlines',
        'Curated 15+ tool stack matrix showcasing Python, React, AWS, Docker, Figma, SQL, Git, Linux, and Tableau',
        'Accessible multi-tier navigation featuring dropdown mega-menus, sticky header states, and mobile drawer menu',
        'Dual-action conversion funnel providing instant "Talk to an Advisor" advisory booking and cohort enrollment pathways',
        'Dual theme CSS custom properties system supporting adaptive dark/light aesthetic modes',
      ],
      technicalArchitecture:
        'Curriculum Architecture -> Modular Accessible DOM & Tabbed Panels -> CSS Variable Color System -> Pure Vanilla JS Interactivity.',
      impactOrOutcome:
        'Built a high-credibility learning portal that streamlined course discovery, automated cohort inquiries, and elevated institutional brand authority.',
      liveUrl: 'https://www.skillmantraacademy.com/',
    },
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    year: '2026',
    company: 'ICT ACADEMY / INFOSYS FOUNDATION',
    role: 'Data Analytics & Technology Training',
    type: 'Industry Training Program',
    period: '2025 — 2026',
    description:
      'Completed structured training in Data Analytics, Power BI, DAX, SQL, data modeling, and Azure AI fundamentals through an industry-oriented technology program.',
    highlights: [
      'Power BI',
      'DAX',
      'SQL',
      'Data Modeling',
      'Azure AI Fundamentals',
      'Data Analytics',
    ],
  },
  {
    year: '2024',
    company: 'DOVYO TECHNOLOGIES',
    role: 'Business Intelligence / CRM Intern',
    type: 'Internship',
    period: '2024',
    description:
      'Worked on CRM workflows involving lead capture, sales tracking, support processes, and business data used for operational decision-making.',
    highlights: [
      'CRM Workflows',
      'Sales Tracking',
      'Data Pipelines',
      'Process Automation',
    ],
  },
  {
    year: '2024',
    company: 'CIPHERBYTE',
    role: 'Software Development Intern',
    type: 'Internship',
    period: '2024',
    description:
      'Assisted in developing web application features, resolving interface bugs, and implementing full-stack components using modern frameworks.',
    highlights: [
      'Web Feature Development',
      'Full-Stack Components',
      'Bug Resolution',
      'Git Workflows',
    ],
  },
];

export const SKILLS_DATA: SkillItem[] = [
  {
    name: 'PYTHON',
    category: 'programming',
    description: 'Core backend development, API services, automation scripting, and data manipulation.',
    size: 'lg',
    focus: 'Core Scripting & Backend',
    appliedIn: 'FastAPI Services & Data Analysis',
  },
  {
    name: 'JAVA',
    category: 'programming',
    description: 'Object-oriented application building, core backend systems, and enterprise design patterns.',
    size: 'lg',
    focus: 'Enterprise Systems & OOP',
    appliedIn: 'Spring Boot Services & APIs',
  },
  {
    name: 'SQL',
    category: 'database',
    description: 'Relational data query design, indexing, joins, aggregations, and schema normalization.',
    size: 'lg',
    focus: 'Query Optimization & Schema',
    appliedIn: 'PostgreSQL & MySQL Systems',
  },
  {
    name: 'FASTAPI',
    category: 'backend',
    description: 'Asynchronous Python REST microservices, Pydantic validation, and OpenAPI documentation.',
    size: 'lg',
    focus: 'Async Python Microservices',
    appliedIn: 'RailGo & Nebula Intelligence',
  },
  {
    name: 'SPRING BOOT',
    category: 'backend',
    description: 'Enterprise Java RESTful APIs, dependency injection, service layers, and microservices.',
    size: 'lg',
    focus: 'Enterprise Java Architecture',
    appliedIn: 'Enterprise Java Services',
  },
  {
    name: 'FLASK',
    category: 'backend',
    description: 'Lightweight Python web applications, routing endpoints, and modular API services.',
    size: 'md',
    focus: 'Microservices & Routing',
    appliedIn: 'The People’s Ledger Gateway',
  },
  {
    name: 'REACT',
    category: 'frontend',
    description: 'Declarative component architecture, custom hooks, dynamic UI states, and responsive web design.',
    size: 'lg',
    focus: 'Component UI & Dynamic State',
    appliedIn: 'Responsive Portfolios & SPAs',
  },
  {
    name: 'POWER BI',
    category: 'data',
    description: 'Interactive dashboard creation, dimensional star-schema modeling, and executive reports.',
    size: 'lg',
    focus: 'Star Schema & Executive BI',
    appliedIn: 'The People’s Ledger & OTT',
  },
  {
    name: 'DAX',
    category: 'data',
    description: 'Calculated measures, columns, and time-intelligence data analysis expressions.',
    size: 'md',
    focus: 'Time-Intelligence & Measures',
    appliedIn: 'OTT Metrics & KPI Models',
  },
  {
    name: 'POSTGRESQL',
    category: 'database',
    description: 'ACID-compliant relational database management, table constraints, and query tuning.',
    size: 'md',
    focus: 'Relational Integrity & ACID',
    appliedIn: 'RailGo & Nebula Intelligence',
  },
  {
    name: 'MYSQL',
    category: 'database',
    description: 'Relational database schema implementation, transactional queries, and data indexing.',
    size: 'md',
    focus: 'Normalized Schema & Indices',
    appliedIn: 'Transactional Data Layers',
  },
  {
    name: 'MONGODB',
    category: 'database',
    description: 'Document-oriented NoSQL storage, flexible JSON schemas, and Atlas cloud deployment.',
    size: 'md',
    focus: 'NoSQL Document Store',
    appliedIn: 'RailGo & Telemetry Logs',
  },
  {
    name: 'PANDAS',
    category: 'data',
    description: 'DataFrames, tabular data cleaning, transformation, aggregation, and exploratory analysis.',
    size: 'md',
    focus: 'Tabular Data Transformation',
    appliedIn: 'Election & Load Processing',
  },
  {
    name: 'DOCKER',
    category: 'tools',
    description: 'Application containerization, reproducible development environments, and Dockerfiles.',
    size: 'sm',
    focus: 'Containerized Environments',
    appliedIn: 'Reproducible Dev & Deploy',
  },
  {
    name: 'GIT & GITHUB',
    category: 'tools',
    description: 'Version control, branch management, pull requests, and collaborative code reviews.',
    size: 'sm',
    focus: 'Version Control & Workflows',
    appliedIn: 'Collaborative Engineering',
  },
  {
    name: 'POSTMAN',
    category: 'tools',
    description: 'REST API testing, request collections, endpoint validation, and environment variables.',
    size: 'sm',
    focus: 'API Verification & Collections',
    appliedIn: 'Endpoint Test Suites',
  },
];

export const TECH_STACK_NODES: TechNode[] = [
  { id: 'guru', label: 'GURU PRASATH', category: 'center', connections: ['frontend', 'backend', 'data', 'database', 'tools'] },
  { id: 'frontend', label: 'FRONTEND', category: 'frontend', connections: ['react', 'html', 'css', 'javascript', 'tailwind'] },
  { id: 'backend', label: 'BACKEND', category: 'backend', connections: ['python', 'fastapi', 'flask', 'springboot', 'nodejs', 'express'] },
  { id: 'database', label: 'DATABASE', category: 'database', connections: ['postgresql', 'mysql', 'mongodb', 'sqlite'] },
  { id: 'data', label: 'DATA', category: 'data', connections: ['powerbi', 'dax', 'pandas', 'powerquery', 'sql'] },
  { id: 'tools', label: 'TOOLS', category: 'tools', connections: ['git', 'github', 'docker', 'postman'] },

  { id: 'react', label: 'React', category: 'frontend', connections: [] },
  { id: 'html', label: 'HTML', category: 'frontend', connections: [] },
  { id: 'css', label: 'CSS', category: 'frontend', connections: [] },
  { id: 'javascript', label: 'JavaScript', category: 'frontend', connections: [] },
  { id: 'tailwind', label: 'Tailwind CSS', category: 'frontend', connections: [] },

  { id: 'python', label: 'Python', category: 'backend', connections: [] },
  { id: 'fastapi', label: 'FastAPI', category: 'backend', connections: [] },
  { id: 'flask', label: 'Flask', category: 'backend', connections: [] },
  { id: 'springboot', label: 'Spring Boot', category: 'backend', connections: [] },
  { id: 'nodejs', label: 'Node.js', category: 'backend', connections: [] },
  { id: 'express', label: 'Express', category: 'backend', connections: [] },

  { id: 'postgresql', label: 'PostgreSQL', category: 'database', connections: [] },
  { id: 'mysql', label: 'MySQL', category: 'database', connections: [] },
  { id: 'mongodb', label: 'MongoDB', category: 'database', connections: [] },
  { id: 'sqlite', label: 'SQLite', category: 'database', connections: [] },

  { id: 'powerbi', label: 'Power BI', category: 'data', connections: [] },
  { id: 'dax', label: 'DAX', category: 'data', connections: [] },
  { id: 'pandas', label: 'Pandas', category: 'data', connections: [] },
  { id: 'powerquery', label: 'Power Query', category: 'data', connections: [] },
  { id: 'sql', label: 'SQL', category: 'data', connections: [] },

  { id: 'git', label: 'Git', category: 'tools', connections: [] },
  { id: 'github', label: 'GitHub', category: 'tools', connections: [] },
  { id: 'docker', label: 'Docker', category: 'tools', connections: [] },
  { id: 'postman', label: 'Postman', category: 'tools', connections: [] },
];
