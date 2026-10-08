import React from 'react';
import { useLearning } from '../context/LearningContext';
import {
  Dna,
  TrendingUp,
  BrainCircuit,
  Clock,
  Target,
  Zap,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Award,
  Sparkles,
  Compass,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const LearningDNAPage: React.FC = () => {
  const { learningDNA, answerHistory, openTeachBack, setActiveTab } = useLearning();

  // Compute quadrant counts from answer history
  const q1 = answerHistory.filter((a) => a.quadrantCategory === 'Solid Mastery');
  const q2 = answerHistory.filter((a) => a.quadrantCategory === 'Dangerous Misconception');
  const q3 = answerHistory.filter((a) => a.quadrantCategory === 'Fragile Knowledge');
  const q4 = answerHistory.filter((a) => a.quadrantCategory === 'Knowledge Gap');

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              FEATURE A & C • LEARNING DNA & CALIBRATION
            </span>
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
              Cognitive Profile Synthesis
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Student Learning DNA Profile
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            A multidimensional learning model derived from your interaction telemetry, response speed, difficulty handling, and confidence calibration.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('assessment')}
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm flex items-center gap-2 shrink-0 self-start sm:self-auto transition"
        >
          <Compass className="w-4 h-4" />
          <span>Calibrate DNA via Quiz</span>
        </button>
      </div>

      {/* Hero DNA Breakdown Card */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-brand-950 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-300 text-xs font-mono font-bold border border-white/10">
              <Dna className="w-3.5 h-3.5 text-brand-400" />
              <span>COGNITIVE SIGNATURE ID: LRN-2026-X9</span>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
                ADAPTIVE LEARNER ARCHETYPE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                "{learningDNA.learningStyle}"
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {learningDNA.learningStyleDescription}
            </p>

            <div className="flex flex-wrap gap-3 pt-2 text-xs text-slate-300 font-mono">
              <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                ⚡ Avg Response: {learningDNA.avgResponseTimeSec}s
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                🎯 Accuracy: {learningDNA.accuracyRate}%
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                📊 Calibration: {learningDNA.confidenceCalibrationScore}%
              </span>
            </div>
          </div>

          {/* 5-Dimension Visual Profile Gauges */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 lg:w-96 space-y-4 backdrop-blur-xs">
            <h3 className="font-bold text-xs uppercase tracking-wider text-brand-300 font-mono">
              5-DIMENSIONAL COGNITIVE SPECTRUM
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Concept Mastery</span>
                  <span className="font-bold text-white">{learningDNA.conceptMastery}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-brand-400 h-full rounded-full" style={{ width: `${learningDNA.conceptMastery}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Retention Stability</span>
                  <span className="font-bold text-white">{learningDNA.retention}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-400 h-full rounded-full" style={{ width: `${learningDNA.retention}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Problem Solving</span>
                  <span className="font-bold text-white">{learningDNA.problemSolving}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${learningDNA.problemSolving}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Conceptual Reasoning</span>
                  <span className="font-bold text-white">{learningDNA.conceptualReasoning}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: `${learningDNA.conceptualReasoning}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Application & Transfer</span>
                  <span className="font-bold text-white">{learningDNA.application}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-400 h-full rounded-full" style={{ width: `${learningDNA.application}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURE C: Confidence vs Correctness Quadrant Matrix (CORE DIFFERENTIATOR) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-brand-50 text-brand-600 rounded-lg">
                <Target className="w-4 h-4" />
              </span>
              <h3 className="font-bold text-base text-slate-900">
                Confidence vs Actual Performance Matrix (Feature C)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Compares your self-reported confidence against relational correctness to uncover dangerous blindspots.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-mono">Calibrated Questions:</span>
            <span className="font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
              {answerHistory.length} Total
            </span>
          </div>
        </div>

        {/* 2x2 Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Q1: High Confidence + Correct (Solid Mastery) */}
          <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-2xl p-5 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Solid Mastery (High Conf. + Correct)</span>
              </div>
              <span className="text-lg font-black text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-lg font-mono">
                {q1.length}
              </span>
            </div>
            <p className="text-xs text-emerald-950 leading-relaxed font-medium">
              You understand these concepts and accurately recognize your mastery. Ready for advanced synthesis.
            </p>
            <div className="space-y-1 text-[11px] text-emerald-900">
              <div className="font-mono bg-white/70 p-1.5 rounded border border-emerald-200">
                • SQL Basics (SELECT, WHERE, Aggregations)
              </div>
              <div className="font-mono bg-white/70 p-1.5 rounded border border-emerald-200">
                • Relational Equijoin (INNER JOIN)
              </div>
            </div>
          </div>

          {/* Q2: High Confidence + Wrong (Dangerous Misconception) */}
          <div className="bg-rose-50/80 border-2 border-rose-400 rounded-2xl p-5 space-y-3 relative overflow-hidden shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Dangerous Misconception (High Conf. + Wrong)</span>
              </div>
              <span className="text-lg font-black text-rose-700 bg-rose-200 px-2.5 py-0.5 rounded-lg font-mono animate-pulse">
                {q2.length}
              </span>
            </div>
            <p className="text-xs text-rose-950 leading-relaxed font-semibold">
              Crucial risk! You felt certain of the answer, but your mental model contains a false relational premise.
            </p>
            <div className="space-y-1 text-[11px] text-rose-950">
              <div className="font-mono bg-white/80 p-1.5 rounded border border-rose-300">
                • 2NF: Confused Partial Dependency with Transitive
              </div>
              <div className="font-mono bg-white/80 p-1.5 rounded border border-rose-300">
                • LEFT JOIN: Filtered right table in WHERE clause
              </div>
            </div>
          </div>

          {/* Q3: Low Confidence + Correct (Fragile Knowledge) */}
          <div className="bg-amber-50/70 border-2 border-amber-300 rounded-2xl p-5 space-y-3 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>Fragile Knowledge (Low Conf. + Correct)</span>
              </div>
              <span className="text-lg font-black text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-lg font-mono">
                {q3.length}
              </span>
            </div>
            <p className="text-xs text-amber-950 leading-relaxed font-medium">
              You answered correctly but guessed or hesitated. Needs confidence reinforcement to prevent forgetting.
            </p>
            <div className="space-y-1 text-[11px] text-amber-900">
              <div className="font-mono bg-white/70 p-1.5 rounded border border-amber-200">
                • Transaction Isolation Levels (Dirty Read vs Phantom)
              </div>
            </div>
          </div>

          {/* Q4: Low Confidence + Wrong (Knowledge Gap) */}
          <div className="bg-slate-50 border-2 border-slate-300 rounded-2xl p-5 space-y-3 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-700 font-bold text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>Knowledge Gap (Low Conf. + Wrong)</span>
              </div>
              <span className="text-lg font-black text-slate-700 bg-slate-200 px-2.5 py-0.5 rounded-lg font-mono">
                {q4.length}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              You recognized you did not know the material. Requires foundational step-by-step reading.
            </p>
            <div className="space-y-1 text-[11px] text-slate-700">
              <div className="font-mono bg-white/70 p-1.5 rounded border border-slate-200">
                • BCNF Lossless Decomposition Algorithms
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <span className="text-slate-500">
            Calibration engine updates live after each adaptive quiz response.
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('misconceptions')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
            >
              Examine Misconception Map
            </button>
            <button
              onClick={() => openTeachBack('c-2nf', 'Second Normal Form (2NF)', 'Explain how to decompose tables with partial dependencies into 2NF.')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm flex items-center gap-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Remediate Overconfident Blindspot</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
