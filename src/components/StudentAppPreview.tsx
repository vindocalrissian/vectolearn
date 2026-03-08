import React from 'react';
import { motion } from 'motion/react';
import { Award, BookOpen, TrendingUp, ChevronRight, Star, Sparkles } from 'lucide-react';

export default function StudentAppPreview() {
  return (
    <div className="flex justify-center py-8">
      <div className="w-[375px] h-[812px] bg-neutral-50 rounded-[3rem] border-[8px] border-neutral-800 shadow-2xl overflow-hidden relative flex flex-col font-sans">
        {/* Mobile Status Bar */}
        <div className="h-6 w-full bg-emerald-600 flex justify-center">
          <div className="w-1/3 h-4 bg-neutral-800 rounded-b-xl"></div>
        </div>

        {/* App Header */}
        <div className="bg-emerald-600 text-white p-6 pb-8 rounded-b-3xl shadow-md">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-emerald-100 text-sm">Selamat Datang,</p>
              <h2 className="text-2xl font-bold">Amirul</h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/50">
              <span className="font-bold text-lg">A</span>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
            <p className="text-emerald-100 text-xs uppercase tracking-wider font-semibold mb-1">Current Track</p>
            <h3 className="font-bold text-lg">SKM Level 3 Automotive</h3>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-2 bg-black/20 rounded-full overflow-hidden">
                <div className="h-full bg-white w-[65%] rounded-full"></div>
              </div>
              <span className="text-xs font-medium">65%</span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* AI Recommendations */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-neutral-900 flex items-center gap-2">
                <Sparkles size={16} className="text-emerald-500" />
                Live Skill Patches
              </h3>
              <span className="text-xs text-emerald-600 font-medium">View All</span>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Zap size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold uppercase rounded-sm">High Demand</span>
                  </div>
                  <h4 className="font-bold text-neutral-900 text-sm">EV Battery Diagnostics</h4>
                  <p className="text-xs text-neutral-500 mt-1 line-clamp-2">Industry data shows a 25% salary premium for this skill in Klang Valley.</p>
                  <button className="mt-3 text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    Start Micro-Module <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Success Story (New-Collar Narrative) */}
          <section>
            <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
              <TrendingUp size={16} className="text-emerald-500" />
              Alumni Success
            </h3>
            
            <div className="bg-neutral-900 text-white rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
              
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center">
                  <Star size={20} className="text-yellow-400" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Siti Nurhaliza</h4>
                  <p className="text-xs text-neutral-400">From Manual Welder to Automation Lead</p>
                </div>
              </div>
              
              <p className="text-sm text-neutral-300 leading-relaxed relative z-10">
                "Taking the Robotic Welding patch increased my salary by RM1,500/month. The skills are exactly what manufacturing hubs in Penang are looking for."
              </p>
            </div>
          </section>

          {/* Gamification */}
          <section>
            <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
              <Award size={16} className="text-emerald-500" />
              Your Badges
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white border border-neutral-100 rounded-xl p-3 flex flex-col items-center text-center shadow-sm">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
                  <BookOpen size={18} />
                </div>
                <span className="text-[10px] font-bold text-neutral-700">Safety First</span>
              </div>
              <div className="bg-white border border-neutral-100 rounded-xl p-3 flex flex-col items-center text-center shadow-sm">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
                  <Zap size={18} />
                </div>
                <span className="text-[10px] font-bold text-neutral-700">EV Basic</span>
              </div>
              <div className="bg-neutral-100 border border-neutral-200 rounded-xl p-3 flex flex-col items-center text-center border-dashed opacity-50">
                <div className="w-10 h-10 rounded-full bg-neutral-200 text-neutral-400 flex items-center justify-center mb-2">
                  <Award size={18} />
                </div>
                <span className="text-[10px] font-bold text-neutral-500">CAN Bus</span>
              </div>
            </div>
          </section>

        </div>
        
        {/* Mobile Bottom Nav */}
        <div className="bg-white border-t border-neutral-200 p-4 flex justify-around items-center pb-6">
          <div className="flex flex-col items-center text-emerald-600">
            <BookOpen size={20} />
            <span className="text-[10px] font-medium mt-1">Learn</span>
          </div>
          <div className="flex flex-col items-center text-neutral-400">
            <TrendingUp size={20} />
            <span className="text-[10px] font-medium mt-1">Career</span>
          </div>
          <div className="flex flex-col items-center text-neutral-400">
            <Award size={20} />
            <span className="text-[10px] font-medium mt-1">Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dummy icon for Zap since it wasn't imported at top
function Zap(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
}
