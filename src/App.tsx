import React from 'react';
import { LearningProvider, useLearning } from './context/LearningContext';
import { Navbar } from './components/Navbar';
import { SourceModal } from './components/SourceModal';
import { WhyAmIWrongModal } from './components/WhyAmIWrongModal';
import { TeachBackModal } from './components/TeachBackModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { MaterialLibraryPage } from './pages/MaterialLibraryPage';
import { KnowledgeBasePage } from './pages/KnowledgeBasePage';
import { AITutorPage } from './pages/AITutorPage';
import { AdaptiveAssessmentPage } from './pages/AdaptiveAssessmentPage';
import { MisconceptionMapPage } from './pages/MisconceptionMapPage';
import { LearningDNAPage } from './pages/LearningDNAPage';
import { RevisionCenterPage } from './pages/RevisionCenterPage';
import { ProgressReportPage } from './pages/ProgressReportPage';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab } = useLearning();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'materials':
        return <MaterialLibraryPage />;
      case 'knowledge':
        return <KnowledgeBasePage />;
      case 'tutor':
        return <AITutorPage />;
      case 'assessment':
        return <AdaptiveAssessmentPage />;
      case 'misconceptions':
        return <MisconceptionMapPage />;
      case 'dna':
        return <LearningDNAPage />;
      case 'revision':
        return <RevisionCenterPage />;
      case 'report':
        return <ProgressReportPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand-500 selection:text-white text-slate-900">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {renderActivePage()}
      </main>

      {/* Global Modals */}
      <SourceModal />
      <WhyAmIWrongModal />
      <TeachBackModal />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-sm text-slate-900 tracking-tight">
              LearnMate<span className="text-brand-600">.ai</span>
            </span>
            <span>•</span>
            <span>Multimodal AI Hackathon 2026 — Track D (Personalized Tutoring & Adaptive Learning)</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-600 font-medium">
            <button onClick={() => setActiveTab('materials')} className="hover:text-brand-600 transition">
              Materials Library
            </button>
            <button onClick={() => setActiveTab('knowledge')} className="hover:text-brand-600 transition">
              Knowledge Base
            </button>
            <button onClick={() => setActiveTab('misconceptions')} className="hover:text-brand-600 transition">
              Misconception Map
            </button>
            <button onClick={() => setActiveTab('dna')} className="hover:text-brand-600 transition">
              Learning DNA
            </button>
            <button onClick={() => setActiveTab('report')} className="hover:text-brand-600 transition">
              Report Card
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <LearningProvider>
      <AppContent />
    </LearningProvider>
  );
}

export default App;
