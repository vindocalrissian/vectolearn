import React from 'react';
import { motion } from 'motion/react';
import { BarChart3, Map, TrendingUp, Users, AlertTriangle } from 'lucide-react';

export default function AnalyticsPreview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
          <div className="flex items-center gap-3 text-neutral-500 mb-2">
            <TrendingUp size={18} className="text-emerald-600" />
            <h3 className="text-sm font-medium">Top Emerging Skill</h3>
          </div>
          <p className="text-2xl font-bold text-neutral-900">Solar PV Installation</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">+42% demand (YoY)</p>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
          <div className="flex items-center gap-3 text-neutral-500 mb-2">
            <AlertTriangle size={18} className="text-amber-500" />
            <h3 className="text-sm font-medium">Highest Obsolescence</h3>
          </div>
          <p className="text-2xl font-bold text-neutral-900">Manual Drafting</p>
          <p className="text-xs text-amber-600 font-medium mt-1">Replaced by BIM/CAD</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
          <div className="flex items-center gap-3 text-neutral-500 mb-2">
            <Users size={18} className="text-blue-600" />
            <h3 className="text-sm font-medium">Industry Alignment</h3>
          </div>
          <p className="text-2xl font-bold text-neutral-900">68%</p>
          <p className="text-xs text-neutral-500 font-medium mt-1">Across all SKM Level 3</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
          <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
            <BarChart3 size={20} className="text-neutral-400" />
            Skill Gap by Sector (Malaysia)
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Green Energy & HVAC', gap: 85, color: 'bg-emerald-500' },
              { name: 'Automotive (EV)', gap: 72, color: 'bg-blue-500' },
              { name: 'Advanced Manufacturing', gap: 64, color: 'bg-indigo-500' },
              { name: 'Construction (BIM)', gap: 45, color: 'bg-amber-500' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-neutral-700">{item.name}</span>
                  <span className="text-neutral-500">{item.gap}% Gap</span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.gap}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`h-2 rounded-full ${item.color}`}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
          <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
            <Map size={20} className="text-neutral-400" />
            Regional Demand Hotspots
          </h3>
          <div className="relative h-[200px] bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-center overflow-hidden">
            {/* Abstract Map Representation */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 to-transparent"></div>
            
            <div className="absolute top-1/4 left-1/4 flex flex-col items-center">
              <div className="w-4 h-4 bg-emerald-500 rounded-full animate-ping absolute"></div>
              <div className="w-4 h-4 bg-emerald-500 rounded-full relative z-10"></div>
              <span className="text-[10px] font-bold mt-1 bg-white px-1 rounded shadow-sm">Penang (Automation)</span>
            </div>

            <div className="absolute top-1/2 left-1/3 flex flex-col items-center">
              <div className="w-6 h-6 bg-blue-500 rounded-full animate-ping absolute"></div>
              <div className="w-6 h-6 bg-blue-500 rounded-full relative z-10"></div>
              <span className="text-[10px] font-bold mt-1 bg-white px-1 rounded shadow-sm">Klang Valley (EV/Green)</span>
            </div>

            <div className="absolute bottom-1/3 right-1/4 flex flex-col items-center">
              <div className="w-3 h-3 bg-amber-500 rounded-full relative z-10"></div>
              <span className="text-[10px] font-bold mt-1 bg-white px-1 rounded shadow-sm">Johor (Logistics Tech)</span>
            </div>
          </div>
          <p className="text-xs text-neutral-500 mt-4 text-center">
            Data aggregated from JobStreet and DOSM APIs (Last 7 days)
          </p>
        </div>
      </div>
    </div>
  );
}
