import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Download, 
  GraduationCap, 
  Briefcase, 
  Globe, 
  Sparkles, 
  CheckCircle2,
  Printer,
  ExternalLink,
  Award,
  ShieldCheck,
  X,
  Check
} from 'lucide-react';
import { CareerSnapshot as CareerSnapshotType, PortfolioProfile } from '../types/portfolio';
import { generateResumePDF } from '../utils/generateResumePDF';

interface CareerSnapshotProps {
  snapshot: CareerSnapshotType;
  profile: PortfolioProfile;
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const CareerSnapshot: React.FC<CareerSnapshotProps> = ({ 
  snapshot, 
  profile, 
  isOpen = false, 
  onClose,
  onOpen 
}) => {
  const [localShowResumeModal, setLocalShowResumeModal] = useState(false);
  const [certFilter, setCertFilter] = useState<'All' | 'Product Management' | 'Agile & Scrum' | 'Product Tooling'>('All');
  const [downloaded, setDownloaded] = useState(false);

  const isModalVisible = isOpen || localShowResumeModal;

  const handleOpen = () => {
    if (onOpen) onOpen();
    setLocalShowResumeModal(true);
  };

  const handleClose = () => {
    if (onClose) onClose();
    setLocalShowResumeModal(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    generateResumePDF();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const certifications = snapshot.certifications || profile.certifications || [];

  const filteredCertifications = certFilter === 'All' 
    ? certifications 
    : certifications.filter(c => c.category === certFilter);

  const getIssuerBadgeColor = (issuer: string) => {
    if (issuer.includes('Airtribe')) return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/80 dark:text-purple-300 dark:border-purple-800/80';
    if (issuer.includes('IBM')) return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/80 dark:text-blue-300 dark:border-blue-800/80';
    if (issuer.includes('Atlassian')) return 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/80 dark:text-sky-300 dark:border-sky-800/80';
    if (issuer.includes('Alberta')) return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800/80';
    if (issuer.includes('LearnQuest')) return 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/80 dark:text-indigo-300 dark:border-indigo-800/80';
    if (issuer.includes('Udemy')) return 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800/80';
    return 'bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700';
  };

  return (
    <section 
      id="snapshot" 
      className="py-16 bg-neutral-50/70 dark:bg-neutral-950 text-neutral-900 dark:text-white border-t border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header & Quick Action */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-neutral-200 dark:border-neutral-800 pb-6"
        >
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Recruiter Quick View
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
              Career Snapshot & Verified Credentials
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              A high-level summary of domains, certified product credentials, and background.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleDownloadPDF}
              id="download-resume-pdf-btn"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 transition-all flex items-center gap-2 shadow-sm hover:shadow cursor-pointer"
            >
              {downloaded ? <Check className="w-4 h-4 text-emerald-300" /> : <Download className="w-4 h-4" />}
              <span>{downloaded ? 'Downloaded!' : 'Download Resume (PDF)'}</span>
            </button>
          </div>
        </motion.div>

        {/* 4-Box Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          
          {/* Box 1: Experience & Role */}
          <motion.div 
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.05, ease: EASE_OUT_EXPO }}
            className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 space-y-2 shadow-xs"
          >
            <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
              <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="font-bold uppercase tracking-wider text-[11px]">Current Status</span>
            </div>
            <div className="text-sm font-bold text-neutral-900 dark:text-white">
              {snapshot.currentRole}
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-[11px]">
              {snapshot.yearsOfExperience}
            </p>
            <div className="pt-2 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{snapshot.availability}</span>
            </div>
          </motion.div>

          {/* Box 2: Key Domains */}
          <motion.div 
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.13, ease: EASE_OUT_EXPO }}
            className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 space-y-2 shadow-xs"
          >
            <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
              <Globe className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="font-bold uppercase tracking-wider text-[11px]">Key Product Domains</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {snapshot.keyDomains.map((dom, dIdx) => (
                <span key={dIdx} className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-[11px] border border-neutral-200/60 dark:border-neutral-700/60">
                  {dom}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Box 3: Top PM Specialties */}
          <motion.div 
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.21, ease: EASE_OUT_EXPO }}
            className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 space-y-2 shadow-xs"
          >
            <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
              <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span className="font-bold uppercase tracking-wider text-[11px]">Top Specialties</span>
            </div>
            <ul className="space-y-1 text-neutral-700 dark:text-neutral-300 text-[11px]">
              {snapshot.topSpecialties.slice(0, 3).map((spec, sIdx) => (
                <li key={sIdx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Box 4: Education & Background */}
          <motion.div 
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.29, ease: EASE_OUT_EXPO }}
            className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 space-y-2 shadow-xs"
          >
            <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
              <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="font-bold uppercase tracking-wider text-[11px]">Education</span>
            </div>
            {snapshot.education.map((edu, eIdx) => (
              <div key={eIdx} className="space-y-0.5">
                <div className="font-bold text-neutral-900 dark:text-white text-[11px]">{edu.degree}</div>
                <div className="text-neutral-600 dark:text-neutral-400 text-[11px]">{edu.institution} • {edu.year}</div>
              </div>
            ))}
          </motion.div>

        </div>

        {/* Verified Certifications Showcase */}
        {certifications.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
            className="space-y-6 pt-4 border-t border-neutral-200 dark:border-neutral-800"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <span>Verified Product & Agile Certifications</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-700/60 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold inline-flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      {certifications.length} Credentials Verified
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Comprehensive training across product discovery, metrics, agile delivery, Jira tooling, and Scrum governance.
                  </p>
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                {(['All', 'Product Management', 'Agile & Scrum', 'Product Tooling'] as const).map((cat) => {
                  const count = cat === 'All' 
                    ? certifications.length 
                    : certifications.filter(c => c.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setCertFilter(cat)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        certFilter === cat
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/70 dark:hover:bg-neutral-800'
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Certifications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCertifications.map((cert, cIdx) => (
                <motion.div
                  key={`${cert.credentialId}-${cIdx}`}
                  id={`cert-card-${cIdx}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.45, delay: (cIdx % 3) * 0.08, ease: EASE_OUT_EXPO }}
                  className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4 shadow-xs"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className={`px-2.5 py-0.5 rounded-md border text-[10px] font-bold tracking-wide uppercase ${getIssuerBadgeColor(cert.issuer)}`}>
                        {cert.issuer}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-700/60 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold">
                        <ShieldCheck className="w-2.5 h-2.5" />
                        Verified
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white line-clamp-2 leading-snug">
                        {cert.name}
                      </h4>
                      {cert.description && (
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                          {cert.description}
                        </p>
                      )}
                    </div>

                    {/* Competency Badges */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] uppercase font-bold text-neutral-400 dark:text-neutral-500 tracking-wider block">
                        Core Competencies
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {cert.skillsCovered.slice(0, 3).map((skill, sIdx) => (
                          <span 
                            key={sIdx}
                            className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/70 text-neutral-700 dark:text-neutral-300 text-[10px]"
                          >
                            {skill}
                          </span>
                        ))}
                        {cert.skillsCovered.length > 3 && (
                          <span className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800/50 text-neutral-500 dark:text-neutral-400 text-[10px]">
                            +{cert.skillsCovered.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Verification & Credential ID */}
                  <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2 text-xs">
                    <div className="space-y-0.5 overflow-hidden">
                      <span className="text-[10px] text-neutral-400 dark:text-neutral-500 block font-mono">Credential ID:</span>
                      <span className="font-mono text-[11px] font-semibold text-blue-600 dark:text-blue-300 truncate block max-w-[130px]" title={cert.credentialId}>
                        {cert.credentialId}
                      </span>
                    </div>

                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      id={`verify-cert-${cert.credentialId}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-600/90 dark:hover:bg-blue-500 text-white text-xs font-semibold shadow-xs hover:shadow transition-all shrink-0 cursor-pointer"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

      </div>

      {/* Resume Viewer / Printable Modal */}
      {isModalVisible && (
        <div 
          id="resume-modal-backdrop"
          className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
        >
          <div 
            id="resume-modal-sheet"
            className="relative w-full max-w-4xl bg-white text-neutral-900 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="bg-neutral-100 border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base text-neutral-900">
                  {profile.name} — Resume Document
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadPDF}
                  id="modal-download-pdf-btn"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  {downloaded ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                  <span>{downloaded ? 'Downloaded' : 'Download PDF'}</span>
                </button>
                <button
                  onClick={handlePrint}
                  id="print-resume-btn"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-700 hover:bg-neutral-200 border border-neutral-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Resume Sheet Content (Printable Layout) */}
            <div className="p-8 overflow-y-auto space-y-6 text-neutral-800 text-xs sm:text-sm">
              
              {/* Top Banner */}
              <div className="border-b border-neutral-300 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <h1 className="text-2xl font-bold text-neutral-900">NISHANT JOSHI</h1>
                  <p className="text-sm font-semibold text-neutral-700">ASSOCIATE PRODUCT MANAGER</p>
                </div>
                <div className="text-right text-xs text-neutral-600 space-y-0.5">
                  <p>+91 7000918880 | nishantjoshi020@gmail.com</p>
                  <p>linkedin.com/in/nishant-joshi20</p>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1">
                  Professional Summary
                </h4>
                <p className="text-neutral-700 leading-relaxed text-xs">
                  Associate Product Manager with hands-on experience across B2B SaaS, enterprise software, and consumer AI mobile products, managing the product lifecycle and setting quarterly Objectives and Key Results (OKRs). Track record taking products from 0 to 1 through launch, running customer discovery, gathering client requirements, and writing Product Requirements Documents (PRDs) with wireframes and edge cases, then collaborating with engineering, design, and QA through Agile sprints to ship them. Technically fluent in API integration, schema validation, and workflow automation, backed by user research, experimentation, A/B testing, and product analytics to guide roadmap decisions. Certified in Agile/Scrum, Jira, and AI-First Product Management.
                </p>
              </div>

              {/* Experience Highlights */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1">
                  Professional Experience
                </h4>
                
                <div className="space-y-4">
                  {/* Job 1: Softude */}
                  <div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-neutral-900">Softude | Associate Product Manager | Cost It Right (Enterprise Costing, RFX, eAuction & Automation SaaS)</span>
                      <span className="text-neutral-500 text-xs italic">Nov 2025 to Aug 2026</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-neutral-700 mt-1 space-y-1">
                      <li><strong>AI-Enabled Product Development & Velocity:</strong> Led product lifecycle initiatives across requirements gathering, rapid prototyping, and validation, integrating AI agents into costing pipelines to compress release cycles from 3 weeks to 2 weeks (45% faster velocity).</li>
                      <li><strong>Enterprise Client Delivery & Adoption:</strong> Scoped and shipped enterprise RFX and eAuction modules to 5 marquee clients (Havells, Hero MotoCorp, TVS), securing 60% module adoption and cutting procurement TAT from 15 to 7 days.</li>
                      <li><strong>Costing Architecture & Simulation:</strong> Validated system architecture for Zero-Based Costing (ZBC), Vendor (VBC), and Customer (CBC) models, designing cost change simulation models and establishing KPI dashboards for enterprise procurement visibility.</li>
                      <li><strong>API Data Ingestion & Quality Automation:</strong> Built a Quality Assurance (QA) automation suite and data validation engine (Python, Playwright) for User Acceptance Testing (UAT) with 45+ schema rules and batch Excel uploads, slashing manual data setup from 7 to 3 days (57% reduction).</li>
                      <li><strong>Documentation & Knowledge Base:</strong> Built a centralized documentation portal (MkDocs Material) with 45+ interactive Standard Operating Procedures (SOPs), process architecture diagrams, and technical specs for client enablement, developer handoffs, and audit readiness.</li>
                    </ul>
                  </div>

                  {/* Job 2: Mintosh */}
                  <div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-neutral-900">Mintosh | Product Manager Intern | AFTR (B2C AI Persona, Video & Voice Generation App)</span>
                      <span className="text-neutral-500 text-xs italic">Jan 2024 to Oct 2025</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-neutral-700 mt-1 space-y-1">
                      <li><strong>Product Ownership & Strategy:</strong> Owned the product vision, strategy, UI/UX design, and roadmap for AFTR, an early-stage startup B2C AI mobile app, driving product-market fit and key product decisions from initial concept through market launch across engineering, design, and business.</li>
                      <li><strong>Product Discovery & Agile Backlog:</strong> Authored 25+ PRDs with detailed wireframes, user flows, edge-case matrices, and acceptance criteria, managing an 80+ user story product backlog in Jira and facilitating sprint planning, grooming, and retrospectives across 12 Agile cycles.</li>
                      <li><strong>User Research & UI/UX Design:</strong> Designed and executed a structured customer discovery program with user interviews and usability studies, leading Figma UI/UX design to reduce signup steps from 7 to 4 and lift user activation from 42% to 55%.</li>
                      <li><strong>A/B Testing & Product Analytics:</strong> Defined experimentation frameworks and ran A/B tests on onboarding, CTA placements, and notification cadence, instrumenting product analytics in Firebase to track retention cohorts, feature adoption, and session depth to prioritize the quarterly roadmap.</li>
                      <li><strong>Cross-Platform Release Management:</strong> Scoped, prioritized, and launched Minimum Viable Product (MVP) features for iOS and Android mobile apps, compressing release turnaround from 3 to 2 weeks (33% faster) and increasing release frequency by 50% under 100% App Store and Google Play compliance.</li>
                      <li><strong>Cross-Functional Team Leadership:</strong> Directly led a cross-functional team of software engineers, UI/UX designers, QA testers, and a social media manager across daily standups, weekly sprint reviews, and bi-weekly stakeholder demos, unblocking dependencies and negotiating scope trade-offs to protect delivery timelines.</li>
                      <li><strong>Competitive Analysis & Go-to-Market (GTM):</strong> Conducted systematic competitive analysis and teardowns across competitor mobile apps to define positioning, feature differentiation, and App Store Optimization (ASO) metadata strategy, coordinating pre-launch beta testing with 200+ early adopters.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1">
                  Skills
                </h4>
                <div className="text-xs text-neutral-700 space-y-1 leading-relaxed">
                  <p><strong>Product Strategy:</strong> Product Roadmap, Product Lifecycle Management, OKRs & Key Performance Indicators (KPIs), Requirements Gathering, Feature Prioritization</p>
                  <p><strong>Product Execution:</strong> Product Requirements Documents (PRDs), Prototyping, Acceptance Criteria, User Research & Interviews, Stakeholder Management, Agile & Scrum</p>
                  <p><strong>Analytics & Experimentation:</strong> SQL, Product Metrics & KPI Dashboards, Funnel Analysis, Cohort Retention, Experimentation & A/B Testing</p>
                  <p><strong>AI & Technical:</strong> Generative AI, Prompt Engineering, LLMs & RAG, AI Agents, REST APIs, Schema Validation, Workflow Automation</p>
                  <p><strong>Tools & Platforms:</strong> Jira, Confluence, Figma, Claude Code, Antigravity, LangChain, Postman, Python, Playwright, GitHub, n8n</p>
                </div>
              </div>

              {/* Education & Certifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1">
                    Education
                  </h4>
                  <div className="text-xs text-neutral-700 space-y-1.5">
                    <div>
                      <strong>Master of Business Administration (MBA)</strong> | Devi Ahilya Vishwavidyalaya, Indore<br/>
                      <span className="text-neutral-500 italic">Aug 2024</span>
                    </div>
                    <div>
                      <strong>Bachelor of Technology (B.Tech)</strong> | Medi-Caps University, Indore<br/>
                      <span className="text-neutral-500 italic">May 2020</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1">
                    Certifications
                  </h4>
                  <div className="text-xs text-neutral-700 space-y-1">
                    <p>• AI-First Product Management (AirTribe, Jan 2026)</p>
                    <p>• Software Product Management (Univ. of Alberta, Sept 2023)</p>
                    <p>• Agile with Atlassian Jira (Atlassian, Sept 2023)</p>
                    <p>• Introduction to Agile & Scrum (IBM, Sept 2023)</p>
                    <p>• Introduction to Scrum Master (LearnQuest, Sept 2023)</p>
                    <p>• Become a Product Manager (Udemy, Sept 2023)</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Bottom Footer */}
            <div className="bg-neutral-100 border-t border-neutral-200 px-6 py-3 flex items-center justify-between text-xs text-neutral-600">
              <span className="hidden sm:inline">Exact 1-page Associate Product Manager ATS format</span>
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={handleDownloadPDF}
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .PDF</span>
                </button>
                <button
                  onClick={handleClose}
                  className="px-4 py-1.5 rounded-lg bg-neutral-900 dark:bg-neutral-800 text-white font-semibold cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
