import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MaterialItem,
  ConceptNode,
  AssessmentQuestion,
  LearningDNAData,
  RevisionQueueItem,
  StudentAnswerRecord,
  SourceCitation,
  DifficultyLevel,
} from '../types';
import {
  INITIAL_MATERIALS,
  INITIAL_CONCEPTS,
  INITIAL_QUESTIONS,
  INITIAL_LEARNING_DNA,
  INITIAL_ANSWER_HISTORY,
  INITIAL_REVISION_QUEUE,
} from '../data/mockData';

export type NavigationPage =
  | 'landing'
  | 'dashboard'
  | 'materials'
  | 'knowledge'
  | 'tutor'
  | 'assessment'
  | 'misconceptions'
  | 'dna'
  | 'revision'
  | 'report';

interface LearningContextType {
  activeTab: NavigationPage;
  setActiveTab: (tab: NavigationPage) => void;
  materials: MaterialItem[];
  addMaterial: (material: MaterialItem) => void;
  concepts: ConceptNode[];
  updateConceptMastery: (conceptId: string, deltaMastery: number) => void;
  learningDNA: LearningDNAData;
  answerHistory: StudentAnswerRecord[];
  revisionQueue: RevisionQueueItem[];
  availableQuestions: AssessmentQuestion[];
  // Modals & Inspectors
  activeSourceModal: SourceCitation | null;
  openSourceModal: (source: SourceCitation) => void;
  closeSourceModal: () => void;
  activeConceptDetail: ConceptNode | null;
  openConceptDetail: (concept: ConceptNode) => void;
  closeConceptDetail: () => void;
  activeWhyWrongData: {
    question: AssessmentQuestion;
    selectedOptionIndex: number;
    explanation: string;
    commonMisconception: string;
    whyWrongReason: string;
    source: SourceCitation;
  } | null;
  openWhyWrongModal: (
    question: AssessmentQuestion,
    selectedOptionIndex: number
  ) => void;
  closeWhyWrongModal: () => void;
  teachBackOpen: boolean;
  teachBackTopic: {
    conceptId: string;
    title: string;
    prompt: string;
  };
  openTeachBack: (conceptId?: string, title?: string, prompt?: string) => void;
  closeTeachBack: () => void;
  completeTeachBackRemediation: (score: number) => void;
  // Assessment actions
  recordAnswer: (
    question: AssessmentQuestion,
    selectedOptionIndex: number,
    confidenceRating: number,
    timeSpentSeconds: number
  ) => {
    isCorrect: boolean;
    quadrantCategory: StudentAnswerRecord['quadrantCategory'];
    adaptationAction: string;
    newDifficulty: DifficultyLevel;
  };
  // Hackathon demo assistant
  demoStep: number;
  setDemoStep: (step: number) => void;
  resetDemoToInitial: () => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavigationPage>('landing');
  const [materials, setMaterials] = useState<MaterialItem[]>(INITIAL_MATERIALS);
  const [concepts, setConcepts] = useState<ConceptNode[]>(INITIAL_CONCEPTS);
  const [learningDNA, setLearningDNA] = useState<LearningDNAData>(INITIAL_LEARNING_DNA);
  const [answerHistory, setAnswerHistory] = useState<StudentAnswerRecord[]>(INITIAL_ANSWER_HISTORY);
  const [revisionQueue, setRevisionQueue] = useState<RevisionQueueItem[]>(INITIAL_REVISION_QUEUE);
  const [availableQuestions] = useState<AssessmentQuestion[]>(INITIAL_QUESTIONS);

  // Modals
  const [activeSourceModal, setActiveSourceModal] = useState<SourceCitation | null>(null);
  const [activeConceptDetail, setActiveConceptDetail] = useState<ConceptNode | null>(null);
  const [activeWhyWrongData, setActiveWhyWrongData] = useState<{
    question: AssessmentQuestion;
    selectedOptionIndex: number;
    explanation: string;
    commonMisconception: string;
    whyWrongReason: string;
    source: SourceCitation;
  } | null>(null);

  const [teachBackOpen, setTeachBackOpen] = useState(false);
  const [teachBackTopic, setTeachBackTopic] = useState({
    conceptId: 'c-2nf',
    title: 'Second Normal Form (2NF) & Partial Dependencies',
    prompt: 'Explain what a partial functional dependency is in your own words, why it only happens with composite keys, and how you decompose a table to fix it.'
  });

  const [demoStep, setDemoStep] = useState(1);

