import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { BarChart3, Map, TrendingUp, Users, AlertTriangle, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function AnalyticsPreview() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-5xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Metric Card 1 */}
        <motion.div variants={itemVariants} className="group relative bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 relative flex items-center justify-center border border-emerald-100/50">
              <TrendingUp size={24} className="text-emerald-600" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              +42% <ArrowUpRight size={14} />
            </span>
          </div>
          <h3 className="text-sm font-semibold text-neutral-500 mb-1 relative z-10">Top Emerging Skill</h3>
          <p className="text-2xl font-bold text-neutral-900 tracking-tight leading-none relative z-10">Solar PV <br className="hidden lg:block" />Installation</p>
        </motion.div>

        {/* Metric Card 2 */}
        <motion.div variants={itemVariants} className="group relative bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-amber-50 relative flex items-center justify-center border border-amber-100/50">
              <AlertTriangle size={24} className="text-amber-500" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
              Replaced <ArrowDownRight size={14} />
            </span>
          </div>
          <h3 className="text-sm font-semibold text-neutral-500 mb-1 relative z-10">Highest Obsolescence</h3>
          <p className="text-2xl font-bold text-neutral-900 tracking-tight leading-none relative z-10">Manual <br className="hidden lg:block" />Drafting</p>
        </motion.div>

        {/* Metric Card 3 */}
        <motion.div variants={itemVariants} className="group relative bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-blue-50 relative flex items-center justify-center border border-blue-100/50">
              <Users size={24} className="text-blue-600" />
            </div>
            <span className="flex items-center gap-1 text-[10px] font-bold text-neutral-500 uppercase tracking-wider bg-neutral-100 px-2 py-1 rounded-full">
              All SKM L3
            </span>
          </div>
          <h3 className="text-sm font-semibold text-neutral-500 mb-1 relative z-10">Industry Alignment</h3>
          <div className="flex items-baseline gap-2 relative z-10">
            <p className="text-4xl font-extrabold text-neutral-900 tracking-tighter">68%</p>
            <Activity size={18} className="text-emerald-500" />
          </div>
        </motion.div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Bar Chart Section */}
        <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-slate-50 rounded-full blur-3xl pointer-events-none transition-transform group-hover:scale-110"></div>

          <div className="flex justify-between items-center mb-8 relative z-10">
            <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
              <div className="p-1.5 bg-neutral-100 rounded-lg"><BarChart3 size={18} className="text-neutral-600" /></div>
              Skill Gap by Sector
            </h3>
            <span className="text-xs font-semibold text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200">Malaysia</span>
          </div>

          <div className="space-y-6 relative z-10">
            {[
              { name: 'Green Energy & HVAC', gap: 85, color: 'from-emerald-400 to-emerald-600', icon: '⚡' },
              { name: 'Automotive (EV)', gap: 72, color: 'from-blue-400 to-indigo-600', icon: '🔋' },
              { name: 'Advanced Mfg.', gap: 64, color: 'from-purple-400 to-purple-600', icon: '🤖' },
              { name: 'Construction (BIM)', gap: 45, color: 'from-amber-400 to-orange-500', icon: '🏗️' },
            ].map((item, i) => (
              <div key={i} className="group/bar">
                <div className="flex justify-between text-sm mb-2 items-center">
                  <span className="font-semibold text-neutral-700 flex items-center gap-2">
                    <span className="opacity-70 group-hover/bar:opacity-100 transition-opacity">{item.icon}</span>
                    {item.name}
                  </span>
                  <span className="text-xs font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">{item.gap}%</span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-3 overflow-hidden shadow-inner flex">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.gap}%` }}
                    transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
                    className={cn(`h-full rounded-full bg-gradient-to-r ${item.color} relative overflow-hidden`)}
                  >
                    {/* Shimmer effect inside bar */}
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: i * 0.2 }}
                      className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                    />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Map Section */}
        <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
              <div className="p-1.5 bg-neutral-100 rounded-lg"><Map size={18} className="text-neutral-600" /></div>
              Regional Hotspots
            </h3>
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Live</span>
            </div>
          </div>

          <div className="relative h-[240px] bg-neutral-900 rounded-2xl border border-neutral-800 flex items-center justify-center overflow-hidden shadow-inner">

            {/* Grid Pattern Background */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>

            {/* Soft Central Glow */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900 via-transparent to-transparent"></div>

            {/* Interactive Data Points */}

            {/* Penang */}
            <motion.div
              className="absolute top-[25%] left-[25%] flex flex-col items-center group cursor-crosshair z-20"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center relative">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <div className="absolute w-full h-full border border-emerald-500/50 rounded-full animate-ping"></div>
              </div>
              {/* Tooltip */}
              <div className="absolute top-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-xl border border-white/20 whitespace-nowrap">
                  <p className="text-xs font-bold text-neutral-900">Penang</p>
                  <p className="text-[10px] text-emerald-600 font-medium">Automation & Robotics Area</p>
                </div>
              </div>
            </motion.div>

            {/* Klang Valley */}
            <motion.div
              className="absolute top-[45%] left-[35%] flex flex-col items-center group cursor-crosshair z-20"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center relative">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <div className="absolute w-full h-full border border-blue-500/50 rounded-full animate-ping" style={{ animationDuration: '1.5s' }}></div>
              </div>
              <div className="absolute top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30">
                <div className="bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-xl border border-white/20 whitespace-nowrap">
                  <p className="text-xs font-bold text-neutral-900">Klang Valley</p>
                  <p className="text-[10px] text-blue-600 font-medium">EV & Green Tech Hub</p>
                </div>
              </div>
            </motion.div>

            {/* Johor */}
            <motion.div
              className="absolute bottom-[25%] right-[30%] flex flex-col items-center group cursor-crosshair z-20"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-4 h-4 bg-amber-500/20 rounded-full flex items-center justify-center relative">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
              </div>
              <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-xl border border-white/20 whitespace-nowrap">
                  <p className="text-xs font-bold text-neutral-900">Johor</p>
                  <p className="text-[10px] text-amber-600 font-medium">Logistics Tech Valley</p>
                </div>
              </div>
            </motion.div>

            {/* Connection Lines (Abstract SVG) */}
            <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.2))' }}>
              <path d="M 25% 25% Q 30% 35% 35% 45%" fill="transparent" stroke="url(#lineGradient1)" strokeWidth="1" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
              <path d="M 35% 45% Q 50% 50% 70% 75%" fill="transparent" stroke="url(#lineGradient2)" strokeWidth="1" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite_reverse]" />
              <defs>
                <linearGradient id="lineGradient1">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
                <linearGradient id="lineGradient2">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-neutral-400 font-medium border-t border-neutral-100 pt-4">
            <span>Aggregated from JobStreet & DOSM</span>
            <span className="flex items-center gap-1"><Map size={12} /> Auto-updating</span>
          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes dash {
          to { stroke-dashoffset: 1000; }
        }
      `}} />
    </motion.div>
  );
}
