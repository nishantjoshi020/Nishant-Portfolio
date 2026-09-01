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
  X
} from 'lucide-react';
import { CareerSnapshot as CareerSnapshotType, PortfolioProfile } from '../types/portfolio';

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

  const certifications = snapshot.certifications || profile.certifications || [];

  const filteredCertifications = certFilter === 'All' 
    ? certifications 
    : certifications.filter(c => c.category === certFilter);

  const getIssuerBadgeColor = (issuer: string) => {
    if (issuer.includes('Airtribe')) return 'bg-purple-950/80 text-purple-300 border-purple-800/80';
    if (issuer.includes('IBM')) return 'bg-blue-950/80 text-blue-300 border-blue-800/80';
    if (issuer.includes('Atlassian')) return 'bg-sky-950/80 text-sky-300 border-sky-800/80';
    if (issuer.includes('Alberta')) return 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80';
    if (issuer.includes('LearnQuest')) return 'bg-indigo-950/80 text-indigo-300 border-indigo-800/80';
    if (issuer.includes('Udemy')) return 'bg-amber-950/80 text-amber-300 border-amber-800/80';
    return 'bg-neutral-800 text-neutral-300 border-neutral-700';
  };

  return (
    <section 
      id="snapshot" 
      className="py-16 bg-neutral-900 text-white dark:bg-neutral-950 border-t border-neutral-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header & Quick Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-neutral-800 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Recruiter Quick View
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Career Snapshot & Verified Credentials
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              A high-level summary of domains, certified product credentials, and background.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpen}
              id="view-resume-sheet-btn"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-neutral-900 bg-white hover:bg-neutral-100 transition-all flex items-center gap-2 shadow-md cursor-pointer"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>View Full Resume</span>
            </button>
          </div>
        </div>

        {/* 4-Box Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          
          {/* Box 1: Experience & Role */}
          <div className="p-5 rounded-2xl bg-neutral-850/60 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-neutral-400">
              <Briefcase className="w-4 h-4 text-blue-400" />
              <span className="font-bold uppercase tracking-wider text-[11px]">Current Status</span>
            </div>
            <div className="text-sm font-bold text-white">
              {snapshot.currentRole}
            </div>
            <p className="text-neutral-400 text-[11px]">
              {snapshot.yearsOfExperience}
            </p>
            <div className="pt-2 text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{snapshot.availability}</span>
            </div>
          </div>

          {/* Box 2: Key Domains */}
          <div className="p-5 rounded-2xl bg-neutral-850/60 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-neutral-400">
              <Globe className="w-4 h-4 text-purple-400" />
              <span className="font-bold uppercase tracking-wider text-[11px]">Key Product Domains</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {snapshot.keyDomains.map((dom, dIdx) => (
                <span key={dIdx} className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[11px]">
                  {dom}
                </span>
              ))}
            </div>
          </div>

          {/* Box 3: Top PM Specialties */}
          <div className="p-5 rounded-2xl bg-neutral-850/60 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-neutral-400">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="font-bold uppercase tracking-wider text-[11px]">Top Specialties</span>
            </div>
            <ul className="space-y-1 text-neutral-300 text-[11px]">
              {snapshot.topSpecialties.slice(0, 3).map((spec, sIdx) => (
                <li key={sIdx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Box 4: Education & Background */}
          <div className="p-5 rounded-2xl bg-neutral-850/60 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-neutral-400">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span className="font-bold uppercase tracking-wider text-[11px]">Education</span>
            </div>
            {snapshot.education.map((edu, eIdx) => (
              <div key={eIdx} className="space-y-0.5">
                <div className="font-bold text-white text-[11px]">{edu.degree}</div>
                <div className="text-neutral-400 text-[11px]">{edu.institution} • {edu.year}</div>
              </div>
            ))}
          </div>

        </div>

        {/* Verified Certifications Showcase */}
        {certifications.length > 0 && (
          <div className="space-y-6 pt-4 border-t border-neutral-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600/30 border border-blue-500/50 text-blue-400 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>Verified Product & Agile Certifications</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-700/60 text-emerald-400 text-[10px] font-semibold inline-flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      {certifications.length} Credentials Verified
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Comprehensive training across product discovery, metrics, agile delivery, Jira tooling, and Scrum governance.
                  </p>
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-800/80 rounded-xl border border-neutral-700">
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
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-700/50'
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
                  className="p-5 rounded-2xl bg-neutral-850/70 border border-neutral-800 hover:border-blue-500/50 hover:bg-neutral-850 transition-all flex flex-col justify-between space-y-4 shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className={`px-2.5 py-0.5 rounded-md border text-[10px] font-bold tracking-wide uppercase ${getIssuerBadgeColor(cert.issuer)}`}>
                        {cert.issuer}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 text-[10px] font-semibold">
                        <ShieldCheck className="w-2.5 h-2.5" />
                        Verified
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                        {cert.name}
                      </h4>
                      {cert.description && (
                        <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                          {cert.description}
                        </p>
                      )}
                    </div>

                    {/* Competency Badges */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider block">
                        Core Competencies
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {cert.skillsCovered.slice(0, 3).map((skill, sIdx) => (
                          <span 
                            key={sIdx}
                            className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700/70 text-neutral-300 text-[10px]"
                          >
                            {skill}
                          </span>
                        ))}
                        {cert.skillsCovered.length > 3 && (
                          <span className="px-1.5 py-0.5 rounded bg-neutral-800/50 text-neutral-400 text-[10px]">
                            +{cert.skillsCovered.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Verification & Credential ID */}
                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between gap-2 text-xs">
                    <div className="space-y-0.5 overflow-hidden">
                      <span className="text-[10px] text-neutral-500 block font-mono">Credential ID:</span>
                      <span className="font-mono text-[11px] font-semibold text-blue-300 truncate block max-w-[130px]" title={cert.credentialId}>
                        {cert.credentialId}
                      </span>
                    </div>

                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      id={`verify-cert-${cert.credentialId}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/90 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs hover:shadow transition-all shrink-0 cursor-pointer"
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
                  onClick={handlePrint}
                  id="print-resume-btn"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-700 hover:bg-neutral-200 border border-neutral-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
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
                  Product Management Experience
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-neutral-900">Associate Product Manager @ [Company Name]</span>
                      <span className="text-neutral-500 text-xs">2024 — Present</span>
                    </div>
                    <p className="text-xs text-neutral-600 italic">B2B SaaS / Growth & Activation Squad</p>
                    <ul className="list-disc list-inside text-xs text-neutral-700 mt-1 space-y-1">
                      <li>Led discovery, PRD authoring, and sprint execution for self-serve onboarding, improving Day-7 user activation by +[XX]%.</li>
                      <li>Partnered with 5 engineers and 1 designer to launch modular sandbox templates, reducing Time-to-First-Action by -[XX]%.</li>
                      <li>Conducted 24 qualitative user interviews and analyzed Mixpanel funnel telemetry to eliminate step 3 drop-off.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-neutral-900">APM Fellow / Product Intern @ [Previous Company]</span>
                      <span className="text-neutral-500 text-xs">2023 — 2024</span>
                    </div>
                    <p className="text-xs text-neutral-600 italic">Marketplace & Consumer Search</p>
                    <ul className="list-disc list-inside text-xs text-neutral-700 mt-1 space-y-1">
                      <li>Analyzed 500K+ SQL query logs to uncover zero-result search patterns, launching fuzzy typo-tolerance that lowered dead ends by -[XX]%.</li>
                      <li>Shipped automated custom report scheduling, deflecting [XX]% of ad-hoc customer support requests.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Certifications & Verified Credentials */}
              {certifications.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1 flex items-center justify-between">
                    <span>Certifications & Verified Credentials</span>
                    <span className="text-[10px] text-blue-600 font-semibold normal-case">6 Verified Industry Credentials</span>
                  </h4>
                  {certifications.map((cert, cIdx) => (
                    <div key={cIdx} className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs space-y-1">
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
                        <strong>Credential ID:</strong> {cert.credentialId} | <strong>Competencies:</strong> {cert.skillsCovered.join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Core Skills & Education */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1">
                    Skills & Tooling
                  </h4>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    <strong>Product:</strong> PRD Writing, JTBD, User Research, RICE Prioritization, Agile/Scrum<br/>
                    <strong>Data:</strong> SQL, Mixpanel, Amplitude, A/B Testing, Cohort Retention<br/>
                    <strong>Tools:</strong> Jira, Figma, Notion, Postman, LaunchDarkly
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1">
                    Education
                  </h4>
                  <p className="text-xs text-neutral-700">
                    <strong>B.S. in [Computer Science / Economics / Business]</strong><br/>
                    [University Name] • [202X]
                  </p>
                </div>
              </div>

            </div>

            {/* Modal Bottom Footer */}
            <div className="bg-neutral-100 border-t border-neutral-200 px-6 py-3 flex items-center justify-between text-xs text-neutral-600">
              <span>Ready for download or custom configuration</span>
              <button
                onClick={handleClose}
                className="px-4 py-1.5 rounded-lg bg-neutral-900 text-white font-semibold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
