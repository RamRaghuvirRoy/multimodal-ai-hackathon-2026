import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { ConceptNode } from '../types';
import {
  Network,
  BookOpen,
  Layers,
  Video,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Search,
  ExternalLink,
  BrainCircuit,
  ArrowRight,
} from 'lucide-react';

export const KnowledgeBasePage: React.FC = () => {
  const { concepts, openSourceModal, openTeachBack, setActiveTab } = useLearning();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConcept, setSelectedConcept] = useState<ConceptNode>(concepts[0]);
  const [expandedNodes, setExpandedNodes] = useState<{ [id: string]: boolean }>({
    'c-db': true,
    'c-joins': true,
    'c-norm': true,
  });

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Render tree node recursively
  const renderTree = (node: ConceptNode, depth = 0) => {
    const isExpanded = expandedNodes[node.id];
    const isSelected = selectedConcept.id === node.id;
    const hasChildren = node.children && node.children.length > 0;

    const matchesSearch =
      !searchQuery ||
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.definition.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      <div key={node.id} className={`${!matchesSearch && !hasChildren ? 'hidden' : ''}`}>
        <div
          onClick={() => setSelectedConcept(node)}
          className={`flex items-center justify-between py-2.5 px-3 rounded-xl cursor-pointer transition text-xs ${
            isSelected
              ? 'bg-brand-600 text-white shadow-xs font-semibold'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
          style={{ paddingLeft: `${depth * 16 + 12}px` }}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            {hasChildren ? (
              <button
                onClick={(e) => toggleExpand(node.id, e)}
                className={`p-0.5 rounded transition ${
                  isSelected ? 'text-white' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ) : (
              <span className="w-3.5 h-3.5 inline-block"></span>
            )}

            <span className="truncate">{node.name}</span>

            {node.professorEmphasis.level === 'HIGH' && (
              <span
                className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase flex items-center gap-0.5 shrink-0 ${
                  isSelected
                    ? 'bg-white text-rose-700'
                    : 'bg-rose-100 text-rose-700 border border-rose-200'
                }`}
              >
                <Flame className="w-2.5 h-2.5 fill-current" />
                HIGH EMPHASIS
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                node.status === 'strong'
                  ? isSelected ? 'bg-emerald-400 text-emerald-950' : 'bg-emerald-100 text-emerald-800'
                  : node.status === 'needs_practice'
                  ? isSelected ? 'bg-amber-400 text-amber-950' : 'bg-amber-100 text-amber-800'
                  : isSelected ? 'bg-rose-400 text-rose-950' : 'bg-rose-100 text-rose-800'
              }`}
            >
              {node.masteryPercentage}%
            </span>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="space-y-0.5 mt-0.5 border-l border-slate-200 ml-4">
            {node.children!.map((child) => renderTree(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
              UNIFIED KNOWLEDGE GRAPH
            </span>
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
              Multi-source Synthesized Hierarchy
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            DBMS Unified Knowledge Base
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Every concept node harmonizes lecture video moments, slide definitions, and textbook proofs.
          </p>
        </div>

        {/* Feature G Callout */}
        <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 flex items-center gap-2.5 text-xs text-amber-900 max-w-md">
          <Flame className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <strong className="block">Feature G • Professor Emphasis Heatmap</strong>
            <span className="text-[11px] text-amber-800">
              Cross-correlating concepts mentioned repeatedly in videos & slides gives high revision priority.
            </span>
          </div>
        </div>
      </div>

      {/* Main Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Tree Navigation (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Network className="w-4 h-4 text-brand-600" />
              <span>Concept Tree Hierarchy</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Click node to inspect
            </span>
          </div>

          {/* Search input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search concepts (e.g. 2NF, Joins)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="overflow-y-auto max-h-[580px] space-y-1 pr-1">
            {concepts.map((rootNode) => renderTree(rootNode))}
          </div>

          {/* Legend */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Strong (80%+)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> Review (55-79%)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span> Weak (&lt;55%)
            </span>
          </div>
        </div>

        {/* Right Side: Selected Concept Inspector (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            {/* Top header of concept */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                    {selectedConcept.category}
                  </span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      selectedConcept.status === 'strong'
                        ? 'bg-emerald-100 text-emerald-800'
                        : selectedConcept.status === 'needs_practice'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    Mastery: {selectedConcept.masteryPercentage}%
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                  {selectedConcept.name}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openTeachBack(selectedConcept.id, selectedConcept.name, `Explain ${selectedConcept.name} and why it is essential for database consistency.`)}
                  className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 transition"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Teach It Back</span>
                </button>

                <button
                  onClick={() => setActiveTab('assessment')}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm flex items-center gap-1.5 transition"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Test Concept</span>
                </button>
              </div>
            </div>

            {/* Definition & Importance */}
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Formal Definition
                </h4>
                <p className="text-sm text-slate-800 mt-1 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  {selectedConcept.definition}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Why It Matters
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {selectedConcept.whyImportant}
                </p>
              </div>
            </div>

            {/* Feature G: Professor Emphasis Metrics */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200/90 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    Professor Emphasis Detection
                  </h4>
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                  {selectedConcept.professorEmphasis.level} PRIORITY
                </span>
              </div>

              <p className="text-xs text-amber-950 font-medium">
                {selectedConcept.professorEmphasis.note}
              </p>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-amber-200/60 text-xs">
                <div className="bg-white/80 p-2 rounded-lg text-center">
                  <span className="text-[10px] text-slate-500 block">Lecture Videos</span>
                  <span className="font-bold text-rose-600">
                    {selectedConcept.professorEmphasis.videoMentions}x Mentions
                  </span>
                </div>
                <div className="bg-white/80 p-2 rounded-lg text-center">
                  <span className="text-[10px] text-slate-500 block">Slide Decks</span>
                  <span className="font-bold text-amber-600">
                    {selectedConcept.professorEmphasis.slideMentions}x Mentions
                  </span>
                </div>
                <div className="bg-white/80 p-2 rounded-lg text-center">
                  <span className="text-[10px] text-slate-500 block">Textbook</span>
                  <span className="font-bold text-blue-600">
                    {selectedConcept.professorEmphasis.bookMentions}x Pages
                  </span>
                </div>
              </div>
            </div>

            {/* Fused Sources */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Fused Multimodal Sources
              </h4>

              <div className="space-y-2">
                {selectedConcept.sources.map((src) => (
                  <div
                    key={src.id}
                    onClick={() => openSourceModal(src)}
                    className="p-3 rounded-xl border border-slate-200 hover:border-brand-400 bg-slate-50/50 hover:bg-brand-50/30 transition cursor-pointer flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <span className="p-1.5 rounded-lg bg-white border border-slate-200 shrink-0">
                        {src.materialType === 'textbook' && <BookOpen className="w-4 h-4 text-blue-500" />}
                        {src.materialType === 'slide' && <Layers className="w-4 h-4 text-amber-500" />}
                        {src.materialType === 'video' && <Video className="w-4 h-4 text-rose-500" />}
                      </span>
                      <div className="truncate">
                        <span className="font-bold text-slate-800 block truncate">
                          {src.title} ({src.locator})
                        </span>
                        <span className="text-slate-500 text-[11px] truncate block">
                          "{src.excerpt}"
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1 shrink-0">
                      <span>View</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
