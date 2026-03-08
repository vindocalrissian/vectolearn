import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, BookOpen, Briefcase, Leaf, Zap, ShieldCheck, Smartphone, BarChart, CheckCircle, Download, Home, X } from 'lucide-react';
import CurriculumForm from './CurriculumForm';
import ReportView from './ReportView';
import StudentAppPreview from './StudentAppPreview';
import AnalyticsPreview from './AnalyticsPreview';
import LandingPage from './LandingPage';
import { generateVectoReport, VectoPayload } from '../services/gemini';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Tab = 'landing' | 'patch-management' | 'student-app' | 'analytics';

// Simple Toast Component
const Toast = ({ message, type = 'success', onClose }: { message: string, type?: 'success' | 'error' | 'info', onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-md",
        type === 'success' && "bg-emerald-500/90 border-emerald-400 text-white shadow-emerald-500/20",
        type === 'error' && "bg-red-500/90 border-red-400 text-white shadow-red-500/20",
        type === 'info' && "bg-blue-500/90 border-blue-400 text-white shadow-blue-500/20"
      )}
    >
      {type === 'success' && <CheckCircle size={18} />}
      {type === 'error' && <Activity size={18} />}
      {type === 'info' && <Zap size={18} />}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 p-1 hover:bg-white/20 rounded-md transition-colors">
        <X size={14} />
      </button>
    </motion.div>
  );
};

