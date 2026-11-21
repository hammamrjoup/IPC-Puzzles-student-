# 🛡️ IPC Training Puzzles | ألعاب تدريب مكافحة العدوى

A comprehensive, bilingual (Arabic RTL & English), interactive training suite designed for Infection Prevention and Control (IPC) healthcare professionals, students, and hospital teams.

Developed by: **Hammam Jubran Rjoup / MSN, CPIC**

---

## 🎮 Included Modules / ألعاب التدريب

1. **🧩 Module 1: Chain of Infection & Break the Chain | كسر سلسلة انتقال العدوى**
   - Stage 1: Assemble the 6 clockwise chain links.
   - Stage 2: Break infection links using 11 CDC Standard Precautions (Hand Hygiene, PPE, Medical Device Reprocessing, etc.).

2. **🧊 Module 2: Match the Definitions | كسر الجليد ومطابقة المفاهيم**
   - Match 14 authoritative IPC clinical terms to their correct definitions.

3. **🛡️ Module 3: PPE Challenge (Guardians of Sterilization) | درع الوقاية**
   - Clinical scenario rounds: Select additional precautions, equip task-tailored PPE, and order safe donning & doffing sequences.

4. **💉 Module 4: Safe Injection Challenge | تحدّي الحقن الآمن**
   - Three clinical domains:
     - Safe Injection Practices (💉)
     - Medication Safety (🧴)
     - Sharps Safety (☣️)
   - Single-domain mode (4 balanced cases: 2 safe, 2 unsafe) and Mixed Challenge (12 cases).
   - Real-time feedback with approved safe alternative procedures and CDC / Joint Commission references.

5. **📦 Module 5: أكمل الحزمة | HAI Bundle Challenge & The Handover (تسليم الوردية)**
   - **Comprehensive Case Bank:** 100 verified clinical cases across four key healthcare-associated infections:
     - 🩸 CLABSI (Central line insertion and maintenance, WHO 2026 / CDC 2024)
     - 💧 CAUTI (Urinary catheter safety and maintenance, CDC 2009 / 2025)
     - 🫁 VAP (Mechanical ventilation care bundle, SHEA 2022 / CDC)
     - 🩹 SSI (Surgical site infection prevention and prophylaxis, WHO 2018 / CDC 2017)
   - **🤝 The Handover (Bedside Clinical Practice Mode):**
     - **5-Step Round Flow:**
       1. *Receive Handover:* Two-sentence handover report with Web Speech audio replay and visible transcript.
       2. *Inspect Evidence:* Dual room and chart evidence inspection (responsive Room & Chart tabs on mobile, dual pane on desktop).
       3. *Act:* Interactive bedside equipment corrections (lowering bags, untwisting tubing, applying full-body drapes, elevating head of bed) and audit classifications with immediate feedback.
       4. *Explain:* Identification of clinical evidence supporting decisions with keyed bundle rationale and facility form citations.
       5. *Hand Off:* Three guided reflection questions (*“What did you see?”*, *“What did you do?”*, *“What would you tell the next shift?”*) followed by the authoritative model handoff.
     - **Playable Starter Cards:**
       - `HO-CAUTI-01` — The transfer (Form CAUTI-F-02, Row 3; supports both correction orders).
       - `HO-CVC-01` — The signed checklist (Form IPC-CL-04, Row 4; reconciliation of small vs full-body drape).
       - `HO-SSI-01` — Three records (Form OR-SSI-01, Row 2; order vs missing administration time audit).
       - `HO-SSI-02` — Replay variant (Form OR-SSI-01, Row 2; late 08:10 post-incision administration).
       - `HO-VAP-01` — Return later (Form ICU-VENT-01, Row 1; two visits: temporary active restriction followed by 14:00 elevation).
     - **Classroom & Multiplayer Features:**
       - Solo play and Instructor-led Pair Setup (Partner A: Bedside Observer, Partner B: Chart Auditor, with printable role cards).
       - Web Audio API room tone and mechanical hardware click feedback.
       - Full keyboard accessibility (`tabindex="0"`, focus rings, Space/Enter triggers).
       - State persistence across page refreshes.
       - Student route protection with automatic exclusion of unverified source-review drafts.

---

## 🚀 How to Run

### Online (GitHub Pages)
Open the deployed GitHub Pages link on any browser (PC, iPad, or mobile phone).

### Locally
- Simply double-click `index.html` to open in Google Chrome or Microsoft Edge.
- Direct module launch: `index.html?view=bundle-challenge&practice=handover`
- Or run `START_STUDENT_SERVER.bat` to host a local Wi-Fi server for classroom and wall touch screens.
