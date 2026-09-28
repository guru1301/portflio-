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
  category: 'languages' | 'backend' | 'frontend' | 'data' | 'database' | 'tools';
  description: string;
  size: 'lg' | 'md' | 'sm';
}

export interface TechNode {
  id: string;
  label: string;
  category: 'center' | 'frontend' | 'backend' | 'data' | 'database' | 'tools';
  connections: string[];
}

export const DEVELOPER_INFO = {
  name: 'GURU PRASATH',
  title: 'COMPUTER SCIENCE & SOFTWARE DEVELOPER',
  subtitle: 'B.Tech Computer Science & Business Systems',
  degree: 'B.Tech CSBS (7.98 CGPA)',
  institution: 'Saranathan College of Engineering',
  timeline: '2022 — 2026',
  location: 'India',
  availability: 'Available for opportunities',
  bioStatement: 'I BUILD SOFTWARE AROUND REAL PROBLEMS.',
  bioExtended:
    'Computer Science and Business Systems graduate interested in software engineering, data analytics, and building high-performance, practical digital systems.',
  email: 'guruprasath.dev@example.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  resumeUrl: '#',
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
    id: 'railgo',
    number: '01',
    title: 'RAILGO',
    subtitle: 'Online Railway Reservation System',
    category: 'Full-Stack Software Engineering',
    tagline: 'High-concurrency ticket booking engine inspired by modern IRCTC/airline workflows.',
    description:
      'A full-stack railway reservation platform featuring real-time train search, seat selection, automated GST/fare calculations, secure Razorpay checkout, and OAuth authentication.',
    image: '/assets/projects/railgo.jpg',
    technologies: ['Node.js', 'Express', 'Passport JS', 'Google OAuth', 'Spring Boot', 'MongoDB Atlas', 'Razorpay'],
    featured: true,
    architectureNodes: [
      { id: '1', label: 'Client / OAuth', sub: 'React & Google Sign-In' },
      { id: '2', label: 'API Gateway', sub: 'Express Middleware & Auth' },
      { id: '3', label: 'Core Booking Engine', sub: 'Spring Boot Service' },
      { id: '4', label: 'Database', sub: 'MongoDB Atlas Cluster' },
      { id: '5', label: 'Payments', sub: 'Razorpay Webhook Handler' },
    ],
    caseStudy: {
      overview:
        'RailGo was built to solve latency and transaction locks in traditional passenger reservation systems. Designed with microservice-inspired architecture, it isolates train search schedules from inventory locking during payment processing.',
      keyFeatures: [
        'Google OAuth 2.0 & JWT session management via Passport.js',
        'Interactive carriage seat-map selector with real-time seat locks',
        'Dynamic fare pricing engine computing base rates, class surcharges, and 18% GST',
        'Razorpay payment gateway integration with webhooks for atomic order confirmation',
        'MongoDB Atlas schema optimized for multi-stop train routes and station schedules',
      ],
      technicalArchitecture:
        'Client requests hit the Express Auth Layer -> Validated session triggers Spring Boot reservation microservices -> Atomic MongoDB document updates prevent double bookings -> Webhooks complete payment status.',
      impactOrOutcome:
        'Successfully handles simulated concurrent booking spikes with sub-200ms API response times and 100% transactional accuracy in seat allocation.',
      githubUrl: 'https://github.com',
      liveUrl: 'https://demo.example.com',
    },
  },
  {
    id: 'flowai',
    number: '02',
    title: 'FLOWAI',
    subtitle: 'Digital Twin for Remote Employee Productivity',
    category: 'Full-Stack & Telemetry Systems',
    tagline: 'Operational telemetry platform mapping distributed workstreams into actionable telemetry.',
    description:
      'A digital-twin concept analyzing remote employee work patterns, focus hours, task completion velocity, and operational bottlenecks using animated node graphs and real-time charts.',
    image: '/assets/projects/flowai.jpg',
    technologies: ['Spring Boot', 'PostgreSQL', 'MongoDB', 'React', 'Tailwind CSS', 'Recharts', 'Docker'],
    featured: true,
    architectureNodes: [
      { id: 'react', label: 'React UI', sub: 'Dashboard & Recharts' },
      { id: 'boot', label: 'Spring Boot', sub: 'REST & Event Ingestion' },
      { id: 'db', label: 'PostgreSQL / Mongo', sub: 'Relational & Time-Series' },
      { id: 'analytics', label: 'Analytics Engine', sub: 'Productivity Scoring' },
      { id: 'reports', label: 'Reports & Alerts', sub: 'Automated Summaries' },
    ],
    caseStudy: {
      overview:
        'FlowAI models remote engineering teams as an interconnected network node system ("Digital Twin"), measuring activity cadence without invasive keylogging to optimize workflow health.',
      keyFeatures: [
        'Real-time productivity score calculation combining task velocity and focus duration',
        'Interactive distributed workstream graph visualizing dependencies and blocker nodes',
        'Dual-database strategy: PostgreSQL for user/team relationships, MongoDB for time-series telemetry',
        'Custom interactive Recharts analytics with weekly heatmap breakdowns',
        'Containerized with Docker for rapid cloud deployment',
      ],
      technicalArchitecture:
        'React Frontend -> REST Ingestion API (Spring Boot) -> PostgreSQL (Metadata) + MongoDB (Telemetry) -> Asynchronous Aggregation Pipeline -> Live Recharts Dashboard.',
      impactOrOutcome:
        'Provides engineering managers with actionable workstream visibility, identifying burnout risk factors and team dependency bottlenecks.',
      githubUrl: 'https://github.com',
    },
  },
  {
    id: 'peoples-ledger',
    number: '03',
    title: 'THE PEOPLE\'S LEDGER',
    subtitle: 'Tamil Nadu Election Analytics',
    category: 'Data Analytics & Visualization',
    tagline: 'Deep electoral data analytics across 234 Tamil Nadu legislative constituencies.',
    description:
      'A data science and analytics platform performing historical electoral trends analysis, vote share distributions, margin calculations, and interactive constituency mapping.',
    image: '/assets/projects/peoples_ledger.jpg',
    technologies: ['Python', 'Pandas', 'SQL', 'Power BI', 'DAX', 'Data Cleansing'],
    featured: true,
    caseStudy: {
      overview:
        'The People\'s Ledger transforms multi-decadal election dataset archives into interactive analytics models. It enables political analysts and researchers to inspect turnout rates, party swing votes, and victory margins.',
      keyFeatures: [
        'Complete data pipeline aggregating election results across all 234 assembly constituencies from 1989 to 2024',
        'Advanced DAX measures calculating victory margins, swing percentages, and coalition vote pools',
        'Interactive Power BI geographic and statistical dashboards',
        'Automated Python ETL scripts for handling messy PDF/CSV electoral returns',
        'Non-partisan statistical focus on voter turnouts and swing trends',
      ],
      technicalArchitecture:
        'Raw Data Ingestion (Python BeautifulSoup/Pandas) -> Data Cleaning & SQL Warehouse -> DAX Modelling -> Power BI & Web Embed Visualizations.',
      impactOrOutcome:
        'Processed over 100,000 data rows into sub-second interactive query responses, uncovering critical vote-shift patterns across rural vs urban Tamil Nadu sectors.',
      githubUrl: 'https://github.com',
    },
  },
  {
    id: 'agniwatts',
    number: '04',
    title: 'AGNIWATTS',
    subtitle: 'Predictive Load Management',
    category: 'Smart Energy Telemetry',
    tagline: 'Predictive power grid telemetry dashboard anticipating surge demand and grid strain.',
    description:
      'An intelligent load forecasting dashboard analyzing electrical consumption anomalies, regional power grid strain, and peak demand hours with ML time-series projections.',
    image: '/assets/projects/agniwatts.jpg',
    technologies: ['Python', 'FastAPI', 'React', 'Tailwind CSS', 'Recharts', 'Pandas'],
    featured: true,
    caseStudy: {
      overview:
        'AgniWatts addresses municipal grid overload during peak thermal seasons. By combining telemetry ingestion with regression modeling, it highlights high-risk grid zones before brownouts occur.',
      keyFeatures: [
        'Telemetry stream simulation for regional substations (Zone A, B, C)',
        'ML Anomaly detection alerts flagging voltage instability and unseasonal spikes',
        'Peak demand curve forecasting with 24-hour horizon projection',
        'Interactive grid health gauge and active load distribution analytics',
      ],
      technicalArchitecture:
        'FastAPI Telemetry Stream -> Pandas Anomaly Engine -> React Recharts UI with live alert dispatch.',
      impactOrOutcome:
        'Demonstrates predictive load shedding algorithms that reduce peak grid stress by an estimated 14%.',
      githubUrl: 'https://github.com',
    },
  },
  {
    id: 'museum-booking',
    number: '05',
    title: 'MUSEUM BOOKING',
    subtitle: 'Museum Ticketing Platform',
    category: 'Full-Stack Web App',
    tagline: 'Minimalist ticketing platform for cultural institutions with dynamic QR pass generation.',
    description:
      'An architectural gallery booking application featuring timed entry slot management, instant digital ticket pass generation with QR verification, and visitor analytics.',
    image: '/assets/projects/museum.jpg',
    technologies: ['Java', 'Spring Boot', 'React', 'Tailwind CSS', 'PostgreSQL', 'QR Engine'],
    featured: true,
    caseStudy: {
      overview:
        'Designed for high-traffic art museums to streamline entry flows and eliminate physical ticket counter bottlenecks through instant mobile pass issuing.',
      keyFeatures: [
        'Timed-slot entry calendar with real-time visitor capacity capping',
        'Instant digital QR code ticket generation upon booking confirmation',
        'Admin dashboard for gallery curators to set ticket quotas and exhibition dates',
        'Responsive mobile ticket pass view optimized for quick scanning',
      ],
      technicalArchitecture:
        'React Ticket Flow -> Spring Boot Service -> PostgreSQL -> QR Generator Library.',
      impactOrOutcome:
        'Provides an effortless 3-step checkout experience for exhibition goers.',
      githubUrl: 'https://github.com',
    },
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    year: '2026',
    company: 'ICT ACADEMY / INFOSYS FOUNDATION',
    role: 'Data Analytics & Azure AI Trainee',
    type: 'Certification & Specialized Program',
    period: '2025 — 2026',
    description:
      'Intensive training covering enterprise data modeling, Power BI dashboard architecture, DAX formulas, SQL data warehousing, and Azure AI services.',
    highlights: [
      'Built multi-table dimensional models and published Power BI reports',
      'Engineered complex DAX measures for business KPIs',
      'Applied cloud AI fundamentals for data ingestion',
    ],
  },
  {
    year: '2024',
    company: 'DOVYO TECHNOLOGIES',
    role: 'CRM Developer Intern',
    type: 'Software Development Internship',
    period: '2024',
    description:
      'Worked on custom CRM workflows, database integration, API endpoints, and client relationship management software modules.',
    highlights: [
      'Customized business pipeline fields and automated lead assignment rules',
      'Integrated backend REST APIs for automated data synchronization',
      'Collaborated with senior engineers on database query optimization',
    ],
  },
  {
    year: '2024',
    company: 'CIPHERBYTE',
    role: 'Software Development Intern',
    type: 'Development Internship',
    period: '2024',
    description:
      'Developed web features, resolved backend bugs, and engineered responsive user interface components using modern JavaScript/Java frameworks.',
    highlights: [
      'Implemented full-stack CRUD components using Spring Boot and React',
      'Participated in code reviews and Git pull request workflows',
      'Optimized page load performance and UI responsiveness',
    ],
  },
];

