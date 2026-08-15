# NERDS Autonomous Web Engineering Stack

NERDS is an autonomous multi-agent web engineering stack for Antigravity IDE. It operates through 7 specialized Nerds roles, think.live stage approval handoffs, assignee-filtered GitHub teamwork, and anti-slop design intelligence.

---

## Single-Line Installation (Standard Singleton Projects)

Run this single command in your project root directory:

```bash
curl -fsSL https://raw.githubusercontent.com/shlok377/nerds/main/install.sh | bash -s -- -auto
```

## Installation Help:
Run this single command in your project root directory:

```bash
curl -fsSL https://raw.githubusercontent.com/shlok377/nerds/main/install.sh | bash -s -- -h
```

Once installed:
1. System directives auto-load in Antigravity IDE (`AGENTS.md` and `.nerds/`).
2. Plain prompts, feature requests, and bug fixes automatically trigger the 7-stage quality pipeline.
3. Every change passes visual browser QA, secret leak scanning, and atomic micro-commits.

---

## Execution Modes (Autonomous vs. Interactive)

NERDS supports two execution modes for maximum velocity and control:

- **`AUTONOMOUS` (Zero-Touch Mode)**: NERDS runs Stage 1 through Stage 7 continuously in a single turn without waiting for user approval between stages.
- **`INTERACTIVE` (Step-by-Step Mode)**: NERDS pauses at each stage gate to prompt for confirmation.

### Dynamic In-Session Mode Switching
- **Switch to Autonomous Mode**: Type `/auto` or `-auto` anywhere in your prompt (e.g. `"Build a user profile page /auto"`).
- **Switch to Interactive Mode**: Type `/manual` or `-manual` anywhere in your prompt.
- **Mid-Stream Handover**: Reply `"yes -auto"` or `"approved /auto"` to any stage approval gate to hand over control dynamically and let NERDS execute all remaining stages continuously!

---

## Preset Commands for Top 5 Scenarios

Copy and paste the exact command for your specific operational workflow:

### Scenario 1: Standard Singleton Project (Autonomous Setup)
Zero-configuration zero-touch setup for individual developers:

```bash
curl -fsSL https://raw.githubusercontent.com/shlok377/nerds/main/install.sh | bash -s -- -auto
```

### Scenario 2: Team Leader Setup (Multi-Agent Lead Mode)
Configures the active agent as Team Leader with full GitHub issue assignment, PR merging, and worker coordination capabilities:

```bash
curl -fsSL https://raw.githubusercontent.com/shlok377/nerds/main/install.sh | bash -s -- -auto -leader -mem 3 -gh-user myuser -gh-token ghp_mytoken
```

### Scenario 3: Team Member Setup (Autonomous Worker Mode)
Configures the active agent as a Co-worker polling for assigned GitHub issues matching a specific agent alias:

```bash
curl -fsSL https://raw.githubusercontent.com/shlok377/nerds/main/install.sh | bash -s -- -auto -member -alias agent-2 -gh-user myuser -gh-token ghp_mytoken
```

### Scenario 4: Offline / No-Git Local Mode
Runs the 7-stage quality pipeline strictly in local mode without GitHub API sync or remote network dependencies:

```bash
curl -fsSL https://raw.githubusercontent.com/shlok377/nerds/main/install.sh | bash -s -- -nogit
```

### Scenario 5: Custom Agent Alias Setup
Sets a custom agent handle for isolated multi-agent task execution and issue assignment matching:

```bash
curl -fsSL https://raw.githubusercontent.com/shlok377/nerds/main/install.sh | bash -s -- -alias custom-architect-1 -gh-user myuser -gh-token ghp_mytoken
```

---

## 7 Nerds Quality Pipeline Sequence

Every request is processed sequentially across 7 Quality Gates with user approval gates between stages:

```
[User Request / Assigned GitHub Issue]
         │
 1. Product CEO Nerd ──────► 6 Forcing Questions, Framing Mode, 10-Star Spec
         │                   (Auto-Advances in Autonomous Mode)
 2. Architect EM Nerd ─────► File Isolation Spec, Data Flow Diagram, Failure Matrix
         │                   (Auto-Advances in Autonomous Mode)
 3. Designing Incharge ────► Product Design Master, HSL Tokens, Anti-Slop Audit
         │                   (Auto-Advances in Autonomous Mode)
 4. Design Explorer ───────► Production Code Implementation, Dev Server Startup
         │                   (Auto-Advances in Autonomous Mode)
 5. QA Lead Nerd ──────────► Chromium Browser Visual Verification & DOM Audit
         │                   (Auto-Advances in Autonomous Mode)
 6. Security Auditor ──────► Secret Leak Scanner, Core Web Vitals, Doc Sync
         │                   (Auto-Advances in Autonomous Mode)
 7. Git Nerd ──────────────► Task Validation, Conventional Micro-Commit, PR Management
```

---

## CLI Flags & Options Matrix

| Flag | Short | Description | Default |
| :--- | :--- | :--- | :--- |
| `--auto` | `-auto` | Set execution mode to AUTONOMOUS (Zero-touch) | `auto` |
| `--manual` | `-manual` | Set execution mode to INTERACTIVE (Per-stage prompts) | `manual` |
| `--leader` | `-leader` | Configure role as Team Leader | `true` |
| `--member` | `-member` | Configure role as Co-worker (Team Member) | `false` |
| `--members <n>` | `-mem <n>` | Number of team members (excluding Leader) | `0` |
| `--no-git` | `-nogit` | Disable GitHub integration | `false` |
| `--alias <name>` | `-alias <name>` | Set agent handle/alias for issue matching | `agent-1` |
| `--gh-user <user>` | `-gh-user <user>` | GitHub Username | `""` |
| `--gh-token <tok>` | `-gh-token <tok>` | GitHub Personal Access Token (saved to `.env.local`) | `""` |
| `--help` | `-h` | Display CLI options help | |

---

## Security & Credential Isolation

- Credentials saved strictly in `.env.local` with restrictive `0600` permissions.
- `.env.local` is automatically added to `.gitignore`.
- Pre-commit scanner (`scripts/security-leak-scanner.js`) blocks unencrypted secret leaks before git commit.

---

## License

MIT License (c) 2026 Shlok & NERDS Team
