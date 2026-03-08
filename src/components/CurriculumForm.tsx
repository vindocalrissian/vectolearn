import React, { useState, useRef } from 'react';
import { Play, Sparkles, Activity, Database, Globe, UploadCloud, Link as LinkIcon, FileText, X } from 'lucide-react';
import { VectoPayload } from '../services/gemini';

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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {PRESETS.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handlePreset(preset)}
            className="whitespace-nowrap px-3 py-1.5 rounded-full border border-neutral-200 text-xs font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
          >
            Load: {preset.name}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
          <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
            <Database size={14} className="text-neutral-500" />
            Legacy Curriculum Input
          </h3>
        </div>

        {/* Input Type Tabs */}
        <div className="flex p-1 bg-neutral-100 rounded-lg">
          <button
            type="button"
            onClick={() => setInputType('manual')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md transition-all ${inputType === 'manual' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
          >
            <FileText size={14} /> Paste / Manual
          </button>
          <button
            type="button"
            onClick={() => setInputType('pdf')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md transition-all ${inputType === 'pdf' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
          >
            <UploadCloud size={14} /> Upload PDF
          </button>
          <button
            type="button"
            onClick={() => setInputType('url')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md transition-all ${inputType === 'url' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
          >
            <LinkIcon size={14} /> Website URL
          </button>
        </div>
        
        {/* Manual Input */}
        {inputType === 'manual' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-700">Course Title</label>
                <input 
                  type="text" 
                  value={courseTitle}
                  onChange={e => setCourseTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  required={inputType === 'manual'}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-700">Last Updated</label>
                <input 
                  type="text" 
                  value={lastUpdated}
                  onChange={e => setLastUpdated(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  required={inputType === 'manual'}
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-700">Core Competencies (or Paste Full Syllabus)</label>
              <textarea 
                value={coreCompetencies}
                onChange={e => setCoreCompetencies(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all min-h-[120px]"
                required={inputType === 'manual'}
                placeholder="Paste the course curriculum or list competencies here..."
              />
            </div>
          </div>
        )}

        {/* PDF Upload */}
        {inputType === 'pdf' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {!pdfFile ? (
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-neutral-300 bg-neutral-50 hover:bg-neutral-100'}`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="application/pdf" 
                  className="hidden" 
                />
                <UploadCloud size={32} className={`mx-auto mb-3 ${isDragging ? 'text-emerald-500' : 'text-neutral-400'}`} />
                <p className="text-sm font-medium text-neutral-700">Drag & drop a PDF curriculum here</p>
                <p className="text-xs text-neutral-500 mt-1">or click to browse files</p>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900 line-clamp-1">{pdfFile.file.name}</p>
                    <p className="text-xs text-neutral-500">{(pdfFile.file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={() => setPdfFile(null)}
                  className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* URL Input */}
        {inputType === 'url' && (
          <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <label className="text-xs font-medium text-neutral-700">Course Website URL</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LinkIcon size={16} className="text-neutral-400" />
              </div>
              <input 
                type="url" 
                value={urlData}
                onChange={e => setUrlData(e.target.value)}
                placeholder="https://example-university.edu/course-syllabus"
                className="w-full pl-10 pr-3 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                required={inputType === 'url'}
              />
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              Vecto will use Gemini's URL Context tool to read the curriculum directly from the website.
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
          <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
            <Activity size={14} className="text-emerald-500" />
            Live Market Signals
          </h3>
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-neutral-400">
            <Globe size={12} />
            <span>Ingesting: JobStreet, DOSM, LinkedIn</span>
          </div>
        </div>
        
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-700">Trending Skills (Extracted via NLP)</label>
          <textarea 
            value={trendingSkills}
            onChange={e => setTrendingSkills(e.target.value)}
            className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all min-h-[80px]"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-700">Salary Growth Data</label>
            <input 
              type="text" 
              value={salaryGrowth}
              onChange={e => setSalaryGrowth(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-700">Green Standards</label>
            <input 
              type="text" 
              value={greenStandards}
              onChange={e => setGreenStandards(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || (inputType === 'pdf' && !pdfFile)}
        className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-4"
      >
        {loading ? (
          <>
            <Sparkles size={18} className="animate-pulse" />
            Generating Patch via Gemini 2.0...
          </>
        ) : (
          <>
            <Play size={18} />
            Run Gap Analysis & Generate Patch
          </>
        )}
      </button>
    </form>
  );
}