export const SKILLS_DATA: SkillItem[] = [
  {
    name: 'PYTHON',
    category: 'languages',
    description: 'Used for data analysis, automation, backend APIs, and algorithmic problem solving.',
    size: 'lg',
  },
  {
    name: 'SQL',
    category: 'database',
    description: 'Relational data query design, indexing, joins, and database analytics.',
    size: 'lg',
  },
  {
    name: 'JAVA',
    category: 'languages',
    description: 'Object-oriented application building, core backend systems, and enterprise design patterns.',
    size: 'lg',
  },
  {
    name: 'SPRING BOOT',
    category: 'backend',
    description: 'Enterprise Java RESTful APIs, Dependency Injection, security, and microservices.',
    size: 'lg',
  },
  {
    name: 'REACT',
    category: 'frontend',
    description: 'Declarative component architecture, custom hooks, dynamic UI states, and web performance.',
    size: 'lg',
  },
  {
    name: 'POWER BI',
    category: 'data',
    description: 'Interactive dashboard creation, ETL data transformations, and executive reports.',
    size: 'lg',
  },
  {
    name: 'DAX',
    category: 'data',
    description: 'Calculated columns, complex measures, and time-intelligence data analysis functions.',
    size: 'md',
  },
  {
    name: 'POSTGRESQL',
    category: 'database',
    description: 'Robust ACID-compliant relational database management and schema design.',
    size: 'md',
  },
  {
    name: 'MONGODB',
    category: 'database',
    description: 'NoSQL document storage, flexible JSON schemas, and Atlas cloud deployment.',
    size: 'md',
  },
  {
    name: 'FASTAPI',
    category: 'backend',
    description: 'Asynchronous Python microservices, rapid OpenAPI specification, and high execution speed.',
    size: 'md',
  },
  {
    name: 'PYTHON / PANDAS',
    category: 'data',
    description: 'Dataframes, data cleaning, aggregation, exploratory analysis, and numerical processing.',
    size: 'md',
  },
  {
    name: 'GIT',
    category: 'tools',
    description: 'Version control, branch management, pull requests, and collaborative codebases.',
    size: 'sm',
  },
  {
    name: 'POSTMAN',
    category: 'tools',
    description: 'API testing, request collection building, payload validation, and documentation.',
    size: 'sm',
  },
];

