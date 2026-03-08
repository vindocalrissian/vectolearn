import React, { useState, useRef } from 'react';
import { Play, Sparkles, Activity, Database, Globe, UploadCloud, Link as LinkIcon, FileText, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VectoPayload } from '../services/gemini';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CurriculumFormProps {
  onAnalyze: (payload: VectoPayload) => void;
  loading: boolean;
}

const PRESETS = [
  {
    name: "SKM L3 Automotive",
    legacy: {
      course_title: "SKM Level 3 Motor Vehicle Mechanic",
      last_updated: "2019",
      core_competencies: "Internal Combustion Engines, Manual Transmissions, Basic Electronics"
    },
    market: {
      trending_skills: "EV Battery Diagnostics, CAN bus Troubleshooting, Regenerative Braking Systems",
      salary_growth: "+25% for Hybrid/EV-certified techs in Klang Valley",
      green_standards: "Euro 7 Emission Compliance, Battery Recycling Protocols"
    }
  },
  {
    name: "SKM L2 Welding",
    legacy: {
      course_title: "SKM Level 2 Shielded Metal Arc Welding (SMAW)",
      last_updated: "2018",
      core_competencies: "Manual arc welding, Blueprint reading, Metal grinding"
    },
    market: {
      trending_skills: "Robotic Welding Programming, IoT Weld Quality Sensors",
      salary_growth: "+18% for Automation-skilled welders",
      green_standards: "Fume Extraction Standards, Eco-friendly shielding gases"
    }
  },
  {
    name: "SKM L3 Electrical",
    legacy: {
      course_title: "SKM Level 3 Electrical Installation & Maintenance",
      last_updated: "2020",
      core_competencies: "Single & Three Phase Wiring, Conduit Bending, Basic Motor Control"
    },
    market: {
      trending_skills: "Solar PV Installation, Smart Grid Integration, Energy Auditing Software",
      salary_growth: "+30% for Green Tech Electricians",
      green_standards: "Net Energy Metering (NEM) 3.0, Green Building Index (GBI)"
    }
  }
];

type InputType = 'manual' | 'pdf' | 'url';

