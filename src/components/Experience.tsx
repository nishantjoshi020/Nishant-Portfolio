import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Target, 
  Zap, 
  Users, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { ExperienceItem } from '../types/portfolio';

interface ExperienceProps {
  experiences: ExperienceItem[];
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section 
      id="experience" 
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
            <span>Career History & Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
            Professional Experience
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            Track record across Enterprise B2B SaaS, manufacturing cost automation, and B2C AI mobile products—delivering measurable improvements in procurement TAT, user activation, and release velocity.
          </p>
        </div>

        {/* Legend / Guiding Principle badge */}
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900 px-3.5 py-2 rounded-xl border border-neutral-200/80 dark:border-neutral-800">
          <Target className="w-4 h-4 text-blue-500" />
          <span>Framed as: <strong>Problem → Action → Outcome</strong></span>
        </div>
      </motion.div>

      {/* Experience Timeline Cards */}
      <div className="space-y-6">
        {experiences.map((exp, idx) => {
          const isExpanded = expandedId === exp.id;
          return (
            <motion.div
              key={exp.id}
              id={`experience-card-${exp.id}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: EASE_OUT_EXPO }}
              className={`rounded-2xl border transition-colors duration-200 overflow-hidden ${
                isExpanded 
                  ? 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 shadow-md' 
                  : 'bg-white/60 dark:bg-neutral-900/60 border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-white dark:hover:bg-neutral-900'
              }`}
            >
              {/* Card Header Bar (Clickable to expand/collapse) */}
              <div 
                onClick={() => toggleExpand(exp.id)}
                className="p-5 sm:p-6 cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-4 select-none"
              >
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
                      {exp.productDomain}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      {exp.period}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      {exp.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100">
                      {exp.role}
                    </h3>
                    <span className="text-neutral-400 dark:text-neutral-600 font-normal">@</span>
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <span>{exp.company}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="text-base sm:text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                        {exp.company}
                      </span>
                    )}
                  </div>

                  {exp.productName && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-md w-fit border border-blue-200/50 dark:border-blue-900/50">
                      <Layers className="w-3.5 h-3.5 text-blue-500" />
                      <span>Product: {exp.productName}</span>
                    </div>
                  )}

                  {exp.clients && exp.clients.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap text-xs text-neutral-600 dark:text-neutral-400">
                      <span className="font-semibold text-neutral-700 dark:text-neutral-300">Clients & Engagements:</span>
                      {exp.clients.map((c, cIdx) => (
                        <span key={cIdx} className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium text-[11px] border border-neutral-200/60 dark:border-neutral-700/60">
                          {c}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
                    {exp.summary}
                  </p>
                </div>

                {/* Right Metrics Pills & Expand Button */}
                <div className="flex items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-neutral-100 dark:border-neutral-800 shrink-0">
                  <div className="flex flex-wrap gap-2">
                    {exp.highlightMetrics.slice(0, 2).map((metric, mIdx) => (
                      <span 
                        key={mIdx}
                        className="px-2.5 py-1 rounded-lg text-xs font-bold font-mono bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>

                  <button 
                    aria-label={isExpanded ? "Collapse role details" : "Expand role details"}
                    className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Detailed Expanded Breakdown (Problem -> Action -> Outcome + Key Deliverables) */}
              {isExpanded && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                  className="px-5 sm:px-6 pb-6 pt-2 border-t border-neutral-100 dark:border-neutral-800 space-y-6"
                >
                  
                  {/* Problem -> Action -> Outcome Structured Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    
                    {/* Problem Block */}
                    <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 space-y-2">
                      <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <span>The Problem</span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {exp.problem}
                      </p>
                    </div>

                    {/* Action Block */}
                    <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 space-y-2">
                      <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <span>My Action & Leadership</span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {exp.action}
                      </p>
                    </div>

                    {/* Outcome Block */}
                    <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>Measurable Outcome</span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                        {exp.outcome}
                      </p>
                    </div>

                  </div>

                  {/* Key Deliverables & Initiatives Breakdown */}
                  {exp.keyDeliverables && exp.keyDeliverables.length > 0 && (
                    <div className="p-4 sm:p-5 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/80 dark:border-neutral-800 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                        <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>Key Initiatives & Deliverables</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                        {exp.keyDeliverables.map((item, dIdx) => (
                          <div 
                            key={dIdx} 
                            className="p-3.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 space-y-1.5"
                          >
                            <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                              <span>{item.title}</span>
                            </h4>
                            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stakeholders & Skills Meta Footer */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-neutral-400 dark:text-neutral-500 font-medium">Stakeholders Aligned:</span>
                      {exp.stakeholders.map((s, sIdx) => (
                        <span 
                          key={sIdx}
                          className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-[11px]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-neutral-400 dark:text-neutral-500 font-medium">Core Skills:</span>
                      {exp.skillsUsed.map((skill, skIdx) => (
                        <span 
                          key={skIdx}
                          className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 text-[11px] font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                  </div>

                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
