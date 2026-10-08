import React, { useState, useEffect } from 'react';
import { useLearning } from '../context/LearningContext';
import confetti from 'canvas-confetti';
import {
  X,
  Mic,
  MicOff,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Send,
  HelpCircle,
  Lightbulb,
  Award,
} from 'lucide-react';

export const TeachBackModal: React.FC = () => {
  const { teachBackOpen, closeTeachBack, teachBackTopic, completeTeachBackRemediation } =
    useLearning();

  const [studentInput, setStudentInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    accuracyScore: number;
    completenessScore: number;
    masteryGain: number;
    summary: string;
    missingConcepts: string[];
    spottedMisconceptions: string[];
    feedback: string;
    isPassed: boolean;
  } | null>(null);

  // Clean state when topic changes or opened
  useEffect(() => {
    if (teachBackOpen) {
      setStudentInput('');
      setEvaluationResult(null);
    }
  }, [teachBackOpen, teachBackTopic]);

  if (!teachBackOpen) return null;

  // Speech Recognition support
  const toggleSpeech = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your explanation.');
      return;
    }

    if (isListening) {
      setIsListening(false);
    } else {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setStudentInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };
      recognition.start();
    }
  };

  const handlePreFillSample = (good: boolean) => {
    if (good) {
      setStudentInput(
        '2NF requires the table to be in 1NF first. Then, every non-prime attribute must depend on the whole candidate key, not just a part of it. A partial dependency happens when a non-prime column depends on a subset of a composite primary key. For example, in Enroll(StudentID, CourseID, CourseName, Grade), CourseName depends solely on CourseID. To fix this into 2NF, we decompose the table into Enroll(StudentID, CourseID, Grade) and Courses(CourseID, CourseName).'
      );
    } else {
      setStudentInput(
        '2NF is when you divide the table so there are no repeating rows. If there is a foreign key, we delete the duplicate records and ensure all numbers are integers.'
      );
    }
  };

  const handleEvaluate = () => {
    if (!studentInput.trim()) return;

    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      const text = studentInput.toLowerCase();

      // Semantic concept grading
      const has1NF = text.includes('1nf') || text.includes('first normal form');
      const hasComposite = text.includes('composite') || text.includes('part') || text.includes('subset') || text.includes('multiple');
      const hasNonPrime = text.includes('non-prime') || text.includes('attribute') || text.includes('column');
      const hasDecompose = text.includes('decompose') || text.includes('split') || text.includes('separate table');

      let accuracy = 40;
      let completeness = 35;
      const missing: string[] = [];
      const misconceptions: string[] = [];

      if (has1NF) accuracy += 15;
      else missing.push('Did not mention prerequisite requirement of being in 1NF.');

      if (hasComposite) {
        accuracy += 25;
        completeness += 25;
      } else {
        missing.push('Missed that partial dependency ONLY occurs with composite candidate keys.');
      }

      if (hasNonPrime) completeness += 20;
      else missing.push('Did not clarify that the dependency restriction applies to non-prime attributes.');

      if (hasDecompose) {
        accuracy += 20;
        completeness += 20;
      } else {
        missing.push('Did not specify decomposition method for remediation.');
      }

      if (text.includes('transitive')) {
        misconceptions.push('Conflated transitive dependency (3NF) with partial dependency (2NF).');
      }

      const isPassed = accuracy >= 75 && completeness >= 65;

      if (isPassed) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      }

      setEvaluationResult({
        accuracyScore: Math.min(98, accuracy),
        completenessScore: Math.min(95, completeness),
        masteryGain: isPassed ? 15 : 5,
        summary: isPassed
          ? 'Exceptional grasp of 2NF and partial functional dependencies!'
          : 'Good effort, but critical relational nuances are missing.',
        missingConcepts: missing,
        spottedMisconceptions: misconceptions,
        feedback: isPassed
          ? 'You demonstrated solid conceptual understanding: you correctly recognized that partial dependency requires a composite key and explained how relation decomposition eliminates anomalies.'
          : 'You touched on the general idea, but remember: 2NF is specifically about eliminating dependencies where a non-prime attribute depends on a PROPER SUBSET of a composite primary key. Try refining your explanation!',
        isPassed
      });
    }, 1200);
  };

  const handleApplyRemediation = () => {
    if (evaluationResult) {
      completeTeachBackRemediation(evaluationResult.accuracyScore);
    }
    closeTeachBack();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-brand-700 to-indigo-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-white/20 text-white backdrop-blur-xs">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-white/20 text-indigo-100 font-bold">
                  FEATURE E • SEYMOUR PAPERT PEDAGOGY
                </span>
                <span className="text-[10px] bg-amber-400 text-slate-900 font-bold px-2 py-0.2 rounded">
                  TEACH IT BACK MODE
                </span>
              </div>
              <h3 className="font-bold text-lg text-white mt-0.5">
                {teachBackTopic.title}
              </h3>
            </div>
          </div>
          <button
            onClick={closeTeachBack}
            className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 bg-slate-50/50">
          {/* AI Tutor Challenge Prompt */}
          <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-xs flex items-start gap-3">
            <div className="p-2 rounded-full bg-brand-50 text-brand-600 shrink-0 mt-0.5">
              <Lightbulb className="w-5 h-5 text-brand-600" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Your AI Tutor's Challenge
              </h4>
              <p className="text-sm text-slate-700 mt-1 font-medium leading-relaxed">
                "{teachBackTopic.prompt}"
              </p>
              <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-slate-100">
                <span className="text-xs text-slate-400 font-medium self-center">Demo Fast-Track:</span>
                <button
                  onClick={() => handlePreFillSample(true)}
                  className="text-xs px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold border border-emerald-200 transition"
                >
                  Load Strong Explanation (95%)
                </button>
                <button
                  onClick={() => handlePreFillSample(false)}
                  className="text-xs px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold border border-rose-200 transition"
                >
                  Load Weak/Flawed Explanation (40%)
                </button>
              </div>
            </div>
          </div>

          {/* Student Explanation Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>Your Verbal / Written Explanation</span>
              </label>
              <button
                type="button"
                onClick={toggleSpeech}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5 transition ${
                  isListening
                    ? 'bg-rose-100 text-rose-700 border border-rose-300 animate-pulse'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-3.5 h-3.5 text-rose-600" />
                    <span>Listening... (Click to stop)</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-3.5 h-3.5 text-brand-600" />
                    <span>Speak Explanation (Web Speech)</span>
                  </>
                )}
              </button>
            </div>

            <textarea
              rows={5}
              value={studentInput}
              onChange={(e) => setStudentInput(e.target.value)}
              placeholder="Explain the concept in your own words. Use an example if it helps you clarify the intuition..."
              className="w-full text-sm p-4 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 leading-relaxed shadow-inner"
            />
          </div>

          {/* Evaluation Results Card */}
          {evaluationResult && (
            <div className={`p-5 rounded-xl border transition-all ${
              evaluationResult.isPassed
                ? 'bg-emerald-50/70 border-emerald-200'
                : 'bg-amber-50/70 border-amber-200'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {evaluationResult.isPassed ? (
                    <Award className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                  )}
                  <h4 className="font-bold text-sm text-slate-900">
                    {evaluationResult.summary}
                  </h4>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Accuracy</span>
                    <span className="text-sm font-bold text-brand-700">{evaluationResult.accuracyScore}%</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Completeness</span>
                    <span className="text-sm font-bold text-brand-700">{evaluationResult.completenessScore}%</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed mb-3">
                {evaluationResult.feedback}
              </p>

              {evaluationResult.missingConcepts.length > 0 && (
                <div className="bg-white/80 rounded-lg p-3 border border-slate-200/80 mb-2">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block mb-1">
                    Missing Conceptual Facets:
                  </span>
                  <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                    {evaluationResult.missingConcepts.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {evaluationResult.spottedMisconceptions.length > 0 && (
                <div className="bg-rose-50/90 rounded-lg p-3 border border-rose-200">
                  <span className="text-xs font-bold text-rose-800 uppercase tracking-wide block mb-1">
                    Misconceptions Detected:
                  </span>
                  <ul className="list-disc list-inside text-xs text-rose-700 space-y-1">
                    {evaluationResult.spottedMisconceptions.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-white border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={closeTeachBack}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            {evaluationResult && !evaluationResult.isPassed && (
              <button
                onClick={() => setEvaluationResult(null)}
                className="px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-1.5 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
            )}

            {!evaluationResult ? (
              <button
                onClick={handleEvaluate}
                disabled={isEvaluating || !studentInput.trim()}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 disabled:opacity-50 rounded-lg shadow-sm flex items-center gap-2 transition"
              >
                {isEvaluating ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Analyzing Mental Model...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit To Tutor For Evaluation</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleApplyRemediation}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm flex items-center gap-2 transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Solidify & Update Learning DNA (+{evaluationResult.masteryGain}%)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
