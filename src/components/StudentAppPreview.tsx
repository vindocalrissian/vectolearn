import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { PlayCircle, Trophy, Star, ChevronRight, Bookmark, Filter, Search, Award, CheckCircle2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function StudentAppPreview() {
  const [activeTab, setActiveTab] = useState('courses');
  const [enrolled, setEnrolled] = useState<number[]>([]);
  const [showToast, setShowToast] = useState(false);

  const handleEnroll = (id: number) => {
    if (!enrolled.includes(id)) {
      setEnrolled([...enrolled, id]);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const courses = [
    {
      id: 1,
      title: "EV Battery Diagnostics Matrix",
      category: "Automotive • PTCH-2026-08A",
      duration: "45 mins",
      rating: 4.8,
      students: "1.2k",
      progress: 0,
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=400",
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 2,
      title: "Solar PV Installation Basics",
      category: "Electrical • PTCH-2025-11C",
      duration: "1h 20m",
      rating: 4.9,
      students: "850",
      progress: 65,
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=400",
      color: "from-amber-500 to-orange-600"
    },
    {
      id: 3,
      title: "Robotic Welding Programming",
      category: "Manufacturing",
      duration: "2h 15m",
      rating: 4.7,
      students: "3.4k",
      progress: 100,
      image: "https://images.unsplash.com/photo-1504917595217-d4bb569a1a96?auto=format&fit=crop&q=80&w=400",
      color: "from-emerald-500 to-teal-600"
    }
  ];

  return (
    <div className="flex justify-center items-center py-10 w-full perspective-1000">

      {/* Phone Mockup Container */}
      <motion.div
        initial={{ rotateX: 10, y: 20, opacity: 0 }}
        animate={{ rotateX: 0, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative w-[380px] h-[800px] bg-neutral-950 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_0_12px_#171717,0_0_0_14px_rgba(255,255,255,0.1)] overflow-hidden border-[8px] border-neutral-900 group"
      >
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50">
          <div className="w-32 h-6 bg-neutral-900 rounded-b-3xl"></div>
        </div>

        {/* Dynamic Toast Notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 40, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="absolute top-0 inset-x-4 z-40 bg-emerald-500/90 backdrop-blur-md text-white px-4 py-3 rounded-2xl flex items-center gap-3 shadow-lg shadow-emerald-500/20 border border-emerald-400"
            >
              <CheckCircle2 size={18} />
              <div className="flex flex-col">
                <span className="text-sm font-bold">Successfully Enrolled!</span>
                <span className="text-xs opacity-90">Course added to your learning path.</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* App Content */}
        <div className="h-full w-full bg-[#f8fafc] flex flex-col relative overflow-hidden text-neutral-900">

          {/* Header */}
          <div className="pt-14 pb-4 px-6 bg-white shrink-0 sticky top-0 z-30 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-blue-500 p-0.5">
                    <img src="https://ui-avatars.com/api/?name=Ahmad&background=fff&color=10b981" alt="Profile" className="w-full h-full rounded-full border-2 border-white object-cover" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-bold text-base leading-tight">Hi, Ahmad</h3>
                  <p className="text-neutral-500 text-xs">SKM L3 Auto Mechanic</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center relative cursor-pointer hover:bg-neutral-200 transition-colors">
                <Search size={18} className="text-neutral-600" />
              </div>
            </div>

            {/* Custom Interactive Tabs */}
            <div className="flex p-1 bg-neutral-100 rounded-xl relative">
              {['courses', 'success_stories'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "flex-1 py-1.5 text-[13px] font-semibold rounded-lg z-10 transition-colors uppercase tracking-wider relative",
                    activeTab === tab ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-700"
                  )}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="phoneTab"
                      className="absolute inset-0 bg-white shadow-sm rounded-lg"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.replace('_', ' ')}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto pb-24 px-6 pt-4 custom-scrollbar">
            <AnimatePresence mode="wait">
              {activeTab === 'courses' ? (
                <motion.div
                  key="courses"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <motion.div variants={itemVariants} className="flex justify-between items-end mb-2">
                    <h4 className="font-bold text-lg">Recommended Patches</h4>
                    <button className="text-emerald-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:text-emerald-700">See All <ChevronRight size={14} /></button>
                  </motion.div>

                  {courses.map((course) => (
                    <motion.div
                      key={course.id}
                      variants={itemVariants}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white rounded-3xl p-3 shadow-sm border border-neutral-100/50 hover:shadow-md transition-shadow group cursor-pointer"
                    >
                      <div className="relative h-40 rounded-2xl overflow-hidden mb-3">
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-wider uppercase">
                          {course.category}
                        </div>
                        {course.progress === 100 && (
                          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                            <CheckCircle2 size={16} />
                          </div>
                        )}
                        <button className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                          <PlayCircle size={20} fill="currentColor" className="text-white" />
                        </button>
                      </div>

                      <div className="px-2 pb-2">
                        <h5 className="font-bold text-base mb-1 truncate group-hover:text-emerald-600 transition-colors">{course.title}</h5>
                        <div className="flex items-center gap-3 text-xs text-neutral-500 font-medium mb-4">
                          <span className="flex items-center gap-1 text-amber-500"><Star size={12} fill="currentColor" /> {course.rating}</span>
                          <span>•</span>
                          <span>{course.duration}</span>
                          <span>•</span>
                          <span>{course.students} enrolled</span>
                        </div>

                        {enrolled.includes(course.id) || course.progress > 0 ? (
                          <div className="space-y-1.5">
                            <div className="flex justify-between text-[10px] font-bold text-neutral-500 uppercase">
                              <span>Progress</span>
                              <span className={course.progress === 100 ? "text-emerald-600" : ""}>{course.progress}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${course.progress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className={cn("h-full rounded-full", course.progress === 100 ? "bg-emerald-500" : `bg-gradient-to-r ${course.color}`)}
                              />
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => { e.stopPropagation(); handleEnroll(course.id); }}
                            className="w-full py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-600 transition-colors"
                          >
                            Enroll Now
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="success_stories"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <motion.div variants={itemVariants} className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-6 text-white shadow-lg overflow-hidden relative">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl"></div>
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-white p-0.5 shadow-md">
                        <img src="https://ui-avatars.com/api/?name=Sarah&background=10b981&color=fff" alt="Sarah" className="w-full h-full rounded-full object-cover" />
                      </div>
                      <div className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border border-white/10">
                        <Trophy size={10} className="text-amber-300" /> Featured
                      </div>
                    </div>
                    <div className="relative z-10">
                      <h4 className="font-bold text-xl mb-2">Sarah's Journey</h4>
                      <p className="text-sm text-indigo-100 mb-4 leading-relaxed font-light">From traditional welding to programming robotic arms at Tesla Gigafactory. Read how SKM integration changed her career trajectory.</p>
                      <button className="text-xs font-bold uppercase tracking-wider text-white border border-white/30 px-4 py-2 rounded-xl hover:bg-white/10 transition-colors w-full">Read Story</button>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="bg-gradient-to-br from-emerald-900 to-teal-900 rounded-3xl p-6 text-white shadow-lg overflow-hidden relative">
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-500/30 rounded-full blur-3xl"></div>
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-white p-0.5 shadow-md">
                        <img src="https://ui-avatars.com/api/?name=David&background=3b82f6&color=fff" alt="David" className="w-full h-full rounded-full object-cover" />
                      </div>
                    </div>
                    <div className="relative z-10">
                      <h4 className="font-bold text-xl mb-2">Pioneering Solar</h4>
                      <p className="text-sm text-emerald-100 mb-4 leading-relaxed font-light">How David utilized the "Solar PV" patch to start his own green tech installation company in Penang.</p>
                      <button className="text-xs font-bold uppercase tracking-wider text-white border border-white/30 px-4 py-2 rounded-xl hover:bg-white/10 transition-colors w-full">Read Story</button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Navigation Bar */}
          <div className="absolute bottom-0 inset-x-0 h-20 bg-white border-t border-neutral-100 flex justify-around items-center px-6 pb-4">
            <div className="flex flex-col items-center gap-1 text-emerald-600 cursor-pointer">
              <div className="w-10 h-8 bg-emerald-50 rounded-xl flex items-center justify-center pointer-events-none">
                <PlayCircle size={20} className="fill-emerald-100" />
              </div>
              <span className="text-[10px] font-bold">Learn</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer group">
              <div className="w-10 h-8 flex items-center justify-center pointer-events-none group-hover:bg-neutral-50 rounded-xl transition-colors">
                <Award size={20} />
              </div>
              <span className="text-[10px] font-bold">Skills</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer group">
              <div className="w-10 h-8 flex items-center justify-center pointer-events-none group-hover:bg-neutral-50 rounded-xl transition-colors">
                <Bookmark size={20} />
              </div>
              <span className="text-[10px] font-bold">Saved</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