  // Sync demo step with active tab for smooth presentation
  useEffect(() => {
    if (demoStep === 1) setActiveTab('materials');
    else if (demoStep === 2) setActiveTab('knowledge');
    else if (demoStep === 3) setActiveTab('tutor');
    else if (demoStep === 4) setActiveTab('assessment');
    else if (demoStep === 5) setActiveTab('misconceptions');
    else if (demoStep === 6) {
      setTeachBackOpen(true);
      setActiveTab('tutor');
    }
    else if (demoStep === 7) setActiveTab('dna');
  }, [demoStep]);

  const addMaterial = (newMat: MaterialItem) => {
    setMaterials(prev => [newMat, ...prev]);
  };

  const updateConceptMastery = (conceptId: string, deltaMastery: number) => {
    const updateRecursive = (nodes: ConceptNode[]): ConceptNode[] => {
      return nodes.map(node => {
        let updatedNode = { ...node };
        if (node.id === conceptId) {
          const newMastery = Math.max(10, Math.min(100, node.masteryPercentage + deltaMastery));
          let newStatus: ConceptNode['status'] = 'needs_practice';
          if (newMastery >= 80) newStatus = 'strong';
          else if (newMastery < 55) newStatus = 'weak';
          updatedNode = { ...node, masteryPercentage: newMastery, status: newStatus };
        }
        if (node.children) {
          updatedNode.children = updateRecursive(node.children);
        }
        return updatedNode;
      });
    };
    setConcepts(prev => updateRecursive(prev));
  };

  const openSourceModal = (source: SourceCitation) => {
    setActiveSourceModal(source);
  };

  const closeSourceModal = () => {
    setActiveSourceModal(null);
  };

  const openConceptDetail = (concept: ConceptNode) => {
    setActiveConceptDetail(concept);
  };

  const closeConceptDetail = () => {
    setActiveConceptDetail(null);
  };

  const openWhyWrongModal = (question: AssessmentQuestion, selectedIdx: number) => {
    const reason = question.whyWrongMap[selectedIdx] || 'This option does not satisfy relational normal form principles.';
    const primarySource = question.sources[0] || {
      id: 'default-src',
      materialType: 'textbook',
      title: 'Fundamentals of Database Systems',
      locator: 'Chapter 14',
      excerpt: question.explanation
    };
    setActiveWhyWrongData({
      question,
      selectedOptionIndex: selectedIdx,
      explanation: question.explanation,
      commonMisconception: question.commonMisconception,
      whyWrongReason: reason,
      source: primarySource
    });
  };

  const closeWhyWrongModal = () => {
    setActiveWhyWrongData(null);
  };

  const openTeachBack = (conceptId?: string, title?: string, prompt?: string) => {
    if (conceptId && title && prompt) {
      setTeachBackTopic({ conceptId, title, prompt });
    }
    setTeachBackOpen(true);
  };

  const closeTeachBack = () => {
    setTeachBackOpen(false);
  };

  const completeTeachBackRemediation = (scorePercentage: number) => {
    // Reward student for completing teach-back
    updateConceptMastery(teachBackTopic.conceptId, Math.round(scorePercentage * 0.15));
    setLearningDNA(prev => ({
      ...prev,
      retention: Math.min(100, prev.retention + 6),
      conceptualReasoning: Math.min(100, prev.conceptualReasoning + 8),
      conceptMastery: Math.min(100, prev.conceptMastery + 4),
      weakConceptsCount: Math.max(0, prev.weakConceptsCount - 1),
      masteredConceptsCount: prev.masteredConceptsCount + 1,
    }));

    // Adjust revision queue
    setRevisionQueue(prev =>
      prev.map(item => {
        if (item.conceptId === teachBackTopic.conceptId) {
          return {
            ...item,
            urgency: 'low',
            urgencyLabel: 'Review Tomorrow',
            retentionScore: Math.min(100, item.retentionScore + 25),
            recommendedAction: 'Solidified via Teach-Back. Retest scheduled in 48 hours.'
          };
        }
        return item;
      })
    );
  };

