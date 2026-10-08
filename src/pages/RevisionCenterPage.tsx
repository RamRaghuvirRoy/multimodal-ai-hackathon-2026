import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { RevisionQueueItem } from '../types';
import {
  History,
  RotateCcw,
  Sparkles,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  Flame,
  BookOpen,
  Calendar,
  Layers,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';

export const RevisionCenterPage: React.FC = () => {
  const { revisionQueue, openTeachBack, setActiveTab } = useLearning();

  const [activeFilter, setActiveFilter] = useState<'all' | 'high' | 'medium' | 'mastered'>('all');
  const [activeFlashcardIndex, setActiveFlashcardIndex] = useState<number | null>(null);
  const [flippedCard, setFlippedCard] = useState(false);

  const filteredQueue = revisionQueue.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.urgency === activeFilter;
  });

  const flashcards = [
    {
      concept: 'Second Normal Form (2NF)',
      prompt: 'When is a relation schema guaranteed to be in 2NF if it is already in 1NF?',
      answer: 'When the primary key consists of a SINGLE attribute! (Because a single-attribute key has no proper subsets to cause a partial functional dependency).',
      source: 'CS340 Slide 27 • Elmasri & Navathe p. 152'
    },
    {
      concept: 'LEFT JOIN Nullability',
      prompt: 'Why does placing a right-table filter inside the WHERE clause break a LEFT JOIN?',
      answer: 'Because SQL three-valued logic evaluates NULL comparisons to UNKNOWN, which the WHERE clause filters out. This converts the outer join into an inner join.',
      source: 'Lecture 08 Recording 28:15 • CS340 Slide 22'
    },
    {
      concept: 'Third Normal Form (3NF)',
      prompt: 'What condition allows an FD X -> A in 3NF even if X is not a superkey?',
      answer: 'If the right-hand side attribute A is a PRIME attribute (part of any candidate key).',
      source: 'Elmasri & Navathe p. 158'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              FEATURE H • SPACED REPETITION ENGINE
            </span>
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
              Ebbinghaus Decay Calibration
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Smart Revision Queue
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Prioritizes topics automatically using cognitive weakness, mistake recurrence, and optimal spaced memory intervals.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('assessment')}
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm flex items-center gap-2 shrink-0 self-start sm:self-auto transition"
        >
          <Compass className="w-4 h-4" />
          <span>Launch Priority Revision Session</span>
        </button>
      </div>

      {/* Spaced Repetition Logic Overview Banner */}
      <div className="bg-slate-900 rounded-2xl p-5 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">
              Adaptive Memory Decay Scheduling
            </h3>
            <p className="text-xs text-slate-300 mt-0.5 max-w-lg">
              Items with repeated misconceptions (e.g. 2NF Partial Dependency) are surfaced immediately. Mastered concepts are scheduled at exponentially expanding intervals.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-rose-950 text-rose-300 border border-rose-800">1. Immediate</span>
          <span>➔</span>
          <span className="px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-800">2. 24 Hours</span>
          <span>➔</span>
          <span className="px-2.5 py-1 rounded bg-blue-950 text-blue-300 border border-blue-800">3. 3 Days</span>
          <span>➔</span>
          <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">4. Mastered</span>
        </div>
      </div>

      {/* Main Grid: Queue List (8 cols), Rapid Drill / Flashcard (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Revision Queue List (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <History className="w-5 h-5 text-brand-600" />
              <span>Today's Prioritized Revision Tasks</span>
            </h3>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
              {(['all', 'high', 'medium', 'mastered'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1 rounded-lg font-semibold capitalize transition ${
                    activeFilter === f
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f === 'high' ? 'Weak' : f === 'medium' ? 'Needs Practice' : f}
                </button>
              ))}
            </div>
          </div>

          {/* Queue items */}
          <div className="space-y-3">
            {filteredQueue.map((item, idx) => (
              <div
                key={item.id}
                className={`p-4 rounded-xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  item.urgency === 'high'
                    ? 'bg-rose-50/40 border-rose-200 hover:border-rose-300'
                    : item.urgency === 'medium'
                    ? 'bg-amber-50/40 border-amber-200 hover:border-amber-300'
                    : 'bg-emerald-50/30 border-emerald-200 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`w-6 h-6 rounded-full font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                      item.urgency === 'high'
                        ? 'bg-rose-600 text-white'
                        : item.urgency === 'medium'
                        ? 'bg-amber-500 text-white'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {idx + 1}
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900">
                        {item.conceptName}
                      </h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          item.urgency === 'high'
                            ? 'bg-rose-200 text-rose-900 font-extrabold'
                            : item.urgency === 'medium'
                            ? 'bg-amber-200 text-amber-900'
                            : 'bg-emerald-200 text-emerald-900'
                        }`}
                      >
                        {item.urgencyLabel}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-1">
                      {item.recommendedAction}
                    </p>

                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500 font-mono">
                      <span>Retention Score: {item.retentionScore}%</span>
                      <span>•</span>
                      <span>Mistakes: {item.mistakeFrequency}x</span>
                      <span>•</span>
                      <span>Last Practiced: {item.lastPracticed}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <button
                    onClick={() => openTeachBack(item.conceptId, item.conceptName, `Explain ${item.conceptName} in your own words to solidify your retention.`)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-700 hover:text-brand-700 border border-slate-300 hover:border-brand-300 transition flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Teach-Back</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('assessment')}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-xs transition"
                  >
                    Practice Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Rapid Concept Memory Cards (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                RAPID REVISION FLASHCARD
              </span>
              <span className="text-xs text-brand-600 font-semibold">
                Spaced Active Recall
              </span>
            </div>

            {/* Flashcard Component */}
            <div
              onClick={() => setFlippedCard(!flippedCard)}
              className="min-h-[220px] rounded-xl border-2 border-dashed border-slate-300 hover:border-brand-500 bg-slate-50/70 p-5 flex flex-col justify-between cursor-pointer transition select-none"
            >
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                  {flashcards[activeFlashcardIndex || 0].concept}
                </span>

                <h4 className="font-bold text-sm text-slate-800 mt-3 leading-snug">
                  {flippedCard
                    ? flashcards[activeFlashcardIndex || 0].answer
                    : flashcards[activeFlashcardIndex || 0].prompt}
                </h4>
              </div>

              <div className="pt-3 border-t border-slate-200 text-[11px] flex items-center justify-between text-slate-500">
                <span className="flex items-center gap-1 font-mono">
                  <RefreshCw className="w-3 h-3" /> Click to flip card
                </span>
                <span className="text-slate-400 font-mono">
                  {flippedCard ? 'Answer' : 'Question'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 text-xs">
              <button
                onClick={() => {
                  setFlippedCard(false);
                  setActiveFlashcardIndex((prev) => ((prev || 0) + 1) % flashcards.length);
                }}
                className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition"
              >
                Next Flashcard →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
