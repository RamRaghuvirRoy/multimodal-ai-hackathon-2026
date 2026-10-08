import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import {
  X,
  BookOpen,
  Video,
  FileText,
  Play,
  Pause,
  ExternalLink,
  Sparkles,
  Volume2,
  CheckCircle2,
  Clock,
  Layers,
  Flame,
} from 'lucide-react';

export const SourceModal: React.FC = () => {
  const { activeSourceModal, closeSourceModal, setActiveTab } = useLearning();
  const [isPlaying, setIsPlaying] = useState(true);
  const [copied, setCopied] = useState(false);

  if (!activeSourceModal) return null;

  const handleCopyCitation = () => {
    const text = `[Source Citation] ${activeSourceModal.title} (${activeSourceModal.locator})\nExcerpt: "${activeSourceModal.excerpt}"`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAskTutor = () => {
    closeSourceModal();
    setActiveTab('tutor');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-brand-500/20 text-brand-400 border border-brand-500/30">
              {activeSourceModal.materialType === 'textbook' && <BookOpen className="w-5 h-5 text-blue-400" />}
              {activeSourceModal.materialType === 'slide' && <Layers className="w-5 h-5 text-amber-400" />}
              {activeSourceModal.materialType === 'video' && <Video className="w-5 h-5 text-rose-400" />}
              {activeSourceModal.materialType === 'notes' && <FileText className="w-5 h-5 text-emerald-400" />}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {activeSourceModal.materialType.toUpperCase()} SOURCE GROUNDING
                </span>
                <span className="text-xs font-mono text-brand-300 bg-brand-950/80 px-2 py-0.5 rounded border border-brand-800">
                  {activeSourceModal.locator}
                </span>
              </div>
              <h3 className="font-semibold text-base text-white mt-0.5 line-clamp-1">
                {activeSourceModal.title}
              </h3>
            </div>
          </div>
          <button
            onClick={closeSourceModal}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 bg-slate-50/50">
          {/* Multimodal Preview Simulation */}
          {activeSourceModal.materialType === 'video' && (
            <div className="bg-slate-900 rounded-xl p-4 text-white border border-slate-800 relative overflow-hidden shadow-inner">
              <div className="aspect-video bg-slate-950 rounded-lg flex flex-col justify-between p-4 relative border border-slate-800/80">
                {/* Simulated video playback screen */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2 bg-black/60 px-3 py-1 rounded-full text-xs font-mono border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    <span>LIVE LECTURE PLAYBACK • {activeSourceModal.locator}</span>
                  </div>
                  <span className="text-xs bg-brand-500/30 text-brand-300 px-2.5 py-1 rounded-full font-medium">
                    Prof. Marcus Vance
                  </span>
                </div>

                <div className="my-auto text-center px-6 z-10">
                  <div className="inline-block p-3 rounded-full bg-brand-600/30 text-brand-300 mb-2 border border-brand-500/40">
                    <Volume2 className="w-6 h-6 animate-pulse" />
                  </div>
                  <p className="text-sm font-medium text-slate-200 italic max-w-md mx-auto">
                    "{activeSourceModal.excerpt}"
                  </p>
                  <p className="text-xs text-brand-400 mt-2 font-mono">
                    Audio Speech-to-Text Transcription Synchronized
                  </p>
                </div>

                {/* Video controls */}
                <div className="z-10 space-y-2 pt-2 border-t border-slate-800">
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden relative cursor-pointer">
                    <div className="bg-brand-500 h-full w-2/5 relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="flex items-center gap-1.5 text-white hover:text-brand-400 font-medium transition"
                    >
                      {isPlaying ? <Pause className="w-4 h-4 text-brand-400" /> : <Play className="w-4 h-4 text-brand-400" />}
                      <span>{isPlaying ? 'Pause' : 'Play'}</span>
                    </button>
                    <span>{activeSourceModal.locator} / 54:00</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSourceModal.materialType === 'slide' && (
            <div className="bg-white rounded-xl border border-slate-300 p-6 shadow-sm relative">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                  LECTURE SLIDE DECK VIEW
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold border border-amber-200">
                  {activeSourceModal.locator}
                </span>
              </div>
              <div className="bg-amber-50/40 rounded-lg p-5 border border-amber-200/60 font-sans space-y-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-semibold uppercase text-amber-800 tracking-wide">
                    Slide Content Excerpt
                  </span>
                </div>
                <div className="text-slate-800 text-sm leading-relaxed font-mono bg-white p-4 rounded-md border border-slate-200 shadow-xs">
                  {activeSourceModal.excerpt}
                </div>
                <div className="text-xs text-slate-500 italic flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  CS340 Database Systems • Week 4 Module
                </div>
              </div>
            </div>
          )}

          {activeSourceModal.materialType === 'textbook' && (
            <div className="bg-white rounded-xl border border-slate-300 p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                  TEXTBOOK VERBATIM EXCERPT
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                  {activeSourceModal.locator}
                </span>
              </div>
              <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 space-y-3">
                <blockquote className="border-l-4 border-brand-500 pl-4 py-1 text-slate-700 italic text-sm leading-relaxed bg-brand-50/30 rounded-r-md">
                  "{activeSourceModal.excerpt}"
                </blockquote>
                <p className="text-xs text-slate-500">
                  Extracted via Semantic Vector Chunking (Cosine Similarity: 0.94) • Fundamentals of Database Systems, 7th Edition.
                </p>
              </div>
            </div>
          )}

          {activeSourceModal.materialType === 'notes' && (
            <div className="bg-white rounded-xl border border-slate-300 p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                  TA REVIEW CHEATSHEET
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                  {activeSourceModal.locator}
                </span>
              </div>
              <div className="bg-emerald-50/30 rounded-lg p-4 border border-emerald-200 text-sm text-slate-800 font-mono">
                {activeSourceModal.excerpt}
              </div>
            </div>
          )}

          {/* RAG Verification Proof */}
          <div className="bg-slate-100/80 rounded-xl p-4 border border-slate-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Grounding Verification & Anti-Hallucination Guarantee
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                LearnMate AI verified this response directly from your uploaded materials repository. No synthesized or unverified assumptions were introduced into the tutoring response.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-white border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handleCopyCitation}
            className="text-xs text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-slate-100 transition"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Citation Copied!</span>
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4" />
                <span>Copy Full Citation</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={closeSourceModal}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              Close
            </button>
            <button
              onClick={handleAskTutor}
              className="px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm flex items-center gap-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask Tutor About This</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
