import React, { useState } from 'react';
import { 
  Mail, 
  Linkedin, 
  Github, 
  FileText, 
  Download,
  Copy, 
  Check, 
  ArrowUpRight,
  Send
} from 'lucide-react';
import { PortfolioProfile } from '../types/portfolio';
import { generateResumePDF } from '../utils/generateResumePDF';

interface ContactSectionProps {
  profile: PortfolioProfile;
  onOpenResume: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile, onOpenResume }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.socials.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleDownloadPDF = () => {
    generateResumePDF();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <section 
      id="contact" 
      className="py-20 bg-neutral-50/50 dark:bg-neutral-900/30 border-t border-neutral-200/80 dark:border-neutral-800/80"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider border border-emerald-200/60 dark:border-emerald-800/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open to Opportunities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
            Let's build something meaningful.
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            I'm always open to discussing <strong className="font-semibold text-neutral-900 dark:text-neutral-100">product strategy, APM/PM opportunities, high-growth B2B and B2C products, or collaborating on innovative ideas.</strong> Reach out directly below:
          </p>
        </div>

        {/* Contact & Social Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Direct Email Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  Email
                </h3>
                <p className="text-xs font-mono font-medium text-neutral-800 dark:text-neutral-200 truncate mt-0.5">
                  {profile.socials.email}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 pt-1">
              <a
                href={`mailto:${profile.socials.email}`}
                className="flex-1 py-1.5 px-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold text-center transition-colors flex items-center justify-center gap-1"
              >
                <span>Compose</span>
                <Send className="w-3 h-3" />
              </a>
              <button
                onClick={handleCopyEmail}
                id="copy-email-btn"
                className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                title="Copy email to clipboard"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* LinkedIn Card */}
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            id="contact-linkedin-card"
            className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500/80 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Linkedin className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  LinkedIn
                </h3>
                <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5">
                  Connect on LinkedIn
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-blue-600 dark:text-blue-400 pt-1">
              <span>View Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>

          {/* GitHub Card */}
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            id="contact-github-card"
            className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center justify-center">
                <Github className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  GitHub
                </h3>
                <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5">
                  Explore Repositories
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 pt-1">
              <span>View Projects</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>

          {/* Resume Quick Action */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-200">
                  Resume
                </h3>
                <p className="text-xs font-semibold text-white mt-0.5">
                  1-Page Verified PM PDF
                </p>
              </div>
            </div>
            <div className="pt-1">
              <button
                onClick={handleDownloadPDF}
                id="contact-resume-download-btn"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-blue-900 bg-white hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                {downloaded ? <Check className="w-4 h-4 text-emerald-600" /> : <Download className="w-4 h-4 text-blue-700" />}
                <span>{downloaded ? 'Downloaded!' : 'Download .PDF'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

