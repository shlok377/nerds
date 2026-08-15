---
name: motion-3d-scroll
description: Accelerated Multi-Format 3D Motion Scroll Engine for Antigravity AGY. Features 4 Motion Modes (Apple-Style Image Sequence Canvas, Video Frame Scrubbing, CSS 3D Depth, Three.js WebGL), autonomous generate_image asset creation, lerp inertia controllers, sub-1ms Web Audio FX, and 60 FPS performance capping.
---

# `motion-3d-scroll`: Accelerated 3D Motion Scroll Protocol

`motion-3d-scroll` accelerates and automates the creation of trending 3D motion scroll websites. It provides pre-built, high-performance motion primitives across **4 Accelerated 3D Motion Modes**, eliminating manual setup and ensuring sub-millisecond responsiveness.

---

## 🎬 4 Accelerated 3D Motion Modes

### Mode 1: Apple-Style Image Sequence Canvas Scrubbing (Fastest & Photorealistic)
- Preloads 60–120 high-res WebP/PNG image frames into an Image() buffer.
- Scrubs frames onto a 2D `<canvas>` context using lerp interpolation:
  ```js
  const targetFrame = Math.floor(scrollRatio * (totalFrames - 1));
  currentFrame += (targetFrame - currentFrame) * 0.1;
  ctx.drawImage(images[Math.floor(currentFrame)], 0, 0, canvas.width, canvas.height);
  ```
- **Autonomous Asset Creation**: If 3D render images are missing, AGY autonomously invokes `generate_image` to generate working 3D product renders/textures—NEVER dead links or placeholders.

### Mode 2: Scroll-Driven Video Frame Scrubbing (`<video>` `currentTime`)
- Scrubs HTML5 `<video>` element `currentTime` based on scroll position:
  ```js
  const targetTime = scrollRatio * video.duration;
  video.currentTime += (targetTime - video.currentTime) * 0.1;
  ```
- Uses `requestAnimationFrame` for 60 FPS video playback scrubbing without audio distortion or stutter.

### Mode 3: CSS 3D Depth & Sticky Canvas Parallax (Zero External Dependencies)
- Combines CSS `perspective: 1000px`, `transform: translate3d(0, 0, z) rotateY(deg)`, and `position: sticky; top: 0` section pinning.
- Lightweight Canvas 2D spline curves and particle parallax backgrounds.
- 100% native, sub-millisecond load times, zero external JS libraries required.

### Mode 4: Real-Time Three.js / WebGL Scene (Full 3D Simulation)
- Real-time Three.js viewport canvas with GLTF/GLB models or procedural geometric meshes.
- Camera dolly track zoom and lighting control tied to scroll milestones.

---

## 🔊 Sub-1ms Web Audio Procedural FX

Procedural Web Audio API sound synthesizer producing tactile UI clicks, camera shutter sounds, and scroll milestone chimes (0 external MP3 asset downloads required):

```js
function playTactileClick(freq = 800) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  gain.gain.setValueAtTime(0.05, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.04);
}
```

---

## ⚡ 60 FPS Capping & WebGL Memory Disposal

1. **Dynamic DPR Capping**: Cap device pixel ratio (`Math.min(window.devicePixelRatio, 2)`) to prevent GPU thermal throttling.
2. **WebGL Context Disposal**: Explicitly dispose geometries, materials, and textures on component unmount:
   ```js
   geometry.dispose();
   material.dispose();
   renderer.dispose();
   ```
3. **Reduced Motion Fallback**: Gracefully fall back to static CSS reveals when user enables `prefers-reduced-motion`.