export default function VectoDashboard() {
  // Use localStorage for state persistence during development so tabs keep their state
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    const saved = localStorage.getItem('vecto_activeTab');
    return (saved as Tab) || 'landing';
  });

  const [report, setReport] = useState<string | null>(() => {
    return localStorage.getItem('vecto_report');
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem('vecto_activeTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (report) {
      localStorage.setItem('vecto_report', report);
    } else {
      localStorage.removeItem('vecto_report');
    }
  }, [report]);

  const handleAnalyze = async (payload: VectoPayload) => {
    setLoading(true);
    setToast(null);
    try {
      const result = await generateVectoReport(payload);
      setReport(result);
      setToast({ message: "Gap Analysis Complete", type: 'success' });
    } catch (error) {
      console.error(error);
      setReport("Error generating report. Please check your API key and try again.");
      setToast({ message: "Analysis Failed", type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (!report) return;
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vecto-curriculum-patch-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setToast({ message: "Exported to Markdown", type: 'success' });
  };

  const handleCopy = async () => {
    if (!report) return;
    try {
      await navigator.clipboard.writeText(report);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      setToast({ message: "Failed to copy to clipboard", type: 'error' });
    }
  };

  const handlePublish = () => {
    setToast({ message: "Patch officially published to Student App", type: 'info' });
  };

  if (activeTab === 'landing') {
    return <LandingPage onNavigate={setActiveTab} />;
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans flex flex-col">
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <header className="bg-white/80 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-20 shadow-sm shadow-neutral-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setActiveTab('landing')}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-inner shadow-white/20">
              <Zap size={20} className="drop-shadow-sm" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-neutral-900">Vecto</h1>
            <span className="ml-2 px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider hidden sm:inline-block shadow-sm">
              Live-Curriculum Engine
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-1.5 p-1 bg-neutral-100/80 rounded-xl border border-neutral-200/80 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('landing')}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-neutral-500 hover:text-neutral-900 hover:bg-white/50 transition-colors"
              title="Home"
            >
              <Home size={16} />
            </button>
            <div className="w-px h-4 bg-neutral-300 mx-1"></div>

            {[
              { id: 'patch-management', icon: BookOpen, label: 'Patch Management' },
              { id: 'student-app', icon: Smartphone, label: 'Student App' },
              { id: 'analytics', icon: BarChart, label: 'Analytics' }
            ].map((tabInfo) => {
              const isActive = activeTab === tabInfo.id;
              const Icon = tabInfo.icon;
              return (
                <button
                  key={tabInfo.id}
                  onClick={() => setActiveTab(tabInfo.id as Tab)}
                  className={cn(
                    "relative px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2",
                    isActive ? "text-emerald-700 shadow-sm" : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-200/50"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-white rounded-lg border border-neutral-200/50"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon size={16} className={isActive ? "text-emerald-600" : ""} /> {tabInfo.label}
                  </span>
                </button>
              )
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
        <AnimatePresence mode="wait">
          {activeTab === 'patch-management' && (
            <motion.div
              key="patch-management"
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1"
            >
              <div className="lg:col-span-5 h-full">
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-neutral-200/80 overflow-hidden h-full flex flex-col">
                  <div className="p-6 border-b border-neutral-100 bg-gradient-to-b from-neutral-50/80 to-white">
                    <h2 className="text-lg font-bold flex items-center gap-2 text-neutral-800">
                      <BookOpen size={20} className="text-emerald-600 drop-shadow-sm" />
                      Curriculum Input
                    </h2>
                    <p className="text-sm text-neutral-500 mt-1 leading-relaxed">
                      Review legacy modules against live Malaysian market signals to generate skill patches.
                    </p>
                  </div>
                  <div className="p-6 flex-1 overflow-y-auto">
                    <CurriculumForm onAnalyze={handleAnalyze} loading={loading} />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 h-[calc(100vh-8rem)] lg:h-auto overflow-hidden">
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-neutral-200/80 h-full flex flex-col relative overflow-hidden">

                  {/* Subtle Background Glow for AI panel */}
                  <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-gradient-to-b from-emerald-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

                  <div className="p-6 border-b border-neutral-100 bg-gradient-to-b from-neutral-50/80 to-white flex items-center justify-between relative z-10">
                    <div>
                      <h2 className="text-lg font-bold flex items-center gap-2 text-neutral-800">
                        <ShieldCheck size={20} className="text-emerald-600 drop-shadow-sm" />
                        AI Patch Review Workflow
                      </h2>
                      <p className="text-sm text-neutral-500 mt-1">
                        Generated via Gemini 2.0 Flash. Review, modify, or accept.
                      </p>
                    </div>
                  </div>
                  <div className="p-6 flex-1 overflow-auto bg-neutral-50/30 relative z-10 custom-scrollbar">
                    <AnimatePresence mode="wait">
                      {loading ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="h-full flex flex-col items-center justify-center text-neutral-400 space-y-6"
                        >
                          <div className="relative">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                              className="w-16 h-16 rounded-full border-2 border-emerald-500/30 border-t-emerald-500"
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-emerald-500">
                              <Zap size={20} className="animate-pulse" />
                            </div>
                          </div>
                          <p className="font-medium text-neutral-500 animate-pulse bg-neutral-100 px-4 py-2 rounded-full text-sm">Analyzing skill delta & generating bilingual patch...</p>
                        </motion.div>
                      ) : report ? (
                        <motion.div
                          key="report"
                          initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="space-y-6 max-w-3xl mx-auto h-full pb-20"
                        >
                          <ReportView
                            report={report}
                            onExport={handleExport}
                            onCopy={handleCopy}
                            copySuccess={copySuccess}
                          />

                          {/* Review Workflow Actions */}
                          <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl border border-emerald-100 shadow-sm shadow-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-4 z-20">
                            <div className="text-sm text-neutral-500 flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                              Patch ID: <span className="font-mono font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded">PTCH-2026-08A</span>
                            </div>
                            <div className="flex w-full sm:w-auto gap-3">
                              <button
                                onClick={handlePublish}
                                className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
                              >
                                <CheckCircle size={16} /> Publish to Student App
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="empty"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          className="h-full flex flex-col items-center justify-center text-neutral-400 text-center max-w-sm mx-auto"
                        >
                          <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                            <Activity size={32} className="opacity-40 text-neutral-500" />
                          </div>
                          <h3 className="text-lg font-semibold text-neutral-700 mb-2">Awaiting Analysis</h3>
                          <p className="text-sm leading-relaxed">Run the gap analysis to generate a live curriculum patch, including obsolescence scores and bilingual integration notes.</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'student-app' && (
            <motion.div
              key="student-app"
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8 text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-600 mb-3">Student Experience</h2>
                <p className="text-neutral-500 text-lg">
                  The mobile app delivers personalized micro-courses based on the generated patches and uses AI-driven success stories to combat social stigma.
                </p>
              </div>
              <StudentAppPreview />
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8 max-w-3xl">
                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-600 mb-3">Industry Pulse Analytics</h2>
                <p className="text-neutral-500 text-lg leading-relaxed">
                  Real-time visualization of skill gaps and emerging trends across Malaysia, powered by data ingestion from <span className="font-semibold text-neutral-700">JobStreet</span>, <span className="font-semibold text-neutral-700">DOSM</span>, and <span className="font-semibold text-neutral-700">LinkedIn</span>.
                </p>
              </div>
              <AnalyticsPreview />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global minimal styles for custom scrollbar defined in index.css typically, but we can do inline block logic if needed */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(163, 163, 163, 0.3);
          border-radius: 20px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: rgba(163, 163, 163, 0.5);
        }
      `}} />
    </div>
  );
}

