import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Users2, 
  HeartHandshake, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Code2,
  Palette,
  LineChart,
  Briefcase,
  Layers,
  HelpCircle,
  Award,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { PortfolioProfile } from '../types/portfolio';

interface AboutProps {
  profile: PortfolioProfile;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const About: React.FC<AboutProps> = ({ profile }) => {
  const [selectedStep, setSelectedStep] = useState<number>(0);
  const [selectedCertIdx, setSelectedCertIdx] = useState<number>(0);

  const certifications = profile.certifications || [];
  const activeCert = certifications[selectedCertIdx] || certifications[0];

  const pillars = [
    {
      icon: Compass,
      title: "What Motivates Me",
      description: "Untangling messy, high-ambiguity customer problems and translating them into clear, elegant user experiences that directly grow business revenue."
    },
    {
      icon: LineChart,
      title: "Data-Informed Discovery",
      description: "Combining quantitative telemetry (funnel drop-offs, SQL cohorts) with qualitative empathy (user interviews, session replays) to pinpoint exact friction points."
    },
    {
      icon: Users2,
      title: "Cross-Functional Bridge",
      description: "Serving as the trusted connective tissue between engineering velocity, design craft, sales requirements, and executive OKRs with zero ego."
    },
    {
      icon: Sparkles,
      title: "Problems I Love Solving",
      description: "Self-serve onboarding, Day-N user retention, activation mechanics, search discovery, and enterprise analytics automation."
    }
  ];

  return (
    <section 
      id="about" 
      className="py-20 bg-neutral-50/50 dark:bg-neutral-900/30 border-y border-neutral-200/80 dark:border-neutral-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
          className="max-w-3xl space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 text-xs font-semibold uppercase tracking-wider">
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
            A product manager at the intersection of empathy, analytics, and execution.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
            I don't treat product management as just writing tickets or managing timelines. I view it as being the chief advocate for the customer's unaddressed pain and the orchestrator of measurable business impact.
          </p>
        </motion.div>

        {/* Narrative & Core Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Narrative Box */}
          <motion.div 
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE_OUT_EXPO }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="prose dark:prose-invert text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                My path into product management started with a simple fascination: <span className="font-semibold text-neutral-900 dark:text-neutral-100">why do well-engineered software tools still fail to engage users?</span>
              </p>
              <p>
                The answer almost always lies in the gap between what teams assume users want and what users actually experience. As an APM, I bridge that gap by diving into the trenches—listening to user frustration calls, analyzing query logs, and writing crisp specifications that empower engineers and designers to do their best work.
              </p>
              <p>
                Whether I'm mapping an onboarding funnel in Mixpanel, moderating usability sessions in Figma, or negotiating trade-offs during sprint planning, I bring clarity, energy, and an outcome-obsessed mindset to every initiative.
              </p>
            </div>

            {/* Cross-Functional Alignment Callout */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                How I Collaborate Across Disciplines
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-start gap-2">
                  <Code2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">Engineering</span>
                    <p className="text-neutral-500 dark:text-neutral-400 text-[11px]">Clear acceptance criteria & unblocked roadmaps.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Palette className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">Design</span>
                    <p className="text-neutral-500 dark:text-neutral-400 text-[11px]">Shared customer empathy & rapid iterative prototypes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <LineChart className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">Analytics</span>
                    <p className="text-neutral-500 dark:text-neutral-400 text-[11px]">Rigorous event schemas & cohort tracking.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Briefcase className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">Leadership</span>
                    <p className="text-neutral-500 dark:text-neutral-400 text-[11px]">Strategic alignment with North Star business OKRs.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Certifications Callout & Switcher */}
            {activeCert && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/50 dark:from-blue-950/40 dark:to-indigo-950/20 border border-blue-200/80 dark:border-blue-800/60 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300">
                      Verified Credentials ({certifications.length})
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-[10px] font-semibold">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                </div>

                {/* Compact Issuer Switcher Tabs */}
                <div className="flex flex-wrap gap-1 border-y border-blue-100 dark:border-blue-900/40 py-2">
                  {certifications.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedCertIdx(idx)}
                      className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                        selectedCertIdx === idx
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white/80 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-blue-50 dark:hover:bg-neutral-700'
                      }`}
                    >
                      {c.issuer.split(' ')[0]}
                    </button>
                  ))}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      {activeCert.name}
                    </h4>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 shrink-0">
                      {activeCert.issuer}
                    </span>
                  </div>
                  {activeCert.description && (
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {activeCert.description}
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-blue-100/80 dark:border-blue-900/30 flex items-center justify-between gap-2 text-xs">
                  <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
                    ID: <strong className="text-neutral-800 dark:text-neutral-200">{activeCert.credentialId}</strong>
                  </span>
                  <a
                    href={activeCert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 shrink-0"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

          </motion.div>

          {/* Right 4 Pillar Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  id={`about-pillar-${idx}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: 0.12 + idx * 0.08, ease: EASE_OUT_EXPO }}
                  className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs hover:border-blue-500/50 hover:shadow-md transition-all space-y-2.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Compact "How I Work" Framework */}
        <motion.div 
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
          className="space-y-6 pt-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Operating Philosophy
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                How I Work: The 6-Stage Execution Framework
              </h3>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Click any stage to inspect mindset & deliverables
            </p>
          </div>

          {/* Horizontal Stepper */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {profile.howIWorkSteps.map((step, idx) => {
              const isSelected = selectedStep === idx;
              return (
                <button
                  key={step.step}
                  onClick={() => setSelectedStep(idx)}
                  id={`how-i-work-tab-${step.step}`}
                  className={`p-3.5 rounded-xl text-left transition-all border ${
                    isSelected
                      ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 border-neutral-900 dark:border-neutral-100 shadow-md scale-102'
                      : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-mono font-bold ${isSelected ? 'text-blue-400 dark:text-blue-600' : 'text-neutral-400 dark:text-neutral-500'}`}>
                      {step.step}
                    </span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 dark:text-blue-600" />}
                  </div>
                  <div className="text-sm font-bold mt-1.5">
                    {step.title}
                  </div>
                  <div className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-neutral-300 dark:text-neutral-600' : 'text-neutral-400 dark:text-neutral-500'}`}>
                    {step.tagline}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Selected Step Card */}
          <AnimatePresence mode="wait">
            {(() => {
              const cur = profile.howIWorkSteps[selectedStep];
              return (
                <motion.div 
                  key={cur.step}
                  id="how-i-work-detail-panel"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                  className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                        {cur.step}
                      </span>
                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
                          {cur.title}: <span className="font-normal text-neutral-600 dark:text-neutral-300">{cur.tagline}</span>
                        </h4>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md border border-blue-200/60 dark:border-blue-800/60 self-start sm:self-auto">
                      Phase {selectedStep + 1} of 6
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
                    <div className="md:col-span-6 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                        Core Mindset & Goal
                      </span>
                      <p className="text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed font-medium">
                        "{cur.mindset}"
                      </p>
                    </div>

                    <div className="md:col-span-3 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                        Key Deliverables
                      </span>
                      <ul className="space-y-1 text-xs text-neutral-600 dark:text-neutral-300">
                        {cur.deliverables.map((item, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="md:col-span-3 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                        Primary Collaborators
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cur.collaborators.map((c, i) => (
                          <span 
                            key={i} 
                            className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-[11px] font-medium"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>

        </motion.div>

      </div>
    </section>
  );
};
