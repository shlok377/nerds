# NERDS Autonomous Engineering Director

> NERDS is an autonomous multi-agent web engineering stack for Antigravity IDE, driven by 7 specialized Nerds roles, auto-role switching, assignee-filtered GitHub teamwork, and strict anti-slop design intelligence.

---

## ⚡ Quick Start: Zero-Friction Setup & AGY Direct Prompting

1. Run the single-line CLI installer in your repository:

```bash
curl -fsSL https://raw.githubusercontent.com/shlok377/nerds/main/install.sh | bash -s -- -gh-user myuser -gh-token ghp_mytoken
```

2. Close/quit the installer.

3. **Open AGY (CLI or IDE) and start prompting straight away!**
   - The provisioned `./SKILL.md` automatically activates NERDS on **EVERY prompt** (plain prompts, feature builds, bug fixes, refactorings).
   - NERDS routes every task through the 7 Quality Gates, performs visual browser QA, scans for secret leaks, and executes atomic Git commits automatically.

---

## 🛠️ CLI Flags & Options

| Flag | Short | Description | Default |
| :--- | :--- | :--- | :--- |
| `--leader` | `-leader` | Configure role as Team Leader | `true` |
| `--member` | `-member` | Configure role as Co-worker (Team Member) | `false` |
| `--members <n>` | `-mem <n>` | Number of team members (excluding Leader) | `0` |
| `--no-git` | `-nogit` | Disable GitHub integration | `false` |
| `--alias <name>`| `-alias <name>` | Set agent handle/alias for issue matching | `agent-1` |
| `--gh-user <user>`| `-gh-user <user>`| GitHub Username | `""` |
| `--gh-token <tok>`| `-gh-token <tok>`| GitHub Personal Access Token (saved to `.env.local`) | `""` |
| `--help` | `-h` | Display CLI options help | |


---

## 🤖 The 7 Nerds Roles & Auto-Switching Router

NERDS passes every task through a 7-stage quality pipeline:

```
[Task Input / Assigned GitHub Issue]
         │
 1. Product CEO Nerd ──────► (6 Forcing Questions, 4 Modes, 10-Star Product Spec)
         │
 2. Architect EM Nerd ─────► (Modular File Isolation, Data Flow Diagrams, Edge Cases)
         │
 3. Designing Incharge ────► (0-10 Quality Gate, Anti-Slop Bans, DX Review, Design System)
         │
 4. Design Explorer ───────► ("Show Me Options" Board, Pretext ~30KB Production HTML)
         │
 5. QA Lead Nerd ──────────► (Real Chromium Browser Visual Verification & Auto Regression Tests)
         │
 6. Security Auditor ──────► (Production Vulnerability Fixes, Iron Law Debugging, CWV & Doc Sync)
         │
 7. Git Nerd ──────────────► (Assignee Validation, Micro-Commits, Feature PR & Issue Resolution)
```

---

## 👥 GitHub Teamwork & Task Assignment

- **Assignee Task Claiming**: The LLM checks `issue.assignees` on GitHub. If its configured `AGENT_ALIAS` / `GITHUB_USERNAME` is assigned, it claims the issue. Unassigned or non-matching issues are ignored by co-workers.
- **Leader Directives**: Team Leader creates issues, assigns tasks to team members, manages the `sync/llm-coordination` lock branch, and merges incoming PRs.
- **Co-worker Directives**: Co-workers poll for assigned tasks, execute work in isolated feature branches, and submit PRs with QA visual proof.

---

## 🔒 Credential Security Guarantee

- Credentials are saved exclusively in `.env.local` with strict `0600` permissions.
- `.env.local` is automatically added to `.gitignore`.
- Pre-commit scanner (`scripts/security-leak-scanner.js`) prevents hardcoded secret leaks before every commit.

---

## License

MIT License (c) 2026 Shlok & NERDS Team
