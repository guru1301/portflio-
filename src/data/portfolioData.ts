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
  title: 'SOFTWARE • WEB SOLUTIONS • SYSTEMS',
  subtitle: 'Software Engineer & Web Solutions Provider',
  degree: 'B.Tech CSBS (7.98 CGPA)',
  institution: 'Saranathan College of Engineering',
  timeline: '2022 — 2026',
  location: 'India',
  availability: 'Open to Full-Time Roles & Client Projects',
  bioStatement: 'I BUILD SOFTWARE & WEB SOLUTIONS AROUND REAL PROBLEMS.',
  bioExtended:
    'Software Engineer & Independent Web Solutions Provider. I build high-performance client websites, backend APIs, databases, and data-driven systems — translating real requirements into production-ready digital solutions while open to full-time engineering roles.',
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
    id: 'railgo',
    number: '01',
    title: 'RAILGO',
    subtitle: 'Online Railway Reservation System',
    category: 'FULL-STACK SOFTWARE ENGINEERING',
    tagline:
      'Full-stack railway reservation platform supporting train search, passenger booking, seat management, fare calculation, authentication, and online payment workflows.',
    description:
      'Full-stack railway reservation platform supporting train search, passenger booking, seat management, fare calculation, authentication, and online payment workflows.',
    image: '/assets/projects/railgo.jpg',
    technologies: ['Node.js', 'Express', 'Spring Boot', 'MongoDB Atlas', 'Passport.js', 'Google OAuth', 'Razorpay'],
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
        'RailGo was developed as an end-to-end railway reservation platform designed to handle train scheduling, seat allocation, and online checkout with reliable transactional state management.',
      keyFeatures: [
        'Train search and reservation',
        'Passenger and seat management',
        'Fare and GST calculation',
        'Authentication',
        'Razorpay payment integration',
        'MongoDB-backed reservation data',
      ],
      technicalArchitecture:
        'Client application communicates through an Express authentication and routing gateway to Spring Boot reservation services, recording transactional bookings into MongoDB Atlas.',
      impactOrOutcome:
        'Demonstrates a complete, functional full-stack reservation workflow from route selection to ticket generation and payment confirmation.',
      githubUrl: 'https://github.com/guru1301',
    },
  },
  {
    id: 'flowai',
    number: '02',
    title: 'FLOWAI',
    subtitle: 'Digital Twin for Remote Employee Productivity',
    category: 'FULL-STACK SYSTEMS & TELEMETRY',
    tagline:
      'Full-stack digital twin platform for processing activity data and presenting productivity insights through an interactive dashboard.',
    description:
      'Full-stack digital twin platform for processing activity data and presenting productivity insights through an interactive dashboard.',
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
        'FlowAI models distributed engineering workflows as an interconnected data system, aggregating activity metrics to provide clear operational visibility without invasive tracking.',
      keyFeatures: [
        'Activity data processing',
        'Backend API services',
        'PostgreSQL and MongoDB integration',
        'Productivity metric generation',
        'Interactive dashboard',
        'Docker-based development environment',
      ],
      technicalArchitecture:
        'React Frontend -> Spring Boot REST Ingestion API -> PostgreSQL (Metadata) & MongoDB (Telemetry) -> Aggregation Pipeline -> Recharts Dashboard.',
      impactOrOutcome:
        'Enables team leads to review operational rhythm and project momentum through structured, high-level workflow telemetry.',
      githubUrl: 'https://github.com/guru1301',
    },
  },
  {
    id: 'peoples-ledger',
    number: '03',
    title: 'THE PEOPLE\'S LEDGER',
    subtitle: 'Tamil Nadu Election Analytics',
    category: 'DATA ANALYTICS & VISUALIZATION',
    tagline:
      'Interactive election-data analytics platform analyzing constituency-level results and historical electoral trends across Tamil Nadu.',
    description:
      'Interactive election-data analytics platform analyzing constituency-level results and historical electoral trends across Tamil Nadu.',
    image: '/assets/projects/peoples_ledger.jpg',
    technologies: ['Python', 'Pandas', 'SQL', 'Power BI', 'DAX', 'Data Cleaning', 'Data Visualization'],
    featured: true,
    architectureNodes: [
      { id: '1', label: 'Raw Election Data', sub: 'Constituency results tables' },
      { id: '2', label: 'Python / Pandas', sub: 'Cleaning & transformation' },
      { id: '3', label: 'SQL Storage', sub: 'Normalized electoral schemas' },
      { id: '4', label: 'DAX Modeling', sub: 'Calculated measures & margins' },
      { id: '5', label: 'Power BI UI', sub: 'Interactive geospatial maps' },
    ],
    caseStudy: {
      overview:
        'An analytical data project processing constituency returns across Tamil Nadu legislative elections into an exploratory Power BI report with geographic and statistical breakdowns.',
      keyFeatures: [
        'Constituency-level analysis',
        'Historical result comparison',
        'Vote-share analysis',
        'Margin analysis',
        'Interactive constituency mapping',
        'Python-based data preparation',
        'Power BI and DAX dashboards',
      ],
      technicalArchitecture:
        'Raw Election Dataset Processing (Python/Pandas) -> SQL Data Structuring -> DAX Calculated Measures & Modeling -> Power BI Visual Dashboards.',
      impactOrOutcome:
        'Delivers a completely neutral, data-driven analytical reference for examining electoral participation, margins, and historical trends.',
      githubUrl: 'https://github.com/guru1301',
    },
  },
  {
    id: 'agniwatts',
    number: '04',
    title: 'AGNIWATTS',
    subtitle: 'Predictive Load Management',
    category: 'DATA & BACKEND ENGINEERING',
    tagline:
      'Predictive power-grid analysis system combining data processing, API services, and interactive visualization for load-management analysis.',
    description:
      'Predictive power-grid analysis system combining data processing, API services, and interactive visualization for load-management analysis.',
    image: '/assets/projects/agniwatts.jpg',
    technologies: ['Python', 'FastAPI', 'React', 'Pandas', 'Tailwind CSS', 'Recharts'],
    featured: true,
    caseStudy: {
      overview:
        'AgniWatts combines power consumption telemetry ingestion with predictive modeling and visualization to assist in electrical grid load management.',
      keyFeatures: [
        'Power consumption telemetry ingestion and regional substation monitoring',
        'Time-series load forecasting using Python and Pandas',
        'Anomaly detection indicators for voltage instability and sudden demand surges',
        'Interactive load monitoring dashboard built with FastAPI and React Recharts',
      ],
      technicalArchitecture:
        'FastAPI Telemetry Stream -> Pandas Data Processing Pipeline -> React & Recharts Dashboard UI.',
      impactOrOutcome:
        'Provides an operational reference for understanding demand spikes and planning proactive load distribution.',
      githubUrl: 'https://github.com/guru1301',
    },
  },
  {
    id: 'museum-booking',
    number: '05',
    title: 'MUSEUM BOOKING',
    subtitle: 'Digital Ticketing Platform',
    category: 'FULL-STACK APPLICATION',
    tagline:
      'Full-stack museum ticketing platform supporting online reservations, database-backed booking workflows, and QR-based ticket generation.',
    description:
      'Full-stack museum ticketing platform supporting online reservations, database-backed booking workflows, and QR-based ticket generation.',
    image: '/assets/projects/museum.jpg',
    technologies: ['Java', 'Spring Boot', 'React', 'Tailwind CSS', 'PostgreSQL', 'QR Code'],
    featured: true,
    caseStudy: {
      overview:
        'An architectural web platform for cultural exhibition ticketing, managing visitor flow through timed slots and instant digital verification passes.',
      keyFeatures: [
        'Online reservations and exhibition slot selection',
        'Database-backed booking workflows',
        'Timed capacity and visitor scheduling',
        'QR-based digital ticket generation',
      ],
      technicalArchitecture:
        'React Interface -> Spring Boot API Service -> PostgreSQL Database -> Dynamic QR Code Generation.',
      impactOrOutcome:
        'Delivers an intuitive, friction-free booking flow for exhibition attendees and event curators.',
      githubUrl: 'https://github.com/guru1301',
    },
  },
  {
    id: 'ott-analytics',
    number: '06',
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
    id: 'client-website-01',
    number: '01',
    title: 'CLIENT WEBSITE 01',
    subtitle: 'Client Website • Web Development',
    category: 'CLIENT WORK • WEB DEVELOPMENT',
    tagline:
      'Website developed for a client, translating their requirements into a responsive and professional digital presence.',
    description:
      'Website developed for a client, translating their requirements into a responsive and professional digital presence.',
    image: '/assets/projects/client1.jpg',
    technologies: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'],
    featured: true,
    caseStudy: {
      overview:
        'Website developed for a client, translating their business requirements into a responsive, modern, and professional digital presence.',
      keyFeatures: [
        'Client requirements translation into interactive component hierarchy',
        'Responsive cross-device layouts optimized for mobile and desktop',
        'Modern typography, accessible navigation, and optimized assets',
        'Production-ready build, deployment preparation, and client handoff',
      ],
      technicalArchitecture:
        'Client Specification -> Responsive React Component Tree -> Tailwind CSS System -> Production Delivery.',
      impactOrOutcome:
        'Established an engaging, high-performance web presence tailored directly to client goals and brand identity.',
      githubUrl: 'https://github.com/guru1301',
    },
  },
  {
    id: 'client-website-02',
    number: '02',
    title: 'CLIENT WEBSITE 02',
    subtitle: 'Client Website • Web Development',
    category: 'CLIENT WORK • WEB DEVELOPMENT',
    tagline:
      'Client-focused website developed from requirements through implementation, responsive presentation, and final delivery.',
    description:
      'Client-focused website developed from requirements through implementation, responsive presentation, and final delivery.',
    image: '/assets/projects/client2.jpg',
    technologies: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'],
    featured: true,
    caseStudy: {
      overview:
        'Client-focused website developed from initial requirements through interactive design, performance optimization, and final deployment.',
      keyFeatures: [
        'End-to-end client website delivery from concept to implementation',
        'Structured sections highlighting business services and contact workflows',
        'Clean UI architecture built with React and Tailwind CSS',
        'Performance optimization and cross-browser verification',
      ],
      technicalArchitecture:
        'Requirements Architecture -> Modular React Layouts -> Tailwind CSS Design System -> Production Deployment.',
      impactOrOutcome:
        'Delivered an intuitive, accessible digital solution enabling direct client communication and brand engagement.',
      githubUrl: 'https://github.com/guru1301',
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
    appliedIn: 'AgniWatts Telemetry Stream',
  },
  {
    name: 'SPRING BOOT',
    category: 'backend',
    description: 'Enterprise Java RESTful APIs, dependency injection, service layers, and microservices.',
    size: 'lg',
    focus: 'Enterprise Java Architecture',
    appliedIn: 'FlowAI & RailGo Systems',
  },
  {
    name: 'FLASK',
    category: 'backend',
    description: 'Lightweight Python web applications, routing endpoints, and modular API services.',
    size: 'md',
    focus: 'Microservices & Routing',
    appliedIn: 'Modular API Endpoints',
  },
  {
    name: 'REACT',
    category: 'frontend',
    description: 'Declarative component architecture, custom hooks, dynamic UI states, and responsive web design.',
    size: 'lg',
    focus: 'Component UI & Dynamic State',
    appliedIn: 'FlowAI Dashboard & Portals',
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
    appliedIn: 'Election Metrics & KPI Models',
  },
  {
    name: 'POSTGRESQL',
    category: 'database',
    description: 'ACID-compliant relational database management, table constraints, and query tuning.',
    size: 'md',
    focus: 'Relational Integrity & ACID',
    appliedIn: 'FlowAI & Museum Platforms',
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
