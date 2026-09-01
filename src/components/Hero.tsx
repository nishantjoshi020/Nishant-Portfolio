import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  FileText, 
  Linkedin, 
  Github, 
  Mail, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  Layers, 
  Search, 
  Lightbulb, 
  Rocket, 
  BarChart, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Target
} from 'lucide-react';
import { PortfolioProfile } from '../types/portfolio';

interface HeroProps {
  profile: PortfolioProfile;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenResume }) => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      id: "problem",
      name: "Problem",
      badge: "Discovery & Pain Point",
      icon: Search,
      color: "from-rose-500/20 to-orange-500/20 border-rose-500/30 text-rose-600 dark:text-rose-400",
      pillColor: "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
      title: "Uncovering Enterprise Sourcing Latency",
      description: "Procurement teams spent 65% of their week manually parsing unstructured emails and reconciling disjointed supplier quotes, dragging cycle time to 26 days.",
      signal: "Qualitative CPO Discovery & Workflow Bottlenecks",
      metricSnippet: "26 Days Average Sourcing Cycle"
    },
    {
      id: "insight",
      name: "Insight",
      badge: "User Research & Field Shadowing",
      icon: Lightbulb,
      color: "from-amber-500/20 to-yellow-500/20 border-amber-500/30 text-amber-600 dark:text-amber-400",
      pillColor: "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
      title: "Synthesizing Domain Requirements",
      description: "Shadowed 30+ buyers, suppliers, and cost engineers: discovered that conversational AI intake + automated quote normalization solve 68% of latency.",
      signal: "85% wanted automated line-item normalization",
      metricSnippet: "14h/week lost to manual quote alignment"
    },
    {
      id: "product",
      name: "Product",
      badge: "PRD Specs & Agile Delivery",
      icon: Rocket,
      color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-600 dark:text-blue-400",
      pillColor: "bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      title: "Shipping Core Production Systems",
      description: "Authored technical PRDs for IntakeAI, BidSense quote engine, and parametric should-cost models. Led 7-person cross-functional squads in 2-week sprints.",
      signal: "Shipped to live enterprise clients",
      metricSnippet: "RICE: 1,350 (IntakeAI & BidSense P0)"
    },
    {
      id: "impact",
      name: "Impact",
      badge: "Real-World Business Impact",
      icon: TrendingUp,
      color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
      pillColor: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
      title: "Measurable Industry Outcomes",
      description: "Achieved -42% Sourcing Cycle Time at ProcUrPal, 85% faster estimation at CostItRight, and won the Pride of MP Award 2024.",
      signal: "Production Enterprise Adoption & 94% Retention",
      metricSnippet: "-42% Cycle Time • 85% Faster Costing"
    }
  ];

  // Auto-cycle through stages if user hasn't manually clicked recently
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [stages.length]);

  return (
    <section 
      id="hero" 
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden"
    >
      {/* Subtle background ambient mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-50/50 via-indigo-50/20 to-transparent dark:from-blue-950/20 dark:via-indigo-950/10 dark:to-transparent pointer-events-none -z-10 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: PM Positioning Statement & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Role & Status Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{profile.title}</span>
                <span className="text-neutral-400 dark:text-neutral-600">•</span>
                <span className="text-neutral-600 dark:text-neutral-400 font-normal">Discovery → Execution → Impact</span>
              </div>

              {profile.certifications && profile.certifications.length > 0 && (
                <a
                  href="#snapshot"
                  id="hero-cert-badge-link"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors shadow-xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{profile.certifications.length}x Verified PM & Agile Certified</span>
                  <span className="text-emerald-600/70 dark:text-emerald-400/70 text-[10px] hidden sm:inline">• View All Credentials</span>
                </a>
              )}
            </div>

            {/* Candidate Name & Hero Headline */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
                {profile.name}
              </h2>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 leading-[1.15]">
                Turning user problems, data, and business goals into{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-300">
                  simple, high-impact products.
                </span>
              </h1>
            </div>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl font-normal leading-relaxed">
              I am an Associate Product Manager who works across the entire product lifecycle—uncovering root-cause user friction, structuring actionable PRDs, aligning cross-functional engineering and design squads, and validating outcomes through rigorous analytics and experimentation.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#work"
                id="hero-view-work-cta"
                className="px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 group"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenResume}
                id="hero-download-resume-cta"
                className="px-5 py-3.5 text-sm font-semibold text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl border border-neutral-300 dark:border-neutral-700 shadow-xs hover:shadow transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Download Resume</span>
              </button>
            </div>

            {/* Social & Contact Links */}
            <div className="pt-2 flex items-center gap-4 text-xs font-medium text-neutral-600 dark:text-neutral-400">
              <span className="text-neutral-400 dark:text-neutral-500">Connect:</span>
              <a 
                href={profile.socials.linkedin} 
                target="_blank" 
                rel="noreferrer"
                id="hero-linkedin-link"
                className="inline-flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a 
                href={profile.socials.github} 
                target="_blank" 
                rel="noreferrer"
                id="hero-github-link"
                className="inline-flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a 
                href={`mailto:${profile.socials.email}`} 
                id="hero-email-link"
                className="inline-flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
            </div>

          </div>

          {/* Right Column: Abstract Interactive PM Visual Element (Problem -> Insight -> Product -> Impact) */}
          <div className="lg:col-span-5">
            <div 
              id="hero-pm-loop-card"
              className="relative rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 sm:p-6 shadow-xl space-y-5 backdrop-blur-sm"
            >
              {/* Header of the interactive model */}
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-xs font-bold tracking-wider uppercase text-neutral-800 dark:text-neutral-200">
                    Product Lifecycle Engine
                  </span>
                </div>
                <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                  Interactive Model
                </span>
              </div>

              {/* 4-Step Interactive Nodes Bar */}
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                {stages.map((stage, idx) => {
                  const Icon = stage.icon;
                  const isCurrent = activeStage === idx;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => setActiveStage(idx)}
                      id={`hero-stage-tab-${stage.id}`}
                      className={`relative flex flex-col items-center p-2 rounded-xl text-center transition-all ${
                        isCurrent
                          ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-md scale-102'
                          : 'bg-neutral-50 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-1 ${isCurrent ? 'text-blue-400 dark:text-blue-600' : 'text-neutral-500'}`} />
                      <span className="text-[11px] font-bold tracking-tight leading-none">
                        {stage.name}
                      </span>
                      {isCurrent && (
                        <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-blue-500" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Active Stage Highlight Card */}
              {(() => {
                const cur = stages[activeStage];
                const Icon = cur.icon;
                return (
                  <div className={`rounded-xl border p-4 sm:p-5 space-y-3 transition-all duration-300 bg-gradient-to-br ${cur.color}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-white/80 dark:bg-neutral-800/80 shadow-xs">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                          {cur.badge}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border ${cur.pillColor}`}>
                        Step {activeStage + 1} of 4
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100">
                        {cur.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 mt-1 leading-relaxed">
                        {cur.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-neutral-200/50 dark:border-neutral-700/50 flex items-center justify-between text-xs">
                      <span className="font-medium text-neutral-600 dark:text-neutral-400">
                        Artifact / Metric:
                      </span>
                      <span className="font-mono font-bold text-neutral-900 dark:text-neutral-100 bg-white/60 dark:bg-neutral-800/60 px-2 py-0.5 rounded">
                        {cur.metricSnippet}
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Bottom Quick Flow Summary Bar */}
              <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 px-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Outcome-driven PM mindset</span>
                </div>
                <button
                  onClick={() => setActiveStage((prev) => (prev + 1) % stages.length)}
                  className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium hover:underline text-xs"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Hero Quick Stat Metrics Strip */}
        <div className="mt-14 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {profile.heroStats.map((stat, idx) => (
              <div 
                key={idx}
                id={`hero-stat-card-${idx}`}
                className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800/80 hover:border-blue-500/40 transition-colors"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                  {stat.label}
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 leading-tight">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
