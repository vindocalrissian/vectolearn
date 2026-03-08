import React from 'react';
import { motion } from 'motion/react';
import { Zap, BookOpen, Smartphone, BarChart, ArrowRight, ShieldCheck, Globe } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (tab: 'patch-management' | 'student-app' | 'analytics') => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans overflow-hidden relative">
      {/* Abstract Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] left-[60%] w-[20%] h-[20%] bg-amber-500/10 rounded-full blur-[80px]"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <Zap size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight">Vecto</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400">
          <span className="flex items-center gap-1.5"><Globe size={16} /> Malaysia TVET</span>
          <span className="flex items-center gap-1.5"><ShieldCheck size={16} /> Powered by Gemini 2.0</span>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live-Curriculum Engine
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Bridge the gap between <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">industry speed</span> and educational lag.
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-400 mb-10 leading-relaxed">
              Vecto continuously updates vocational training curricula in Malaysia. We ingest real-time data from JobStreet and DOSM, using AI to generate bilingual "patches" that integrate digital and green skills.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onNavigate('patch-management')}
                className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                Start Gap Analysis <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>

          {/* Right: App Modules (Bento Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Patch Management Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={() => onNavigate('patch-management')}
              className="col-span-1 sm:col-span-2 bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 cursor-pointer hover:bg-neutral-800/50 hover:border-emerald-500/30 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Patch Management</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                For Curriculum Developers. Review AI-generated bilingual patches based on live market signals. Accept, modify, and export directly to your LMS.
              </p>
              <div className="flex items-center text-emerald-400 text-sm font-bold gap-1 group-hover:gap-2 transition-all">
                Open Dashboard <ArrowRight size={16} />
              </div>
            </motion.div>

            {/* Student App Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onClick={() => onNavigate('student-app')}
              className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl p-6 cursor-pointer hover:bg-neutral-800/50 hover:border-blue-500/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Smartphone size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Student App</h3>
              <p className="text-neutral-400 text-xs leading-relaxed mb-4">
                Personalized micro-courses and "New-Collar" success stories to combat social stigma.
              </p>
              <div className="flex items-center text-blue-400 text-xs font-bold gap-1 group-hover:gap-2 transition-all">
                View Preview <ArrowRight size={14} />
              </div>
            </motion.div>

            {/* Analytics Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onClick={() => onNavigate('analytics')}
              className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl p-6 cursor-pointer hover:bg-neutral-800/50 hover:border-amber-500/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Industry Pulse</h3>
              <p className="text-neutral-400 text-xs leading-relaxed mb-4">
                For Policymakers. Visualize skill gaps by region, sector, and trade across Malaysia.
              </p>
              <div className="flex items-center text-amber-400 text-xs font-bold gap-1 group-hover:gap-2 transition-all">
                View Analytics <ArrowRight size={14} />
              </div>
            </motion.div>

          </div>
        </div>
      </main>
    </div>
  );
}
