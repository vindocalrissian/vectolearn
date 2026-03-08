import React from 'react';
import { motion, useScroll, useTransform, Variants } from 'motion/react';
import { Zap, BookOpen, Smartphone, BarChart, ArrowRight, ShieldCheck, Globe } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (tab: 'patch-management' | 'student-app' | 'analytics') => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans overflow-hidden relative selection:bg-emerald-500/30">
      {/* Abstract Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: y1 }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-600/30 rounded-full blur-[120px] mix-blend-screen"
        />
        <motion.div
          style={{ y: y2 }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -10, 5, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen"
        />
        <div className="absolute top-[40%] left-[60%] w-[20%] h-[20%] bg-amber-500/10 rounded-full blur-[80px]"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNykiLz48L3N2Zz4=')] opacity-50 relative z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-500/50">
            <Zap size={22} className="drop-shadow-md" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight">Vecto</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400"
        >
          <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default"><Globe size={16} /> Malaysia TVET</span>
          <span className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors cursor-default"><ShieldCheck size={16} /> Powered by Gemini 2.0</span>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 lg:pt-24 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-2xl"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Live-Curriculum Engine
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Bridge the gap between <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500">industry speed</span> and educational lag.
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-neutral-400 mb-10 leading-relaxed font-light">
              Vecto continuously updates vocational training curricula in Malaysia. We ingest real-time data from JobStreet and DOSM, using AI to generate bilingual "patches" that integrate digital and green skills.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('patch-management')}
                className="group relative px-8 py-4 rounded-full bg-emerald-500 text-neutral-950 font-bold text-lg transition-all flex items-center justify-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <span className="relative z-10">Start Gap Analysis</span>
                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right: App Modules (Bento Grid) */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative"
          >
            {/* Glow behind grid */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-blue-500/10 rounded-3xl blur-2xl -z-10"></div>

            {/* Patch Management Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              onClick={() => onNavigate('patch-management')}
              className="col-span-1 sm:col-span-2 relative bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 cursor-pointer hover:bg-neutral-800/80 hover:border-emerald-500/40 transition-colors group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-emerald-500/20 transition-colors"></div>

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <BookOpen size={28} />
              </div>
              <h3 className="text-3xl font-bold mb-3 text-white group-hover:text-emerald-300 transition-colors">Patch Management</h3>
              <p className="text-neutral-400 text-base leading-relaxed mb-8 max-w-md">
                For Curriculum Developers. Review AI-generated bilingual patches based on live market signals. Accept, modify, and export directly to your LMS.
              </p>
              <div className="flex items-center text-emerald-400 font-bold gap-2 group-hover:gap-3 transition-all">
                Open Dashboard <ArrowRight size={18} className="text-emerald-500" />
              </div>
            </motion.div>

            {/* Student App Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              onClick={() => onNavigate('student-app')}
              className="bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 cursor-pointer hover:bg-neutral-800/80 hover:border-blue-500/40 transition-colors group relative overflow-hidden"
            >
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl translate-y-1/2 translate-x-1/3 group-hover:bg-blue-500/20 transition-colors"></div>

              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400/20 to-blue-600/20 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 -group-hover:rotate-3 transition-transform duration-300">
                <Smartphone size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors">Student App</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Personalized micro-courses and "New-Collar" success stories to combat social stigma.
              </p>
              <div className="flex items-center text-blue-400 text-sm font-bold gap-1 group-hover:gap-2 transition-all mt-auto">
                View Preview <ArrowRight size={16} />
              </div>
            </motion.div>

            {/* Analytics Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              onClick={() => onNavigate('analytics')}
              className="bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 cursor-pointer hover:bg-neutral-800/80 hover:border-amber-500/40 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -translate-y-1/3 translate-x-1/3 group-hover:bg-amber-500/20 transition-colors"></div>

              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/20 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <BarChart size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-amber-300 transition-colors">Industry Pulse</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                For Policymakers. Visualize skill gaps by region, sector, and trade across Malaysia.
              </p>
              <div className="flex items-center text-amber-400 text-sm font-bold gap-1 group-hover:gap-2 transition-all mt-auto">
                View Analytics <ArrowRight size={16} />
              </div>
            </motion.div>

          </motion.div>
        </div>
      </main>

      {/* Shimmer animation for button */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}} />
    </div>
  );
}
