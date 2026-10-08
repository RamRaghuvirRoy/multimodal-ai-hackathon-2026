# 🎓 LearnMate AI

> **"Your Study Material. Your Learning Pattern. Your Personal AI Tutor."**  
> *Built for Multimodal AI Hackathon 2026 — Track D: Personalized Tutoring & Adaptive Learning*

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-purple.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Track](https://img.shields.io/badge/Track-D%20Personalized%20Tutoring-emerald.svg)](#)

---

## 📌 Problem Statement

Traditional AI study tools suffer from two major flaws:
1. **Generic Chatbot Wrappers:** They act as simple Q&A search engines over PDFs, failing to teach or track learning over time.
2. **Disconnected Resources:** Textbooks, lecture slides, and lecture video recordings exist in silos, forcing students to manually connect the dots.

**LearnMate AI** unifies lecture videos, textbooks, slides, and notes into a single source-grounded knowledge base, driving **adaptive assessments, cognitive misconception detection, and personalized tutoring**.

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
 ├── SQL Basics              ✓ Strong
 ├── Joins                   ⚠ Needs Practice
 │     ├── INNER JOIN        ✓
 │     ├── LEFT JOIN         ✗ (Null-filter trap in WHERE clause)
 │     └── RIGHT JOIN        ✗
 └── Normalization           ⚠ Weak
       ├── 1NF               ✓
       ├── 2NF               ✗ (Confuses partial with transitive dependency)
       └── 3NF               ✗
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
- **Speech-to-Text Support:** Students can speak or type their explanation.
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
- *Your Answer*
- *Relational Ground Truth*
- *Mental Model Trap*
- *Source Citation & Targeted Remediation*

---

## 💻 Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS
- **Icons & UI:** Lucide React, Canvas Confetti
- **Build Tool:** Vite 8 (Hot Module Replacement, ultra-fast builds)
- **Speech API:** Web Speech API (HTML5 Audio Speech Recognition)
- **Architecture:** Client-side state & RAG reasoning simulation with real source indexing

---

## ⚡ Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/learnmate-ai.git
cd learnmate-ai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or `5173`) in your browser.

### 4. Build for production
```bash
npm run build
npm run preview
```

---

## 🧭 5-Minute Hackathon Demo Script for Judges

Use the **"Judge Tour: [1] [2] [3] [4] [5] [6] [7]"** bar at the top of the app:

1. **Step 1 (Materials):** Inspect multimodal ingest for Textbook, Slides, and Video with synced timestamp player.
2. **Step 2 (Knowledge Base):** Explore the DBMS concept hierarchy and the **High Professor Emphasis** heatmap on 2NF.
3. **Step 3 (AI Tutor):** Ask about 2NF; inspect tri-source badges citing book, slide, and video.
4. **Step 4 (Adaptive Quiz):** Submit an answer with Confidence rating ($1\text{--}5$); observe live difficulty adaptation.
5. **Step 5 (Misconception Map):** Inspect the red node on 2NF and examine *"Why Am I Wrong?"*.
6. **Step 6 (Teach-Back Mode):** Speak or type an explanation; observe the AI grading rubric and celebratory confetti.
7. **Step 7 (Learning DNA & Report Card):** View the 5-dimension spectrum, quadrant matrix, and export the official progress audit.

---

## 📄 License
MIT License. Built for Multimodal AI Hackathon 2026 Track D.
