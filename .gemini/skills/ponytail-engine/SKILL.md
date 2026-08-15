---
name: ponytail-engine
description: Dynamic Spatial Layout & Micro-Motion Engine for NERDS inspired by ponytail, GSAP, anime.js, motion.dev, and Backlit UI graphs. Enforces ~30KB computed spatial bounds, programmatic HSL token synthesis, Backlit UI interactive spline graphs, GPU spring-physics micro-interactions, and component state isolation.
---

# `ponytail-engine`: Dynamic Spatial & Micro-Motion Protocol

`ponytail-engine` provides high-performance spatial layout math, programmatic HSL token synthesis, GPU-accelerated micro-motion physics, and **Backlit UI interactive graphs/charts** for NERDS applications.

Inspired by Dietrich Gebert's `ponytail`, **GSAP**, **anime.js**, **motion.dev**, **Bootstrap container rigor**, and **Backlit UI data visualizations**, it guarantees sub-pixel spatial precision with zero browser layout thrashing.

---

## 📐 Pillar 1: Dynamic Spatial & Computed Layout Math

1. **Exact Bounding Box Calculations**: Calculate container dimensions dynamically from wrapped child DOM elements rather than using arbitrary static pixel offsets (`+ 12` or `pill_font_size * 2.0`).
2. **Zero Layout Thrashing**: Batch DOM read/write cycles using `requestAnimationFrame` for sub-pixel caret positioning, dynamic text reflows, and auto-height container scaling.
3. **Dynamic Anchor Positioning**: Position floating tooltips, popovers, and dropdown menus relative to trigger elements using dynamic spatial anchor math.

---

## 📊 Pillar 2: Backlit UI Interactive Graphs & Charts

1. **Interactive Data Visualization Engine**: Build high-converting software simulations featuring SVG spline curves, dynamic metric tooltips, ambient backlit accent rims, precise grid lines, and real-time data streams.
2. **Backlit Ambient Accent Rims**: Subtle ambient lighting highlights (`border: 1px solid hsl(...)`, ambient rim accents) behind solid obsidian dark containers.
3. **Strict Ban on Glassmorphism**: Glassmorphism, blur effects, and fuzzy vignettes are strictly banned. Use crisp obsidian surfaces with 1px HSL borders.

---

## 🎨 Pillar 3: Programmatic HSL Token Synthesis

1. **Automated WCAG Contrast Ratios**: Dynamically compute WCAG AA/AAA contrast ratios for text and surface color pairs.
2. **Surface Elevation Hierarchy**: Generate HSL surface elevation CSS variables (`--surface-1`, `--surface-2`, `--surface-3`) with obsidian dark tones.
3. **Fluid `clamp()` Spatial Scales**: Compute fluid typography and padding scales dynamically in `theme.css`.

---

## ⚡ Pillar 4: Isolated Component State & GPU Micro-Motion

1. **Local State Isolation**: Keep transient draft state local within component boundaries without mutating private third-party DOM properties.
2. **GPU Spring Physics**: Draw inspiration from **GSAP**, **anime.js**, and **motion.dev** for zero-lag hover/active/focus micro-interactions using hardware-accelerated transforms (`transform: translate3d(0, 0, 0)`, `will-change: transform`).
3. **Layout Sanity Guard**: Verify component prop keys and container bounds dynamically to prevent `NullPointerException`, `AttributeError`, `ReferenceError`, or visual overflow crashes.
