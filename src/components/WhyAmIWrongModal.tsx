import React from 'react';
import { useLearning } from '../context/LearningContext';
import {
  X,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Lightbulb,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const WhyAmIWrongModal: React.FC = () => {
  const { activeWhyWrongData, closeWhyWrongModal, openSourceModal, openTeachBack, setActiveTab } =
    useLearning();

  if (!activeWhyWrongData) return null;

  const {
    question,
    selectedOptionIndex,
    explanation,
    commonMisconception,
    whyWrongReason,
    source,
  } = activeWhyWrongData;

  const studentAnswerText = question.options[selectedOptionIndex] || 'Not specified';
  const correctAnswerText = question.options[question.correctOptionIndex];

  const handleInspectSource = () => {
    closeWhyWrongModal();
    openSourceModal(source);
  };

  const handleLaunchTeachBack = () => {
    closeWhyWrongModal();
    openTeachBack(
      question.conceptId,
      question.conceptName,
      `Explain ${question.conceptName} in your own words, and identify why "${studentAnswerText.slice(0, 60)}..." is conceptually flawed.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-rose-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-white/20 text-white">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-rose-100 font-semibold">
                FEATURE J • COGNITIVE DIAGNOSTICS
              </span>
              <h3 className="font-bold text-lg text-white">Why Am I Wrong?</h3>
            </div>
          </div>
          <button
            onClick={closeWhyWrongModal}
            className="text-rose-100 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 bg-slate-50/60">
          {/* Question Summary */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Assessed Question ({question.difficulty} • {question.conceptName})
            </span>
            <p className="text-sm font-medium text-slate-800 mt-1 whitespace-pre-line">
              {question.question}
            </p>
          </div>

          {/* Your Answer vs Correct Answer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-rose-700 font-semibold text-xs uppercase tracking-wider mb-1.5">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Your Selected Answer</span>
              </div>
              <p className="text-xs text-rose-950 font-medium leading-relaxed">
                {studentAnswerText}
              </p>
              <div className="mt-2.5 pt-2 border-t border-rose-200/60 text-[11px] text-rose-800 italic">
                Reason it fails: {whyWrongReason}
              </div>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs uppercase tracking-wider mb-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Correct Relational Answer</span>
              </div>
              <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                {correctAnswerText}
              </p>
              <div className="mt-2.5 pt-2 border-t border-emerald-200/60 text-[11px] text-emerald-800 font-medium">
                Verified against textbook & course slides.
              </div>
            </div>
          </div>

          {/* Conceptual Breakdown */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-slate-800 font-semibold text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-brand-600" />
              <span>Underlying Concept Breakdown</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">{explanation}</p>
          </div>

          {/* Common Mental Trap */}
          <div className="bg-amber-50/80 rounded-xl p-4 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Common Student Misconception</span>
            </div>
            <p className="text-xs text-amber-950 leading-relaxed font-medium">
              "{commonMisconception}"
            </p>
          </div>

          {/* Source Citation */}
          <div className="bg-brand-50/60 rounded-xl p-4 border border-brand-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-brand-600 shrink-0" />
              <div>
                <span className="text-[11px] font-semibold text-brand-900 block">
                  Grounding Source: {source.title} ({source.locator})
                </span>
                <span className="text-[11px] text-brand-700 line-clamp-1 italic">
                  "{source.excerpt}"
                </span>
              </div>
            </div>
            <button
              onClick={handleInspectSource}
              className="text-xs font-semibold text-brand-700 hover:text-brand-900 px-2.5 py-1.5 bg-white border border-brand-300 rounded-lg hover:bg-brand-50 transition shrink-0"
            >
              Inspect Source
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-white border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={closeWhyWrongModal}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
          >
            Dismiss
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                closeWhyWrongModal();
                setActiveTab('misconceptions');
              }}
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
            >
              View in Misconception Map
            </button>
            <button
              onClick={handleLaunchTeachBack}
              className="px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm flex items-center gap-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Teach It Back To AI</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
