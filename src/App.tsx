import React, { useState, useEffect } from 'react';
import { 
  profileData as initialProfile, 
  caseStudiesData, 
  experienceData, 
  productPrinciplesData, 
  toolkitData, 
  toolsData, 
  articlesData, 
  careerSnapshotData 
} from './data/portfolioData';

import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { CaseStudies } from './components/CaseStudies';
import { ProductThinking } from './components/ProductThinking';
import { ProductToolkit } from './components/ProductToolkit';
import { CareerSnapshot } from './components/CareerSnapshot';
import { WritingSection } from './components/WritingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [profile, setProfile] = useState(initialProfile);
  const [darkMode, setDarkMode] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Handle Dark Mode toggle
  useEffect(() => {
    // Check initial system or stored preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('portfolio-theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleToggleDarkMode = (val: boolean) => {
    setDarkMode(val);
    if (val) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('portfolio-theme', 'light');
    }
  };

  // Scroll spy to highlight current active navigation section
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'experience', 'work', 'thinking', 'toolkit', 'snapshot', 'insights', 'contact'];
    
    const handleScroll = () => {
      const scrollY = window.scrollY + 180;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${darkMode ? 'dark ' : ''}min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 transition-colors duration-200`}>
      
      {/* Viewport Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Sticky Top Navigation */}
      <Navbar
        profile={profile}
        darkMode={darkMode}
        setDarkMode={handleToggleDarkMode}
        onOpenResume={() => setIsResumeOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        
        {/* 1. Hero Section */}
        <Hero 
          profile={profile}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* 2. About Me Section */}
        <About profile={profile} />

        {/* 3. Experience Section (Problem -> Action -> Outcome) */}
        <Experience experiences={experienceData} />

        {/* 4. Featured Product Case Studies (Most Important Section) */}
        <CaseStudies caseStudies={caseStudiesData} />

        {/* 5. How I Think About Products */}
        <ProductThinking principles={productPrinciplesData} />

        {/* 6. Product Toolkit & Stack */}
        <ProductToolkit 
          categories={toolkitData}
          tools={toolsData}
        />

        {/* 7. Resume / Career Snapshot */}
        <CareerSnapshot 
          snapshot={careerSnapshotData}
          profile={profile}
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
          onOpen={() => setIsResumeOpen(true)}
        />

        {/* 8. Writing & Product Insights */}
        <WritingSection articles={articlesData} />

        {/* 9. Contact Section */}
        <ContactSection 
          profile={profile}
          onOpenResume={() => setIsResumeOpen(true)}
        />

      </main>

      {/* Footer */}
      <Footer 
        profile={profile}
      />

      {/* Resume Quick Trigger from Navbar/Hero */}
      {isResumeOpen && (
        <div className="hidden">
          {/* Handled directly in CareerSnapshot modal */}
        </div>
      )}

    </div>
  );
}
