import React, { useState } from 'react';
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-neutral-200 dark:border-neutral-800 pb-6">
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
        </div>

        {/* 4-Box Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          
          {/* Box 1: Experience & Role */}
          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 space-y-2 shadow-xs">
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
          </div>

          {/* Box 2: Key Domains */}
          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 space-y-2 shadow-xs">
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
          </div>

          {/* Box 3: Top PM Specialties */}
          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 space-y-2 shadow-xs">
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
          </div>

          {/* Box 4: Education & Background */}
          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 space-y-2 shadow-xs">
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
          </div>

        </div>

        {/* Verified Certifications Showcase */}
        {certifications.length > 0 && (
          <div className="space-y-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
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
                <div
                  key={cIdx}
                  id={`cert-card-${cIdx}`}
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
                </div>
              ))}
            </div>
          </div>
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
                  <h1 className="text-2xl font-bold text-neutral-900">{profile.name}</h1>
                  <p className="text-sm font-semibold text-blue-600">{profile.title}</p>
                  <p className="text-neutral-500 text-xs mt-0.5">{profile.location}</p>
                </div>
                <div className="text-right text-xs text-neutral-600 space-y-0.5">
                  <p>{profile.socials.email}</p>
                  <p>{profile.socials.linkedin}</p>
                  <p>{profile.socials.github}</p>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1">
                  Professional Summary
                </h4>
                <p className="text-neutral-700 leading-relaxed text-xs">
                  {profile.bioSummary}
                </p>
              </div>

              {/* Experience Highlights */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1">
                  Professional Experience
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-neutral-900">Softude — Associate Product Manager</span>
                      <span className="text-neutral-500 text-xs">Nov 2025 — Aug 2026</span>
                    </div>
                    <p className="text-xs text-neutral-600 italic">Product: Cost It Right — Enterprise Costing, Automation & RFQ SaaS Platform</p>
                    <ul className="list-disc list-inside text-xs text-neutral-700 mt-1 space-y-1">
                      <li><strong>AI-Enabled Product Development:</strong> Owned initiatives across requirements, prototyping, validation, and testing; applied AI agents and workflow automation to accelerate feature definitions and costing dashboards.</li>
                      <li><strong>Enterprise Procurement Impact:</strong> Partnered with Tier-1 enterprise clients (Havells, Hero MotoCorp, TVS, Escorts Kubota, Jash Engineering); supported 20+ users, 100+ suppliers, shipped 3 dashboards, reached 60% adoption, reduced procurement TAT from 15 to 7 days, and cut support tickets by 30%.</li>
                      <li><strong>Costing Architecture & Simulation:</strong> Validated Vendor-, Supplier-, and Customer-Based costing models (ZBC/VBC/CBC) with dynamic simulation workflows and KPI reporting.</li>
                      <li><strong>Data Ingestion & Process Automation:</strong> Managed batch Excel uploads, dynamic forms, and schema validation using Python and Playwright, reducing data setup and testing cycles from 7 days to 3 days (57%).</li>
                      <li><strong>Quality & Enablement:</strong> Built regression testing workflows and introduced centralized product documentation with 45+ guides and interactive SOPs.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-neutral-900">Mintosh — Product Manager (Intern)</span>
                      <span className="text-neutral-500 text-xs">Jan 2024 — Oct 2025</span>
                    </div>
                    <p className="text-xs text-neutral-600 italic">Product: AFTR — B2C AI-Powered Mobile & Web Product</p>
                    <ul className="list-disc list-inside text-xs text-neutral-700 mt-1 space-y-1">
                      <li><strong>0-to-1 Product Discovery & MVP:</strong> Led product discovery and MVP definition, translating user and business needs into PRDs, Figma workflows, prototypes, and an 80+ story backlog; drove sprint execution.</li>
                      <li><strong>User Research & Activation:</strong> Conducted 30+ user interviews, usability studies, and competitor teardowns; redesigned onboarding from 7 to 4 steps, boosting activation from 42% to 55% and cutting drop-off from 48% to 34%.</li>
                      <li><strong>Mobile Delivery & Release Governance:</strong> Coordinated bi-weekly iOS/Android releases, increasing release frequency by 33% and reducing release cycles from 3 to 2 weeks with 100% store compliance.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-neutral-900">Across The Globe (ATG) — Tech Product Manager (Intern)</span>
                      <span className="text-neutral-500 text-xs">Nov 2023 — Jun 2024</span>
                    </div>
                    <p className="text-xs text-neutral-600 italic">Procurpal (B2B Procurement SaaS) & Treato (Beauty & Grooming Marketplace)</p>
                    <ul className="list-disc list-inside text-xs text-neutral-700 mt-1 space-y-1">
                      <li><strong>Procurpal:</strong> Translated enterprise requirements into workflows and functional specifications for AI supplier recommendations and e-auctions; owned feature testing through pre-launch readiness.</li>
                      <li><strong>Treato:</strong> Defined customer booking flows and salon scheduling dashboards from client requirements and Figma workflows through pre-launch.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-neutral-900">IndVibe Infotech Pvt Ltd — Product Manager Intern</span>
                      <span className="text-neutral-500 text-xs">Jul 2023 — Oct 2023</span>
                    </div>
                    <p className="text-xs text-neutral-600 italic">Digital Product Discovery & User Research (Concurrent engagement)</p>
                  </div>
                </div>
              </div>

              {/* Certifications & Verified Credentials */}
              {certifications.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1 flex items-center justify-between">
                    <span>Certifications & Education Highlights</span>
                    <span className="text-[10px] text-blue-600 font-semibold normal-case">AirTribe AI-First PM • Univ of Alberta</span>
                  </h4>
                  {certifications.slice(0, 3).map((cert, cIdx) => (
                    <div key={cIdx} className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200 text-xs space-y-0.5">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-bold text-neutral-900">{cert.name}</span>
                          <span className="text-neutral-600"> — {cert.issuer}</span>
                        </div>
                        <a 
                          href={cert.credentialUrl}
                          target="_blank" 
                          rel="noreferrer"
                          className="text-blue-600 hover:underline font-semibold text-[11px] inline-flex items-center gap-1"
                        >
                          <span>Verify</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <p className="text-neutral-600 text-[11px]">
                        <strong>Credential ID:</strong> {cert.credentialId} | <strong>Skills:</strong> {cert.skillsCovered.slice(0, 4).join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Core Skills & Education */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1">
                    Skills & Tooling
                  </h4>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    <strong>Product & Strategy:</strong> Product Discovery, Requirements (BRD/FRD/SRD), Backlog Management, Costing Architecture (ZBC/VBC/CBC), User Research, DAL 1/2/3 Approvals, Agile/Scrum<br/>
                    <strong>AI & Automation:</strong> Antigravity, Claude, Codex, Google AI Studio, NotebookLM, RAG, n8n, Python, Playwright, SQL<br/>
                    <strong>Tooling:</strong> Jira, Trello, Confluence, Figma, Advanced Excel, Postman, GitHub, MkDocs
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1">
                    Education
                  </h4>
                  <div className="text-xs text-neutral-700 space-y-1.5">
                    <div>
                      <strong>Master of Business Administration (MBA)</strong><br/>
                      Devi Ahilya Vishwavidyalaya, Indore, M.P. • Aug 2024
                    </div>
                    <div>
                      <strong>Bachelor of Technology (B.Tech)</strong><br/>
                      Medi-Caps University, Indore, M.P. • May 2020
                    </div>
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
