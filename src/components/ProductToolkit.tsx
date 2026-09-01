import React, { useState } from 'react';
import { 
  Wrench, 
  Layers, 
  BarChart3, 
  Users2, 
  Sparkles, 
  CheckCircle2, 
  Cpu, 
  Database, 
  Code2, 
  FileSpreadsheet,
  Kanban
} from 'lucide-react';
import { ToolkitCategory, ToolItem } from '../types/portfolio';

interface ProductToolkitProps {
  categories: ToolkitCategory[];
  tools: ToolItem[];
}

export const ProductToolkit: React.FC<ProductToolkitProps> = ({ categories, tools }) => {
  const [activeTab, setActiveTab] = useState<string>(categories[0]?.category || 'Product Strategy & Discovery');
  const [selectedToolCategory, setSelectedToolCategory] = useState<string>('All');

  const toolCategories = ['All', 'Analytics', 'Product & Specs', 'Design & Wireframing', 'Roadmap & Agile', 'User Research'];

  const filteredTools = tools.filter((t) => {
    if (selectedToolCategory === 'All') return true;
    return t.category === selectedToolCategory;
  });

  return (
    <section 
      id="toolkit" 
      className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16"
    >
      {/* Section Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider border border-blue-200/60 dark:border-blue-800/60">
          <span>Competencies & Stack</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
          Product Toolkit & Core Skills
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
          A breakdown of my hands-on product capabilities, analytics toolkit, stakeholder leadership skills, and daily software stack.
        </p>
      </div>

      {/* Part 1: Core PM Competencies & Skills Tabs */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveTab(cat.category)}
              id={`toolkit-tab-${cat.category.toLowerCase().replace(/\s+/g, '-')}`}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === cat.category
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Active Category Skills Grid */}
        {(() => {
          const currentCat = categories.find((c) => c.category === activeTab) || categories[0];
          return (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                {currentCat.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentCat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    id={`skill-item-${sIdx}`}
                    className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500/50 shadow-xs hover:shadow-md transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        {skill.name}
                      </h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        skill.proficiency === 'Core Strength'
                          ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                      }`}>
                        {skill.proficiency}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {skill.context}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Part 2: Tools & Software Daily Stack */}
      <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Software & Infrastructure
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Tools I Use Everyday
            </h3>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {toolCategories.map((tCat) => (
              <button
                key={tCat}
                onClick={() => setSelectedToolCategory(tCat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedToolCategory === tCat
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {tCat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool, tIdx) => (
            <div
              key={tIdx}
              id={`software-tool-${tIdx}`}
              className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-800 flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs border border-neutral-200 dark:border-neutral-700 shrink-0">
                <Kanban className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    {tool.name}
                  </h4>
                  <span className="text-[10px] font-mono text-neutral-400 px-1.5 py-0.5 rounded bg-neutral-200/50 dark:bg-neutral-700/50">
                    {tool.category}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  {tool.useCase}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
