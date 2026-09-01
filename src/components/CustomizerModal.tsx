import React, { useState } from 'react';
import { 
  X, 
  SlidersHorizontal, 
  Copy, 
  Check, 
  Sparkles, 
  Eye, 
  Download,
  FileCode,
  RotateCcw
} from 'lucide-react';
import { PortfolioProfile } from '../types/portfolio';

interface CustomizerModalProps {
  profile: PortfolioProfile;
  setProfile: React.Dispatch<React.SetStateAction<PortfolioProfile>>;
  onClose: () => void;
  highlightPlaceholders: boolean;
  setHighlightPlaceholders: (val: boolean) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  profile,
  setProfile,
  onClose,
  highlightPlaceholders,
  setHighlightPlaceholders
}) => {
  const [formData, setFormData] = useState({
    name: profile.name,
    title: profile.title,
    tagline: profile.tagline,
    location: profile.location,
    email: profile.socials.email,
    linkedin: profile.socials.linkedin,
    github: profile.socials.github,
  });

  const [copiedJSON, setCopiedJSON] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      name: formData.name,
      title: formData.title,
      tagline: formData.tagline,
      location: formData.location,
      socials: {
        ...prev.socials,
        email: formData.email,
        linkedin: formData.linkedin,
        github: formData.github,
      }
    }));
    onClose();
  };

  const handleCopyJSON = () => {
    const dataString = JSON.stringify(profile, null, 2);
    navigator.clipboard.writeText(dataString);
    setCopiedJSON(true);
    setTimeout(() => setCopiedJSON(false), 2500);
  };

  return (
    <div 
      id="customizer-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    >
      <div 
        id="customizer-modal-content"
        className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="bg-neutral-50 dark:bg-neutral-800/80 border-b border-neutral-200 dark:border-neutral-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Portfolio Customizer & Content Manager
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Edit your personal info live or highlight placeholders across the website.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          
          {/* Highlight Placeholders Helper Toggle */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5 text-xs">
                <Eye className="w-4 h-4 text-amber-600" />
                <span>Highlight Placeholders Mode</span>
              </span>
              <p className="text-[11px] text-amber-700 dark:text-amber-400">
                Visually highlights all bracketed `[Placeholder]` tags (e.g. `[Company Name]`, `[XX%]`) so you can find and replace them easily.
              </p>
            </div>
            <button
              onClick={() => setHighlightPlaceholders(!highlightPlaceholders)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all text-xs ${
                highlightPlaceholders
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-amber-300 dark:border-amber-800'
              }`}
            >
              {highlightPlaceholders ? 'Active ON' : 'Turn ON'}
            </button>
          </div>

          {/* Quick Edit Form */}
          <form onSubmit={handleApply} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-1">
                <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 outline-none text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                  Job Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Associate Product Manager"
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 outline-none text-xs"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                  Positioning Headline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="I build products by turning user problems, data, and business goals into simple, impactful solutions."
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 outline-none text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex.apm@example.com"
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 outline-none text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                  Location & Availability
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="San Francisco, CA / Remote"
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 outline-none text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                  LinkedIn URL
                </label>
                <input
                  type="text"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/yourname"
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 outline-none text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                  GitHub / Portfolio URL
                </label>
                <input
                  type="text"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  placeholder="https://github.com/yourname"
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 outline-none text-xs"
                />
              </div>

            </div>

            <div className="pt-4 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800">
              <button
                type="button"
                onClick={handleCopyJSON}
                className="px-3.5 py-2 rounded-xl text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center gap-1.5 font-semibold"
              >
                {copiedJSON ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copiedJSON ? 'JSON Copied!' : 'Copy Data JSON'}</span>
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm"
              >
                Save & Apply Live
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};
