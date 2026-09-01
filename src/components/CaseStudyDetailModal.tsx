import React, { useState, useEffect } from 'react';
import { 
  X, 
  ArrowLeft, 
  TrendingUp, 
  Search, 
  Lightbulb, 
  Target, 
  Sliders, 
  Layers, 
  Rocket, 
  CheckCircle2, 
  Quote, 
  Code2, 
  Palette, 
  ShieldAlert, 
  ArrowRight,
  Sparkles,
  BarChart3,
  HelpCircle,
  Clock,
  UserCheck,
  ExternalLink,
  Users,
  GitBranch,
  Share2,
  Compass,
  ShoppingBag,
  Zap,
  Network
} from 'lucide-react';
import { CaseStudy } from '../types/portfolio';

interface CaseStudyDetailModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

export const CaseStudyDetailModal: React.FC<CaseStudyDetailModalProps> = ({
  caseStudy,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'discovery' | 'solution' | 'impact' | 'learnings'>('overview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (caseStudy) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [caseStudy, onClose]);

  if (!caseStudy) return null;

  const sections = [
    { id: 'overview', label: 'Context & Problem' },
    { id: 'discovery', label: 'Discovery & Hypothesis' },
    { id: 'solution', label: 'Prioritization & Solution' },
    { id: 'impact', label: 'Execution & Impact' },
    { id: 'learnings', label: 'Learnings & Retrospective' },
  ];

  return (
    <div 
      id="case-study-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6"
    >
      <div 
        id="case-study-modal-content"
        className="relative w-full max-w-5xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
      >
        
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-20 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              id="case-study-back-btn"
              className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-bold uppercase tracking-wider ${
                  caseStudy.isPrototype ? 'text-purple-600 dark:text-purple-400' : 'text-blue-600 dark:text-blue-400'
                }`}>
                  {caseStudy.domain}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                  {caseStudy.isPrototype ? 'Interactive Prototype Breakdown' : 'Production Platform Breakdown'}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 truncate max-w-md sm:max-w-xl">
                {caseStudy.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {caseStudy.liveUrl && (
              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors shadow-2xs ${
                  caseStudy.isPrototype
                    ? 'bg-purple-600 hover:bg-purple-700 text-white border-purple-500'
                    : 'bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-950/80 dark:hover:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                }`}
              >
                <span>{caseStudy.isPrototype ? 'Launch Live Prototype' : 'Live Platform'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <span className={`hidden sm:inline-flex px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${
              caseStudy.isPrototype
                ? 'bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
                : 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
            }`}>
              {caseStudy.heroMetric} {caseStudy.heroMetricLabel}
            </span>
            <button
              onClick={onClose}
              id="case-study-close-btn"
              aria-label="Close modal"
              className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="bg-neutral-50 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800 px-6 py-2 flex items-center gap-1.5 overflow-x-auto">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveTab(sec.id as any)}
              id={`modal-tab-${sec.id}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === sec.id
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-200/60 dark:hover:bg-neutral-800'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-10">
          
          {/* Top Quick Meta Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-800 text-xs">
            <div>
              <span className="text-neutral-400 dark:text-neutral-500 block">My Role</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">{caseStudy.role}</span>
            </div>
            <div>
              <span className="text-neutral-400 dark:text-neutral-500 block">Timeline</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">{caseStudy.timeline}</span>
            </div>
            <div>
              <span className="text-neutral-400 dark:text-neutral-500 block">Target Audience</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">{caseStudy.context.targetAudience}</span>
            </div>
            <div>
              <span className="text-neutral-400 dark:text-neutral-500 block">Primary Outcome</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{caseStudy.impactHighlight}</span>
            </div>
          </div>

          {/* Special Interactive Prototype Live Banner */}
          {caseStudy.isPrototype && caseStudy.liveUrl && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-900/10 via-indigo-900/10 to-blue-900/10 dark:from-purple-950/40 dark:via-indigo-950/40 dark:to-blue-950/40 border border-purple-200 dark:border-purple-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                    Live Working Prototype
                  </span>
                </div>
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  Experience {caseStudy.title.split(':')[0]} directly in your browser.
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  {caseStudy.tagline}
                </p>
              </div>
              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-sm"
              >
                <span>Launch {caseStudy.title.split('(')[0].split(':')[0].trim()} App</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

          {/* Section: Context & Problem */}
          <section className="space-y-6">
            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                  1. Context & Problem Framing
                </h3>
              </div>
              <span className="text-xs text-neutral-400">Why this mattered</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  Business & Product Context
                </h4>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {caseStudy.context.overview}
                </p>
                <div className="p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-200">
                  <strong>Core Business Objective:</strong> {caseStudy.context.businessGoal}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  The Specific User Problem
                </h4>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                  {caseStudy.problem.summary}
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  <strong>Who Experienced It:</strong> {caseStudy.problem.whoExperiencesIt}
                </p>
              </div>
            </div>

            {/* Quantitative Baseline Evidence */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Baseline Quantitative Evidence
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {caseStudy.problem.quantData.map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/30 text-xs text-neutral-700 dark:text-neutral-300 flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Real User Quotes */}
            {caseStudy.problem.userQuotes && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  Voice of the Customer (Qualitative Pain)
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {caseStudy.problem.userQuotes.map((quote, qIdx) => (
                    <div key={qIdx} className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-800 text-xs italic text-neutral-600 dark:text-neutral-300 flex items-start gap-2.5">
                      <Quote className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                      <span>{quote}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Section: Discovery & Insights */}
          <section className="space-y-6">
            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                  2. Discovery, Research & Key Insights
                </h3>
              </div>
              <span className="text-xs text-neutral-400">Uncovering root causes</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {caseStudy.discovery.researchMethods.map((method, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold">
                    <Search className="w-3.5 h-3.5" />
                    <span>{method.type}</span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {method.description}
                  </p>
                  <div className="pt-2 border-t border-neutral-100 dark:border-neutral-700/60 text-xs text-neutral-800 dark:text-neutral-200 font-medium">
                    <strong>Finding:</strong> {method.finding}
                  </div>
                </div>
              ))}
            </div>

            {/* Persona Deep Dive & JTBD Breakdown (if available) */}
            {caseStudy.personas && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-blue-500" />
                    <span>Target Personas & JTBD Deep Dive</span>
                  </span>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    {caseStudy.personas.length} Target Archetypes
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {caseStudy.personas.map((persona, pIdx) => (
                    <div key={pIdx} className="p-4 rounded-xl bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/80 space-y-2.5 shadow-2xs">
                      <div className="flex items-start justify-between gap-2 border-b border-neutral-100 dark:border-neutral-700/60 pb-2">
                        <div>
                          <h5 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{persona.name}</h5>
                          <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">{persona.roleDesc}</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
                          {persona.adoptionLikelihood.split('—')[0].trim()}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {persona.profile}
                      </p>
                      <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800 space-y-1">
                        <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Job-To-Be-Done (JTBD)</div>
                        <p className="text-[11px] font-medium text-neutral-800 dark:text-neutral-200 italic">"{persona.jtbd}"</p>
                      </div>
                      <div className="space-y-1 text-[10px]">
                        <div><strong className="text-neutral-500">Key Hook:</strong> <span className="text-blue-600 dark:text-blue-400 font-medium">{persona.keyHook}</span></div>
                        <div><strong className="text-neutral-500">Current Pain:</strong> <span className="text-rose-600 dark:text-rose-400">{persona.pain}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Synthesized Insights Cards */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Core Synthesized Insights
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {caseStudy.insights.map((insight, i) => (
                  <div key={i} className="p-4 rounded-xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-2">
                    <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 text-xs font-bold">
                      <Lightbulb className="w-4 h-4" />
                      <span>{insight.title}</span>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300">
                      {insight.description}
                    </p>
                    <div className="pt-2 border-t border-amber-200/50 dark:border-amber-900/50 text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                      Takeaway: {insight.keyTakeaway}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Hypothesis */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200/80 dark:border-blue-800/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                <Target className="w-4 h-4" />
                <span>The Formal Product Hypothesis</span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-50 leading-relaxed">
                "{caseStudy.hypothesis.statement}"
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                {caseStudy.hypothesis.successCriteria.map((crit, cIdx) => (
                  <span key={cIdx} className="px-2.5 py-1 rounded-md bg-white/80 dark:bg-neutral-800/80 border border-blue-200 dark:border-blue-700 font-medium text-neutral-800 dark:text-neutral-200">
                    ✓ {crit}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Section: Prioritization & Solution */}
          <section className="space-y-6">
            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                  3. Prioritization Framework & UX Solution
                </h3>
              </div>
              <span className="text-xs text-neutral-400">Deciding what to build</span>
            </div>

            {/* Prioritization Framework & Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {caseStudy.prioritization.framework}
                  </span>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {caseStudy.prioritization.frameworkDetails}
                  </p>
                </div>
              </div>

              {caseStudy.prioritization.matrixItems && (
                <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-semibold border-b border-neutral-200 dark:border-neutral-700">
                      <tr>
                        <th className="p-3">Feature Candidate</th>
                        <th className="p-3">Reach / Impact</th>
                        <th className="p-3">Effort / Confidence</th>
                        <th className="p-3">Score / Priority</th>
                        <th className="p-3">Decision</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-neutral-700 dark:text-neutral-300">
                      {caseStudy.prioritization.matrixItems.map((item, mIdx) => (
                        <tr key={mIdx} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40">
                          <td className="p-3 font-semibold text-neutral-900 dark:text-neutral-100">{item.feature}</td>
                          <td className="p-3">{item.reach || item.impact || 'High'}</td>
                          <td className="p-3">{item.effort || item.confidence || 'Medium'}</td>
                          <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">{item.score}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              item.decision.includes('P0') 
                                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' 
                                : item.decision.includes('P1')
                                ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                            }`}>
                              {item.decision}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Solution User Flow Steps */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                User Flow & Experience Architecture
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {caseStudy.solution.userFlowSteps.map((step) => (
                  <div key={step.step} className="p-3.5 rounded-xl bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 space-y-1.5 relative">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-blue-600 dark:text-blue-400">Step 0{step.step}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <h5 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{step.name}</h5>
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-400">{step.action}</p>
                    <div className="pt-1.5 border-t border-neutral-100 dark:border-neutral-700 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                      💡 {step.improvement}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Solution Core Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {caseStudy.solution.keyPillars.map((pillar, pIdx) => (
                <div key={pIdx} className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
                  <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{pillar.title}</span>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300">{pillar.description}</p>
                  <div className="pt-2 text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                    <strong>UX Decision:</strong> {pillar.uxDecision}
                  </div>
                </div>
              ))}
            </div>

            {/* Technical Architecture & Swimlane Diagrams */}
            {caseStudy.architectureDiagrams && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5">
                    <Network className="w-3.5 h-3.5 text-indigo-500" />
                    <span>System Architecture & Swimlane Blueprints</span>
                  </span>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    Eraser.io Workspaces
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {caseStudy.architectureDiagrams.map((diag, dIdx) => (
                    <a
                      key={dIdx}
                      href={diag.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/50 to-blue-50/30 dark:from-indigo-950/30 dark:to-blue-950/20 border border-indigo-200/80 dark:border-indigo-850 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all group space-y-2.5 shadow-2xs block"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                          {diag.type}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline">
                          <span>Open in Eraser</span>
                          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                      <h5 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {diag.title}
                      </h5>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {diag.description}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Service Blueprint Table */}
            {caseStudy.serviceBlueprint && (
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5 text-blue-500" />
                  <span>End-to-End Service Blueprint (Frontstage vs. System Logic vs. 3rd-Party)</span>
                </span>
                <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-semibold border-b border-neutral-200 dark:border-neutral-700">
                      <tr>
                        <th className="p-3 w-1/6">User Stage</th>
                        <th className="p-3 w-2/6">Frontstage (User Action)</th>
                        <th className="p-3 w-2/6">Backstage System Logic</th>
                        <th className="p-3 w-1/6">Integrations & Telemetry</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-neutral-700 dark:text-neutral-300">
                      {caseStudy.serviceBlueprint.map((sb, sbIdx) => (
                        <tr key={sbIdx} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40">
                          <td className="p-3 font-semibold text-neutral-900 dark:text-neutral-100 whitespace-nowrap">{sb.stage}</td>
                          <td className="p-3 text-neutral-600 dark:text-neutral-300">{sb.frontstage}</td>
                          <td className="p-3 text-neutral-700 dark:text-neutral-200 font-mono text-[11px]">{sb.systemLogic}</td>
                          <td className="p-3">
                            <div className="space-y-1">
                              <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                                {sb.integrations}
                              </span>
                              <div className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                                📊 {sb.metricsTracked}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>

          {/* Section: Execution, Launch & Metrics */}
          <section className="space-y-6">
            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                  4. Execution & Measurable Impact
                </h3>
              </div>
              <span className="text-xs text-neutral-400">Cross-functional delivery</span>
            </div>

            {/* Stakeholder Execution Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  <Code2 className="w-4 h-4 text-blue-500" />
                  <span>Engineering & QA Partnership</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {caseStudy.execution.engineeringCollaboration}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {caseStudy.execution.qaAndTesting}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  <Palette className="w-4 h-4 text-purple-500" />
                  <span>Design & Stakeholder Alignment</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {caseStudy.execution.designPartnership}
                </p>
                <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/30 text-[11px] text-amber-800 dark:text-amber-300">
                  <strong>Challenge Navigated:</strong> {caseStudy.execution.stakeholderChallenges}
                </div>
              </div>
            </div>

            {/* North Star Metric Spotlight (if available) */}
            {caseStudy.northStarMetric && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-cyan-950/30 border border-emerald-200/80 dark:border-emerald-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                      Product North Star Metric (NSM)
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                    {caseStudy.northStarMetric.target}
                  </span>
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-extrabold text-neutral-900 dark:text-neutral-100">
                    {caseStudy.northStarMetric.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 mt-1">
                    <strong>Definition:</strong> {caseStudy.northStarMetric.definition}
                  </p>
                </div>
                <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-800/60 text-xs text-emerald-900 dark:text-emerald-200">
                  <strong>Why this aligns the entire product:</strong> {caseStudy.northStarMetric.whyItWorks}
                </div>
              </div>
            )}

            {/* Measurable Metric Cards Grid */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Primary Measurable Outcomes
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {caseStudy.metricsAndImpact.primaryMetrics.map((metric, mIdx) => (
                  <div key={mIdx} className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 space-y-1">
                    <span className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold">{metric.label}</span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">
                      {metric.value}
                    </div>
                    <div className="text-[11px] text-neutral-600 dark:text-neutral-400 font-medium">
                      {metric.change}
                    </div>
                    {metric.context && (
                      <div className="text-[10px] text-neutral-500 dark:text-neutral-500 pt-1">
                        {metric.context}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Growth & Virality Loops (if available) */}
            {caseStudy.growthLoops && (
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-purple-500" />
                  <span>Growth, Shareability & Viral Retention Loops</span>
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {caseStudy.growthLoops.map((loop, lIdx) => (
                    <div key={lIdx} className="p-4 rounded-xl bg-white dark:bg-neutral-800/50 border border-purple-200/70 dark:border-purple-900/50 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700 dark:text-purple-300">
                        <Zap className="w-3.5 h-3.5" />
                        <span>{loop.title}</span>
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">{loop.description}</p>
                      <div className="pt-2 border-t border-neutral-100 dark:border-neutral-700/60 text-[11px] text-neutral-700 dark:text-neutral-300">
                        <strong>Why it drives growth:</strong> {loop.whyImportant}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Business Value Summary */}
            <div className="p-4 rounded-xl bg-neutral-900 text-white dark:bg-neutral-800 border border-neutral-800 text-xs sm:text-sm flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 block">
                  Total Business Value Delivered
                </span>
                <p className="mt-1 text-neutral-200">{caseStudy.metricsAndImpact.businessValueDelivered}</p>
              </div>
              <Sparkles className="w-6 h-6 text-amber-400 shrink-0 hidden sm:block" />
            </div>
          </section>

          {/* Section: Learnings & Retrospective */}
          <section className="space-y-6 pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                5. Learnings & Retrospective
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* What I Learned */}
              <div className="p-4 rounded-xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>What I Learned as an APM</span>
                </h4>
                <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
                  {caseStudy.learnings.whatILearned.map((l, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What I Would Do Differently */}
              <div className="p-4 rounded-xl bg-purple-50/40 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/40 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" />
                  <span>What I Would Do Differently Next Time</span>
                </h4>
                <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
                  {caseStudy.learnings.whatIWouldDoDifferently.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </section>

        </div>

        {/* Modal Sticky Footer */}
        <div className="sticky bottom-0 z-20 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 px-6 py-3.5 flex items-center justify-between">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            End of case study readout
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              Close
            </button>
            <a
              href="#contact"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
            >
              Discuss This Project
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
