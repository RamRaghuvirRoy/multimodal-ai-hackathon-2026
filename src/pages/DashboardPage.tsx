import React from 'react';
import { useLearning } from '../context/LearningContext';
import {
  Flame,
  Award,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Sparkles,
  Dna,
  Clock,
  Target,
  CheckCircle2,
  TrendingUp,
  BrainCircuit,
  Compass,
  Play,
  Calendar,
  Layers,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    learningDNA,
    concepts,
    revisionQueue,
    answerHistory,
    setActiveTab,
    openTeachBack,
    openConceptDetail,
  } = useLearning();

  // Find weak concepts from tree
  const weakConcepts = concepts
    .flatMap((c) => (c.children ? [c, ...c.children.flatMap((sub) => (sub.children ? [sub, ...sub.children] : [sub]))] : [c]))
    .filter((c) => c.status === 'weak');

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner / Welcome */}
      <section className="bg-gradient-to-r from-brand-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
                ACTIVE COURSE: CS340 DATABASE MANAGEMENT SYSTEMS
              </span>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                In Sync With Materials
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, Alex.
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Your personalized adaptive tutor analyzed your recent quiz performance. You are excelling in SQL basics, but your mental model of <strong className="text-amber-300">2NF Partial Dependencies</strong> needs immediate reinforcement before exam week.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('assessment')}
              className="px-4 py-2.5 bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition"
            >
              <Compass className="w-4 h-4" />
              <span>Resume Adaptive Quiz</span>
            </button>
            <button
              onClick={() => openTeachBack()}
              className="px-4 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Launch Teach-Back</span>
            </button>
          </div>
        </div>

        {/* Quick KPI stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="text-slate-400 block text-[11px]">Overall Mastery</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-2xl font-black text-white">{learningDNA.conceptMastery}%</span>
              <span className="text-[10px] text-emerald-400 font-bold">+5% this week</span>
            </div>
          </div>

          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="text-slate-400 block text-[11px]">Study Streak</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span className="text-2xl font-black text-white">{learningDNA.streakDays}</span>
              <span className="text-slate-400 text-xs">Days active</span>
            </div>
          </div>

          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="text-slate-400 block text-[11px]">Mastered Concepts</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Award className="w-5 h-5 text-emerald-400" />
              <span className="text-2xl font-black text-white">{learningDNA.masteredConceptsCount}</span>
              <span className="text-slate-400 text-xs">Concepts</span>
            </div>
          </div>

          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="text-slate-400 block text-[11px]">Needs Attention</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <span className="text-2xl font-black text-white">{learningDNA.weakConceptsCount}</span>
              <span className="text-slate-400 text-xs">Misconceptions</span>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Goal Progress */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-100">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-800">
              Today's Adaptive Goal: Complete 10 Diagnostic Questions
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              You answered 7 questions with 74% calibrated confidence. 3 remaining to complete daily profile calibration.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 min-w-[200px]">
          <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div className="bg-brand-600 h-full w-[70%] rounded-full"></div>
          </div>
          <span className="text-xs font-bold text-slate-700">7 / 10 (70%)</span>
        </div>
      </div>

      {/* Main Grid: Continue Learning & Weak Concepts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Continue Learning & Recommended Revision */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Learning Priority Box */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-rose-50 text-rose-600 rounded-lg border border-rose-100">
                  <AlertTriangle className="w-4 h-4" />
                </span>
                <h2 className="text-base font-bold text-slate-900">
                  Priority Remediation Target: Second Normal Form (2NF)
                </h2>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-rose-100 text-rose-800 rounded-full">
                38% Mastery
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              System detected repeated failure on composite candidate keys. You incorrectly marked partial dependencies as transitive dependencies. Remediating this now will unlock 3NF synthesis.
            </p>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">
                  Grounding Resources Ready:
                </span>
                <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                  <span className="bg-white px-2 py-0.5 rounded border border-slate-200">
                    📘 Textbook p. 152
                  </span>
                  <span className="bg-white px-2 py-0.5 rounded border border-slate-200">
                    📊 CS340 Slide 27
                  </span>
                  <span className="bg-white px-2 py-0.5 rounded border border-slate-200">
                    🎥 Video 12:42
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openTeachBack('c-2nf', 'Second Normal Form (2NF)', 'Explain how partial functional dependencies violate 2NF and why they only happen with composite keys.')}
                  className="px-3.5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm flex items-center gap-1.5 transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start Teach-Back</span>
                </button>
                <button
                  onClick={() => setActiveTab('assessment')}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition"
                >
                  Practice 2NF
                </button>
              </div>
            </div>
          </div>

          {/* Recommended Spaced Revision Queue */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Today's Spaced Revision Queue
                </h3>
                <p className="text-xs text-slate-500">
                  Algorithmically ranked by decay rate, mistake recurrence, and exam priority
                </p>
              </div>
              <button
                onClick={() => setActiveTab('revision')}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {revisionQueue.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-brand-300 bg-slate-50/50 hover:bg-white flex items-center justify-between gap-3 transition"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        item.urgency === 'high'
                          ? 'bg-rose-500'
                          : item.urgency === 'medium'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                    ></span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">
                        {item.conceptName}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {item.recommendedAction}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.urgency === 'high'
                          ? 'bg-rose-100 text-rose-700'
                          : item.urgency === 'medium'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {item.urgencyLabel}
                    </span>
                    <button
                      onClick={() => setActiveTab('assessment')}
                      className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-brand-50 hover:text-brand-700 rounded-lg transition"
                    >
                      Practice
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Learning DNA Snapshot & Misconceptions */}
        <div className="space-y-6">
          {/* Learning DNA Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Dna className="w-5 h-5 text-brand-600" />
                <h3 className="font-bold text-sm text-slate-900">Your Learning DNA</h3>
              </div>
              <button
                onClick={() => setActiveTab('dna')}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700"
              >
                Deep Analytics →
              </button>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                  <span>Concept Mastery</span>
                  <span className="font-bold text-slate-800">{learningDNA.conceptMastery}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-600 h-full rounded-full transition-all"
                    style={{ width: `${learningDNA.conceptMastery}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                  <span>Retention Stability</span>
                  <span className="font-bold text-slate-800">{learningDNA.retention}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all"
                    style={{ width: `${learningDNA.retention}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                  <span>Problem Solving</span>
                  <span className="font-bold text-slate-800">{learningDNA.problemSolving}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all"
                    style={{ width: `${learningDNA.problemSolving}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                  <span>Conceptual Reasoning</span>
                  <span className="font-bold text-slate-800">{learningDNA.conceptualReasoning}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-600 h-full rounded-full transition-all"
                    style={{ width: `${learningDNA.conceptualReasoning}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-brand-50/60 rounded-xl border border-brand-200/80 text-xs">
              <span className="font-bold text-brand-900 block mb-0.5">
                Adaptive Learning Style:
              </span>
              <span className="font-medium text-brand-700 italic">
                "{learningDNA.learningStyle}"
              </span>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                Telemetry shows you grasp concepts fastest when sample relational tuples precede mathematical formulas.
              </p>
            </div>
          </div>

          {/* Quick Misconception Map Callout */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-sm text-slate-900">Active Misconceptions</h3>
              </div>
              <button
                onClick={() => setActiveTab('misconceptions')}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700"
              >
                Inspect Map →
              </button>
            </div>

            <p className="text-xs text-slate-500">
              The AI identified 2 recurring cognitive misunderstandings in your recent submissions:
            </p>

            <div className="space-y-2 text-xs">
              <div
                onClick={() => setActiveTab('misconceptions')}
                className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 cursor-pointer hover:bg-rose-100 transition"
              >
                <span className="font-bold block">1. 2NF Partial Key Confusion</span>
                <span className="text-[11px] text-rose-700">
                  Assumes single-attribute PK tables can violate 2NF.
                </span>
              </div>

              <div
                onClick={() => setActiveTab('misconceptions')}
                className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 cursor-pointer hover:bg-amber-100 transition"
              >
                <span className="font-bold block">2. LEFT JOIN Null Filtering Trap</span>
                <span className="text-[11px] text-amber-700">
                  Accidentally eliminates outer rows in WHERE clause.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
