# NERDS Product Design Master Document

> Master design intelligence specification, CLI ASCII box-art layout, HSL color tokens, anti-slop rules, and DX benchmarks for the NERDS autonomous web engineering stack.

---

## 1. Design Philosophy & Thesis

- **Obsidian & Cyber Terminal Aesthetic**: Precision double-line unicode box drawing (`╔═╗║╚═╝`) combined with single-line section dividers (`┌── ─ ──┐ │ └── ──┘`).
- **Flush-Left Zero Margin Alignment**: All terminal box art, section titles, and status indicators align flush at column 0 (zero left/right margin padding).
- **Anti-Slop Visual Protocol**: Strict enforcement of [anti-slop-pro](file:///home/shlok/Projects/nerds/.nerds/skills/anti-slop-pro/SKILL.md) guidelines: zero AI marketing buzzwords, zero blinking LED dot animations, zero UI emojis in section headers, solid 1px border cards, and curated ANSI color tokens.

---

## 2. CLI Terminal Layout & Box Art Specification

```
╔══════════════════════════════════════════════════════════════╗
║  ███╗   ██╗███████╗██████╗ ██████╗ ███████╗                  ║
║  ████╗  ██║██╔════╝██╔══██╗██╔══██╗██╔════╝                  ║
║  ██╔██╗ ██║█████╗  ██████╔╝██║  ██║███████╗                  ║
║  ██║╚██╗██║██╔══╝  ██╔══██╗██║  ██║╚════██║                  ║
║  ██║ ╚████║███████╗██║  ██║██████╔╝███████║                  ║
║  ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝                  ║
╚══════════════════════════════════════════════════════════════╝
┌── TELEMETRY DIAGNOSTICS ──────────────────────────────────┐
│  ► TARGET REPOSITORY : [URL]                              │
│  ► EXECUTION MODE    : [ AUTONOMOUS / CONTINUOUS ]        │
│  ► ROLE ARCHITECTURE : TEAM LEADER (SUPERVISORY AGENT-1)  │
│  ► CO-WORKERS COUNT  : 0 (SINGLETON EXECUTION)            │
└───────────────────────────────────────────────────────────┘

┌── STAGE EXECUTION PIPELINE ───────────────────────────────┐
│  [1/7] PRODUCT CEO         [████████████████████████] 100%│
│  [2/7] ARCHITECT EM        [████████████████████████] 100%│
│  [3/7] DESIGNER INCHARGE   [████████████████████████] 100%│
│  [4/7] DESIGN EXPLORER     [████████████████████████] 100%│
│  [5/7] QA LEAD             [████████████████████████] 100%│
│  [6/7] SECURITY AUDITOR    [████████████████████████] 100%│
│  [7/7] GIT NERD            [████████████████████████] 100%│
└───────────────────────────────────────────────────────────┘

┌── PROVISIONED INFRASTRUCTURE MATRIX ──────────────────────┐
│  ✔ .gemini/instructions.md        [PROVISIONED]           │
│  ✔ AGENTS.md                      [PROVISIONED]           │
│  ✔ .nerds/instructions/01..07.md  [PROVISIONED - 7 ROLES]│
│  ✔ .nerds/scripts/*.js            [PROVISIONED]           │
│  ✔ .env.local                     [HARDENED 0600]         │
└───────────────────────────────────────────────────────────┘

---

## 3. Tactile Organic Animation Specifications

- **Random Sleep Engine**: `randomSleep(min, max)` calculates variable micro-delays for each line item and progress step.
- **Header & Telemetry Reveal**: Header double-line box renders → `200-350ms` delay → Telemetry box & 4 detail lines render sequentially (`80-180ms` between lines).
- **Stage Execution Pipeline Organic Bar Filling**: Each stage 32-block progress bar fills dynamically in-place from 0% to 100% across 4-6 randomized thresholds (e.g. ~18%, ~42%, ~68%, ~91%, 100%) with variable tick micro-delays (`40ms - 110ms`) using `\r` carriage return overwriting. Upon reaching 100%, status locks `100% [OK]` in green (`var(--accent-emerald)`) with a `100-250ms` inter-stage pause before advancing to the next stage line.
- **Provisioned Infrastructure Matrix Reveal**: 5 status checkmark lines render sequentially (`90-220ms` per line) → `300-500ms` delay.
- **System Status Footer Reveal**: Initialization Complete status double-box renders as final conclusion → `300-600ms` final pause.
- **CI / Non-TTY Fallback**: Total animation duration ~2.5 to 3.5 seconds in interactive terminal; `0ms` delay in CI non-TTY environments.
```

---

## 3. 0-10 Quality Gate Audit Scorecard

| Dimension | Score | Criteria & Justification |
| :--- | :--- | :--- |
| **Visual Weight** | **10 / 10** | High-impact box art header with clean section division. Zero clutter. |
| **Typography** | **10 / 10** | Monospaced block font logo (`███╗`), crisp column alignment. |
| **Spatial Rhythm** | **10 / 10** | Consistent top/bottom spacing between section boxes, zero left margin shift. |
| **Micro-interactions**| **10 / 10** | Smooth step progress during infrastructure file provisioning. |
| **Contrast** | **10 / 10** | Bright cyan box borders, green status checkmarks, bold white logo on dark terminal background. |

---

## 4. Anti-Slop Compliance Check

- **NO EMOJIS IN CLI SECTION HEADERS**: Use clean unicode glyphs (`►`, `✔`, `[████]`) instead of raw emojis (`🚀`, `⚡`, `✨`).
- **NO BADGE CLUTTER**: Removed right-hand side badges `[v2.4.0-CYBER]`, `[NET: LOCAL/CONNECTED]`, `[SYS: AUTONOMOUS_ENGINE]`, `[CORE: 7-ROLE_DIRECTOR]`.
- **NO LEFT MARGIN PADDING**: All box borders start at column 0 for maximum terminal compatibility.
