import React from 'react';
import { useLearning } from '../context/LearningContext';
import {
  ArrowRight,
  BookOpen,
  Video,
  Sparkles,
  Layers,
  BrainCircuit,
  Compass,
  Dna,
  ShieldCheck,
  Zap,
  Target,
  Flame,
  CheckCircle2,
  FileText,
  Play,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab, setDemoStep } = useLearning();

  const flowSteps = [
    { title: 'UPLOAD', desc: 'PDF, Slides & Lecture Videos', icon: <Layers className="w-5 h-5 text-blue-500" /> },
    { title: 'UNDERSTAND', desc: 'Unified Source Knowledge Base', icon: <BookOpen className="w-5 h-5 text-indigo-500" /> },
    { title: 'ASSESS', desc: 'Confidence-Weighted Diagnostics', icon: <Target className="w-5 h-5 text-amber-500" /> },
    { title: 'ADAPT', desc: 'Misconception Map & Difficulty Shift', icon: <BrainCircuit className="w-5 h-5 text-rose-500" /> },
    { title: 'MASTER', desc: 'Learning DNA & Teach-Back Retention', icon: <Dna className="w-5 h-5 text-emerald-500" /> },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-8 sm:pt-16 sm:pb-12 text-center max-w-5xl mx-auto px-4">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-200/40 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-6 shadow-xs animate-bounce">
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span>Multimodal AI Hackathon 2026 • Track D: Personalized Tutoring & Adaptive Learning</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Meet Your Personal <br />
          <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-800 bg-clip-text text-transparent">
            AI Study Companion
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Turn your textbooks, lecture slides and videos into an adaptive learning experience built around you.
          Not just a chatbot — a system that understands what you understand, detects misconceptions, and personalizes your learning path.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-6 py-3.5 rounded-xl font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/20 flex items-center gap-2 transition transform active:scale-95"
          >
            <span>Start Learning</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setDemoStep(1)}
            className="px-6 py-3.5 rounded-xl font-bold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 shadow-xs flex items-center gap-2 transition"
          >
            <Play className="w-4 h-4 fill-slate-700 text-slate-700" />
            <span>View 5-Min Judge Demo</span>
          </button>
        </div>

        {/* Multimodal Pill badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600">
          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[11px] mr-1">Ingests:</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 font-medium">
            <BookOpen className="w-3.5 h-3.5 text-blue-500" /> PDF Textbooks
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 font-medium">
            <Layers className="w-3.5 h-3.5 text-amber-500" /> PPT/PPTX Slides
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 font-medium">
            <Video className="w-3.5 h-3.5 text-rose-500" /> Lecture Videos & Timestamps
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 font-medium">
            <FileText className="w-3.5 h-3.5 text-emerald-500" /> Hand-written Notes
          </span>
        </div>
      </section>

      {/* Visual Flow: UPLOAD -> UNDERSTAND -> ASSESS -> ADAPT -> MASTER */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
              ADAPTIVE PEDAGOGICAL PIPELINE
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              How LearnMate AI Transforms Passive Reading into Mastery
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {flowSteps.map((step, idx) => (
              <div
                key={step.title}
                className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col items-center text-center relative group hover:border-brand-400 hover:bg-brand-50/30 transition"
              >
                <div className="w-10 h-10 rounded-lg bg-white shadow-xs border border-slate-200 flex items-center justify-center mb-3">
                  {step.icon}
                </div>
                <span className="text-xs font-extrabold text-slate-800 tracking-wider">
                  {step.title}
                </span>
                <span className="text-[11px] text-slate-500 mt-1 leading-snug">
                  {step.desc}
                </span>

                {idx < flowSteps.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                    <ArrowRight className="w-5 h-5 text-slate-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Core Pillars */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Source-Grounded</h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Every explanation cites exact page numbers, slide cards, and video lecture timestamps. No hallucinations, no generic search results.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-mono text-slate-500">
              <span className="text-blue-600 font-bold">📘 Book p.143</span> •
              <span className="text-amber-600 font-bold">📊 Slide 27</span> •
              <span className="text-rose-600 font-bold">🎥 12:42</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 border border-purple-100">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Adaptive Assessment</h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Real-time difficulty engine adjusts to your speed, accuracy, and confidence calibration. Diagnoses the specific mental model flaw.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-purple-700">
              <span>Confidence vs Correctness Matrix</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-100">
              <Dna className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Personalized Tutoring</h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Builds your dynamic Learning DNA profile. Includes Teach-Back mode, personalized revision queues, and Professor Emphasis heatmaps.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <span>Dynamic Learning DNA Profile</span>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiator Highlights: Why We Stand Out */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-mono font-bold mb-4 border border-white/10">
              <Flame className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>JUDGE-FACING DIFFERENTIATION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Not Just A Chatbot. A Real Adaptive AI Tutor.
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Generic ChatGPT wrappers only respond when asked. LearnMate AI actively assesses your mental model, catches cognitive traps, turns the tables via Teach-Back mode, and updates your spaced revision queue.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-start gap-2.5 bg-white/5 p-3.5 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white block">Learning DNA Profile:</strong>
                  <span className="text-slate-300">Tracks Retention, Problem Solving, Reasoning, and interaction speed.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-white/5 p-3.5 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white block">Misconception Map:</strong>
                  <span className="text-slate-300">Hierarchical visual tree showing Strong vs Weak concepts and why.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-white/5 p-3.5 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white block">Confidence vs Correctness:</strong>
                  <span className="text-slate-300">Identifies overconfident misconceptions vs underconfident fragile grasp.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-white/5 p-3.5 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white block">AI Teach-Back Mode:</strong>
                  <span className="text-slate-300">You explain to the AI in speech or text, AI scores accuracy & omissions.</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('tutor')}
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-brand-500 hover:bg-brand-400 text-white shadow transition"
              >
                Experience AI Tutor
              </button>
              <button
                onClick={() => setActiveTab('misconceptions')}
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
              >
                Inspect Misconception Map
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
