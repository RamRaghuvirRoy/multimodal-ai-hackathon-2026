import React, { useState } from 'react';
import { useLearning, NavigationPage } from '../context/LearningContext';
import {
  GraduationCap,
  LayoutDashboard,
  FolderArchive,
  Network,
  Bot,
  BrainCircuit,
  Compass,
  Dna,
  History,
  FileSpreadsheet,
  Flame,
  Award,
  Sparkles,
  ChevronDown,
  Play,
  RotateCcw,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    learningDNA,
    openTeachBack,
    demoStep,
    setDemoStep,
    resetDemoToInitial,
  } = useLearning();

  const [showDemoMenu, setShowDemoMenu] = useState(false);

  const navItems: { id: NavigationPage; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'materials', label: 'Materials', icon: <FolderArchive className="w-4 h-4" />, badge: '4' },
    { id: 'knowledge', label: 'Knowledge Base', icon: <Network className="w-4 h-4" /> },
    { id: 'tutor', label: 'AI Tutor', icon: <Bot className="w-4 h-4" />, badge: 'AI' },
    { id: 'assessment', label: 'Adaptive Quiz', icon: <Compass className="w-4 h-4" /> },
    { id: 'misconceptions', label: 'Misconception Map', icon: <BrainCircuit className="w-4 h-4" />, badge: 'Core' },
    { id: 'dna', label: 'Learning DNA', icon: <Dna className="w-4 h-4" /> },
    { id: 'revision', label: 'Revision Queue', icon: <History className="w-4 h-4" />, badge: '3' },
    { id: 'report', label: 'Report Card', icon: <FileSpreadsheet className="w-4 h-4" /> },
  ];

  const demoSteps = [
    { step: 1, tab: 'materials', title: '1. Multimodal Study Materials Ingest' },
    { step: 2, tab: 'knowledge', title: '2. Unified Knowledge Base & Professor Heatmap' },
    { step: 3, tab: 'tutor', title: '3. Grounded AI Tutor with Tri-Source Badges' },
    { step: 4, tab: 'assessment', title: '4. Adaptive Question Engine & Confidence Matrix' },
    { step: 5, tab: 'misconceptions', title: '5. Misconception Map & "Why Am I Wrong?"' },
    { step: 6, tab: 'tutor', title: '6. AI Teach-Back Evaluation Loop' },
    { step: 7, tab: 'dna', title: '7. Dynamic Learning DNA & Revision Plan' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner: Hackathon Judge Tour Quick-Bar */}
      <div className="bg-slate-900 text-white px-4 py-1.5 text-xs flex flex-wrap items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>HACKATHON 2026 TRACK D</span>
          </span>
          <span className="text-slate-300 hidden md:inline">
            Personalized Tutoring & Adaptive Learning •
          </span>
          <span className="text-brand-300 font-medium">LearnMate AI Demo Mode</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <span className="text-[11px] text-slate-400 px-2">Judge Tour:</span>
            {demoSteps.map((s) => (
              <button
                key={s.step}
                onClick={() => setDemoStep(s.step)}
                title={s.title}
                className={`w-6 h-6 rounded text-xs font-bold transition flex items-center justify-center ${
                  demoStep === s.step
                    ? 'bg-brand-500 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {s.step}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              const next = demoStep < 7 ? demoStep + 1 : 1;
              setDemoStep(next);
            }}
            className="flex items-center gap-1 bg-brand-600 hover:bg-brand-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>Next Demo Step</span>
          </button>

          <button
            onClick={resetDemoToInitial}
            title="Reset telemetry & profile"
            className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Subtitle */}
          <div
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                  LearnMate<span className="text-brand-600">.ai</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-50 text-brand-700 px-1.5 py-0.5 rounded border border-brand-200">
                  Adaptive
                </span>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-1">
                Your Study Material. Your Learning Pattern.
              </p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 border border-brand-200/80 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                        isActive
                          ? 'bg-brand-600 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Actions & Profile */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => openTeachBack()}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Teach-Back Mode</span>
            </button>

            {/* Streak & Mastery */}
            <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-2.5 py-1.5 border border-slate-200">
              <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>{learningDNA.streakDays}d</span>
              </div>
              <div className="h-3.5 w-px bg-slate-300"></div>
              <div className="text-xs font-bold text-brand-700">
                <span>{learningDNA.conceptMastery}%</span>
                <span className="text-[10px] text-slate-500 font-normal ml-1">DNA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Scrollbar */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-100 text-xs no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 font-bold border border-brand-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
