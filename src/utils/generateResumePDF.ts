import { jsPDF } from 'jspdf';

export function generateResumePDF(): void {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'letter', // 612 x 792 pt
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 36; // 0.5 in margins
  const contentWidth = pageWidth - margin * 2; // 540 pt
  let y = 30;

  // Helper for Section Dividers with clean underline
  const addSectionHeader = (title: string) => {
    y += 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(title.toUpperCase(), margin, y);
    y += 3;
    doc.setDrawColor(20, 20, 20);
    doc.setLineWidth(0.85);
    doc.line(margin, y, pageWidth - margin, y);
    y += 9;
  };

  // Helper to render a bullet item with a bold prefix and wrapped normal body
  const renderBullet = (
    boldPrefix: string,
    body: string,
    fontSize: number = 7.5,
    lineHeight: number = 9.4
  ) => {
    doc.setFontSize(fontSize);
    doc.setTextColor(20, 20, 20);

    // Bullet point symbol
    doc.setFont('helvetica', 'normal');
    doc.text('•', margin + 2, y);

    const textStartX = margin + 11;
    const availFullWidth = contentWidth - 11;

    // Draw bold prefix
    doc.setFont('helvetica', 'bold');
    doc.text(boldPrefix, textStartX, y);
    const prefixWidth = doc.getTextWidth(boldPrefix);

    // Fit remaining words onto the first line
    doc.setFont('helvetica', 'normal');
    const availFirstLine = availFullWidth - prefixWidth;
    const words = body.split(' ');

    const firstLineWords: string[] = [];
    let remainingWordIndex = 0;

    for (let i = 0; i < words.length; i++) {
      const candidate = firstLineWords.length === 0 ? words[i] : firstLineWords.join(' ') + ' ' + words[i];
      if (doc.getTextWidth(candidate) <= availFirstLine) {
        firstLineWords.push(words[i]);
        remainingWordIndex = i + 1;
      } else {
        break;
      }
    }

    if (firstLineWords.length > 0) {
      doc.text(firstLineWords.join(' '), textStartX + prefixWidth, y);
    }

    // Wrap subsequent lines
    const remainingText = words.slice(remainingWordIndex).join(' ');
    if (remainingText.length > 0) {
      const remainingLines = doc.splitTextToSize(remainingText, availFullWidth);
      for (let j = 0; j < remainingLines.length; j++) {
        y += lineHeight;
        doc.text(remainingLines[j], textStartX, y);
      }
    }

    y += lineHeight + 1.2;
  };

  // Helper to render category lines in Skills
  const renderSkillCategory = (
    boldPrefix: string,
    body: string,
    fontSize: number = 7.5,
    lineHeight: number = 9.4
  ) => {
    doc.setFontSize(fontSize);
    doc.setTextColor(20, 20, 20);

    const textStartX = margin;
    const availFullWidth = contentWidth;

    // Draw bold prefix
    doc.setFont('helvetica', 'bold');
    doc.text(boldPrefix, textStartX, y);
    const prefixWidth = doc.getTextWidth(boldPrefix);

    // Fit words on first line
    doc.setFont('helvetica', 'normal');
    const availFirstLine = availFullWidth - prefixWidth;
    const words = body.split(' ');

    const firstLineWords: string[] = [];
    let remainingWordIndex = 0;

    for (let i = 0; i < words.length; i++) {
      const candidate = firstLineWords.length === 0 ? words[i] : firstLineWords.join(' ') + ' ' + words[i];
      if (doc.getTextWidth(candidate) <= availFirstLine) {
        firstLineWords.push(words[i]);
        remainingWordIndex = i + 1;
      } else {
        break;
      }
    }

    if (firstLineWords.length > 0) {
      doc.text(firstLineWords.join(' '), textStartX + prefixWidth, y);
    }

    // Wrap subsequent lines
    const remainingText = words.slice(remainingWordIndex).join(' ');
    if (remainingText.length > 0) {
      const remainingLines = doc.splitTextToSize(remainingText, availFullWidth);
      for (let j = 0; j < remainingLines.length; j++) {
        y += lineHeight;
        doc.text(remainingLines[j], textStartX, y);
      }
    }

    y += lineHeight + 1.0;
  };

  // ==========================================
  // HEADER
  // ==========================================
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(19);
  doc.setTextColor(15, 23, 42);
  doc.text('NISHANT JOSHI', pageWidth / 2, y, { align: 'center' });
  y += 13;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85);
  doc.text('ASSOCIATE PRODUCT MANAGER', pageWidth / 2, y, { align: 'center' });
  y += 11;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(51, 65, 85);
  const contactText = '+91 7000918880  |  nishantjoshi020@gmail.com  |  linkedin.com/in/nishant-joshi20';
  doc.text(contactText, pageWidth / 2, y, { align: 'center' });
  y += 4;

  // ==========================================
  // 1. PROFESSIONAL SUMMARY
  // ==========================================
  addSectionHeader('Professional Summary');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(20, 20, 20);
  const summary = 'Associate Product Manager with hands-on experience across B2B SaaS, enterprise software, and consumer AI mobile products, managing the product lifecycle and setting quarterly Objectives and Key Results (OKRs). Track record taking products from 0 to 1 through launch, running customer discovery, gathering client requirements, and writing Product Requirements Documents (PRDs) with wireframes and edge cases, then collaborating with engineering, design, and QA through Agile sprints to ship them. Technically fluent in API integration, schema validation, and workflow automation, backed by user research, experimentation, A/B testing, and product analytics to guide roadmap decisions. Certified in Agile/Scrum, Jira, and AI-First Product Management.';

  const summaryLines = doc.splitTextToSize(summary, contentWidth);
  for (let i = 0; i < summaryLines.length; i++) {
    doc.text(summaryLines[i], margin, y);
    y += 9.3;
  }
  y += 2;

  // ==========================================
  // 2. PROFESSIONAL EXPERIENCE
  // ==========================================
  addSectionHeader('Professional Experience');

  // Job 1: Softude
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.8);
  doc.setTextColor(15, 23, 42);
  doc.text('Softude', margin, y);

  doc.setFont('helvetica', 'normal');
  const softudeWidth = doc.getTextWidth('Softude');
  doc.text(' | Associate Product Manager | Cost It Right (Enterprise Costing, RFX, eAuction & Automation SaaS)', margin + softudeWidth, y);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.2);
  doc.text('Nov 2025 to Aug 2026', pageWidth - margin, y, { align: 'right' });
  y += 10.5;

  renderBullet(
    'AI-Enabled Product Development & Velocity: ',
    'Led product lifecycle initiatives across requirements gathering, rapid prototyping, and validation, integrating AI agents into costing pipelines to compress release cycles from 3 weeks to 2 weeks (45% faster velocity).'
  );

  renderBullet(
    'Enterprise Client Delivery & Adoption: ',
    'Scoped and shipped enterprise RFX and eAuction modules to 5 marquee clients (Havells, Hero MotoCorp, TVS), securing 60% module adoption and cutting procurement TAT from 15 to 7 days.'
  );

  renderBullet(
    'Costing Architecture & Simulation: ',
    'Validated system architecture for Zero-Based Costing (ZBC), Vendor (VBC), and Customer (CBC) models, designing cost change simulation models and establishing KPI dashboards for enterprise procurement visibility.'
  );

  renderBullet(
    'API Data Ingestion & Quality Automation: ',
    'Built a Quality Assurance (QA) automation suite and data validation engine (Python, Playwright) for User Acceptance Testing (UAT) with 45+ schema rules and batch Excel uploads, slashing manual data setup from 7 to 3 days (57% reduction).'
  );

  renderBullet(
    'Documentation & Knowledge Base: ',
    'Built a centralized documentation portal (MkDocs Material) with 45+ interactive Standard Operating Procedures (SOPs), process architecture diagrams, and technical specs for client enablement, developer handoffs, and audit readiness.'
  );

  y += 2;

  // Job 2: Mintosh
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.8);
  doc.setTextColor(15, 23, 42);
  doc.text('Mintosh', margin, y);

  doc.setFont('helvetica', 'normal');
  const mintoshWidth = doc.getTextWidth('Mintosh');
  doc.text(' | Product Manager Intern | AFTR (B2C AI Persona, Video & Voice Generation App)', margin + mintoshWidth, y);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.2);
  doc.text('Jan 2024 to Oct 2025', pageWidth - margin, y, { align: 'right' });
  y += 10.5;

  renderBullet(
    'Product Ownership & Strategy: ',
    'Owned the product vision, strategy, UI/UX design, and roadmap for AFTR, an early-stage startup B2C AI mobile app, driving product-market fit and key product decisions from initial concept through market launch across engineering, design, and business.'
  );

  renderBullet(
    'Product Discovery & Agile Backlog: ',
    'Authored 25+ PRDs with detailed wireframes, user flows, edge-case matrices, and acceptance criteria, managing an 80+ user story product backlog in Jira and facilitating sprint planning, grooming, and retrospectives across 12 Agile cycles.'
  );

  renderBullet(
    'User Research & UI/UX Design: ',
    'Designed and executed a structured customer discovery program with user interviews and usability studies, leading Figma UI/UX design to reduce signup steps from 7 to 4 and lift user activation from 42% to 55%.'
  );

  renderBullet(
    'A/B Testing & Product Analytics: ',
    'Defined experimentation frameworks and ran A/B tests on onboarding, CTA placements, and notification cadence, instrumenting product analytics in Firebase to track retention cohorts, feature adoption, and session depth to prioritize the quarterly roadmap.'
  );

  renderBullet(
    'Cross-Platform Release Management: ',
    'Scoped, prioritized, and launched Minimum Viable Product (MVP) features for iOS and Android mobile apps, compressing release turnaround from 3 to 2 weeks (33% faster) and increasing release frequency by 50% under 100% App Store and Google Play compliance.'
  );

  renderBullet(
    'Cross-Functional Team Leadership: ',
    'Directly led a cross-functional team of software engineers, UI/UX designers, QA testers, and a social media manager across daily standups, weekly sprint reviews, and bi-weekly stakeholder demos, unblocking dependencies and negotiating scope trade-offs to protect delivery timelines.'
  );

  renderBullet(
    'Competitive Analysis & Go-to-Market (GTM): ',
    'Conducted systematic competitive analysis and teardowns across competitor mobile apps to define positioning, feature differentiation, and App Store Optimization (ASO) metadata strategy, coordinating pre-launch beta testing with 200+ early adopters.'
  );

  y += 2;

  // ==========================================
  // 3. SKILLS
  // ==========================================
  addSectionHeader('Skills');

  renderSkillCategory(
    'Product Strategy: ',
    'Product Roadmap, Product Lifecycle Management, OKRs & Key Performance Indicators (KPIs), Requirements Gathering, Feature Prioritization'
  );

  renderSkillCategory(
    'Product Execution: ',
    'Product Requirements Documents (PRDs), Prototyping, Acceptance Criteria, User Research & Interviews, Stakeholder Management, Agile & Scrum'
  );

  renderSkillCategory(
    'Analytics & Experimentation: ',
    'SQL, Product Metrics & KPI Dashboards, Funnel Analysis, Cohort Retention, Experimentation & A/B Testing'
  );

  renderSkillCategory(
    'AI & Technical: ',
    'Generative AI, Prompt Engineering, LLMs & RAG, AI Agents, REST APIs, Schema Validation, Workflow Automation'
  );

  renderSkillCategory(
    'Tools & Platforms: ',
    'Jira, Confluence, Figma, Claude Code, Antigravity, LangChain, Postman, Python, Playwright, GitHub, n8n'
  );

  y += 2;

  // ==========================================
  // 4. EDUCATION
  // ==========================================
  addSectionHeader('Education');

  const educationList = [
    { degree: 'Master of Business Administration (MBA)', school: ' | Devi Ahilya Vishwavidyalaya, Indore', date: 'Aug 2024' },
    { degree: 'Bachelor of Technology (B.Tech)', school: ' | Medi-Caps University, Indore', date: 'May 2020' },
  ];

  educationList.forEach(edu => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(15, 23, 42);
    doc.text(edu.degree, margin, y);
    const dWidth = doc.getTextWidth(edu.degree);

    doc.setFont('helvetica', 'normal');
    doc.text(edu.school, margin + dWidth, y);

    doc.setFont('helvetica', 'italic');
    doc.text(edu.date, pageWidth - margin, y, { align: 'right' });
    y += 10;
  });

  y += 2;

  // ==========================================
  // 5. CERTIFICATIONS
  // ==========================================
  addSectionHeader('Certifications');

  const certLines = [
    'AI-First Product Management (AirTribe, Jan 2026)  •  Software Product Management (Univ. of Alberta, Sept 2023)  •  Agile with Atlassian Jira (Atlassian, Sept 2023)',
    'Introduction to Agile & Scrum (IBM, Sept 2023)  •  Introduction to Scrum Master (LearnQuest, Sept 2023)  •  Become a Product Manager (Udemy, Sept 2023)'
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(20, 20, 20);

  certLines.forEach(line => {
    doc.text(line, margin, y);
    y += 9.6;
  });

  // Save the PDF as is
  doc.save('Nishant_Joshi_Resume.pdf');
}
