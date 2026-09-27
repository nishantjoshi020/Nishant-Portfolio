import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  TrendingUp, 
  Sparkles, 
  Layers, 
  Target, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { CaseStudy } from '../types/portfolio';
import { CaseStudyDetailModal } from './CaseStudyDetailModal';

interface CaseStudiesProps {
  caseStudies: CaseStudy[];
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const CaseStudies: React.FC<CaseStudiesProps> = ({ caseStudies }) => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filterOptions = [
    'All',
    'Live Prototypes',
    'Growth & Retention',
    'Quick Commerce & FoodTech',
    'B2B & Enterprise AI',
    'AI & EdTech',
    'Mobility & Logistics'
  ];

  const filteredStudies = caseStudies.filter((study) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Live Prototypes') {
      return study.isPrototype || study.tags.some(t => t.toLowerCase().includes('prototype'));
    }
    if (activeFilter === 'Growth & Retention') {
      return study.tags.some(t => 
        t.toLowerCase().includes('growth') || 
        t.toLowerCase().includes('retention') || 
        t.toLowerCase().includes('flywheel') || 
        t.toLowerCase().includes('cohort')
      ) || study.domain.toLowerCase().includes('growth') || study.domain.toLowerCase().includes('retention');
    }
    if (activeFilter === 'Quick Commerce & FoodTech') {
      return study.domain.toLowerCase().includes('quick commerce') || 
             study.domain.toLowerCase().includes('foodtech') || 
             study.domain.toLowerCase().includes('grocery') || 
             study.tags.some(t => t.toLowerCase().includes('quick commerce') || t.toLowerCase().includes('tier-1') || t.toLowerCase().includes('subscription'));
    }
    if (activeFilter === 'B2B & Enterprise AI') {
      return study.domain.toLowerCase().includes('b2b') || 
             study.domain.toLowerCase().includes('manufacturing') || 
             study.domain.toLowerCase().includes('procurement') || 
             study.domain.toLowerCase().includes('enterprise');
    }
    if (activeFilter === 'AI & EdTech') {
      return study.domain.toLowerCase().includes('edtech') || 
             study.tags.some(t => t.toLowerCase().includes('edtech') || t.toLowerCase().includes('recommendation') || t.toLowerCase().includes('explainable ai'));
    }
    if (activeFilter === 'Mobility & Logistics') {
      return study.domain.toLowerCase().includes('mobility') || 
             study.tags.some(t => t.toLowerCase().includes('mobility') || t.toLowerCase().includes('uber'));
    }
    return (
      study.domain.toLowerCase().includes(activeFilter.toLowerCase()) ||
      study.tags.some((tag) => tag.toLowerCase().includes(activeFilter.toLowerCase()))
    );
  });

  return (
    <section 
      id="work" 
      className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
    >
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6"
      >
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider border border-blue-200/60 dark:border-blue-800/60">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Shipped Products & Core Platforms</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
            Featured Product Work & Platforms
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            Teardowns of actual commercial SaaS platforms I built, specified, and brought to market — highlighting real customer discovery, PRDs, RICE prioritization, and verified production metrics.
          </p>
        </div>

        {/* Domain Filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              id={`case-filter-${filter.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold shadow-xs'
                  : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Featured Case Studies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {filteredStudies.map((study, idx) => (
          <motion.div
            key={study.id}
            id={`case-study-card-${study.id}`}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: (idx % 3) * 0.09, ease: EASE_OUT_EXPO }}
            whileHover={{ y: -5 }}
            className="group rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800/90 hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Top Card Header */}
            <div className="p-6 space-y-4">
              
            {/* Category & Hero Metric Badge */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                  study.isPrototype
                    ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 border-purple-200/50 dark:border-purple-800/50'
                    : 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200/50 dark:border-blue-800/50'
                }`}>
                  {study.isPrototype ? 'Interactive Prototype' : study.domain.split('/')[0]}
                </span>
                {study.liveUrl && (
                  <a
                    href={study.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded transition-colors shadow-2xs ${
                      study.isPrototype
                        ? 'text-purple-700 hover:text-purple-800 dark:text-purple-300 dark:hover:text-purple-200 bg-purple-50 dark:bg-purple-950/70 border border-purple-200/80 dark:border-purple-800/80'
                        : 'text-emerald-700 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/80'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                      study.isPrototype ? 'bg-purple-500' : 'bg-emerald-500'
                    }`} />
                    <span>{study.isPrototype ? 'Launch Live App' : 'Live Platform'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md border ${
                study.isPrototype
                  ? 'text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border-purple-200/60 dark:border-purple-800/60'
                  : 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200/60 dark:border-emerald-800/60'
              }`}>
                {study.heroMetric} {study.heroMetricLabel}
              </span>
            </div>

              {/* Title & Tagline */}
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  {study.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                  {study.tagline}
                </p>
              </div>

              {/* Structured Key Details */}
              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-2 text-xs">
                <div>
                  <span className="text-neutral-400 dark:text-neutral-500 block text-[11px]">One-Line Problem:</span>
                  <p className="text-neutral-700 dark:text-neutral-300 font-medium line-clamp-2">
                    {study.problem.summary}
                  </p>
                </div>

                <div>
                  <span className="text-neutral-400 dark:text-neutral-500 block text-[11px]">My Role & Contribution:</span>
                  <p className="text-neutral-600 dark:text-neutral-400 line-clamp-2">
                    {study.keyContribution}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {study.tags.slice(0, 3).map((tag, tIdx) => (
                  <span 
                    key={tIdx}
                    className="px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </div>

            {/* Bottom Card Action Footer */}
            <div className="p-6 pt-0 space-y-2">
              {study.isPrototype && study.liveUrl ? (
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={study.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-500 transition-all flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>Launch App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setSelectedCase(study)}
                    id={`view-case-btn-${study.id}`}
                    className="py-2.5 px-3 rounded-xl text-xs font-semibold text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all flex items-center justify-center gap-1"
                  >
                    <span>PRD & Specs</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedCase(study)}
                  id={`view-case-btn-${study.id}`}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <span>View Product Deep Dive & Architecture</span>
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Case Study Detail Modal */}
      <CaseStudyDetailModal 
        caseStudy={selectedCase}
        onClose={() => setSelectedCase(null)}
      />
    </section>
  );
};
