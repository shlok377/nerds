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
2. **Key Outputs & Artifacts**: Present direct file links to created or updated artifacts (`implementation_plan.md`, `product_design_master.md`, `theme.css`, `walkthrough.md`, code files).
3. **User Stage Approval Gate**: Ask the user:
   "Stage [X] ([Role Name]) is complete. Are the proposed outputs approved to proceed to Stage [X+1] ([Next Role Name])?"
4. **Pause for Approval**: Wait for user confirmation before executing the next stage.

---

## Mandatory Post-Fix & Feature Pipeline Protocol

For **EVERY** bug fix, issue fix, or new feature addition:
1. **Design Master Consultation**: Consult Designing Incharge Nerd & [product_design_master.md](file://./product_design_master.md) to ensure visual/spatial consistency.
2. **Code Implementation**: Write shippable production code via Design Explorer & Engineer Nerd.
3. **Chromium Visual Verification**: Launch QA Lead Nerd (`browser_subagent` in Chromium), inspect DOM, click interactive controls, capture screenshot proof in [walkthrough.md](file://./walkthrough.md), report findings to user, and request stage approval.
4. **Security Audit**: Run Security Auditor Nerd (`security-leak-scanner.js`) for secret leak scanning and doc sync.
5. **Atomic Git Commit**: Run Git Nerd (`git-pro-manager.js`) to perform conventional micro-commits and GitHub PR management.

---

## 7-Stage Mandatory Pipeline Sequence

### Step 1: Product CEO Nerd
- Read: [.nerds/instructions/01-product-ceo.md](file://./.nerds/instructions/01-product-ceo.md)
- **Mandatory Output**: Executive Summary & Product Thesis, 6 Forcing Questions Q&A, Framing Mode Rationale, [implementation_plan.md](file://./implementation_plan.md) link.

### Step 2: Architect EM Nerd
- Read: [.nerds/instructions/02-architect-em.md](file://./.nerds/instructions/02-architect-em.md)
- **Mandatory Output**: Modular Boundaries (`src/core/`, `src/features/`, `src/components/`), Mermaid Data Flow Diagram, Edge Case Matrix, Test Specs.

### Step 3: Designing Incharge Nerd
- Read: [.nerds/instructions/03-designing-incharge.md](file://./.nerds/instructions/03-designing-incharge.md)
- **Mandatory Output**: Maintain [product_design_master.md](file://./product_design_master.md), 0-10 Quality Gate Scores, Anti-Slop Compliance Check (8 Banned Rules), DX Review Summary, Design System HSL Tokens ([src/design-system/theme.css](file://./src/design-system/theme.css)).

### Step 4: Design Explorer & Engineer Nerd
- Read: [.nerds/instructions/04-design-explorer-engineer.md](file://./.nerds/instructions/04-design-explorer-engineer.md)
- **Mandatory Output**: Consult [product_design_master.md](file://./product_design_master.md), Component Implementation Summary, Pretext Computed Layout Math (~30KB lightweight), Framework/API Strategy, Code File Links ([index.html](file://./index.html), [src/app.js](file://./src/app.js)).

### Step 5: QA Lead Nerd
- Read: [.nerds/instructions/05-qa-lead.md](file://./.nerds/instructions/05-qa-lead.md)
- **Mandatory Output**: Chromium Visual Verification Results (`browser_subagent`), Root-Cause Fixes, Regression Tests, Embedded Proof Screenshots ([walkthrough.md](file://./walkthrough.md)).

### Step 6: Security Auditor Nerd
- Read: [.nerds/instructions/06-security-auditor.md](file://./.nerds/instructions/06-security-auditor.md)
- **Mandatory Output**: Security Leak Scanner Results (`security-leak-scanner.js`), Iron Law Debugging Log, CWV Performance Metrics, Doc Sync ([README.md](file://./README.md)).

### Step 7: Git Nerd
- Read: [.nerds/instructions/07-git-nerd.md](file://./.nerds/instructions/07-git-nerd.md)
- **Mandatory Output**: Post-QA execution of `git-pro-manager.js`, Task Assignee Check, Feature Branch Name, Atomic Micro-Commit Log, Pull Request & GitHub Sync Status.

---

## Direct Prompt Execution Contract
- In Single-User Mode, AGY runs this 7-stage quality pipeline directly on every user prompt.
- For GitHub Teamwork Mode, execute `.nerds/instructions/leader-instructions.md` (Leader) or `.nerds/instructions/member-instructions.md` (Member) via `.nerds/scripts/github-poller.js`.
