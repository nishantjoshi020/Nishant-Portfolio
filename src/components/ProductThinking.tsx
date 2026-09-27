import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  SearchCheck, 
  BarChart3, 
  Sliders, 
  Repeat, 
  Target, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  Lightbulb, 
  Compass
} from 'lucide-react';
import { ProductPrinciple } from '../types/portfolio';

interface ProductThinkingProps {
  principles: ProductPrinciple[];
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const ProductThinking: React.FC<ProductThinkingProps> = ({ principles }) => {
  const [selectedId, setSelectedId] = useState<string>(principles[0]?.id || 'principle-1');

  const iconMap: Record<string, any> = {
    SearchCheck: SearchCheck,
    BarChart3: BarChart3,
    Sliders: Sliders,
    Repeat: Repeat,
    Target: Target,
  };

  const activePrinciple = principles.find((p) => p.id === selectedId) || principles[0];

  return (
    <section 
      id="thinking" 
      className="py-20 bg-neutral-50/50 dark:bg-neutral-900/30 border-y border-neutral-200/80 dark:border-neutral-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
          className="max-w-3xl space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider border border-blue-200/60 dark:border-blue-800/60">
            <span>Product Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
            How I Think About Products
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            The core mental models and decision heuristics I use daily to cut through noise, prioritize high-leverage features, and align cross-functional teams.
          </p>
        </motion.div>

        {/* Interactive Layout: List on Left, Deep Dive Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Principles Selector Grid/List */}
          <div className="lg:col-span-6 space-y-3">
            {principles.map((principle, idx) => {
              const Icon = iconMap[principle.iconName] || Lightbulb;
              const isSelected = principle.id === selectedId;
              return (
                <motion.div
                  key={principle.id}
                  onClick={() => setSelectedId(principle.id)}
                  id={`principle-item-${principle.id}`}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: EASE_OUT_EXPO }}
                  className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-colors duration-200 ${
                    isSelected
                      ? 'bg-white dark:bg-neutral-900 border-blue-500/80 dark:border-blue-500/80 shadow-md ring-1 ring-blue-500/30'
                      : 'bg-white/60 dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800 hover:bg-white dark:hover:bg-neutral-900 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`p-2.5 rounded-xl transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100">
                          {principle.title}
                        </h3>
                        <span className="text-xs font-mono text-neutral-400">0{idx + 1}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {principle.shortStatement}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Deep-Dive Active Principle Card */}
          <motion.div 
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.15, ease: EASE_OUT_EXPO }}
            className="lg:col-span-6 sticky top-24"
          >
            <AnimatePresence mode="wait">
              {activePrinciple && (
                <motion.div 
                  key={activePrinciple.id}
                  id="principle-deep-dive-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                  className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-200/60 dark:border-blue-800/60">
                        Mental Model / Heuristic
                      </span>
                    </div>
                    <span className="text-xs font-mono font-medium text-neutral-400 dark:text-neutral-500">
                      {activePrinciple.mentalModelOrFramework}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                      {activePrinciple.title}
                    </h3>
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      "{activePrinciple.shortStatement}"
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                      Why This Matters in Practice
                    </span>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {activePrinciple.expandedThought}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>How I Apply This on the Job</span>
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {activePrinciple.howIApplyIt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                    <span>Product Management Heuristics</span>
                    <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium">
                      <span>Applied across all case studies</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