  const recordAnswer = (
    question: AssessmentQuestion,
    selectedOptionIndex: number,
    confidenceRating: number,
    timeSpentSeconds: number
  ) => {
    const isCorrect = selectedOptionIndex === question.correctOptionIndex;
    const isHighConfidence = confidenceRating >= 4;

    let quadrantCategory: StudentAnswerRecord['quadrantCategory'];
    if (isHighConfidence && isCorrect) {
      quadrantCategory = 'Solid Mastery';
    } else if (isHighConfidence && !isCorrect) {
      quadrantCategory = 'Dangerous Misconception';
    } else if (!isHighConfidence && isCorrect) {
      quadrantCategory = 'Fragile Knowledge';
    } else {
      quadrantCategory = 'Knowledge Gap';
    }

    const newRecord: StudentAnswerRecord = {
      questionId: question.id,
      questionText: question.question,
      conceptId: question.conceptId,
      conceptName: question.conceptName,
      difficulty: question.difficulty,
      selectedOptionIndex,
      isCorrect,
      confidenceRating,
      timeSpentSeconds,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quadrantCategory
    };

    setAnswerHistory(prev => [newRecord, ...prev]);

    // Adaptive Engine calculation
    let adaptationAction = '';
    let newDifficulty: DifficultyLevel = question.difficulty;

    if (isCorrect) {
      if (timeSpentSeconds < 25) {
        adaptationAction = '⚡ Correct & Fast: Elevating difficulty to Hard. Mastery increased.';
        newDifficulty = question.difficulty === 'Easy' ? 'Medium' : 'Hard';
      } else {
        adaptationAction = '✓ Correct but deliberate: Maintaining difficulty to solidify fluency.';
        newDifficulty = question.difficulty;
      }
      updateConceptMastery(question.conceptId, +7);
    } else {
      if (quadrantCategory === 'Dangerous Misconception') {
        adaptationAction = '⚠ Misconception Detected! High confidence on incorrect premise. Reducing difficulty & triggering concept diagnosis.';
        newDifficulty = question.difficulty === 'Hard' ? 'Medium' : 'Easy';
      } else {
        adaptationAction = '✗ Knowledge gap identified: Stepping down difficulty for foundational reinforcement.';
        newDifficulty = 'Easy';
      }
      updateConceptMastery(question.conceptId, -9);

      // Prioritize in revision queue
      setRevisionQueue(prev => {
        const existing = prev.find(p => p.conceptId === question.conceptId);
        if (existing) {
          return prev.map(p =>
            p.conceptId === question.conceptId
              ? {
                  ...p,
                  urgency: 'high',
                  urgencyLabel: 'Weak',
                  mistakeFrequency: p.mistakeFrequency + 1,
                  retentionScore: Math.max(20, p.retentionScore - 15),
                  recommendedAction: 'Immediate Remediation: Review slide notes & execute Teach-Back.'
                }
              : p
          );
        } else {
          return [
            {
              id: `rev-${Date.now()}`,
              conceptId: question.conceptId,
              conceptName: question.conceptName,
              urgency: 'high',
              urgencyLabel: 'Weak',
              lastPracticed: 'Just now',
              retentionScore: 35,
              mistakeFrequency: 1,
              recommendedAction: 'Urgent diagnosis triggered by adaptive quiz.'
            },
            ...prev
          ];
        }
      });
    }

    // Update Learning DNA stats
    setLearningDNA(prev => {
      const newTotal = prev.totalQuestionsAnswered + 1;
      const newAcc = Math.round(((prev.accuracyRate * prev.totalQuestionsAnswered + (isCorrect ? 100 : 0)) / newTotal));
      const deltaSpeed = Math.round((prev.avgResponseTimeSec + timeSpentSeconds) / 2);
      return {
        ...prev,
        totalQuestionsAnswered: newTotal,
        accuracyRate: newAcc,
        avgResponseTimeSec: deltaSpeed,
        problemSolving: Math.min(100, isCorrect ? prev.problemSolving + 2 : prev.problemSolving - 1),
        difficultyProgress: {
          ...prev.difficultyProgress,
          [question.difficulty.toLowerCase() + 'Count']: (prev.difficultyProgress as any)[question.difficulty.toLowerCase() + 'Count'] + 1
        }
      };
    });

    return {
      isCorrect,
      quadrantCategory,
      adaptationAction,
      newDifficulty
    };
  };

  const resetDemoToInitial = () => {
    setMaterials(INITIAL_MATERIALS);
    setConcepts(INITIAL_CONCEPTS);
    setLearningDNA(INITIAL_LEARNING_DNA);
    setAnswerHistory(INITIAL_ANSWER_HISTORY);
    setRevisionQueue(INITIAL_REVISION_QUEUE);
    setDemoStep(1);
    setActiveTab('landing');
  };

  return (
    <LearningContext.Provider
      value={{
        activeTab,
        setActiveTab,
        materials,
        addMaterial,
        concepts,
        updateConceptMastery,
        learningDNA,
        answerHistory,
        revisionQueue,
        availableQuestions,
        activeSourceModal,
        openSourceModal,
        closeSourceModal,
        activeConceptDetail,
        openConceptDetail,
        closeConceptDetail,
        activeWhyWrongData,
        openWhyWrongModal,
        closeWhyWrongModal,
        teachBackOpen,
        teachBackTopic,
        openTeachBack,
        closeTeachBack,
        completeTeachBackRemediation,
        recordAnswer,
        demoStep,
        setDemoStep,
        resetDemoToInitial,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
