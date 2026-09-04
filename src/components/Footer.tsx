import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PortfolioProfile } from '../types/portfolio';

interface FooterProps {
  profile: PortfolioProfile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & Subtext */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
              PM
            </div>
            <div>
              <span className="font-bold text-neutral-900 dark:text-neutral-100">
                {profile.name} — {profile.title}
              </span>
              <p className="text-[11px] text-neutral-400">
                Product Discovery • Data-Informed Strategy • Outcome-Obsessed Execution
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex items-center gap-4 text-xs font-medium">
            <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
            <a href="#experience" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Experience</a>
            <a href="#work" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Case Studies</a>
            <a href="#thinking" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Product Thinking</a>
            <a href="#toolkit" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Toolkit</a>
            <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            id="footer-scroll-top-btn"
            className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
            title="Back to Top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </footer>
  );
};
