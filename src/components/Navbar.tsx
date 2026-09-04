import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Moon, 
  Sun, 
  FileText, 
  Download,
  Check,
  Sparkles, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { PortfolioProfile } from '../types/portfolio';
import { generateResumePDF } from '../utils/generateResumePDF';

interface NavbarProps {
  profile: PortfolioProfile;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenResume: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  darkMode,
  setDarkMode,
  onOpenResume,
  activeSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadResume = () => {
    generateResumePDF();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Shipped Products', href: '#work', id: 'work' },
    { label: 'Product Thinking', href: '#thinking', id: 'thinking' },
    { label: 'Toolkit', href: '#toolkit', id: 'toolkit' },
    { label: 'Insights', href: '#insights', id: 'insights' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-neutral-900/85 dark:bg-neutral-950/85 bg-white/85 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 shadow-sm' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Brand Logo & APM Badge */}
          <a 
            href="#hero" 
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 dark:bg-blue-500 text-white font-bold flex items-center justify-center text-sm tracking-tight shadow-md group-hover:scale-105 transition-transform">
              PM
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-neutral-900 dark:text-neutral-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {profile.name}
              </span>
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                Associate Product Manager
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-neutral-100/70 dark:bg-neutral-900/70 p-1.5 rounded-full border border-neutral-200/60 dark:border-neutral-800/60 backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  id={`nav-link-${link.id}`}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-400 font-semibold shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs & Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Single Unified Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              id="theme-toggle-btn"
              aria-label="Toggle Dark Mode"
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />}
            </button>

            {/* Resume Button with direct download */}
            <button
              onClick={handleDownloadResume}
              id="navbar-resume-btn"
              className="hidden sm:flex px-3.5 py-2 text-xs font-medium text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors items-center gap-1.5 border border-neutral-200/80 dark:border-neutral-700/60 cursor-pointer"
              title="Download Nishant Joshi's Resume (PDF)"
            >
              {downloaded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Resume</span>
                </>
              )}
            </button>

            {/* Let's Connect CTA */}
            <a
              href="#contact"
              id="navbar-connect-btn"
              className="hidden sm:flex px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg shadow-sm hover:shadow transition-all items-center gap-1"
            >
              <span>Let's Connect</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              aria-label="Toggle Menu"
              className="lg:hidden p-2 rounded-lg text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-drawer"
          className="lg:hidden bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800 px-4 pt-2 pb-6 space-y-3 shadow-xl"
        >
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-xs font-medium flex items-center justify-between ${
                  activeSection === link.id
                    ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-3 h-3 opacity-50" />
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-2">
            <div className="flex items-center justify-between px-1 py-1">
              <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">Theme Mode</span>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center gap-1.5 transition-colors"
              >
                {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />}
                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleDownloadResume();
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume (PDF)</span>
            </button>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 text-xs font-semibold text-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
            >
              Let's Connect
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