export const TECH_STACK_NODES: TechNode[] = [
  { id: 'guru', label: 'GURU PRASATH', category: 'center', connections: ['frontend', 'backend', 'data', 'database', 'tools'] },
  { id: 'frontend', label: 'FRONTEND', category: 'frontend', connections: ['react', 'tailwind'] },
  { id: 'backend', label: 'BACKEND', category: 'backend', connections: ['springboot', 'fastapi', 'java'] },
  { id: 'data', label: 'DATA', category: 'data', connections: ['powerbi', 'pandas', 'dax'] },
  { id: 'database', label: 'DATABASE', category: 'database', connections: ['postgresql', 'mongodb', 'sql'] },
  { id: 'tools', label: 'TOOLS', category: 'tools', connections: ['git', 'postman'] },

  { id: 'react', label: 'React.js', category: 'frontend', connections: [] },
  { id: 'tailwind', label: 'Tailwind CSS', category: 'frontend', connections: [] },
  { id: 'springboot', label: 'Spring Boot', category: 'backend', connections: [] },
  { id: 'fastapi', label: 'FastAPI', category: 'backend', connections: [] },
  { id: 'java', label: 'Java', category: 'backend', connections: [] },
  { id: 'powerbi', label: 'Power BI', category: 'data', connections: [] },
  { id: 'pandas', label: 'Pandas', category: 'data', connections: [] },
  { id: 'dax', label: 'DAX', category: 'data', connections: [] },
  { id: 'postgresql', label: 'PostgreSQL', category: 'database', connections: [] },
  { id: 'mongodb', label: 'MongoDB', category: 'database', connections: [] },
  { id: 'sql', label: 'SQL', category: 'database', connections: [] },
  { id: 'git', label: 'Git / GitHub', category: 'tools', connections: [] },
  { id: 'postman', label: 'Postman', category: 'tools', connections: [] },
];
