import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { ConceptNode } from '../types';
import {
  BrainCircuit,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
  Layers,
  Video,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Compass,
  RotateCcw,
} from 'lucide-react';

export const MisconceptionMapPage: React.FC = () => {
  const { concepts, openSourceModal, openTeachBack, setActiveTab } = useLearning();

  // Find 2NF by default as active selection
  const defaultConcept =
    concepts[0]?.children?.find((c) => c.id === 'c-norm')?.children?.find((c) => c.id === 'c-2nf') ||
    concepts[0];

  const [selectedConcept, setSelectedConcept] = useState<ConceptNode>(defaultConcept);

  const getStatusBadge = (status: ConceptNode['status']) => {
    switch (status) {
      case 'strong':
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Strong</span>
          </span>
        );
      case 'needs_practice':
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Needs Practice</span>
          </span>
        );
      case 'weak':
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 animate-pulse">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Weak (Misconception Detected)</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              FEATURE B • CORE DIFFERENTIATOR
            </span>
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
              Cognitive Diagnostic Tree
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Hierarchical Misconception Map
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Instead of simply reporting a raw score like "62%", LearnMate AI isolates the exact conceptual misconceptions causing your mistakes.
          </p>
        </div>

        <button
          onClick={() => openTeachBack(selectedConcept.id, selectedConcept.name, `Explain ${selectedConcept.name} and clear up the common misconception.`)}
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm flex items-center gap-2 shrink-0 self-start sm:self-auto transition"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Remediate via Teach-Back</span>
        </button>
      </div>

      {/* Main Grid: Visual Tree on Left (5 cols), Misconception Inspector on Right (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Tree Visualization (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-brand-600" />
              <h3 className="font-bold text-sm text-slate-900">
                Database Concept Hierarchy
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Click node to diagnose
            </span>
          </div>

          {/* ASCII / Graphical Tree representation */}
          <div className="space-y-3 font-sans text-xs">
            {/* Root DBMS */}
            <div
              onClick={() => setSelectedConcept(concepts[0])}
              className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                selectedConcept.id === concepts[0].id
                  ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
              }`}
            >
              <span className="font-bold">Database Management Systems</span>
              <span className="text-xs font-mono">{concepts[0].masteryPercentage}%</span>
            </div>

            {/* Level 1 branches */}
            <div className="pl-4 space-y-3 border-l-2 border-slate-200 ml-2">
              {/* SQL Basics */}
              {concepts[0].children?.find((c) => c.id === 'c-sql') && (
                <div
                  onClick={() => setSelectedConcept(concepts[0].children!.find((c) => c.id === 'c-sql')!)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    selectedConcept.id === 'c-sql'
                      ? 'bg-brand-600 text-white font-bold'
                      : 'bg-emerald-50/50 hover:bg-emerald-50 border-emerald-200 text-slate-800'
                  }`}
                >
                  <span className="font-medium">├── SQL Basics</span>
                  {getStatusBadge('strong')}
                </div>
              )}

              {/* Joins subtree */}
              <div className="space-y-1.5">
                <div
                  onClick={() => setSelectedConcept(concepts[0].children!.find((c) => c.id === 'c-joins')!)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    selectedConcept.id === 'c-joins'
                      ? 'bg-brand-600 text-white font-bold'
                      : 'bg-amber-50/50 hover:bg-amber-50 border-amber-200 text-slate-800'
                  }`}
                >
                  <span className="font-medium">├── Relational Joins</span>
                  {getStatusBadge('needs_practice')}
                </div>

                <div className="pl-6 space-y-1 border-l-2 border-amber-200/80 ml-2">
                  <div
                    onClick={() => setSelectedConcept(concepts[0].children!.find((c) => c.id === 'c-joins')!.children!.find((s) => s.id === 'c-inner-join')!)}
                    className={`p-2 rounded-lg border cursor-pointer transition flex items-center justify-between text-[11px] ${
                      selectedConcept.id === 'c-inner-join'
                        ? 'bg-brand-600 text-white font-bold'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <span>│ ├── INNER JOIN</span>
                    <span className="text-emerald-600 font-bold">✓ Strong</span>
                  </div>

                  <div
                    onClick={() => setSelectedConcept(concepts[0].children!.find((c) => c.id === 'c-joins')!.children!.find((s) => s.id === 'c-left-join')!)}
                    className={`p-2 rounded-lg border cursor-pointer transition flex items-center justify-between text-[11px] ${
                      selectedConcept.id === 'c-left-join'
                        ? 'bg-brand-600 text-white font-bold'
                        : 'bg-rose-50/80 hover:bg-rose-100 border-rose-200 text-rose-950'
                    }`}
                  >
                    <span className="font-semibold">│ ├── LEFT JOIN (Null Filter Trap)</span>
                    <span className="text-rose-600 font-bold">✗ Needs Practice</span>
                  </div>

                  <div
                    onClick={() => setSelectedConcept(concepts[0].children!.find((c) => c.id === 'c-joins')!.children!.find((s) => s.id === 'c-right-join')!)}
                    className={`p-2 rounded-lg border cursor-pointer transition flex items-center justify-between text-[11px] ${
                      selectedConcept.id === 'c-right-join'
                        ? 'bg-brand-600 text-white font-bold'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <span>│ └── RIGHT JOIN</span>
                    <span className="text-amber-600 font-semibold">⚠ Practice</span>
                  </div>
                </div>
              </div>

              {/* Normalization Subtree */}
              <div className="space-y-1.5">
                <div
                  onClick={() => setSelectedConcept(concepts[0].children!.find((c) => c.id === 'c-norm')!)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    selectedConcept.id === 'c-norm'
                      ? 'bg-brand-600 text-white font-bold'
                      : 'bg-rose-50/50 hover:bg-rose-50 border-rose-200 text-slate-800'
                  }`}
                >
                  <span className="font-medium">└── Schema Normalization</span>
                  {getStatusBadge('weak')}
                </div>

                <div className="pl-6 space-y-1 border-l-2 border-rose-300 ml-2">
                  <div
                    onClick={() => setSelectedConcept(concepts[0].children!.find((c) => c.id === 'c-norm')!.children!.find((s) => s.id === 'c-1nf')!)}
                    className={`p-2 rounded-lg border cursor-pointer transition flex items-center justify-between text-[11px] ${
                      selectedConcept.id === 'c-1nf'
                        ? 'bg-brand-600 text-white font-bold'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <span>├── 1NF (Atomic Values)</span>
                    <span className="text-emerald-600 font-bold">✓ Strong</span>
                  </div>

                  <div
                    onClick={() => setSelectedConcept(concepts[0].children!.find((c) => c.id === 'c-norm')!.children!.find((s) => s.id === 'c-2nf')!)}
                    className={`p-2.5 rounded-lg border cursor-pointer transition flex items-center justify-between text-[11px] ${
                      selectedConcept.id === 'c-2nf'
                        ? 'bg-rose-600 text-white font-bold ring-2 ring-rose-400'
                        : 'bg-rose-100 hover:bg-rose-200 border-rose-300 text-rose-950 font-bold'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                      <span>├── 2NF (Partial Dependency)</span>
                    </span>
                    <span className="bg-rose-200 text-rose-900 px-1.5 py-0.2 rounded font-bold">
                      ✗ Critical Weakness
                    </span>
                  </div>

                  <div
                    onClick={() => setSelectedConcept(concepts[0].children!.find((c) => c.id === 'c-norm')!.children!.find((s) => s.id === 'c-3nf')!)}
                    className={`p-2 rounded-lg border cursor-pointer transition flex items-center justify-between text-[11px] ${
                      selectedConcept.id === 'c-3nf'
                        ? 'bg-brand-600 text-white font-bold'
                        : 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-900'
                    }`}
                  >
                    <span>└── 3NF (Transitive Dependency)</span>
                    <span className="text-rose-600 font-semibold">✗ Weak</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Detailed Misconception Diagnostic Drawer (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  DIAGNOSTIC DETAIL
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  {selectedConcept.name}
                </h2>
              </div>
              <div>{getStatusBadge(selectedConcept.status)}</div>
            </div>

            {/* Concept overview */}
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              {selectedConcept.definition}
            </p>

            {/* Misconception details if present */}
            {selectedConcept.misconceptionDetails ? (
              <div className="space-y-4">
                {/* Identified issue */}
                <div className="bg-rose-50 rounded-xl p-4 border border-rose-200 space-y-2">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>Identified Misconception: {selectedConcept.misconceptionDetails.identifiedIssue}</span>
                  </div>
                  <p className="text-xs text-rose-950 leading-relaxed font-medium">
                    {selectedConcept.misconceptionDetails.reasonDetected}
                  </p>
                </div>

                {/* Common mental trap */}
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 space-y-2">
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    <span>Mental Model Fallacy</span>
                  </div>
                  <p className="text-xs text-amber-950 leading-relaxed">
                    "{selectedConcept.misconceptionDetails.commonMentalTrap}"
                  </p>
                </div>

                {/* Previous failed questions audit */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Telemetry: Previous Failed Question Audits
                  </span>

                  {selectedConcept.misconceptionDetails.studentFailedQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs"
                    >
                      <p className="font-semibold text-slate-800">{q.question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                        <div className="bg-rose-100/70 text-rose-900 p-2 rounded-lg border border-rose-200">
                          <strong className="block">Your Selected Answer:</strong>
                          <span>{q.studentSelected}</span>
                        </div>
                        <div className="bg-emerald-100/70 text-emerald-900 p-2 rounded-lg border border-emerald-200">
                          <strong className="block">Relational Ground Truth:</strong>
                          <span>{q.correctAnswer}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 italic pt-1">
                        {q.explanation}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Remediation Action Call to Action */}
                <div className="bg-indigo-50/80 rounded-xl p-4 border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider block">
                      Targeted Adaptive Remediation
                    </span>
                    <p className="text-xs text-indigo-700 mt-0.5">
                      {selectedConcept.misconceptionDetails.remediationAction}
                    </p>
                  </div>

                  <button
                    onClick={() => openTeachBack(selectedConcept.id, selectedConcept.name, `Explain ${selectedConcept.name} in your own words, and identify why composite keys are prone to partial dependencies.`)}
                    className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm flex items-center gap-1.5 shrink-0 transition"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Execute Remediation</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm text-emerald-900">
                  Concept Solidly Understood
                </h4>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  No repeating misconceptions detected. Student demonstrated 90%+ accuracy and consistent calibrated confidence on this concept.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
