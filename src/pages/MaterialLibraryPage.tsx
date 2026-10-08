import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { MaterialItem, MaterialType } from '../types';
import {
  Upload,
  BookOpen,
  Video,
  FileText,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  Search,
  Eye,
  Plus,
  Flame,
  FileUp,
  Cpu,
  Database,
  ArrowRight,
} from 'lucide-react';

export const MaterialLibraryPage: React.FC = () => {
  const { materials, addMaterial, openSourceModal, setActiveTab } = useLearning();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStep, setUploadStep] = useState<string>('');
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<MaterialType>('textbook');

  const filteredMaterials = materials.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.authorOrProf.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.keyTopics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'all' || m.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleSimulateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    setIsUploading(true);
    setUploadStep('Extracting text & optical elements...');

    setTimeout(() => {
      setUploadStep(newType === 'video' ? 'Generating Whisper audio transcript...' : 'Chunking semantic boundary blocks...');
    }, 1000);

    setTimeout(() => {
      setUploadStep('Generating dense 768-dimensional embeddings...');
    }, 2000);

    setTimeout(() => {
      setUploadStep('Aligning cross-source entities with DBMS Knowledge Base...');
    }, 3000);

    setTimeout(() => {
      const newMat: MaterialItem = {
        id: `mat-${Date.now()}`,
        title: newTitle,
        type: newType,
        authorOrProf: 'Prof. Marcus Vance / Student Upload',
        sizeOrDuration: newType === 'video' ? '38 mins' : '42 Pages',
        status: 'Ready',
        indexedChunks: 64,
        uploadDate: 'Just now',
        summary: `Newly parsed and indexed ${newType} resource. Fully mapped into the RAG vector store.`,
        keyTopics: ['Relational Algebra', 'Schema Design', 'Normalization'],
        emphasisHighlights: [
          {
            topic: 'Relational Design',
            mentions: 3,
            quote: 'Primary emphasis on lossless decomposition and dependency preservation.'
          }
        ]
      };
      addMaterial(newMat);
      setIsUploading(false);
      setNewTitle('');
    }, 4000);
  };

  const getIcon = (type: MaterialType) => {
    switch (type) {
      case 'textbook':
        return <BookOpen className="w-5 h-5 text-blue-500" />;
      case 'slide':
        return <Layers className="w-5 h-5 text-amber-500" />;
      case 'video':
        return <Video className="w-5 h-5 text-rose-500" />;
      case 'notes':
        return <FileText className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
              MULTIMODAL INGESTION
            </span>
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
              4 Sources Synchronized
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Multimodal Study Material Library
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Upload textbooks, slide decks, video lectures, and revision notes. LearnMate AI cross-indexes all sources into ONE unified, source-cited knowledge base.
          </p>
        </div>

        <button
          onClick={() => {
            const form = document.getElementById('upload-section');
            form?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm flex items-center gap-2 shrink-0 self-start md:self-auto transition"
        >
          <FileUp className="w-4 h-4" />
          <span>Upload Study Resource</span>
        </button>
      </div>

      {/* Multimodal Architecture Diagram Banner */}
      <div className="bg-slate-900 rounded-2xl p-5 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-brand-500/20 text-brand-400 rounded-xl border border-brand-500/30">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">
              Multimodal Cross-Source Fusion Engine Active
            </h3>
            <p className="text-xs text-slate-300 mt-0.5 max-w-xl">
              Lecture video audio transcripts are timestamp-aligned with slide cards and textbook chapter paragraphs. When the AI tutor answers, it synthesizes all 3 modalities.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
          <span className="bg-slate-800 px-2.5 py-1 rounded border border-slate-700 text-blue-300">PDF</span>
          <span>+</span>
          <span className="bg-slate-800 px-2.5 py-1 rounded border border-slate-700 text-amber-300">PPTX</span>
          <span>+</span>
          <span className="bg-slate-800 px-2.5 py-1 rounded border border-slate-700 text-rose-300">VIDEO</span>
          <span>➔</span>
          <span className="bg-brand-600 px-2.5 py-1 rounded text-white font-bold">1 UNIFIED KNOWLEDGE BASE</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search resources, topics, professors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['all', 'textbook', 'slide', 'video', 'notes'].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition ${
                selectedType === t
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Materials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMaterials.map((mat) => (
          <div
            key={mat.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-brand-300 hover:shadow-md transition flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Card top */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                    {getIcon(mat.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {mat.type.toUpperCase()}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {mat.sizeOrDuration}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 mt-1 line-clamp-1">
                      {mat.title}
                    </h3>
                  </div>
                </div>

                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {mat.status}
                </span>
              </div>

              {/* Author and summary */}
              <p className="text-xs text-slate-500 mt-2 font-medium">
                Instructor / Source: {mat.authorOrProf}
              </p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-2">
                {mat.summary}
              </p>

              {/* Professor emphasis quote */}
              {mat.emphasisHighlights.length > 0 && (
                <div className="mt-3 bg-amber-50/70 rounded-xl p-3 border border-amber-200/80">
                  <div className="flex items-center gap-1.5 text-amber-800 text-[11px] font-bold uppercase tracking-wide">
                    <Flame className="w-3.5 h-3.5 text-amber-600" />
                    <span>Professor's Emphasis Highlight ({mat.emphasisHighlights[0].mentions}x cited)</span>
                  </div>
                  <p className="text-xs text-amber-950 mt-1 italic leading-snug line-clamp-2">
                    "{mat.emphasisHighlights[0].quote}"
                  </p>
                </div>
              )}

              {/* Key topics */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {mat.keyTopics.map((topic, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-medium"
                  >
                    #{topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom metadata & preview action */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono text-[11px]">
                {mat.indexedChunks} semantic chunks indexed
              </span>

              <button
                onClick={() => {
                  openSourceModal({
                    id: `src-${mat.id}`,
                    materialType: mat.type,
                    title: mat.title,
                    locator:
                      mat.type === 'video'
                        ? '12:42–13:18'
                        : mat.type === 'slide'
                        ? 'Slide 27'
                        : 'Page 152',
                    excerpt:
                      mat.emphasisHighlights[0]?.quote ||
                      mat.summary
                  });
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 flex items-center gap-1.5 transition"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Inspect Source Grounding</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Simulation Form */}
      <div id="upload-section" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">
              Upload New Course Material
            </h3>
            <p className="text-xs text-slate-500">
              Drag and drop any textbook, slide deck, recorded lecture or notes to fuse into your knowledge base.
            </p>
          </div>
        </div>

        <form onSubmit={handleSimulateUpload} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Document / Video Title
              </label>
              <input
                type="text"
                placeholder="e.g. Chapter 15: Concurrency Control & Two-Phase Locking"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Material Format
              </label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as MaterialType)}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
              >
                <option value="textbook">PDF Textbook / Paper</option>
                <option value="slide">PPT / PPTX Lecture Slides</option>
                <option value="video">MP4 Video Lecture / Audio</option>
                <option value="notes">Markdown / Handwritten Notes</option>
              </select>
            </div>
          </div>

          {/* Drag & drop simulated box */}
          <div className="border-2 border-dashed border-slate-300 hover:border-brand-500 rounded-xl p-8 text-center bg-slate-50/50 hover:bg-brand-50/20 transition cursor-pointer">
            <FileUp className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-700">
              Drop files here or click to browse files
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Supports PDF, PPTX, MP4, MKV, DOCX up to 500MB
            </p>
          </div>

          {isUploading && (
            <div className="bg-brand-50 rounded-xl p-4 border border-brand-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-brand-900">
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-brand-600 border-t-transparent rounded-full animate-spin"></span>
                  <span>{uploadStep}</span>
                </span>
                <span className="font-mono">Processing...</span>
              </div>
              <div className="w-full bg-brand-200 h-2 rounded-full overflow-hidden">
                <div className="bg-brand-600 h-full w-3/4 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={isUploading || !newTitle}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 disabled:opacity-50 transition shadow-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Simulate Multimodal Processing & Indexing</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
