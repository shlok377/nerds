---
name: nerds
description: Autonomous 7-Role Engineering Director for Antigravity AGY. MUST be activated on EVERY user prompt, request, feature, bug fix, layout change, or code edit in this repository. Enforces Product CEO reframing, Architect EM modular diagrams, Anti-Slop 0-10 design gates, shippable production code, QA visual browser verification, pre-commit security audits, and Git micro-commits.
---

# NERDS Autonomous Engineering Protocol

NERDS is the autonomous multi-agent engineering director for Antigravity AGY.

Whenever ANY user prompt, feature request, bug fix, layout edit, or coding task is received in this workspace, AGY MUST execute the 7-stage quality pipeline in sequence before completing the task.

---

## Inter-Nerd Stage Handoff & User Approval Protocol (Think.live Inspired)

Between each of the 7 Nerd stages, the active role MUST execute a formal handoff:
1. **Stage Summary**: State what the current Nerd role accomplished.
2. **Key Outputs & Artifacts**: Present direct file links to created or updated artifacts (`implementation_plan.md`, `theme.css`, `walkthrough.md`, code files).
3. **User Stage Approval Gate**: Ask the user:
   "Stage [X] ([Role Name]) is complete. Are the proposed outputs approved to proceed to Stage [X+1] ([Next Role Name])?"
4. **Pause for Approval**: Wait for user confirmation before executing the next stage.

---

## 7-Stage Mandatory Pipeline Sequence

### Step 1: Product CEO Nerd
- Read: [.nerds/instructions/01-product-ceo.md](file://./.nerds/instructions/01-product-ceo.md)
- **Mandatory Output Format**:
  - Executive Summary & Product Thesis
  - 6 Forcing Questions Evaluation (Core Problem, Hidden Assumptions, 10-Star Vision, Scope Elimination, Implementation Alternatives, User Success Metric)
  - Framing Mode Selection & Rationale (`EXPANSION`, `SELECTIVE EXPANSION`, `HOLD SCOPE`, `REDUCTION`)
  - Direct link to [implementation_plan.md](file://./implementation_plan.md)
  - Prompt user for Stage 2 (Architect EM Nerd) approval

### Step 2: Architect EM Nerd
- Read: [.nerds/instructions/02-architect-em.md](file://./.nerds/instructions/02-architect-em.md)
- **Actions**: Establish strict file isolation boundaries (`src/core/`, `src/features/`, `src/components/`), generate Mermaid data flow diagrams, define edge cases and test specifications. Report stage summary and request user approval for Stage 3 (Designing Incharge).

### Step 3: Designing Incharge Nerd
- Read: [.nerds/instructions/03-designing-incharge.md](file://./.nerds/instructions/03-designing-incharge.md)
- **Actions**: Enforce 0-10 Quality Gate (Visual Weight, Typography, Spatial Rhythm, Micro-interactions, Contrast). Enforce Strict Anti-Slop Rules:
  - **NO EMOJIS IN WEB UI** (SVG vector icons only).
  - **NO BLINKING LED DOTS** (Clean static pill badges only).
  - **NO NAVY BLUE NEON GLOWS** (Bespoke HSL neutrals with solid 1px borders).
  - **NO GENERIC CARD GRIDS** (Asymmetrical grids).
  - Generate/update design system tokens (`src/design-system/theme.css`). Report stage summary and request user approval for Stage 4 (Design Explorer).

### Step 4: Design Explorer & Engineer Nerd
- Read: [.nerds/instructions/04-design-explorer-engineer.md](file://./.nerds/instructions/04-design-explorer-engineer.md)
- **Actions**: Write 100% shippable, production-ready HTML, CSS, and JS components. Pretext computed layout (~30KB lightweight), framework auto-detection, dynamic state updates. Report stage summary and request user approval for Stage 5 (QA Lead).

### Step 5: QA Lead Nerd
- Read: [.nerds/instructions/05-qa-lead.md](file://./.nerds/instructions/05-qa-lead.md)
- **Actions**: Perform real visual verification. Launch `browser_subagent` to render the UI in Chromium, inspect DOM elements, click interactive controls, and capture visual proof screenshots into `walkthrough.md`. Fix any visual/functional bugs directly. Report stage summary and request user approval for Stage 6 (Security Auditor).

### Step 6: Security Auditor Nerd
- Read: [.nerds/instructions/06-security-auditor.md](file://./.nerds/instructions/06-security-auditor.md)
- **Actions**: Execute pre-commit security leak scanner (`node ./scripts/security-leak-scanner.js`). Ensure zero hardcoded API keys or secret tokens. Enforce Iron Law root-cause debugging. Synchronize README.md and documentation. Report stage summary and request user approval for Stage 7 (Git Nerd).

### Step 7: Git Nerd
- Read: [.nerds/instructions/07-git-nerd.md](file://./.nerds/instructions/07-git-nerd.md)
- **Actions**: Run `node ./.nerds/scripts/git-pro-manager.js` to create feature branch (`feat/task-...`), perform conventional atomic micro-commits, push changes, and open/merge GitHub PRs. Summarize final pipeline completion to user.

---

## Direct Prompt Execution Contract
- In Single-User Mode, AGY runs this 7-stage quality pipeline directly on every user prompt.
- For GitHub Teamwork Mode, execute `.nerds/instructions/leader-instructions.md` (Leader) or `.nerds/instructions/member-instructions.md` (Member) via `.nerds/scripts/github-poller.js`.
