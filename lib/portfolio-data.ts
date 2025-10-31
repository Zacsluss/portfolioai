export interface PortfolioLink {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  image?: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    tagline: string;
    bio: string;
    location: string;
    email: string;
    phone?: string;
    avatar?: string;
  };
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
    deviantart?: string;
    youtube?: string;
    kuula?: string;
  };
  experience: Experience[];
  projects: Project[];
  skills: SkillCategory[];
  education?: Education[];
  additionalLinks?: PortfolioLink[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  features: string[];
  github?: string;
  demo?: string;
  image?: string;
  highlighted?: boolean;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  years?: number;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements?: string[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Zachary Sluss",
    title: "Lead CRM Systems Analyst | Enterprise Technology Leader",
    tagline: "Driving $10M+ revenue impact through enterprise platform leadership, team building, and strategic digital transformation across Fortune 500 organizations",
    bio: "Enterprise Technology Leader with 7+ years architecting CRM, ERP, and data platform ecosystems that deliver measurable business outcomes. Expert at leading cross-functional teams (60+ people), governing $5M+ platform budgets, and aligning technology investments with board-level growth objectives. Proven track record: 40% productivity gains, $8M+ incremental ARR, 3,000+ users across 22 countries. Passionate about building high-performing teams, driving organizational change, and leveraging AI/ML to solve complex business problems.",
    location: "New Hampshire, USA (Remote)",
    email: "zacharyjsluss@gmail.com",
    phone: "(603) 515-6051",
    avatar: "/avatar.jpg",
  },
  social: {
    github: "https://github.com/Zacsluss/Portfolio",
    linkedin: "https://linkedin.com/in/zacharyjsluss",
    website: "https://zacsluss.github.io/zacsluss",
    deviantart: "https://www.deviantart.com/theoryart777",
    youtube: "https://www.youtube.com/channel/UCjnD1inIRh9eKjrl4LfwLcQ",
    kuula: "https://www.kuula.co/profile/Drone_360_Aerial_Photography",
  },
  experience: [
    {
      id: "exp-1",
      company: "Computershare",
      position: "Lead CRM Systems Analyst",
      startDate: "2023-07",
      description: "Lead enterprise CRM strategy and digital transformation initiatives for thousands of global users across over 20 countries. Govern a $1M+ annual CRM, analytics, and integration portfolio aligned to board-level growth objectives.",
      achievements: [
        "Defined and govern enterprise CRM architecture and roadmap spanning Salesforce Multi-Cloud, ERP, and analytics ecosystems - ensuring interoperability, data integrity, and scalable growth across all business units",
        "Directed global digital transformation program that improved sales and operational throughput 40%, automated 1,000+ hours annually, and established global process standardization through API-led integration frameworks",
        "Instituted enterprise governance and compliance model achieving 100% SOX audit readiness and maintaining zero regulatory breaches across all systems and markets",
        "Architected managed services pricing platform integrating automation and standardized product data models, increasing deal velocity 30% and enabling consistent global pricing strategy",
        "Defined multi-year CRM and data roadmap ensuring alignment with corporate strategy, M&A integrations, and geographic expansion goals",
        "Enabled executive and board-level decision intelligence by designing Salesforce dashboards and analytics frameworks for real-time forecasting, pipeline, and revenue insights",
        "Led global change management and adoption strategy, serving as single authority for Salesforce change governance - aligning process, communication, and user adoption across 22+ countries",
        "Directed multi-vendor ecosystem ($3M+ annual portfolio; 11 contracts) across CRM, integration, analytics, and automation categories - overseeing selection, negotiation, and multi-year ROI realization",
        "Govern enterprise project delivery portfolio of 12+ concurrent strategic programs annually, ensuring cross-functional alignment, on-time delivery, and measurable business impact",
      ],
      technologies: ["Salesforce Multi-Cloud", "Salesforce Marketing Cloud", "MuleSoft", "API Management", "Tableau", "Power BI", "SQL", "AWS", "Azure", "ServiceNow", "Jira", "Confluence", "SOX Compliance"],
    },
    {
      id: "exp-2",
      company: "Computershare",
      position: "Sr. Sales Systems Analyst",
      startDate: "2022-12",
      endDate: "2023-07",
      description: "Advanced CRM systems leadership role driving enterprise-wide adoption and integration strategies.",
      achievements: [
        "Established API-led integration framework connecting Salesforce with ERP and HCM systems",
        "Standardized global processes across 22+ countries ensuring compliance and operational consistency",
        "Led M&A integration efforts for platform consolidation and data migration",
        "Designed automation logic reducing manual processes by 35%",
      ],
      technologies: ["Salesforce", "Integration APIs", "Workday HCM", "SAP ERP", "Data Migration", "Process Automation"],
    },
    {
      id: "exp-3",
      company: "Computershare",
      position: "Sr. Sales Analyst",
      startDate: "2021-10",
      endDate: "2022-12",
      description: "Drove sales operations optimization and CRM platform enhancement initiatives.",
      achievements: [
        "Built analytics frameworks for sales forecasting and pipeline management",
        "Implemented data quality controls and validation rules improving CRM data integrity 45%",
        "Created executive reporting dashboards for C-suite visibility into sales metrics",
        "Partnered with global teams to identify automation opportunities",
      ],
      technologies: ["Salesforce Sales Cloud", "Analytics", "Reporting", "Data Quality Management"],
    },
    {
      id: "exp-4",
      company: "CIT Bank",
      position: "Funding Manager",
      startDate: "2019-09",
      endDate: "2021-10",
      description: "Directed technology-enabled lending transformation within CIT's $46M+ national syndicate business portfolio, integrating automation, compliance, and data-driven decision frameworks.",
      achievements: [
        "Spearheaded cloud-based loan origination modernization, unifying analytics, compliance, and CRM platforms to reduce approval cycles 35% and deliver real-time executive reporting",
        "Instituted data governance and workflow automation standards enhancing accuracy, transparency, and risk oversight across all lending operations",
        "Defined and executed workforce enablement strategy, cutting new-hire ramp time 80% by designing training systems and process frameworks for a distributed national team",
        "Partnered with executive leadership to identify automation initiatives that improved portfolio yield, accelerated funding timelines, and elevated compliance integrity",
      ],
      technologies: ["Cloud Loan Origination", "CRM Systems", "Analytics Platforms", "Compliance Automation", "Data Governance", "Process Automation"],
    },
    {
      id: "exp-5",
      company: "EVO Payments International",
      position: "Underwriter",
      startDate: "2018-06",
      endDate: "2019-07",
      description: "Led technology-driven risk transformation for a $10B+ annual transaction portfolio, architecting automated risk analytics and compliance frameworks within enterprise credit systems.",
      achievements: [
        "Directed modernization of credit risk evaluation infrastructure, integrating SQL and Oracle analytics for predictive insight and early fraud detection",
        "Engineered automated scoring and data-cleansing models that improved underwriting accuracy and reduced turnaround time 60%",
        "Collaborated with IT and compliance architects to embed analytics pipelines into enterprise processing systems, aligning with global architecture and risk governance standards",
      ],
      technologies: ["SQL", "Oracle", "Risk Analytics", "Automated Scoring Models", "Data Integration", "Compliance Frameworks"],
    },
    {
      id: "exp-6",
      company: "Black Flag LLC",
      position: "Founder & Managing Partner",
      startDate: "2017-03",
      description: "Founded and scaled multi-channel digital ventures spanning e-commerce, creative media, and analytics-driven services - integrating automation, cloud systems, and emerging tech.",
      achievements: [
        "Built and governed cross-industry digital operations portfolio, generating six-figure revenue through e-commerce, creative production, and technical services",
        "Implemented end-to-end automation and analytics frameworks, optimizing marketing performance and operations across digital channels",
        "Architected digital commerce and operational framework for a forthcoming trading card and board game venture, aligning creative IP with scalable infrastructure",
        "Delivered advanced aerial mapping and 3D modeling solutions as an FAA-licensed remote pilot, leveraging data visualization and photogrammetry for commercial clients",
      ],
      technologies: ["E-commerce Platforms", "Cloud Systems", "Automation", "Analytics", "Drone Technology", "3D Modeling", "Digital Marketing"],
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "Global Salesforce Multi-Cloud Transformation",
      description: "Enterprise-wide CRM modernization unifying 3,000+ users across 22 countries with integrated ERP, HCM, and analytics",
      longDescription: "Led comprehensive digital transformation program integrating Salesforce Sales Cloud, Service Cloud, CPQ, and Data Cloud with Workday HCM and SAP ERP. Implemented API-led integration architecture using MuleSoft, established enterprise governance framework, and delivered real-time executive dashboards for C-suite decision-making.",
      technologies: ["Salesforce Multi-Cloud", "MuleSoft", "Workday HCM", "SAP ERP", "Tableau", "AWS", "API Management"],
      features: [
        "Global platform standardization across 22+ countries",
        "API-led integration framework with ERP and HCM systems",
        "Real-time executive dashboards for forecasting and pipeline visibility",
        "Enterprise governance model achieving 100% SOX compliance",
        "Automated 1,000+ hours annually through intelligent workflows",
        "40% increase in sales and operational throughput",
      ],
      highlighted: true,
    },
    {
      id: "proj-2",
      title: "Enterprise Managed Services Pricing Engine",
      description: "Intelligent pricing platform with embedded automation increasing deal velocity 30%",
      longDescription: "Designed and implemented global pricing platform within Salesforce CPQ, standardizing product catalog, pricing models, and approval workflows. Integrated with ERP for real-time cost data and built automated discounting logic based on deal parameters, customer segments, and regional considerations.",
      technologies: ["Salesforce CPQ", "ERP Integration", "Pricing Automation", "Workflow Engine", "Business Rules"],
      features: [
        "Standardized global product and pricing catalog",
        "Automated approval workflows and discounting logic",
        "Real-time ERP integration for cost synchronization",
        "Regional pricing and tax calculation engines",
        "30% improvement in deal closure velocity",
      ],
      highlighted: true,
    },
    {
      id: "proj-3",
      title: "Cloud-Based Loan Origination Platform",
      description: "Integrated lending platform reducing approval cycles 35% for $46M+ loan portfolio",
      longDescription: "Deployed cloud-based loan origination system integrating CRM, analytics, and compliance tools for national syndicate lending program. Built automated workflows for credit decisioning, risk assessment, and compliance checks, with executive dashboards providing real-time portfolio insights.",
      technologies: ["Cloud LOS", "CRM Integration", "Analytics Platforms", "Compliance Automation", "Risk Management"],
      features: [
        "Automated credit decisioning workflows",
        "Real-time compliance and risk monitoring",
        "Executive dashboards for portfolio management",
        "CRM integration for customer relationship tracking",
        "35% reduction in approval cycle time",
      ],
      highlighted: true,
    },
  ],
  skills: [
    {
      category: "Analytics & Business Intelligence",
      skills: [
        { name: "Data Strategy", level: "Expert", years: 8 },
        { name: "Google Analytics", level: "Advanced", years: 8 },
        { name: "Looker", level: "Advanced", years: 3 },
        { name: "Power BI", level: "Advanced", years: 6 },
        { name: "Tableau", level: "Expert", years: 5 },
      ],
    },
    {
      category: "Automation & Security",
      skills: [
        { name: "Automation Anywhere", level: "Advanced", years: 4 },
        { name: "CrowdStrike", level: "Advanced", years: 4 },
        { name: "Okta SSO", level: "Advanced", years: 4 },
        { name: "OneTrust", level: "Advanced", years: 4 },
        { name: "Palo Alto Prisma Cloud", level: "Advanced", years: 4 },
        { name: "Splunk", level: "Advanced", years: 4 },
        { name: "TrustArc", level: "Advanced", years: 4 },
        { name: "UiPath", level: "Advanced", years: 4 },
      ],
    },
    {
      category: "Cloud & DevOps",
      skills: [
        { name: "AWS", level: "Expert", years: 4 },
        { name: "CI/CD Pipelines", level: "Advanced", years: 4 },
        { name: "Google Cloud Platform", level: "Advanced", years: 4 },
        { name: "Microsoft Azure", level: "Advanced", years: 4 },
      ],
    },
    {
      category: "Enterprise Architecture & Project Management",
      skills: [
        { name: "Confluence", level: "Advanced", years: 6 },
        { name: "Jira", level: "Expert", years: 6 },
        { name: "TOGAF", level: "Advanced", years: 4 },
        { name: "Zachman Framework", level: "Advanced", years: 4 },
      ],
    },
    {
      category: "Enterprise CRM & Business Platforms",
      skills: [
        { name: "Marketo", level: "Advanced", years: 4 },
        { name: "Oracle Cloud Apps", level: "Advanced", years: 4 },
        { name: "Pardot", level: "Advanced", years: 4 },
        { name: "Salesforce CPQ", level: "Expert", years: 7 },
        { name: "Salesforce Data Cloud", level: "Expert", years: 7 },
        { name: "Salesforce Marketing Cloud", level: "Expert", years: 7 },
        { name: "Salesforce Multi-Cloud", level: "Expert", years: 7 },
        { name: "SAP ERP", level: "Advanced", years: 3 },
        { name: "ServiceNow", level: "Advanced", years: 4 },
        { name: "Workday HCM", level: "Advanced", years: 4 },
      ],
    },
    {
      category: "Governance & Compliance",
      skills: [
        { name: "CCPA", level: "Advanced", years: 4 },
        { name: "Enterprise Governance", level: "Expert", years: 4 },
        { name: "GDPR", level: "Advanced", years: 4 },
        { name: "Security & Risk Management", level: "Advanced", years: 7 },
        { name: "SOX Compliance", level: "Expert", years: 4 },
      ],
    },
    {
      category: "Integration & Data Platforms",
      skills: [
        { name: "API Management", level: "Expert", years: 4 },
        { name: "Apigee", level: "Advanced", years: 4 },
        { name: "Google BigQuery", level: "Advanced", years: 4 },
        { name: "Kong", level: "Advanced", years: 4 },
        { name: "MuleSoft", level: "Expert", years: 4 },
        { name: "Oracle", level: "Advanced", years: 5 },
        { name: "Snowflake", level: "Advanced", years: 4 },
        { name: "SQL", level: "Expert", years: 7 },
      ],
    },
    {
      category: "Modern Web Development",
      skills: [
        { name: "Next.js", level: "Advanced", years: 2 },
        { name: "Node.js", level: "Advanced", years: 3 },
        { name: "OpenAI API", level: "Advanced", years: 2 },
        { name: "React", level: "Advanced", years: 3 },
        { name: "TypeScript", level: "Advanced", years: 3 },
      ],
    },
  ],
  education: [
    {
      institution: "University of New Hampshire",
      degree: "Bachelor of Science",
      field: "Environmental and Resource Economics",
      startDate: "2012-09",
      endDate: "2016-12",
      achievements: [
        "Minor in Community and Environmental Planning",
        "Coursework in business management, analytics, finance, computer science, marketing, and natural sciences",
        "Developed strong analytical and strategic thinking foundations",
      ],
    },
  ],
  additionalLinks: [
    // AI & Technology
    {
      id: "link-10",
      title: "ASCII 3D Animator",
      description: "A fun, interactive web tool that transforms 3D animated models into live ASCII art using just text characters",
      url: "https://github.com/Zacsluss/ascii_3d_animator",
      category: "AI & Technology",
      image: "/portfolio-images/asciipicture.png",
    },
    {
      id: "link-11",
      title: "Crystal Blitz",
      description: "Crystal Blitz is an intense arena shooter where you face endless waves of intelligent enemies",
      url: "https://github.com/Zacsluss/crystal_blitz",
      category: "AI & Technology",
      image: "/portfolio-images/crystalblitzpicture.png",
    },
    {
      id: "link-12",
      title: "DATAPHREAK",
      description: "DATAPHREAK transforms impossible data challenges into 30-second solutions for analyzing CSV files and detecting patterns",
      url: "https://github.com/Zacsluss/dataphreak",
      category: "AI & Technology",
      image: "/portfolio-images/dataphreakpicture.png",
    },
    {
      id: "link-9",
      title: "Particle Physics Simulator",
      description: "An interactive particle physics simulation that brings real science to life through stunning visual effects",
      url: "https://github.com/Zacsluss/particle_physics_simulator",
      category: "AI & Technology",
      image: "/portfolio-images/particlepicture.png",
    },
    {
      id: "link-13",
      title: "Starfield Portfolio",
      description: "Interactive 3D particle portfolio with 30,000 GPU-accelerated particles morphing in real-time",
      url: "https://github.com/Zacsluss/portfolio",
      category: "AI & Technology",
      image: "/portfolio-images/portfoliopicture.png",
    },
    // Art & Design
    {
      id: "link-2",
      title: "Digital Art Portfolio",
      description: "Creative artwork and digital illustrations",
      url: "https://www.deviantart.com/theoryart777",
      category: "Art & Design",
      image: "/portfolio-images/images.webp",
    },
    {
      id: "link-4",
      title: "Digital Design Work",
      description: "Graphic design and visual branding projects",
      url: "https://drive.google.com/drive/folders/1giTNNrjznLS9RILHq9C9vCQQjWxCYgxD?usp=sharing",
      category: "Art & Design",
      image: "/portfolio-images/digitaldesign.webp",
    },
    {
      id: "link-3",
      title: "Music Production",
      description: "Original music compositions and productions",
      url: "https://drive.google.com/drive/folders/1ET30TX7_lST5Cp3EsNp7ak-S4WcLffar?usp=drive_link",
      category: "Art & Design",
      image: "/portfolio-images/music.webp",
    },
    // Certifications
    {
      id: "link-14",
      title: "Salesforce Trailblazer Profile",
      description: "Professional certifications and continuous learning achievements in Salesforce and enterprise technologies",
      url: "https://www.salesforce.com/trailblazer/zacharyjsluss",
      category: "Certifications",
      image: "/portfolio-images/certificationpicture.png",
    },
    // Drone 360 Aerial Photography
    {
      id: "link-5",
      title: "360° Immersive Photography",
      description: "Interactive 360-degree aerial photography experiences",
      url: "https://www.kuula.co/profile/Drone_360_Aerial_Photography",
      category: "Drone 360 Aerial Photography",
      image: "/portfolio-images/360Photo.webp",
    },
    {
      id: "link-6",
      title: "Aerial Photography Portfolio",
      description: "Professional drone photography collection",
      url: "https://drive.google.com/drive/folders/1aJG3T-TVUoJ-Xc6CdCvK2HZTf-PCBpDW?usp=sharing",
      category: "Drone 360 Aerial Photography",
      image: "/portfolio-images/DronePhoto.webp",
    },
    {
      id: "link-7",
      title: "Aerial Videography",
      description: "Cinematic drone video productions",
      url: "https://www.youtube.com/channel/UCjnD1inIRh9eKjrl4LfwLcQ",
      category: "Drone 360 Aerial Photography",
      image: "/portfolio-images/Video.webp",
    },
  ],
};
