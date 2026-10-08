# 🎓 LearnMate AI

> **"Your Study Material. Your Learning Pattern. Your Personal AI Tutor."**  
> *Production-Ready Submission for Multimodal AI Hackathon 2026 — Track D: Personalized Tutoring & Adaptive Learning*

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-purple.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Track](https://img.shields.io/badge/Track-D%20Personalized%20Tutoring-emerald.svg)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📌 Problem Statement

Traditional AI study applications suffer from critical limitations:
1. **Generic "Chat with PDF" Wrappers:** They function merely as passive Q&A retrieval search bars over single documents, completely lacking adaptive learning, cognitive error detection, or longitudinal mastery tracking.
2. **Fragmented Multimodal Resources:** Students study across disparate media—thick PDF textbooks, slide decks (PPTX), and lengthy lecture video recordings—with no unified system connecting textbook proofs to professor lecture timestamps.

**LearnMate AI** solves this by unifying textbooks, lecture slides, video recordings, and review notes into **ONE source-cited, searchable knowledge base** that drives **adaptive assessments, hierarchical misconception detection, Learning DNA profiling, and personalized tutoring**.

---

## 💡 Solution Architecture

```
STUDENT STUDY MATERIALS (PDF, PPTX, MP4, NOTES)
       │
       ▼
CONTENT PARSING & MULTIMODAL INGEST
 (OCR + Whisper Speech-to-Text Timestamps)
       │
       ▼
SEMANTIC CHUNKING + VECTOR RETRIEVAL (RAG)
       │
       ▼
UNIFIED KNOWLEDGE BASE & PROFESSOR EMPHASIS HEATMAP
       │
       ├──► SOURCE-CITED AI TUTOR (6 Pedagogical Modes)
       │
       ├──► ADAPTIVE QUESTION ENGINE (Speed + Accuracy + Confidence)
       │       │
       │       ▼
       ├──► MISCONCEPTION MAP (Hierarchical Diagnostic Tree)
       │       │
       │       ▼
       ├──► AI TEACH-BACK EVALUATOR (Student Explains to AI)
       │       │
       │       ▼
       └──► DYNAMIC LEARNING DNA & SPACED REVISION QUEUE
```

---

## 🚀 Key Differentiators (Why Not Just a ChatGPT Wrapper?)

### 🧬 Feature A — Learning DNA
Instead of only reporting a single percentage score (e.g. `62%`), LearnMate AI computes a 5-dimensional cognitive profile based on real interaction telemetry:
- **Concept Mastery** ($72\%$)
- **Retention Stability** ($68\%$)
- **Problem Solving** ($81\%$)
- **Conceptual Reasoning** ($64\%$)
- **Application & Transfer** ($75\%$)
- **Adaptive Learner Archetype:** e.g., *"Example-driven learner"* (adapts explanations so concrete instances precede abstract functional notation).

### 🗺️ Feature B — Hierarchical Misconception Map
Rather than simply marking an answer wrong, the system isolates the underlying cognitive flaw within a hierarchical taxonomy:
```text
Database Management Systems
 ├── SQL Basics              ✓ Strong (94%)
 ├── Joins                   ⚠ Needs Practice (62%)
 │     ├── INNER JOIN        ✓ Mastered
 │     ├── LEFT JOIN         ✗ (Null-filter trap in WHERE clause)
 │     └── RIGHT JOIN        ✗
 └── Normalization           ⚠ Weak (48%)
       ├── 1NF               ✓ Mastered
       ├── 2NF               ✗ Critical Misconception (Confuses partial with transitive)
       └── 3NF               ✗ Weak (Overlooking prime RHS exemption)
```

### 🎯 Feature C — Confidence vs. Correctness Matrix
Before submitting quiz answers, students report confidence ($1\text{ to }5$). The system plots responses on a 2×2 diagnostic matrix:
- **Quadrant 1 (Solid Mastery):** High Confidence + Correct
- **Quadrant 2 (Dangerous Misconception):** High Confidence + Wrong *(Critical alert)*
- **Quadrant 3 (Fragile Knowledge):** Low Confidence + Correct *(Underconfident)*
- **Quadrant 4 (Knowledge Gap):** Low Confidence + Wrong *(Foundational gap)*

### 📈 Feature D — Adaptive Question Engine
Dynamic difficulty engine:
- **Correct + Fast ($<25\text{s}$):** Elevates difficulty (Easy $\rightarrow$ Medium $\rightarrow$ Hard).
- **Correct + Slow ($>40\text{s}$):** Maintains difficulty to build fluency.
- **Wrong:** Steps down difficulty and triggers concept diagnosis.
- **Repeated Wrong:** Triggers remediation and updates the Misconception Map.
- **Live Adaptation Timeline:** Real-time visual ribbon showing judges the dynamic learning path.

### 🎙️ Feature E — AI Teach-Back Mode (Seymour Papert Pedagogy)
The AI turns the table and challenges the student: *"Explain Second Normal Form in your own words."*
- **Speech-to-Text Support:** Students can speak or type their explanation using Web Speech API.
- **Semantic Evaluation:** Grades conceptual accuracy, completeness, and highlights missing nuances (e.g., *"Forgot to specify that partial dependency requires a composite key"*).

### 🔍 Feature F — Multimodal Tri-Source Fusion
Every response links back to verifiable course materials:
- 📘 **Textbook:** Verbatim paragraph & page citation (Elmasri & Navathe p.152)
- 📊 **Lecture Slides:** Slide card with professor callout (CS340 Slide 27)
- 🎥 **Lecture Video:** Synchronized video player with timestamp audio transcript (`12:42–13:18`)

### 🔥 Feature G — "What Your Professor Emphasized"
Detects topics repeated across videos ($9\times$), slides ($12\times$), and textbook ($10\times$) to flag high-priority exam topics.

### ⏳ Feature H — Smart Revision Queue
Spaced repetition schedule based on Ebbinghaus memory decay:
1. 🔴 **2NF Partial Dependency** — Due immediately (Weak)
2. 🟠 **LEFT JOIN Null Trap** — Due in 24 hours (Needs Practice)
3. 🟡 **3NF Prime Attribute Rule** — Review in 3 days
4. 🟢 **SQL SELECT** — Mastered

### 📝 Feature I — Exam Mode
Configurable timed mock exam with countdown timer, topic filters, and comprehensive performance analytics.

### 💡 Feature J — "Why Am I Wrong?" Breakdown
Deep diagnostic breakdown comparing:
- *Your Selected Answer*
- *Relational Ground Truth*
- *Mental Model Trap*
- *Source Citation & Targeted Remediation*

---

## 💻 Tech Stack

- **Frontend Framework:** React 19, TypeScript
- **Styling & Design System:** Tailwind CSS 3.4
- **Icons & Assets:** Lucide React, SVG Icons
- **Animation & FX:** Canvas Confetti
- **Build Tool:** Vite 8 (Lightning fast Hot Module Replacement)
- **Speech Synthesis / Recognition:** Web Speech API (HTML5 Audio Recognition)
- **State Management:** React Context API with persistent learning telemetry

---

## 📂 Project Structure

```text
learnmate-ai/
├── public/
│   ├── favicon.svg             # Graduation cap SVG icon
│   └── icons.svg
├── src/
│   ├── assets/                 # Static imagery and logos
│   ├── components/             # Reusable UI & specialized dialogs
│   │   ├── Navbar.tsx          # Navigation, streak badge, judge tour
│   │   ├── SourceModal.tsx     # Tri-source multimodal viewer (Book/Slide/Video)
│   │   ├── TeachBackModal.tsx  # Feature E interactive speech-to-text dialogue
│   │   └── WhyAmIWrongModal.tsx# Feature J deep misconception feedback
│   ├── context/
│   │   └── LearningContext.tsx # Central adaptive engine state & DNA calculator
│   ├── data/
│   │   └── mockData.ts         # Realistic DBMS textbooks, slides, video timestamps
│   ├── pages/                  # 10 core views
│   │   ├── LandingPage.tsx     # Page 1: Hero & adaptive workflow
│   │   ├── DashboardPage.tsx   # Page 2: Student metrics & daily goals
│   │   ├── MaterialLibraryPage.tsx # Page 3: Multimodal ingest & video player
│   │   ├── KnowledgeBasePage.tsx   # Page 4: Hierarchical concept tree
│   │   ├── AITutorPage.tsx     # Page 5: Split-screen chat & learning context
│   │   ├── AdaptiveAssessmentPage.tsx # Page 6: Dynamic test & confidence selector
│   │   ├── MisconceptionMapPage.tsx   # Page 7: Hierarchical diagnostic map
│   │   ├── LearningDNAPage.tsx # Page 8: 5D cognitive analytics & 2x2 matrix
│   │   ├── RevisionCenterPage.tsx  # Page 9: Spaced repetition queue & flashcards
│   │   └── ProgressReportPage.tsx  # Page 10: Official printable audit card
│   ├── types/
│   │   └── index.ts            # Complete TypeScript domain models
│   ├── App.tsx                 # Root application wrapper & router
│   ├── index.css               # Tailwind directives & custom aesthetics
│   └── main.tsx                # React DOM entry point
├── .env.example                # Safe environment configuration template
├── .gitignore                  # Strict secret and build artifact exclusions
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## ⚙️ Prerequisites & Dependencies

Before running this project, ensure you have:
- **Node.js:** v18.0.0 or later (Tested with Node v24)
- **npm:** v9.0.0 or later (or pnpm / yarn)
- A modern web browser (Google Chrome or Microsoft Edge recommended for full Web Speech API microphone support).

---

## 🔑 Environment Variables & Security Guarantee

This project is completely self-contained and pre-seeded with realistic course materials for immediate demonstration without requiring external API keys.

If connecting to an external live LLM service (e.g. Google Gemini API), configure `.env`:

1. Copy the template:
   ```bash
   cp .env.example .env
   ```
2. Populate the optional variables:
   ```env
   PORT=3000
   VITE_GEMINI_API_KEY="your_api_key_here"
   VITE_ENABLE_MOCK_RAG="true"
   ```
> [!IMPORTANT]
> **Zero-Secrets Policy:** `.env`, `.env.*`, and any secret keys are explicitly blacklisted in `.gitignore`. No private API keys or credentials are committed to version control.

---

## ⚡ How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/RamRaghuvirRoy/multimodal-ai-hackathon-2026.git
cd multimodal-ai-hackathon-2026
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev -- --port 3000 --host
```
Open your browser at **http://localhost:3000**.

### 4. Build for production & preview
```bash
npm run build
npm run preview -- --port 3000 --host
```

---

## 🧭 5-Minute Hackathon Demo Script for Judges

Use the **"Judge Tour: [1] [2] [3] [4] [5] [6] [7]"** bar at the top of the header:

1. **Step 1 (Materials Tab):** Inspect multimodal ingest for Textbook, Slides, and Video with synced timestamp player (`12:42–13:18`).
2. **Step 2 (Knowledge Base Tab):** Explore the DBMS concept hierarchy and the **High Professor Emphasis** heatmap on 2NF.
3. **Step 3 (AI Tutor Tab):** Ask about 2NF; inspect tri-source badges citing book, slide, and video.
4. **Step 4 (Adaptive Quiz Tab):** Submit an answer with Confidence rating ($1\text{--}5$); observe live difficulty adaptation.
5. **Step 5 (Misconception Map Tab):** Inspect the red node on 2NF and examine *"Why Am I Wrong?"*.
6. **Step 6 (Teach-Back Mode):** Speak or type an explanation; observe the AI grading rubric and celebratory confetti.
7. **Step 7 (Learning DNA & Report Card):** View the 5-dimension spectrum, quadrant matrix, and export the official progress audit.

---

## 📄 License
MIT License. Built with ❤️ for Multimodal AI Hackathon 2026 Track D.
