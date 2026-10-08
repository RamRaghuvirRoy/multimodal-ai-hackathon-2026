import React, { useState, useRef, useEffect } from 'react';
import { useLearning } from '../context/LearningContext';
import { ChatMessage, SourceCitation } from '../types';
import {
  Send,
  Sparkles,
  BookOpen,
  Layers,
  Video,
  ExternalLink,
  Bot,
  User,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Compass,
  ArrowRight,
  HelpCircle,
  RotateCcw,
} from 'lucide-react';

export const AITutorPage: React.FC = () => {
  const {
    openSourceModal,
    openTeachBack,
    setActiveTab,
    learningDNA,
    concepts,
  } = useLearning();

  const [activeTopic, setActiveTopic] = useState('Normalization');
  const [activeMode, setActiveMode] = useState<
    'Explain' | 'Give Example' | 'Test Me' | 'Teach Step-by-Step' | 'Teach It Back' | 'Why Am I Wrong?'
  >('Explain');
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'tutor',
      timestamp: '10:14 AM',
      text: 'Hello Alex! I am your LearnMate AI study companion. I have unified your DBMS Textbook (Elmasri & Navathe 7th Ed), Prof. Vance\'s CS340 lecture slides, and your Week 4 lecture video recordings.\n\nI noticed your recent assessment indicated a conceptual hesitation around Second Normal Form (2NF) and composite keys. How can I help you master this today?',
      sources: [
        {
          id: 'src-tut-1',
          materialType: 'textbook',
          title: 'Fundamentals of Database Systems',
          locator: 'Page 143',
          excerpt: 'Normalization reduces redundancy by organizing data into well-structured relations.'
        },
        {
          id: 'src-tut-2',
          materialType: 'slide',
          title: 'CS340 Lecture 05: Normal Forms',
          locator: 'Slide 27',
          excerpt: 'Partial Dependency: If X -> Y where X is a proper subset of candidate key, 2NF is violated.'
        },
        {
          id: 'src-tut-3',
          materialType: 'video',
          title: 'Lecture 08 Recording',
          locator: '12:42–13:18',
          timestampSeconds: 762,
          excerpt: 'Prof. Vance: "StudentName depends strictly on StudentID alone! That is an illegal partial dependency that breaks 2NF."'
        }
      ],
      suggestedFollowUps: [
        'Why does 2NF only apply to composite keys?',
        'Give a concrete example of table decomposition for 2NF',
        'How does 2NF differ from 3NF?'
      ]
    }
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query,
      mode: activeMode,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      let responseText = '';
      let citations: SourceCitation[] = [];
      let followUps: string[] = [];

      const lower = query.toLowerCase();

      if (lower.includes('composite') || lower.includes('2nf') || lower.includes('partial')) {
        responseText =
          'Great question! In relational database theory, **Second Normal Form (2NF)** is designed to eliminate *partial functional dependencies*.\n\nHere is the core rule:\n1. The relation must be in **1NF** (atomic attributes).\n2. **Every non-prime attribute must depend on the WHOLE candidate key**, not a proper subset.\n\nWhy does this ONLY apply to composite keys? Because if a candidate key consists of a single attribute (e.g. `StudentID`), that key has NO proper subsets that contain attributes! Therefore, a single-attribute key table is *automatically* in 2NF if it satisfies 1NF.';
        citations = [
          {
            id: 'c-cite-1',
            materialType: 'textbook',
            title: 'Fundamentals of Database Systems',
            locator: 'Page 152',
            excerpt: 'A relation schema R is in 2NF if every non-prime attribute A is not partially dependent on any candidate key.'
          },
          {
            id: 'c-cite-2',
            materialType: 'slide',
            title: 'CS340 Lecture 05: Normal Forms',
            locator: 'Slide 27',
            excerpt: 'EXAM WARNING: Whenever you see a COMPOSITE key, check if any column depends on just ONE part of the key.'
          },
          {
            id: 'c-cite-3',
            materialType: 'video',
            title: 'Lecture 08 Recording',
            locator: '12:42–13:18',
            timestampSeconds: 762,
            excerpt: 'Prof. Vance: "If your PK is (StudentID, CourseID), but Grade depends on both, while CourseName depends only on CourseID — that is an illegal partial dependency!"'
          }
        ];
        followUps = [
          'Decompose Enroll(StudentID, CourseID, Grade, CourseName)',
          'What happens if I ignore 2NF and insert a new student?',
          'Test me with a 2NF quiz question'
        ];
      } else if (lower.includes('example') || lower.includes('decomposition')) {
        responseText =
          'Here is a real example directly matching Slide 28 and your textbook:\n\nConsider the unnormalized table:\n`Enroll(StudentID, CourseID, StudentName, CourseName, Grade)`\n\n**Candidate Key:** `(StudentID, CourseID)`\n\n**Violating Partial Dependencies:**\n• `StudentID -> StudentName` (depends on subset)\n• `CourseID -> CourseName` (depends on subset)\n\n**2NF Decomposition Solution:**\nSplit into 3 lossless relations:\n1. `Students(StudentID, StudentName)` [PK: StudentID]\n2. `Courses(CourseID, CourseName)` [PK: CourseID]\n3. `Grades(StudentID, CourseID, Grade)` [PK: (StudentID, CourseID)]\n\nNow, if a course name changes, you only update ONE row in `Courses` instead of updating 500 enrollment rows!';
        citations = [
          {
            id: 'c-cite-4',
            materialType: 'slide',
            title: 'CS340 Lecture 05: Normal Forms',
            locator: 'Slide 29',
            excerpt: 'Decomposition step: Separate R into R1(X, Y) and R2(R - Y) where X -> Y was the offending partial dependency.'
          },
          {
            id: 'c-cite-5',
            materialType: 'textbook',
            title: 'Fundamentals of Database Systems',
            locator: 'Page 154',
            excerpt: 'Decomposition guarantees lossless join and dependency preservation.'
          }
        ];
        followUps = [
          'Why does this satisfy Lossless Join property?',
          'Now explain 3NF and Transitive Dependencies',
          'Launch Teach-Back mode to verify my understanding'
        ];
      } else {
        responseText = `Based on your course materials for **${activeTopic}**, here is the synthesized explanation:\n\nProf. Marcus Vance emphasizes that relational schema integrity relies on strict functional dependency evaluation. When designing relational schemas, always determine all Candidate Keys first before testing normal forms (1NF -> 2NF -> 3NF -> BCNF).\n\nNotice that in Lecture 08, Prof. Vance spent 25 minutes specifically reviewing composite primary keys because students frequently confuse partial dependencies with transitive dependencies.`;
        citations = [
          {
            id: 'c-cite-gen',
            materialType: 'video',
            title: 'Lecture 08 Recording',
            locator: '04:15–08:40',
            timestampSeconds: 255,
            excerpt: 'Always identify all Candidate Keys first before declaring any normal form.'
          },
          {
            id: 'c-cite-gen2',
            materialType: 'textbook',
            title: 'Fundamentals of Database Systems',
            locator: 'Page 143',
            excerpt: 'Relational database schema synthesis guarantees minimum redundancy.'
          }
        ];
        followUps = [
          'Can you give me a concrete example?',
          'Test me with an adaptive question',
          'Explain step-by-step'
        ];
      }

      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'tutor',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: responseText,
        sources: citations,
        suggestedFollowUps: followUps,
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 1100);
  };

  const handleModeClick = (mode: typeof activeMode) => {
    setActiveMode(mode);
    if (mode === 'Teach It Back') {
      openTeachBack('c-2nf', 'Second Normal Form (2NF)', 'Explain what a partial functional dependency is in your own words, and how table decomposition fixes it.');
    } else if (mode === 'Test Me') {
      setActiveTab('assessment');
    } else if (mode === 'Why Am I Wrong?') {
      setActiveTab('misconceptions');
    } else if (mode === 'Give Example') {
      handleSendMessage('Can you give me a clear, concrete example of 2NF table decomposition with sample table rows?');
    } else if (mode === 'Teach Step-by-Step') {
      handleSendMessage('Teach me 2NF and composite keys step-by-step from first principles.');
    } else {
      handleSendMessage('Explain the core intuition of 2NF and why partial dependencies are dangerous.');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
              RAG SOURCE FUSION TUTOR
            </span>
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
              3 Modalities Synchronized
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
            Personal AI Study Companion
          </h1>
          <p className="text-xs text-slate-600">
            Ask any question. Answers are grounded in your textbook, class slides, and lecture recording timestamps.
          </p>
        </div>

        {/* Action Modes Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs">
          {(
            [
              'Explain',
              'Give Example',
              'Test Me',
              'Teach Step-by-Step',
              'Teach It Back',
              'Why Am I Wrong?',
            ] as const
          ).map((m) => (
            <button
              key={m}
              onClick={() => handleModeClick(m)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeMode === m
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {m === 'Teach It Back' && <Sparkles className="w-3 h-3 inline mr-1 text-amber-300" />}
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Layout: Left Chat (8 cols), Right Learning Context (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Chat Workspace (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[680px] overflow-hidden">
          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[90%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white text-xs ${
                    msg.sender === 'user'
                      ? 'bg-slate-800'
                      : 'bg-gradient-to-tr from-brand-700 to-indigo-600 shadow-xs'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className="space-y-3">
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-brand-600 text-white shadow-xs rounded-tr-none'
                        : 'bg-white text-slate-800 border border-slate-200 shadow-xs rounded-tl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>

                  {/* Sources Badges (Tri-Source Grounding) */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-2 shadow-xs">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                        <span>Source Grounding Badges</span>
                        <span className="text-brand-600">Click to inspect excerpt</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {msg.sources.map((src) => (
                          <button
                            key={src.id}
                            onClick={() => openSourceModal(src)}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 hover:bg-brand-50 text-slate-700 hover:text-brand-700 border border-slate-200 hover:border-brand-300 transition text-left"
                          >
                            {src.materialType === 'textbook' && <BookOpen className="w-3.5 h-3.5 text-blue-500 shrink-0" />}
                            {src.materialType === 'slide' && <Layers className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                            {src.materialType === 'video' && <Video className="w-3.5 h-3.5 text-rose-500 shrink-0" />}
                            <span className="font-mono text-[11px] text-brand-800">{src.locator}</span>
                            <span className="text-[11px] text-slate-500 max-w-[140px] truncate">
                              • {src.title}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggested Followups */}
                  {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestedFollowUps.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(prompt)}
                          className="text-xs px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 font-medium transition"
                        >
                          ↳ {prompt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center text-white text-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-xs text-slate-400 font-mono ml-1">
                    Synthesizing Textbook & Video Timestamps...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-4 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about 2NF, Joins, ER diagrams, or quote a professor video moment..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="flex-1 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isTyping}
                className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Ask Tutor</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Learning Context Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                LEARNING CONTEXT
              </span>
              <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                CS340 Adaptive Sync
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Current Topic</span>
                <span className="text-sm font-bold text-slate-800">
                  Schema Normalization & Relational Theory
                </span>
              </div>

              <div>
                <div className="flex justify-between text-slate-600 font-medium mb-1">
                  <span>Topic Mastery</span>
                  <span className="font-bold text-slate-900">48% (Weak)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full w-[48%] rounded-full"></div>
                </div>
              </div>

              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-rose-950 space-y-1">
                <div className="flex items-center gap-1.5 text-rose-800 font-bold uppercase text-[10px]">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Recent Diagnostic Mistake</span>
                </div>
                <p className="text-xs font-medium">
                  Confused 2NF Partial Functional Dependency with 3NF Transitive Dependency.
                </p>
              </div>

              <div className="p-3 bg-brand-50 rounded-xl border border-brand-200 text-brand-950 space-y-1">
                <div className="flex items-center gap-1.5 text-brand-800 font-bold uppercase text-[10px]">
                  <Lightbulb className="w-3.5 h-3.5 text-brand-600" />
                  <span>Adaptive Recommendation</span>
                </div>
                <p className="text-xs font-medium">
                  Practice composite key decomposition before advancing to 3NF and BCNF synthesis.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Grounding Resources In Context
                </span>
                <div className="text-[11px] space-y-1.5 text-slate-600">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                    <span>Elmasri & Navathe: Ch 14 (p.143-162)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-amber-500" />
                    <span>Lecture 05 Slides 26-32</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="w-3.5 h-3.5 text-rose-500" />
                    <span>Lecture 08 Recording (12:42–13:18)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openTeachBack('c-2nf', 'Second Normal Form (2NF)', 'Explain why composite keys are required for partial dependency and how to decompose tables.')}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-600 text-white shadow-xs flex items-center justify-center gap-2 transition"
              >
                <Sparkles className="w-4 h-4 text-amber-100" />
                <span>Launch Teach-Back Mode</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