export default function CurriculumForm({ onAnalyze, loading }: CurriculumFormProps) {
  const [inputType, setInputType] = useState<InputType>('manual');

  // Manual State
  const [courseTitle, setCourseTitle] = useState(PRESETS[0].legacy.course_title);
  const [lastUpdated, setLastUpdated] = useState(PRESETS[0].legacy.last_updated);
  const [coreCompetencies, setCoreCompetencies] = useState(PRESETS[0].legacy.core_competencies);

  // PDF State
  const [isDragging, setIsDragging] = useState(false);
  const [pdfFile, setPdfFile] = useState<{ file: File, base64: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // URL State
  const [urlData, setUrlData] = useState('');

  // Market Signals State
  const [trendingSkills, setTrendingSkills] = useState(PRESETS[0].market.trending_skills);
  const [salaryGrowth, setSalaryGrowth] = useState(PRESETS[0].market.salary_growth);
  const [greenStandards, setGreenStandards] = useState(PRESETS[0].market.green_standards);

  const handlePreset = (preset: typeof PRESETS[0]) => {
    setInputType('manual');
    setCourseTitle(preset.legacy.course_title);
    setLastUpdated(preset.legacy.last_updated);
    setCoreCompetencies(preset.legacy.core_competencies);
    setTrendingSkills(preset.market.trending_skills);
    setSalaryGrowth(preset.market.salary_growth);
    setGreenStandards(preset.market.green_standards);
  };

  // Drag & Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      processFile(file);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = (event.target?.result as string).split(',')[1];
      setPdfFile({ file, base64: base64String });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const marketSignals = {
      trending_skills: trendingSkills.split(',').map(s => s.trim()),
      salary_growth: salaryGrowth,
      green_standards: greenStandards
    };

    const payload: VectoPayload = {
      inputType,
      marketSignals
    };

    if (inputType === 'manual') {
      payload.manualData = {
        course_title: courseTitle,
        last_updated: lastUpdated,
        core_competencies: coreCompetencies.split(',').map(s => s.trim())
      };
    } else if (inputType === 'pdf' && pdfFile) {
      payload.pdfData = {
        base64: pdfFile.base64,
        mimeType: pdfFile.file.type,
        name: pdfFile.file.name
      };
    } else if (inputType === 'url' && urlData) {
      payload.urlData = urlData;
    } else {
      alert('Please provide the required curriculum input.');
      return;
    }

    onAnalyze(payload);
  };

  const inputAnimation = {
    initial: { opacity: 0, scale: 0.98, filter: 'blur(2px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, scale: 0.98, filter: 'blur(2px)' },
    transition: { duration: 0.2 }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 custom-scrollbar">
        {PRESETS.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handlePreset(preset)}
            className="whitespace-nowrap px-3 py-1.5 rounded-full border border-neutral-200 text-xs font-semibold text-neutral-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all shadow-sm"
          >
            Load: {preset.name}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
          <h3 className="text-sm font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-2">
            <Database size={14} className="text-emerald-600" />
            Legacy Curriculum Input
          </h3>
        </div>

        {/* Input Type Tabs */}
        <div className="flex p-1 bg-neutral-100/80 backdrop-blur-sm rounded-xl border border-neutral-200/50 relative">
          {[
            { id: 'manual', icon: FileText, label: 'Paste / Manual' },
            { id: 'pdf', icon: UploadCloud, label: 'Upload PDF' },
            { id: 'url', icon: LinkIcon, label: 'Website URL' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setInputType(tab.id as InputType)}
              className={cn(
                "relative flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all z-10",
                inputType === tab.id ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-200/50"
              )}
            >
              {inputType === tab.id && (
                <motion.div
                  layoutId="inputTypeIndicator"
                  className="absolute inset-0 bg-white rounded-lg shadow-sm border border-neutral-200/50"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <tab.icon size={14} className={inputType === tab.id ? "text-emerald-600" : ""} /> {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Dynamic Inputs Container */}
        <div className="min-h-[220px]">
          <AnimatePresence mode="wait">
            {/* Manual Input */}
            {inputType === 'manual' && (
              <motion.div key="manual" {...inputAnimation} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 ml-1">Course Title</label>
                    <input
                      type="text"
                      value={courseTitle}
                      onChange={e => setCourseTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-neutral-200 shadow-sm rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-neutral-800"
                      required={inputType === 'manual'}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 ml-1">Last Updated</label>
                    <input
                      type="text"
                      value={lastUpdated}
                      onChange={e => setLastUpdated(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-neutral-200 shadow-sm rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-neutral-800"
                      required={inputType === 'manual'}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700 ml-1 flex items-center justify-between">
                    <span>Core Competencies</span>
                    <span className="text-neutral-400 font-normal flex items-center gap-1"><Info size={12} /> Comma separated</span>
                  </label>
                  <textarea
                    value={coreCompetencies}
                    onChange={e => setCoreCompetencies(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 shadow-sm rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all min-h-[120px] font-medium text-neutral-800 leading-relaxed custom-scrollbar"
                    required={inputType === 'manual'}
                    placeholder="Paste the course curriculum or list competencies here..."
                  />
                </div>
              </motion.div>
            )}

            {/* PDF Upload */}
            {inputType === 'pdf' && (
              <motion.div key="pdf" {...inputAnimation} className="h-full">
                {!pdfFile ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "border-2 border-dashed rounded-2xl h-full min-h-[220px] flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all duration-300 relative overflow-hidden",
                      isDragging
                        ? "border-emerald-500 bg-emerald-50/80 shadow-[inset_0_0_20px_rgba(16,185,129,0.1)]"
                        : "border-neutral-300 bg-neutral-50 hover:bg-neutral-100 hover:border-emerald-300"
                    )}
                  >
                    {isDragging && (
                      <div className="absolute inset-0 bg-emerald-500/5 backdrop-blur-sm pointer-events-none" />
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="application/pdf"
                      className="hidden"
                    />
                    <motion.div animate={{ scale: isDragging ? 1.1 : 1, y: isDragging ? -5 : 0 }}>
                      <UploadCloud size={36} className={cn("mx-auto mb-3", isDragging ? "text-emerald-500" : "text-neutral-400")} />
                    </motion.div>
                    <p className="text-sm font-bold text-neutral-700 relative z-10">Drag & drop a PDF curriculum here</p>
                    <p className="text-xs text-neutral-500 mt-1 relative z-10">or click to browse files</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-white border border-emerald-200 rounded-2xl shadow-sm min-h-[220px]">
                    <div className="flex items-center gap-4 m-auto">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                        <FileText size={24} />
                      </div>
                      <div className="max-w-[200px]">
                        <p className="text-sm font-bold text-neutral-900 truncate" title={pdfFile.file.name}>{pdfFile.file.name}</p>
                        <p className="text-xs text-emerald-600 font-medium mt-0.5">{(pdfFile.file.size / 1024 / 1024).toFixed(2)} MB • Ready</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPdfFile(null)}
                        className="p-2 ml-4 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* URL Input */}
            {inputType === 'url' && (
              <motion.div key="url" {...inputAnimation} className="space-y-1.5 h-full flex flex-col justify-center min-h-[220px]">
                <label className="text-xs font-bold text-neutral-700 ml-1">Course Website URL</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors group-focus-within:text-emerald-500">
                    <LinkIcon size={18} className="text-neutral-400 group-focus-within:text-emerald-500 transition-colors" />
                  </div>
                  <input
                    type="url"
                    value={urlData}
                    onChange={e => setUrlData(e.target.value)}
                    placeholder="https://example-university.edu/course-syllabus"
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-neutral-200 rounded-xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-neutral-800"
                    required={inputType === 'url'}
                  />
                </div>
                <div className="flex gap-3 items-start mt-3 bg-blue-50/50 border border-blue-100 p-3 rounded-lg text-blue-800">
                  <Info size={16} className="shrink-0 mt-0.5" />
                  <p className="text-xs leading-relaxed">
                    Vecto will use Gemini's URL Context tool to read the curriculum directly from the website. Ensure the URL is public.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-neutral-100">
        <div className="flex items-center justify-between pb-1">
          <h3 className="text-sm font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-2">
            <Activity size={14} className="text-emerald-600" />
            Live Market Signals
          </h3>
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-neutral-500 bg-neutral-100 px-2 py-1 rounded-md border border-neutral-200">
            <Globe size={12} className="text-blue-500" />
            <span>JobStreet • DOSM • LinkedIn</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-neutral-700 ml-1">Trending Skills (Extracted via NLP)</label>
          <textarea
            value={trendingSkills}
            onChange={e => setTrendingSkills(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-neutral-200 shadow-sm rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all min-h-[80px] font-medium text-neutral-800 custom-scrollbar"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-700 ml-1">Salary Growth Data</label>
            <input
              type="text"
              value={salaryGrowth}
              onChange={e => setSalaryGrowth(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-neutral-200 shadow-sm rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-neutral-800"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-700 ml-1">Green Standards</label>
            <input
              type="text"
              value={greenStandards}
              onChange={e => setGreenStandards(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-neutral-200 shadow-sm rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-neutral-800"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || (inputType === 'pdf' && !pdfFile)}
        className={cn(
          "relative w-full flex items-center justify-center gap-2 font-bold py-3.5 px-4 rounded-xl transition-all duration-300 overflow-hidden shadow-lg",
          loading || (inputType === 'pdf' && !pdfFile)
            ? "bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none"
            : "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white hover:shadow-emerald-500/25 hover:-translate-y-0.5"
        )}
      >
        {loading ? (
          <>
            <motion.div
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
            <Sparkles size={18} className="animate-pulse" />
            <span className="relative z-10">Generating Patch via Gemini 2.0...</span>
          </>
        ) : (
          <>
            <div className="absolute inset-0 w-full h-full bg-white opacity-0 hover:opacity-10 transition-opacity"></div>
            <Play size={18} className="relative z-10" />
            <span className="relative z-10">Run Gap Analysis & Generate Patch</span>
          </>
        )}
      </button>
    </form>
  );
}
