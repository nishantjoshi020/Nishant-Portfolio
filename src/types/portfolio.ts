export interface MetricItem {
  label: string;
  value: string;
  change?: string;
  context?: string;
  isPositive?: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  tagline: string;
  domain: string;
  role: string;
  timeline: string;
  keyContribution: string;
  impactHighlight: string;
  heroMetric: string;
  heroMetricLabel: string;
  featured: boolean;
  tags: string[];
  liveUrl?: string;
  isPrototype?: boolean;
  prototypeUrl?: string;
  context: {
    overview: string;
    companyType: string;
    targetAudience: string;
    businessGoal: string;
  };
  problem: {
    summary: string;
    whoExperiencesIt: string;
    whyItMatters: string;
    quantData: string[];
    userQuotes?: string[];
  };
  discovery: {
    researchMethods: {
      type: string;
      description: string;
      finding: string;
    }[];
    dataAnalysisSummary: string;
    competitiveAnalysis?: {
      competitor: string;
      pros: string;
      cons: string;
      gapIdentified: string;
    }[];
  };
  insights: {
    title: string;
    description: string;
    keyTakeaway: string;
  }[];
  hypothesis: {
    statement: string;
    rationale: string;
    successCriteria: string[];
  };
  prioritization: {
    framework: string; // e.g. "RICE", "Impact vs Effort", "Kano"
    frameworkDetails: string;
    matrixItems?: {
      feature: string;
      reach?: number | string;
      impact?: number | string;
      confidence?: number | string;
      effort?: number | string;
      score?: number | string;
      decision: 'P0 - Must Have' | 'P1 - Next Up' | 'P2 - Future' | 'Deprioritized';
    }[];
  };
  solution: {
    overview: string;
    keyPillars: {
      title: string;
      description: string;
      uxDecision: string;
    }[];
    userFlowSteps: {
      step: number;
      name: string;
      action: string;
      improvement: string;
    }[];
    wireframeConcept?: {
      component: string;
      problemSolved: string;
      interactionDetails: string;
    }[];
  };
  execution: {
    engineeringCollaboration: string;
    designPartnership: string;
    qaAndTesting: string;
    businessAndLeadership: string;
    stakeholderChallenges: string;
  };
  launch: {
    strategy: string; // e.g. "5% Canary Rollout -> 25% -> 100% General Availability"
    goLiveChecklist: string[];
    postLaunchMonitoring: string;
  };
  metricsAndImpact: {
    primaryMetrics: MetricItem[];
    secondaryMetrics: MetricItem[];
    qualitativeFeedback: string[];
    businessValueDelivered: string;
  };
  learnings: {
    whatILearned: string[];
    whatIWouldDoDifferently: string[];
  };
  presentationUrl?: string;
  architectureDiagrams?: {
    title: string;
    type: string;
    url: string;
    description: string;
  }[];
  personas?: {
    name: string;
    roleDesc: string;
    profile: string;
    jtbd: string;
    pain: string;
    currentBehavior: string;
    financialSensitivity: string;
    keyHook: string;
    adoptionLikelihood: string;
  }[];
  serviceBlueprint?: {
    stage: string;
    frontstage: string;
    systemLogic: string;
    integrations: string;
    metricsTracked: string;
  }[];
  northStarMetric?: {
    name: string;
    definition: string;
    target: string;
    whyItWorks: string;
  };
  growthLoops?: {
    title: string;
    description: string;
    whyImportant: string;
    outcome: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  productDomain: string;
  summary: string;
  problem: string;
  action: string;
  outcome: string;
  highlightMetrics: string[];
  stakeholders: string[];
  skillsUsed: string[];
}

export interface ProductPrinciple {
  id: string;
  title: string;
  shortStatement: string;
  expandedThought: string;
  howIApplyIt: string;
  mentalModelOrFramework: string;
  iconName: string;
}

export interface ToolkitCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    proficiency: 'Core Strength' | 'Proficient' | 'Familiar';
    context: string;
  }[];
}

export interface ToolItem {
  name: string;
  category: 'Analytics' | 'Product & Specs' | 'Design & Wireframing' | 'Roadmap & Agile' | 'User Research';
  useCase: string;
  icon?: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  keyInsights: string[];
  contentMarkdown?: string;
  link?: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  credentialId: string;
  credentialUrl: string;
  issueDate?: string;
  category?: 'Product Management' | 'Agile & Scrum' | 'Product Tooling';
  skillsCovered: string[];
  verified: boolean;
  description?: string;
}

export interface CareerSnapshot {
  yearsOfExperience: string;
  currentRole: string;
  education: {
    degree: string;
    institution: string;
    year: string;
    focus: string;
  }[];
  certifications?: CertificationItem[];
  keyDomains: string[];
  topSpecialties: string[];
  availability: string;
  resumeDownloadUrl: string;
}

export interface PortfolioProfile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  bioSummary: string;
  socials: {
    linkedin: string;
    github: string;
    email: string;
    twitter?: string;
  };
  certifications?: CertificationItem[];
  heroStats: {
    label: string;
    value: string;
    subtext: string;
  }[];
  howIWorkSteps: {
    step: string;
    title: string;
    tagline: string;
    mindset: string;
    deliverables: string[];
    collaborators: string[];
  }[];
}
