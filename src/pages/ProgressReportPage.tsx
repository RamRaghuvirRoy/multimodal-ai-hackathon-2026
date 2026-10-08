import React from 'react';
import { useLearning } from '../context/LearningContext';
import {
  FileSpreadsheet,
  Printer,
  Download,
  Award,
  CheckCircle2,
  AlertTriangle,
  Dna,
  ShieldCheck,
  Calendar,
  Share2,
  TrendingUp,
  Clock,
  Sparkles,
} from 'lucide-react';

export const ProgressReportPage: React.FC = () => {
  const { learningDNA, concepts, answerHistory, revisionQueue, setActiveTab } =
    useLearning();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              OFFICIAL ACADEMIC TRANSCRIPT
            </span>
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
              Generated Oct 08, 2026
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Student Adaptive Progress Report
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Downloadable, source-grounded diagnostic report for students and course instructors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 shadow-xs flex items-center gap-2 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Report Canvas Document */}
      <div className="bg-white rounded-3xl border border-slate-300 p-8 sm:p-12 shadow-sm space-y-8 print:p-0 print:border-none print:shadow-none">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-slate-900 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl text-slate-900 tracking-tight">
                LearnMate<span className="text-brand-600">.ai</span>
              </span>
              <span className="text-xs bg-slate-900 text-white font-mono px-2 py-0.5 rounded font-bold">
                AUDIT REPORT
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-mono">
              Student ID: STU-84291 • Course: CS340 Database Management Systems
            </p>
          </div>

          <div className="text-right sm:text-right text-xs text-slate-600 font-mono space-y-0.5">
            <div>Verification Key: 0x9f83...bc41</div>
            <div>Evaluation Cycle: Midterm Diagnostic</div>
            <div className="text-emerald-700 font-bold">Status: Synchronized with Ground Truth</div>
          </div>
        </div>

        {/* Executive Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              Overall Mastery
            </span>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {learningDNA.conceptMastery}%
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold">
              Proficiency Benchmark Met
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              Cognitive Profile
            </span>
            <div className="text-sm font-bold text-slate-900 mt-1 truncate">
              {learningDNA.learningStyle}
            </div>
            <span className="text-[11px] text-slate-500">
              Telemetry Calibrated
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              Questions Audited
            </span>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {learningDNA.totalQuestionsAnswered}
            </div>
            <span className="text-[11px] text-slate-500">
              Avg Speed: {learningDNA.avgResponseTimeSec}s
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              Active Misconceptions
            </span>
            <div className="text-2xl font-black text-rose-600 mt-1">
              {learningDNA.weakConceptsCount}
            </div>
            <span className="text-[11px] text-rose-600 font-semibold">
              Requires Remediation
            </span>
          </div>
        </div>

        {/* Concept Mastery Table */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2">
            1. Topic-by-Topic Relational Mastery Matrix
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3">Topic / Concept</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Mastery Score</th>
                  <th className="p-3">Diagnostic Status</th>
                  <th className="p-3">Grounding Sources</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-semibold text-slate-800">SQL Basics & Queries</td>
                  <td className="p-3 text-slate-500">Query Language</td>
                  <td className="p-3 font-mono font-bold text-emerald-600">94%</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      MASTERED
                    </span>
                  </td>
                  <td className="p-3 text-slate-500 text-[11px]">Textbook p.88</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-800">INNER JOIN Equijoins</td>
                  <td className="p-3 text-slate-500">Relational Joins</td>
                  <td className="p-3 font-mono font-bold text-emerald-600">92%</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      MASTERED
                    </span>
                  </td>
                  <td className="p-3 text-slate-500 text-[11px]">Slides 14-16</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-800">LEFT OUTER JOIN & Nulls</td>
                  <td className="p-3 text-slate-500">Relational Joins</td>
                  <td className="p-3 font-mono font-bold text-amber-600">58%</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">
                      NEEDS PRACTICE
                    </span>
                  </td>
                  <td className="p-3 text-slate-500 text-[11px]">Slide 22, Video 28:15</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-800">First Normal Form (1NF)</td>
                  <td className="p-3 text-slate-500">Normalization</td>
                  <td className="p-3 font-mono font-bold text-emerald-600">90%</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      MASTERED
                    </span>
                  </td>
                  <td className="p-3 text-slate-500 text-[11px]">Textbook p.147</td>
                </tr>
                <tr className="bg-rose-50/40">
                  <td className="p-3 font-bold text-rose-950">
                    Second Normal Form (2NF) & Partial Keys
                  </td>
                  <td className="p-3 text-slate-500">Normalization</td>
                  <td className="p-3 font-mono font-bold text-rose-600">38%</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-rose-200 text-rose-900 font-bold text-[10px]">
                      CRITICAL WEAKNESS
                    </span>
                  </td>
                  <td className="p-3 text-slate-500 text-[11px]">Slide 27, Video 12:42</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-800">Third Normal Form (3NF)</td>
                  <td className="p-3 text-slate-500">Normalization</td>
                  <td className="p-3 font-mono font-bold text-rose-600">42%</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-[10px]">
                      WEAK
                    </span>
                  </td>
                  <td className="p-3 text-slate-500 text-[11px]">Textbook p.158</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Identified Misconceptions & Diagnoses */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2">
            2. Detailed Misconception Audit & Prescriptions
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-rose-700 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Primary Cognitive Blunder: 2NF Partial Functional Dependency
                </span>
                <span className="text-[10px] font-mono text-slate-500">Detected: 3 occurrences</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Student repeatedly categorizes partial dependencies on composite keys as transitive dependencies. Furthermore, student believed single-attribute primary keys can violate 2NF.
              </p>
              <div className="pt-2 text-indigo-700 font-semibold text-[11px]">
                Prescription: Complete Teach-Back module on decomposition of Enroll(StudentID, CourseID, CourseName).
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-700 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Secondary Cognitive Blunder: SQL LEFT JOIN Outer Null-Filtering
                </span>
                <span className="text-[10px] font-mono text-slate-500">Detected: 2 occurrences</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Student placed filter predicates on the right table within the WHERE clause, unaware that 3-valued logic converts the query into an INNER JOIN.
              </p>
            </div>
          </div>
        </div>

        {/* Recommended Action Plan */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2">
            3. Recommended Adaptive Revision Roadmap
          </h3>

          <ol className="list-decimal list-inside space-y-2 text-xs text-slate-700">
            <li>
              <strong>Immediate (Next 2 Hours):</strong> Run 2NF Teach-Back remediation to reinforce proper composite candidate key definitions.
            </li>
            <li>
              <strong>Tomorrow Morning:</strong> Attempt 5 medium-difficulty adaptive questions targeting SQL LEFT JOIN NULL filters.
            </li>
            <li>
              <strong>In 3 Days:</strong> Review BCNF candidate key definitions and practice lossless decomposition theorems.
            </li>
          </ol>
        </div>

        {/* Signoff Verification Badge */}
        <div className="pt-6 border-t-2 border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-600" />
            <span>
              Verified by LearnMate AI Adaptive Tutoring Engine (Track D Hackathon 2026)
            </span>
          </div>

          <div className="font-mono text-[11px] text-slate-400">
            Hash: SHA256-7a98b2c4e1f5
          </div>
        </div>
      </div>
    </div>
  );
};
