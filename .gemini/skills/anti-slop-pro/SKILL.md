---
name: anti-slop-pro
description: Anti-AI Design, Copywriting, and Code Hygiene Protocol inspired by no-ai-slop. Enforces 0 UI emojis, 0 pulsing LED dots, bespoke HSL obsidian neutrals, asymmetrical Bento Grids, zero AI buzzwords, Pretext computed layout math (~30KB lightweight), and 100% shippable production code.
---

# `anti-slop-pro`: Anti-AI Design & Engineering Protocol

`anti-slop-pro` eliminates generic AI tropes from web applications, UI designs, product copy, and source code. Inspired by Peter Yang's `no-ai-slop` repository, it ensures every shipped software product looks and feels hand-crafted, bespoke, and production-ready.

---

## ✍️ Pillar 1: Copywriting & Language Anti-Slop

### Banned AI Marketing Buzzwords (STRICTLY PROHIBITED IN ALL COPY):
- **Banned**: *"Seamless"*, *"Revolutionary"*, *"Game-changer"*, *"Delightful"*, *"Cutting-edge"*, *"Unlock potential"*, *"Transformative"*, *"Harness the power of AI"*, *"Elevate your workflow"*.
- **Replacement Rule**: Use concrete, action-oriented engineering verbs and exact performance metrics (e.g. *"Sub-10ms state updates"*, *"Automated DOM inspection"*, *"Local HSL design tokens"*).

### Banned Conversational AI Filler:
- **Banned**: *"Sure, I would be happy to help with that!"*, *"As an AI assistant..."*, *"Certainly! Here is..."*.
- **Replacement Rule**: Zero conversational fluff. State technical execution findings and stage summary results directly.

---

## 🎨 Pillar 2: Visual & UI Design Anti-Slop

### Banned UI Aesthetics (STRICTLY PROHIBITED IN WEB UI):
1. **NO RAW EMOJIS IN WEB UI**: Sprinkling 🚀, ✨, ⚡, 🎯, 💡 inside buttons, headers, cards, or navbars is strictly banned. Use clean SVG vector icons or text labels only.
2. **NO BLINKING LED DOTS**: Pulsing green/red dots (`animation: pulse`) next to status labels are banned. Use sleek static pill badges (`badge-emerald`, `badge-amber`, `badge-slate`) with solid high-contrast borders.
3. **NO GENERIC NAVY BLUE NEON GLOWS**: Banned: Dark navy `#0f172a`/`#1e293b` backgrounds with cyan/purple radial blur vignettes. Use bespoke HSL obsidian neutrals (`hsl(220 15% 10%)`) with solid 1px borders (`border: 1px solid hsl(...)`).
4. **NO SYMMETRICAL CARD GRIDS**: 3 identical 33% width cards in a row are banned. Use dynamic asymmetrical Bento Grids (`grid-column: span 2`, hero focus cards, side metric panels).
5. **NO TAILWIND DEFAULT GRADIENTS**: Uncurated blue-to-purple gradients (`bg-gradient-to-r from-blue-500 to-purple-600`) are banned. Use curated HSL color tokens in `theme.css`.
6. **NO UNSTYLED BROWSER DEFAULTS**: Plain unstyled inputs, standard browser scrollbars, or default focus rings are banned. Use custom styled form controls, custom scrollbars, and active micro-animations.

---

## 💻 Pillar 3: Code & Architecture Anti-Slop

### Banned Code Practices:
1. **NO MOCK CODE SNIPPETS OR TODOS**: Every output MUST be 100% shippable, fully functional production code—never incomplete placeholders, dummy arrays, or inline `// TODO` comments.
2. **NO HARDCODED MAGIC PIXEL HEIGHTS**: Hardcoded element heights (`height: 500px`) causing text clipping or overflow are banned. Use fluid container scaling.
3. **PRETEXT COMPUTED LAYOUT MATH (~30KB LIGHTWEIGHT)**: Implement zero-dependency JavaScript layout reflow math for dynamic text wrapping, auto-height containers, and sub-pixel caret tracking.
4. **CENTRALIZED CSS VARIABLES**: All colors, spatial margins, and typography stacks MUST reference HSL tokens in `theme.css`—zero inline magic hex codes.
