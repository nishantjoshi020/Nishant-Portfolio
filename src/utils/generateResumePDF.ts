import { jsPDF } from 'jspdf';

export function generateResumePDF(): void {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'letter', // 612 x 792 pt
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 36; // 0.5 in margins
  const contentWidth = pageWidth - margin * 2;
  let y = 38;

  // Helper to add divider line
  const addSectionHeader = (title: string) => {
    y += 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(20, 20, 20);
    doc.text(title.toUpperCase(), margin, y);
    y += 3;
    doc.setDrawColor(30, 41, 59);
    doc.setLineWidth(0.8);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;
  };

  // Header: Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(19);
  doc.setTextColor(15, 23, 42);
  doc.text('NISHANT JOSHI', pageWidth / 2, y, { align: 'center' });
  y += 14;

  // Header: Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text('ASSOCIATE PRODUCT MANAGER', pageWidth / 2, y, { align: 'center' });
  y += 13;

  // Header: Contact Info
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const contactText = '+91-7000918880  |  nishantjoshi020@gmail.com  |  linkedin.com/in/nishant-joshi20  |  Indore, M.P.';
  doc.text(contactText, pageWidth / 2, y, { align: 'center' });
  y += 6;

  // 1. PROFESSIONAL SUMMARY
  addSectionHeader('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  const summary = 'Technical & Data-Driven Associate Product Manager with 3+ years of experience delivering enterprise B2B SaaS, cost automation platforms, and B2C mobile products. Proven track record of defining product strategy, driving feature roadmaps, and authoring comprehensive PRDs, user stories, and acceptance criteria from discovery through development, testing, and launch. Adept at cross-functional stakeholder management, data-driven product decision-making, and AI-assisted workflow automation to drive measurable improvements across procurement TAT, user activation, release velocity, and operational efficiency.';
  const summaryLines = doc.splitTextToSize(summary, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 10.5 + 4;

  // 2. PROFESSIONAL EXPERIENCE
  addSectionHeader('Professional Experience');

  // Job 1: Softude
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Softude', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(' | Associate Product Manager', margin + doc.getTextWidth('Softude'), y);
  
  doc.setFont('helvetica', 'bold');
  doc.text('November 2025 – August 2026', pageWidth - margin, y, { align: 'right' });
  y += 11;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Product: Cost It Right – Enterprise Costing, Automation & RFQ SaaS Platform', margin, y);
  y += 10;

  const softudeBullets = [
    { bold: 'AI-Enabled Product Development: ', text: 'Owned product initiatives across requirements engineering, rapid prototyping, and validation; integrated AI agents and automation to accelerate feature roadmaps, costing workflows, and enterprise dashboards, shipping capabilities 45% faster (from 3 weeks to 2 weeks).' },
    { bold: 'Enterprise Product & Procurement Impact: ', text: 'Drove stakeholder management across 5 marquee enterprise clients (Havells, Hero MotoCorp, TVS, Escorts Kubota, Jash Engineering); scoped and shipped 3 analytics modules across 100+ suppliers, leveraging data-driven decision-making to achieve 60% adoption, reduce procurement TAT from 15 to 7 days, cut support tickets by 30%, and save ~3 hrs/week for client teams.' },
    { bold: 'Costing Architecture & Simulation: ', text: 'Owned the architecture validation of Vendor-, Supplier-, and Customer-Based costing models (ZBC/VBC/CBC); designed simulation workflows for cost-change and impact analysis, establishing performance metrics and KPI reporting for procurement visibility.' },
    { bold: 'Data Ingestion & Process Automation: ', text: 'Prioritized and product-managed an automated data ingestion and validation engine using Python and Playwright, defining schema rules and batch Excel uploads that slashed manual data setup and testing cycles from 7 days to 3 days (57%).' },
    { bold: 'Quality & Client Enablement: ', text: 'Launched a centralized MkDocs documentation framework with 45+ guides and interactive SOPs for client and developer enablement; drove regression testing and performance monitoring to detect regressions earlier in the release cycle.' },
  ];

  softudeBullets.forEach(b => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text('•', margin + 2, y);

    const fullText = b.bold + b.text;
    const lines = doc.splitTextToSize(fullText, contentWidth - 14);

    // Draw first line with bold prefix
    doc.setFont('helvetica', 'bold');
    doc.text(b.bold, margin + 12, y);
    const boldWidth = doc.getTextWidth(b.bold);

    doc.setFont('helvetica', 'normal');
    const firstLineRest = doc.splitTextToSize(b.text, contentWidth - 14 - boldWidth)[0] || '';
    doc.text(firstLineRest, margin + 12 + boldWidth, y);

    // Draw subsequent lines
    if (lines.length > 1) {
      const restOfText = fullText.substring(b.bold.length + firstLineRest.length).trim();
      const remainingLines = doc.splitTextToSize(restOfText, contentWidth - 14);
      for (let i = 0; i < remainingLines.length; i++) {
        y += 9.5;
        doc.text(remainingLines[i], margin + 12, y);
      }
    }
    y += 10.5;
  });

  y += 2;

  // Job 2: Mintosh
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Mintosh', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(' | Product Manager (Intern)', margin + doc.getTextWidth('Mintosh'), y);
  
  doc.setFont('helvetica', 'bold');
  doc.text('January 2024 – October 2025', pageWidth - margin, y, { align: 'right' });
  y += 11;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Product: AFTR – B2C AI-Powered Mobile & Web Product | Concurrent Internship Engagement', margin, y);
  y += 10;

  const mintoshBullets = [
    { bold: '0-to-1 Product Discovery & MVP: ', text: 'Owned 0-to-1 product discovery, strategy, and roadmap for a B2C AI product; authored detailed PRDs, user stories, and acceptance criteria for an 80+ story backlog in Jira, driving sprint planning and cross-functional execution across 12 Agile cycles.' },
    { bold: 'User Research & Activation: ', text: 'Drove user research through 30+ user interviews, usability studies, and competitive analysis; redesigned onboarding flows in Figma, reducing sign-up steps from 7 to 4, increasing user activation from 42% to 55%, and reducing drop-off from 48% to 34%.' },
    { bold: 'Mobile Delivery & Release Management: ', text: 'Scoped, prioritized, and launched MVP features across iOS and Android; reduced release cycles from 3 weeks to 2 weeks (33% reduction), increasing release frequency by 50% while maintaining 100% App Store and Google Play compliance.' },
  ];

  mintoshBullets.forEach(b => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text('•', margin + 2, y);

    const fullText = b.bold + b.text;
    const lines = doc.splitTextToSize(fullText, contentWidth - 14);

    doc.setFont('helvetica', 'bold');
    doc.text(b.bold, margin + 12, y);
    const boldWidth = doc.getTextWidth(b.bold);

    doc.setFont('helvetica', 'normal');
    const firstLineRest = doc.splitTextToSize(b.text, contentWidth - 14 - boldWidth)[0] || '';
    doc.text(firstLineRest, margin + 12 + boldWidth, y);

    if (lines.length > 1) {
      const restOfText = fullText.substring(b.bold.length + firstLineRest.length).trim();
      const remainingLines = doc.splitTextToSize(restOfText, contentWidth - 14);
      for (let i = 0; i < remainingLines.length; i++) {
        y += 9.5;
        doc.text(remainingLines[i], margin + 12, y);
      }
    }
    y += 10.5;
  });

  y += 2;

  // Job 3: Across The Globe (ATG)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Across The Globe (ATG)', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(' | Tech Product Manager (Intern)', margin + doc.getTextWidth('Across The Globe (ATG)'), y);
  
  doc.setFont('helvetica', 'bold');
  doc.text('November 2023 – June 2024', pageWidth - margin, y, { align: 'right' });
  y += 10;

  const atgBullets = [
    { bold: 'Procurpal | B2B SaaS Procurement Platform: ', text: 'Translated enterprise requirements into functional specifications, user stories, and acceptance criteria for AI-based supplier recommendations and e-auctions; prioritized backlog, aligned engineering on dependencies, and drove pre-launch testing.' },
    { bold: 'Treato | Beauty & Grooming Marketplace: ', text: 'Scoped customer booking flows and salon scheduling dashboards; managed stakeholder feedback, sprint deliverables, and pre-launch QA execution across design and engineering teams.' },
  ];

  atgBullets.forEach(b => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text('•', margin + 2, y);

    const fullText = b.bold + b.text;
    const lines = doc.splitTextToSize(fullText, contentWidth - 14);

    doc.setFont('helvetica', 'bold');
    doc.text(b.bold, margin + 12, y);
    const boldWidth = doc.getTextWidth(b.bold);

    doc.setFont('helvetica', 'normal');
    const firstLineRest = doc.splitTextToSize(b.text, contentWidth - 14 - boldWidth)[0] || '';
    doc.text(firstLineRest, margin + 12 + boldWidth, y);

    if (lines.length > 1) {
      const restOfText = fullText.substring(b.bold.length + firstLineRest.length).trim();
      const remainingLines = doc.splitTextToSize(restOfText, contentWidth - 14);
      for (let i = 0; i < remainingLines.length; i++) {
        y += 9.5;
        doc.text(remainingLines[i], margin + 12, y);
      }
    }
    y += 10.5;
  });

  y += 2;

  // Job 4: IndVibe Infotech
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('IndVibe Infotech Pvt Ltd', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(' | Product Manager Intern', margin + doc.getTextWidth('IndVibe Infotech Pvt Ltd'), y);
  
  doc.setFont('helvetica', 'bold');
  doc.text('July 2023 – October 2023', pageWidth - margin, y, { align: 'right' });
  y += 10;

  const indvibeBullet = { bold: 'Product Support & Backlog Maintenance: ', text: 'Supported senior PMs in maintaining the product backlog in Jira, drafting basic user stories and functional requirements, and assisting in QA testing across 4 Agile sprint cycles.' };
  {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text('•', margin + 2, y);

    const fullText = indvibeBullet.bold + indvibeBullet.text;
    const lines = doc.splitTextToSize(fullText, contentWidth - 14);

    doc.setFont('helvetica', 'bold');
    doc.text(indvibeBullet.bold, margin + 12, y);
    const boldWidth = doc.getTextWidth(indvibeBullet.bold);

    doc.setFont('helvetica', 'normal');
    const firstLineRest = doc.splitTextToSize(indvibeBullet.text, contentWidth - 14 - boldWidth)[0] || '';
    doc.text(firstLineRest, margin + 12 + boldWidth, y);

    if (lines.length > 1) {
      const restOfText = fullText.substring(indvibeBullet.bold.length + firstLineRest.length).trim();
      const remainingLines = doc.splitTextToSize(restOfText, contentWidth - 14);
      for (let i = 0; i < remainingLines.length; i++) {
        y += 9.5;
        doc.text(remainingLines[i], margin + 12, y);
      }
    }
    y += 10.5;
  }

  // 3. SKILLS & TOOLS
  addSectionHeader('Skills & Tools');

  const skillsList = [
    { title: 'Product Strategy & Execution: ', items: 'Product Strategy & Roadmapping | Product Discovery | PRDs, User Stories & Acceptance Criteria | Backlog Prioritization & Grooming | Data-Driven Decision Making | Stakeholder Management | User Research & Usability Testing | Costing Architecture (ZBC/VBC/CBC) | Agile & Scrum' },
    { title: 'AI & Technical: ', items: 'AI Product Development | Retrieval-Augmented Generation (RAG) | AI Agents & Prototyping | Workflow Automation | Python | Playwright | n8n | SQL' },
    { title: 'Product Tools: ', items: 'Jira | Figma | Confluence | Advanced Excel | Zoho | Postman | GitHub | MkDocs Material | Trello' }
  ];

  skillsList.forEach(s => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(s.title, margin, y);
    const titleWidth = doc.getTextWidth(s.title);

    doc.setFont('helvetica', 'normal');
    const firstLineRest = doc.splitTextToSize(s.items, contentWidth - titleWidth)[0] || '';
    doc.text(firstLineRest, margin + titleWidth, y);

    const full = s.title + s.items;
    const lines = doc.splitTextToSize(full, contentWidth);
    if (lines.length > 1) {
      const rest = s.items.substring(firstLineRest.length).trim();
      const nextLines = doc.splitTextToSize(rest, contentWidth);
      for (let i = 0; i < nextLines.length; i++) {
        y += 9.5;
        doc.text(nextLines[i], margin, y);
      }
    }
    y += 10;
  });

  // 4. EDUCATION & CERTIFICATIONS
  addSectionHeader('Education & Certifications');

  const educationList = [
    { name: 'AI-First Product Management', school: ' | AirTribe', date: 'January 2026' },
    { name: 'Master of Business Administration (MBA)', school: ' | Devi Ahilya Vishwavidyalaya, Indore, M.P.', date: 'August 2024' },
    { name: 'Bachelor of Technology (B.Tech)', school: ' | Medi-Caps University, Indore, M.P.', date: 'May 2020' },
  ];

  educationList.forEach(edu => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(edu.name, margin, y);
    const nWidth = doc.getTextWidth(edu.name);

    doc.setFont('helvetica', 'normal');
    doc.text(edu.school, margin + nWidth, y);

    doc.setFont('helvetica', 'bold');
    doc.text(edu.date, pageWidth - margin, y, { align: 'right' });
    y += 11;
  });

  // Save the PDF
  doc.save('Nishant_Joshi_Product_Manager_Resume.pdf');
}
