import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, BookOpen, Briefcase, Leaf, Zap, ShieldCheck, Smartphone, BarChart, CheckCircle, Download, Home } from 'lucide-react';
import CurriculumForm from './CurriculumForm';
import ReportView from './ReportView';
import StudentAppPreview from './StudentAppPreview';
import AnalyticsPreview from './AnalyticsPreview';
import LandingPage from './LandingPage';
import { generateVectoReport, VectoPayload } from '../services/gemini';

type Tab = 'landing' | 'patch-management' | 'student-app' | 'analytics';

export default function VectoDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('landing');
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (payload: VectoPayload) => {
    setLoading(true);
    try {
      const result = await generateVectoReport(payload);
      setReport(result);
    } catch (error) {
      console.error(error);
      setReport("Error generating report. Please check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (activeTab === 'landing') {
    return <LandingPage onNavigate={setActiveTab} />;
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setActiveTab('landing')}
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Zap size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-neutral-900">Vecto</h1>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider hidden sm:inline-block">
              Live-Curriculum Engine
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            <button 
              onClick={() => setActiveTab('landing')}
              className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
              title="Home"
            >
              <Home size={18} />
            </button>
            <div className="w-px h-4 bg-neutral-200 mx-1"></div>
            <button 
              onClick={() => setActiveTab('patch-management')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'patch-management' ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              <div className="flex items-center gap-2"><BookOpen size={16} /> Patch Management</div>
            </button>
            <button 
              onClick={() => setActiveTab('student-app')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'student-app' ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              <div className="flex items-center gap-2"><Smartphone size={16} /> Student App</div>
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'analytics' ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              <div className="flex items-center gap-2"><BarChart size={16} /> Analytics</div>
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'patch-management' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
                <div className="p-6 border-b border-neutral-100 bg-neutral-50/50">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <BookOpen size={20} className="text-emerald-600" />
                    Curriculum Input
                  </h2>
                  <p className="text-sm text-neutral-500 mt-1">
                    Review legacy modules against live Malaysian market signals to generate patches.
                  </p>
                </div>
                <div className="p-6">
                  <CurriculumForm onAnalyze={handleAnalyze} loading={loading} />
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 min-h-[600px] flex flex-col">
                <div className="p-6 border-b border-neutral-100 bg-neutral-50/50 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <ShieldCheck size={20} className="text-emerald-600" />
                      AI Patch Review Workflow
                    </h2>
                    <p className="text-sm text-neutral-500 mt-1">
                      Generated via Gemini 2.0 Flash. Review, modify, or accept.
                    </p>
                  </div>
                </div>
                <div className="p-6 flex-1 overflow-auto bg-neutral-50/30">
                  {loading ? (
                    <div className="h-full flex flex-col items-center justify-center text-neutral-400 space-y-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      >
                        <Zap size={32} className="text-emerald-500" />
                      </motion.div>
                      <p className="font-medium animate-pulse">Analyzing skill delta and generating bilingual patch...</p>
                    </div>
                  ) : report ? (
                    <div className="space-y-6">
                      <ReportView markdown={report} />
                      
                      {/* Review Workflow Actions */}
                      <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm flex items-center justify-between">
                        <div className="text-sm text-neutral-500">
                          Patch ID: <span className="font-mono text-neutral-900">PTCH-2026-08A</span>
                        </div>
                        <div className="flex gap-3">
                          <button className="px-4 py-2 rounded-lg text-sm font-medium text-neutral-600 border border-neutral-200 hover:bg-neutral-50 flex items-center gap-2">
                            <Download size={16} /> Export to Moodle
                          </button>
                          <button className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2">
                            <CheckCircle size={16} /> Accept & Publish Patch
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-neutral-400 text-center max-w-sm mx-auto">
                      <Activity size={48} className="mb-4 opacity-20" />
                      <p>Run the gap analysis to generate a live curriculum patch, including obsolescence scores and bilingual integration notes.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'student-app' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-8 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Student Experience</h2>
              <p className="text-neutral-500">
                The mobile app delivers personalized micro-courses based on the generated patches and uses AI-driven success stories to combat social stigma.
              </p>
            </div>
            <StudentAppPreview />
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Industry Pulse Analytics</h2>
              <p className="text-neutral-500">
                Real-time visualization of skill gaps and emerging trends across Malaysia, powered by data ingestion from JobStreet, DOSM, and LinkedIn.
              </p>
            </div>
            <AnalyticsPreview />
          </motion.div>
        )}
      </main>
    </div>
  );
}

