export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export type MaterialType = 'textbook' | 'slide' | 'video' | 'notes';

export interface SourceCitation {
  id: string;
  materialType: MaterialType;
  title: string;
  locator: string; // e.g. "Page 143", "Slide 27", "12:42–13:18"
  timestampSeconds?: number;
  excerpt: string;
  contextSnippet?: string;
  professorEmphasisCount?: number;
}

export interface MaterialItem {
  id: string;
  title: string;
  type: MaterialType;
  authorOrProf: string;
  sizeOrDuration: string;
  status: 'Ready' | 'Processing' | 'Indexed';
  indexedChunks: number;
  uploadDate: string;
  summary: string;
  keyTopics: string[];
  emphasisHighlights: {
    topic: string;
    mentions: number;
    quote: string;
  }[];
}

export interface ConceptNode {
  id: string;
  name: string;
  category: string;
  parentId?: string;
  status: 'strong' | 'needs_practice' | 'weak';
  masteryPercentage: number;
  definition: string;
  whyImportant: string;
  professorEmphasis: {
    level: 'HIGH' | 'MEDIUM' | 'LOW';
    videoMentions: number;
    slideMentions: number;
    bookMentions: number;
    note: string;
  };
  sources: SourceCitation[];
  misconceptionDetails?: {
    identifiedIssue: string;
    reasonDetected: string;
    commonMentalTrap: string;
    studentFailedQuestions: {
      question: string;
      studentSelected: string;
      correctAnswer: string;
      explanation: string;
    }[];
    remediationAction: string;
  };
  children?: ConceptNode[];
}

export interface AssessmentQuestion {
  id: string;
  conceptId: string;
  conceptName: string;
  difficulty: DifficultyLevel;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  commonMisconception: string;
  sources: SourceCitation[];
  whyWrongMap: {
    [optionIndex: number]: string;
  };
}

export interface StudentAnswerRecord {
  questionId: string;
  questionText: string;
  conceptId: string;
  conceptName: string;
  difficulty: DifficultyLevel;
  selectedOptionIndex: number;
  isCorrect: boolean;
  confidenceRating: number; // 1 to 5
  timeSpentSeconds: number;
  timestamp: string;
  quadrantCategory: 'Solid Mastery' | 'Dangerous Misconception' | 'Fragile Knowledge' | 'Knowledge Gap';
}

export interface LearningDNAData {
  conceptMastery: number; // 0-100
  retention: number; // 0-100
  problemSolving: number; // 0-100
  conceptualReasoning: number; // 0-100
  application: number; // 0-100
  learningStyle: string; // e.g., "Example-driven learner"
  learningStyleDescription: string;
  avgResponseTimeSec: number;
  accuracyRate: number;
  confidenceCalibrationScore: number;
  streakDays: number;
  totalQuestionsAnswered: number;
  weakConceptsCount: number;
  masteredConceptsCount: number;
  difficultyProgress: {
    easyCount: number;
    mediumCount: number;
    hardCount: number;
  };
}

export interface RevisionQueueItem {
  id: string;
  conceptId: string;
  conceptName: string;
  urgency: 'high' | 'medium' | 'low' | 'mastered';
  urgencyLabel: 'Weak' | 'Needs Practice' | 'Review Tomorrow' | 'Mastered';
  lastPracticed: string;
  retentionScore: number;
  mistakeFrequency: number;
  recommendedAction: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  timestamp: string;
  text: string;
  mode?: 'Explain' | 'Give Example' | 'Test Me' | 'Teach Step-by-Step' | 'Teach It Back' | 'Why Am I Wrong?';
  sources?: SourceCitation[];
  teachBackEvaluation?: {
    accuracyScore: number;
    completenessScore: number;
    missingConcepts: string[];
    spottedMisconceptions: string[];
    feedback: string;
    needsRetry: boolean;
  };
  suggestedFollowUps?: string[];
}
