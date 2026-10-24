/**
 * ZeroCode Techfest, IIT Bombay — Interactive GSAP & SVG Controller
 * Handles smooth scroll triggers, interactive SVG gauge, zonal circuit map,
 * audio feedback synthesizer, prompt economy calculations, and modals.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Global Audio Engine (Web Audio API - Synthesized Clicks/Pings)
class SoundEngine {
  constructor() {
    this.enabled = false;
    this.ctx = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playBlip(freq = 640, type = 'sine', duration = 0.08) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio fallback silent
    }
  }

  playPulse() {
    if (!this.enabled) return;
    this.playBlip(880, 'triangle', 0.14);
    setTimeout(() => this.playBlip(1200, 'sine', 0.12), 60);
  }
}

const sounds = new SoundEngine();

// Ambient Canvas Particle Grid
function initAmbientCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 24000), 45);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
    });
  }

  let mouseX = -1000;
  let mouseY = -1000;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw subtle connecting lines
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Mouse subtle interaction
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 * (1 - dist / 120)})`;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
      }

      ctx.fillStyle = `rgba(148, 163, 184, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(render);
  }

  render();
}

// Custom Cursor Follower
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor || window.innerWidth < 768) return;

  let mouseX = -100;
  let mouseY = -100;
  let cursorX = -100;
  let cursorY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.classList.remove('opacity-0');
  });

  document.addEventListener('mouseleave', () => {
    cursor.classList.add('opacity-0');
  });

  function update() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    requestAnimationFrame(update);
  }
  update();

  // Scale cursor on interactive elements
  const hoverables = document.querySelectorAll('button, a, input, select, .pipeline-interactive-node, .zonal-node');
  hoverables.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('scale-150', 'border-cyan-300', 'bg-cyan-400/20');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('scale-150', 'border-cyan-300', 'bg-cyan-400/20');
    });
  });
}

// Hero Pipeline SVG Animation & Interactivity
function initPipelineVisualizer() {
  const orbitParticle = document.getElementById('orbit-particle');
  const triggerBtn = document.getElementById('pulse-trigger-btn');
  const captionText = document.getElementById('pipeline-status-text');

  if (orbitParticle) {
    // Animate orbit particle in circle around Gemini engine (center x=75, y=75, radius=70)
    let angle = 0;
    function animateOrbit() {
      angle += 0.025;
      const r = 70;
      const cx = 75;
      const cy = 75;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      orbitParticle.setAttribute('cx', x.toFixed(2));
      orbitParticle.setAttribute('cy', y.toFixed(2));
      requestAnimationFrame(animateOrbit);
    }
    animateOrbit();
  }

  function triggerEnergyPulse() {
    sounds.playPulse();
    const streams = [
      document.getElementById('pipeline-stream-1'),
      document.getElementById('pipeline-stream-2'),
      document.getElementById('pipeline-stream-3'),
    ];

    streams.forEach((stream) => {
      if (!stream) return;
      gsap.fromTo(
        stream,
        { stroke: '#FFFFFF', strokeWidth: 4, opacity: 1 },
        { stroke: 'url(#cyanGrad)', strokeWidth: 2.5, opacity: 0.85, duration: 1, ease: 'power2.out' }
      );
    });

    if (captionText) {
      captionText.textContent = 'Telemetry: High-throughput prompt energy routed through Gemini Flash synthesis.';
      captionText.classList.add('text-cyan-300');
      setTimeout(() => {
        captionText.textContent = 'Status: Live pipeline simulation active. Click nodes to fire prompt telemetry.';
        captionText.classList.remove('text-cyan-300');
      }, 3000);
    }
  }

  if (triggerBtn) {
    triggerBtn.addEventListener('click', triggerEnergyPulse);
  }

  // Interactive Node clicks
  const pipelineNodes = document.querySelectorAll('.pipeline-interactive-node');
  pipelineNodes.forEach((node) => {
    node.addEventListener('click', () => {
      sounds.playBlip(750, 'sine', 0.1);
      const stage = node.getAttribute('data-stage');
      if (captionText) {
        if (stage === 'prompts') {
          captionText.textContent = 'Inspecting Input Protocol: Max 5 free prompts allotted for zero scoring deduction.';
        } else if (stage === 'model') {
          captionText.textContent = 'Inspecting Synthesizer: Google AI Studio Gemini Flash model running zero-manual synthesis.';
        } else if (stage === 'output') {
          captionText.textContent = 'Inspecting Output Target: Vanilla triad (index.html, style.css, script.js) with zero npm overhead.';
        }
      }
      gsap.fromTo(node, { scale: 1.04 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' });
    });
  });
}

// 5-Step Architecture Decomposition Segmented View
const ARCH_DATA = {
  1: {
    badge: 'PROMPT PHASE 01 OF 05',
    cost: 'Zero Penalty (Free)',
    title: 'Foundational Semantic DOM Architecture',
    desc: 'Establish the complete HTML document skeleton, semantic containers, SVG asset wrappers, and IDs required by downstream CSS and JavaScript. Include all mandatory form fields and mock containers upfront.',
    code: '"Generate a semantic index.html for [Theme]. Include <header> with 3-zone contract, main section with IDs: #dashboard, #control-panel, #feed, and modal containers. Link /style.css and /script.js. Use zero frameworks."',
    target: 'Target: index.html',
    impact: 'Generates ~120 lines of structured semantic DOM without style overhead.',
    svgIcon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />',
  },
  2: {
    badge: 'PROMPT PHASE 02 OF 05',
    cost: 'Zero Penalty (Free)',
    title: 'CSS Design System & Layout Geometry',
    desc: 'Define custom properties, fluid typographic scale, asymmetric CSS Grid & Flexbox layouts, dark carbon theme surfaces, and responsive breakpoints. Establish the 60-30-10 color budget.',
    code: '"Write style.css for index.html: implement CSS variables for obsidian background #070A12, slate cards #0E1626, cyan accent #00F2FE. Apply CSS Grid for #dashboard and flex layout for #control-panel. No external CSS."',
    target: 'Target: style.css',
    impact: 'Builds comprehensive design tokens, media queries, and hairline borders.',
    svgIcon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />',
  },
  3: {
    badge: 'PROMPT PHASE 03 OF 05',
    cost: 'Zero Penalty (Free)',
    title: 'Interactive State & Vanilla DOM Manipulation',
    desc: 'Write pure JavaScript event listeners, active filter controls, local UI state management, and real-time DOM updates. Wire all buttons, form submits, and interactive dials.',
    code: '"Create script.js for index.html: implement interactive event handlers for #control-panel, dynamic list rendering in #feed, calculation engine for metrics, and keyboard accessibility. Vanilla JS only, zero imports."',
    target: 'Target: script.js',
    impact: 'Injects complete runtime interactivity with zero reliance on npm packages.',
    svgIcon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />',
  },
  4: {
    badge: 'PROMPT PHASE 04 OF 05',
    cost: 'Zero Penalty (Free)',
    title: 'Edge Resilience & Validation Hardening',
    desc: 'Audit input sanitization, form validation states, empty and loading fallbacks, and error boundaries. Ensure that rapid clicking or unexpected user entries never break the layout.',
    code: '"Audit script.js and style.css: add validation to prevent empty submissions in #control-panel, show inline warning states, and add accessible ARIA labels to all interactive controls."',
    target: 'Target: All 3 files',
    impact: 'Prevents scoring penalties caused by edge case crashes during judge testing.',
    svgIcon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />',
  },
  5: {
    badge: 'PROMPT PHASE 05 OF 05',
    cost: 'Zero Penalty (Free Cap Limit)',
    title: 'Micro-Interactions, Polish & Final Audit',
    desc: 'Apply CSS transitions (<=200ms cubic-bezier), hover states, keyboard focus indicators, and verify that exactly 3 files exist with zero manual edits before concluding the round.',
    code: '"Final pass on style.css and script.js: smooth micro-interactions on buttons, optical dark-mode alignment, verify zero console errors, and confirm responsive viewport at 1440px and mobile."',
    target: 'Target: Submission Package',
    impact: 'Delivers a top-tier polished submission while remaining within the 5-prompt free cap.',
    svgIcon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />',
  },
};

function initArchitectureExplorer() {
  const tabs = document.querySelectorAll('.arch-tab-btn');
  const card = document.getElementById('arch-display-card');
  const badge = document.getElementById('arch-step-badge');
  const cost = document.getElementById('arch-step-cost');
  const title = document.getElementById('arch-step-title');
  const desc = document.getElementById('arch-step-desc');
  const code = document.getElementById('arch-step-code');
  const target = document.getElementById('arch-file-focus');
  const impact = document.getElementById('arch-step-impact');
  const icon = document.getElementById('arch-step-icon');

  if (!tabs.length || !card) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      sounds.playBlip(620, 'sine', 0.08);
      tabs.forEach((t) => t.classList.remove('active', 'bg-cyan-400', 'text-carbon'));
      tab.classList.add('active');

      const step = tab.getAttribute('data-step') || '1';
      const data = ARCH_DATA[step];
      if (!data) return;

      gsap.to(card, {
        opacity: 0.4,
        y: 4,
        duration: 0.12,
        onComplete: () => {
          if (badge) badge.textContent = data.badge;
          if (cost) cost.textContent = data.cost;
          if (title) title.textContent = data.title;
          if (desc) desc.textContent = data.desc;
          if (code) code.textContent = data.code;
          if (target) target.textContent = data.target;
          if (impact) impact.textContent = data.impact;
          if (icon) {
            icon.innerHTML = `<svg class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">${data.svgIcon}</svg>`;
          }

          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.25,
            ease: 'power2.out',
          });
        },
      });
    });
  });
}

// Prompt Economy & Score Penalty Calculator (SVG Radial Gauge)
function initPromptCalculator() {
  const slider = document.getElementById('prompt-slider');
  const countLabel = document.getElementById('slider-prompt-count');
  const penaltyPromptsEl = document.getElementById('sim-penalty-prompts');
  const multiplierEl = document.getElementById('sim-score-multiplier');
  const strategyTierEl = document.getElementById('sim-strategy-tier');
  const adviceEl = document.getElementById('sim-advice-text');
  const gaugeProgress = document.getElementById('gauge-progress');
  const gaugeScoreVal = document.getElementById('gauge-score-val');
  const gaugePenaltyLabel = document.getElementById('gauge-penalty-label');

  if (!slider || !gaugeProgress) return;

  // Gauge circumference: radius = 80 -> 2 * PI * 80 ~= 502.65
  // Visible arc: 270 deg of circle -> ~377 dash length
  const MAX_ARC = 377;

  function updateCalculator() {
    const prompts = parseInt(slider.value, 10);
    if (countLabel) countLabel.textContent = `${prompts} prompt${prompts > 1 ? 's' : ''}`;

    let penaltyPrompts = Math.max(0, prompts - 5);
    let penaltyPercent = penaltyPrompts * 8; // 8% penalty per prompt beyond 5
    let efficiencyScore = Math.max(0, 100 - penaltyPercent);
    let multiplier = (efficiencyScore / 100).toFixed(2);

    if (penaltyPromptsEl) {
      penaltyPromptsEl.textContent = `${penaltyPrompts} prompt${penaltyPrompts === 1 ? '' : 's'}`;
      penaltyPromptsEl.className = penaltyPrompts === 0 ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold';
    }

    if (multiplierEl) {
      multiplierEl.textContent = `${multiplier}x (${efficiencyScore}% of Max)`;
    }

    // Determine tier & advice
    let tier = 'Master Architect';
    let tierColor = 'text-emerald-400';
    let advice = 'Optimal bracket. You have utilized all 5 free prompts without incurring scoring deductions. Ensure your 3 files are valid vanilla code before submitting.';

    if (prompts <= 3) {
      tier = 'Ultra-Lean Strategist';
      tierColor = 'text-cyan-400';
      advice = 'Exceptional economy! You have spare free prompts available. Use Prompt 4 or 5 for micro-interaction polish and edge-case testing.';
    } else if (prompts === 4 || prompts === 5) {
      tier = 'Master Architect';
      tierColor = 'text-emerald-400';
      advice = 'Peak competitive efficiency. 100% of points retained without prompt penalties. Verify that your index.html, style.css, and script.js are complete.';
    } else if (prompts <= 8) {
      tier = 'Tactical Iteration';
      tierColor = 'text-amber-400';
      advice = `Minor penalty (-${penaltyPercent}%). The extra ${penaltyPrompts} prompt(s) must yield significantly higher polish and functionality to offset the point reduction.`;
    } else {
      tier = 'High Penalty Risk';
      tierColor = 'text-red-400';
      advice = `Severe deduction (-${penaltyPercent}%). Excessive prompt cycles indicate trial-and-error rather than upfront prompt architecture. Focus on prompt planning!`;
    }

    if (strategyTierEl) {
      strategyTierEl.textContent = tier;
      strategyTierEl.className = `${tierColor} font-semibold`;
    }

    if (adviceEl) {
      adviceEl.textContent = advice;
    }

    if (gaugePenaltyLabel) {
      gaugePenaltyLabel.textContent = `${penaltyPercent}% PENALTY`;
      gaugePenaltyLabel.setAttribute('fill', penaltyPercent === 0 ? '#10B981' : penaltyPercent <= 24 ? '#F59E0B' : '#EF4444');
    }

    // GSAP tween the gauge arc offset
    // 100 score -> strokeDashoffset = 125 (full 270 deg visible)
    // 0 score -> strokeDashoffset = 377 (empty)
    const targetOffset = 125 + ((100 - efficiencyScore) / 100) * (377 - 125);

    gsap.to(gaugeProgress, {
      strokeDashoffset: targetOffset,
      stroke: penaltyPercent === 0 ? '#00F2FE' : penaltyPercent <= 24 ? '#F59E0B' : '#EF4444',
      duration: 0.35,
      ease: 'power2.out',
    });

    // Tween the number readout
    if (gaugeScoreVal) {
      const currentScore = parseInt(gaugeScoreVal.textContent || '0', 10);
      gsap.to(
        { val: currentScore },
        {
          val: efficiencyScore,
          duration: 0.35,
          ease: 'power2.out',
          onUpdate: function () {
            gaugeScoreVal.textContent = Math.round(this.targets()[0].val).toString();
          },
        }
      );
    }
  }

  slider.addEventListener('input', () => {
    sounds.playBlip(480 + parseInt(slider.value, 10) * 35, 'sine', 0.05);
    updateCalculator();
  });

  // Initial trigger
  updateCalculator();
}

// Interactive India Zonal Circuit Map
function initZonalMap() {
  const nodes = document.querySelectorAll('.zonal-node');
  const cityEl = document.getElementById('zonal-info-city');
  const dateEl = document.getElementById('zonal-info-date');
  const venueEl = document.getElementById('zonal-info-venue');
  const statusEl = document.getElementById('zonal-info-status');
  const ctaBtn = document.getElementById('zonal-register-cta');

  if (!nodes.length) return;

  nodes.forEach((node) => {
    node.addEventListener('click', () => {
      sounds.playBlip(720, 'sine', 0.09);

      // Reset node styles
      nodes.forEach((n) => {
        n.classList.remove('active-hub');
        const circle = n.querySelector('circle:last-of-type');
        if (circle) circle.setAttribute('fill', '#38BDF8');
      });

      node.classList.add('active-hub');
      const activeCircle = node.querySelector('circle:last-of-type');
      if (activeCircle) activeCircle.setAttribute('fill', '#00F2FE');

      const city = node.getAttribute('data-city') || 'Regional City Zonal';
      const date = node.getAttribute('data-date') || 'Zonal Scheduled Date';
      const venue = node.getAttribute('data-venue') || 'Regional Host Campus';
      const status = node.getAttribute('data-status') || 'Registration Open';

      if (cityEl) cityEl.textContent = city;
      if (dateEl) dateEl.textContent = date;
      if (venueEl) venueEl.textContent = venue;
      if (statusEl) statusEl.textContent = status;

      // Animate card highlight
      const card = cityEl?.closest('.rounded-2xl');
      if (card) {
        gsap.fromTo(card, { borderColor: '#00F2FE' }, { borderColor: 'rgba(255, 255, 255, 0.1)', duration: 1 });
      }
    });
  });

  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      const selectedCity = cityEl?.textContent?.trim() || 'Mumbai (IIT Bombay)';
      openRegistrationModal(selectedCity);
    });
  }
}

// 3-File Submission Blueprint & Code Inspector
const CODE_TEMPLATES = {
  html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ZeroCode Zonal Project - Team Entry</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <!-- Generated entirely via Google AI Studio Gemini Flash prompts -->
    <header id="app-header">
      <div class="brand">ProjectTitle</div>
      <div id="status-chip">Live</div>
    </header>

    <main id="app-root">
      <!-- Theme-specific interactive workspace generated on-site -->
      <section id="interactive-panel"></section>
    </main>

    <script src="script.js"></script>
  </body>
</html>`,
  css: `/* ==========================================================================
   ZeroCode Zonal Project — Pure Vanilla CSS (Zero Frameworks)
   ========================================================================== */

:root {
  --bg-primary: #0A0E17;
  --surface: #111827;
  --accent: #00F2FE;
  --text-main: #F9FAFB;
  --text-muted: #9CA3AF;
  --border: rgba(255, 255, 255, 0.1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-main);
  min-height: 100vh;
}

#app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2rem;
  border-bottom: 1px solid var(--border);
}

#interactive-panel {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1.5rem;
}`,
  js: `/**
 * ZeroCode Zonal Project — Pure Vanilla JavaScript
 * Zero external libraries or npm dependencies permitted.
 */

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('interactive-panel');
  
  // State management
  const state = {
    activeCategory: 'all',
    metrics: { cycles: 0, score: 100 }
  };

  // Render initial workspace
  function render() {
    if (!root) return;
    root.innerHTML = \`
      <div class="workspace-card">
        <h2>Live Synthesized Application</h2>
        <p>Built with zero manual code via Google AI Studio (Gemini Flash).</p>
        <button id="action-trigger">Run Action</button>
      </div>
    \`;

    const btn = document.getElementById('action-trigger');
    btn?.addEventListener('click', () => {
      state.metrics.cycles++;
      console.log('Action recorded:', state.metrics);
    });
  }

  render();
});`,
};

function initCodeInspector() {
  const tabs = document.querySelectorAll('.code-file-tab');
  const codePane = document.getElementById('code-snippet-pane');
  const copyBtn = document.getElementById('copy-code-btn');
  const copyText = document.getElementById('copy-btn-text');

  let currentFile = 'html';

  if (!tabs.length || !codePane) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      sounds.playBlip(600, 'sine', 0.06);
      tabs.forEach((t) => t.classList.remove('active', 'bg-slate-800', 'text-cyan-400'));
      tab.classList.add('active');

      const file = tab.getAttribute('data-file') || 'html';
      currentFile = file;

      gsap.to(codePane, {
        opacity: 0.3,
        duration: 0.1,
        onComplete: () => {
          codePane.textContent = CODE_TEMPLATES[file] || '';
          gsap.to(codePane, { opacity: 1, duration: 0.2 });
        },
      });
    });
  });

  if (copyBtn && copyText) {
    copyBtn.addEventListener('click', () => {
      sounds.playBlip(800, 'triangle', 0.1);
      const textToCopy = CODE_TEMPLATES[currentFile] || '';
      navigator.clipboard.writeText(textToCopy).then(() => {
        copyText.textContent = 'Copied!';
        setTimeout(() => {
          copyText.textContent = 'Copy File';
        }, 2000);
      });
    });
  }
}

// Rules Accordion & Search Filter
function initRulesAccordion() {
  const items = document.querySelectorAll('.rule-item');
  const searchInput = document.getElementById('rules-search-input');

  items.forEach((item) => {
    const btn = item.querySelector('.rule-toggle-btn');
    const content = item.querySelector('.rule-content');
    if (!btn || !content) return;

    btn.addEventListener('click', () => {
      sounds.playBlip(550, 'sine', 0.08);
      const isOpen = item.classList.contains('open');

      if (isOpen) {
        item.classList.remove('open');
        content.classList.add('hidden');
      } else {
        item.classList.add('open');
        content.classList.remove('hidden');
        gsap.from(content, { opacity: 0, y: -4, duration: 0.2 });
      }
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = (e.target.value || '').toLowerCase().trim();
      items.forEach((item) => {
        const text = item.textContent?.toLowerCase() || '';
        if (text.includes(query)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  }
}

// Live Countdown Timer to Finals (Dec 16, 2026)
function initCountdown() {
  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minsEl = document.getElementById('countdown-mins');
  const secsEl = document.getElementById('countdown-secs');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  const targetDate = new Date('2026-12-16T09:00:00+05:30').getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = d < 10 ? `0${d}` : d.toString();
    hoursEl.textContent = h < 10 ? `0${h}` : h.toString();
    minsEl.textContent = m < 10 ? `0${m}` : m.toString();
    secsEl.textContent = s < 10 ? `0${s}` : s.toString();
  }

  update();
  setInterval(update, 1000);
}

// Registration Modal Logic
let modalOpenCity = 'Mumbai (IIT Bombay)';

function openRegistrationModal(presetCity = 'Mumbai (IIT Bombay)') {
  sounds.playBlip(700, 'sine', 0.1);
  const modal = document.getElementById('register-modal');
  const formView = document.getElementById('modal-form-view');
  const successView = document.getElementById('modal-success-view');
  const zonalSelect = document.getElementById('reg-zonal');

  if (!modal) return;

  modalOpenCity = presetCity;
  if (zonalSelect) {
    zonalSelect.value = presetCity;
  }

  modal.classList.remove('hidden');
  if (formView) formView.classList.remove('hidden');
  if (successView) successView.classList.add('hidden');
}

function closeRegistrationModal() {
  sounds.playBlip(500, 'sine', 0.08);
  const modal = document.getElementById('register-modal');
  if (modal) modal.classList.add('hidden');
}

function initRegistrationModal() {
  const modal = document.getElementById('register-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const doneBtn = document.getElementById('modal-done-btn');
  const form = document.getElementById('registration-form');
  const formView = document.getElementById('modal-form-view');
  const successView = document.getElementById('modal-success-view');
  const participantIdEl = document.getElementById('generated-participant-id');
  const zonalTagEl = document.getElementById('confirmation-zonal-tag');

  // Trigger buttons
  const headerBtn = document.getElementById('header-register-btn');
  const heroBtn = document.getElementById('hero-register-btn');
  const finalBtn = document.getElementById('final-register-btn');

  [headerBtn, heroBtn, finalBtn].forEach((btn) => {
    btn?.addEventListener('click', () => openRegistrationModal('Mumbai (IIT Bombay)'));
  });

  closeBtn?.addEventListener('click', closeRegistrationModal);
  doneBtn?.addEventListener('click', closeRegistrationModal);

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeRegistrationModal();
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    sounds.playPulse();

    const zonal = (document.getElementById('reg-zonal')).value;
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const pid = `TF-ZC-2026-${randNum}`;

    if (participantIdEl) participantIdEl.textContent = pid;
    if (zonalTagEl) zonalTagEl.textContent = `Zonal: ${zonal}`;

    if (formView) formView.classList.add('hidden');
    if (successView) {
      successView.classList.remove('hidden');
      gsap.from(successView, { opacity: 0, scale: 0.95, duration: 0.3, ease: 'back.out(1.5)' });
    }
  });
}

// Audio Feedback Toggle
function initAudioToggle() {
  const toggleBtn = document.getElementById('audio-toggle');
  const iconOn = document.getElementById('audio-icon-on');
  const iconOff = document.getElementById('audio-icon-off');

  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    sounds.enabled = !sounds.enabled;
    if (sounds.enabled) {
      sounds.init();
      sounds.playBlip(880, 'sine', 0.12);
      iconOn?.classList.remove('hidden');
      iconOff?.classList.add('hidden');
      toggleBtn.classList.add('border-cyan-400', 'text-cyan-300');
    } else {
      iconOn?.classList.add('hidden');
      iconOff?.classList.remove('hidden');
      toggleBtn.classList.remove('border-cyan-400', 'text-cyan-300');
    }
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    sounds.playBlip(600, 'sine', 0.08);
    menu.classList.toggle('hidden');
  });

  links.forEach((l) => {
    l.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

// GSAP ScrollTrigger Orchestrations
function initGSAPScrollAnimations() {
  if (typeof gsap === 'undefined') return;

  // Hero staggered entrance
  gsap.from('.hero-fade', {
    y: 28,
    opacity: 0,
    stagger: 0.12,
    duration: 0.9,
    ease: 'power3.out',
    delay: 0.1,
  });

  // Header hairline shadow on scroll
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('bg-carbon/95', 'shadow-lg');
    } else {
      header?.classList.remove('bg-carbon/95', 'shadow-lg');
    }
  });

  // Bento card scroll trigger
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.utils.toArray('.bento-card').forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    });

    // Rounds cards entrance
    gsap.utils.toArray('#rounds .rounded-2xl').forEach((roundCard) => {
      gsap.from(roundCard, {
        scrollTrigger: {
          trigger: roundCard,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
      });
    });
  }
}

// Google Keep Notes & Prompt Scratchpad Controller
function initKeepNotes() {
  const toggleBtn = document.getElementById('keep-notes-toggle');
  const drawer = document.getElementById('keep-drawer');
  const backdrop = document.getElementById('keep-drawer-backdrop');
  const closeBtn = document.getElementById('keep-drawer-close');
  const addBtn = document.getElementById('add-note-btn');
  const titleInput = document.getElementById('new-note-title');
  const contentInput = document.getElementById('new-note-content');
  const pinInput = document.getElementById('new-note-pin');
  const searchInput = document.getElementById('search-notes-input');
  const listContainer = document.getElementById('keep-notes-list');
  const colorDots = document.querySelectorAll('.keep-color-dot');

  if (!toggleBtn || !drawer || !listContainer) return;

  const STORAGE_KEY = 'zerocode_keep_notes_v1';
  let selectedColor = 'slate';

  const defaultNotes = [
    {
      id: 'default-1',
      title: 'Zonal 5-Prompt Master Plan',
      content: 'P1: Semantic DOM in index.html (header, main root, footer)\nP2: CSS Design Tokens in style.css (obsidian theme, hairline borders)\nP3: Interactive JS handlers in script.js (events, state machine)\nP4: Edge case validation & empty state hardening\nP5: Micro-interactions polish & zero-error audit',
      color: 'amber',
      pinned: true,
      timestamp: Date.now() - 3600000,
    },
    {
      id: 'default-2',
      title: 'Zero-Framework Vanilla Rules',
      content: 'Submit exactly 3 files: index.html, style.css, script.js.\nNo React, no Tailwind CDN, no npm modules.\nAll changes must be prompted through Google AI Studio (Gemini Flash).\nManual editing = immediate disqualification!',
      color: 'cyan',
      pinned: true,
      timestamp: Date.now() - 7200000,
    },
    {
      id: 'default-3',
      title: '70-Minute Zonal Timeline Plan',
      content: '0-10m: Analyze theme, sketch architecture, plan 5 prompts.\n10-35m: Run Prompts 1-3 (DOM, CSS tokens, Core JS).\n35-50m: Test live interactions, edge cases, responsiveness.\n50-60m: Run Prompts 4-5 for polish and audit.\n60-70m: Final file bundle verification and submission.',
      color: 'emerald',
      pinned: false,
      timestamp: Date.now() - 10800000,
    },
  ];

  let notes = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    notes = raw ? JSON.parse(raw) : defaultNotes;
  } catch {
    notes = defaultNotes;
  }

  function saveNotes() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // Storage fallback
    }
    renderNotes();
  }

  function openDrawer() {
    sounds.playBlip(780, 'sine', 0.1);
    backdrop?.classList.remove('hidden');
    drawer?.classList.add('open');
  }

  function closeDrawer() {
    sounds.playBlip(480, 'sine', 0.08);
    backdrop?.classList.add('hidden');
    drawer?.classList.remove('open');
  }

  toggleBtn.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);

  // Color picker handler
  colorDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      sounds.playBlip(600, 'sine', 0.05);
      colorDots.forEach((d) => d.classList.remove('active', 'ring-2', 'ring-white'));
      dot.classList.add('active', 'ring-2', 'ring-white');
      selectedColor = dot.getAttribute('data-color') || 'slate';
    });
  });

  // Add Note handler
  addBtn?.addEventListener('click', () => {
    const title = titleInput?.value.trim() || '';
    const content = contentInput?.value.trim() || '';

    if (!content && !title) {
      if (contentInput) contentInput.focus();
      return;
    }

    sounds.playPulse();

    const newNote = {
      id: 'note_' + Date.now(),
      title: title || 'Untitled Note',
      content: content,
      color: selectedColor,
      pinned: pinInput ? pinInput.checked : false,
      timestamp: Date.now(),
    };

    notes.unshift(newNote);
    saveNotes();

    // Reset inputs
    if (titleInput) titleInput.value = '';
    if (contentInput) contentInput.value = '';
    if (pinInput) pinInput.checked = false;
  });

  function renderNotes() {
    if (!listContainer) return;
    const query = (searchInput?.value || '').toLowerCase().trim();

    const filtered = notes.filter((n) => {
      return n.title.toLowerCase().includes(query) || n.content.toLowerCase().includes(query);
    });

    if (filtered.length === 0) {
      listContainer.innerHTML = `
        <div class="rounded-xl border border-dashed border-white/10 p-6 text-center text-xs text-slate-500">
          No matching prompt notes found. Create one above!
        </div>
      `;
      return;
    }

    // Sort: pinned first, then newest
    filtered.sort((a, b) => {
      if (a.pinned === b.pinned) return b.timestamp - a.timestamp;
      return a.pinned ? -1 : 1;
    });

    listContainer.innerHTML = filtered
      .map((n) => {
        const dateStr = new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `
          <div class="keep-note-card keep-note-${n.color}" data-id="${n.id}">
            <div class="flex items-start justify-between gap-2 mb-1.5">
              <h4 class="font-semibold text-xs text-white leading-tight">${escapeHtml(n.title)}</h4>
              <button class="keep-pin-btn text-xs ${n.pinned ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'}" title="${n.pinned ? 'Unpin' : 'Pin to top'}">
                ${n.pinned ? '★' : '☆'}
              </button>
            </div>
            <p class="text-xs text-slate-300 whitespace-pre-line leading-relaxed font-mono select-all">${escapeHtml(n.content)}</p>
            <div class="flex items-center justify-between border-t border-white/10 mt-3 pt-2 text-[10px] text-slate-400">
              <span>${dateStr}</span>
              <div class="flex items-center gap-2">
                <button class="keep-copy-btn hover:text-cyan-300 transition-colors flex items-center gap-1" title="Copy for Google AI Studio">
                  <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy</span>
                </button>
                <button class="keep-del-btn hover:text-red-400 transition-colors" title="Delete note">
                  ✕
                </button>
              </div>
            </div>
          </div>
        `;
      })
      .join('');

    // Wire note item events
    listContainer.querySelectorAll('.keep-note-card').forEach((card) => {
      const id = card.getAttribute('data-id');
      const note = notes.find((n) => n.id === id);
      if (!note) return;

      // Pin button
      card.querySelector('.keep-pin-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        sounds.playBlip(680, 'sine', 0.08);
        note.pinned = !note.pinned;
        saveNotes();
      });

      // Copy button
      card.querySelector('.keep-copy-btn')?.addEventListener('click', function (e) {
        e.stopPropagation();
        sounds.playBlip(820, 'triangle', 0.1);
        const text = `${note.title}\n\n${note.content}`;
        navigator.clipboard.writeText(text).then(() => {
          const span = this.querySelector('span');
          if (span) {
            span.textContent = 'Copied!';
            setTimeout(() => {
              span.textContent = 'Copy';
            }, 1800);
          }
        });
      });

      // Delete button
      card.querySelector('.keep-del-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        sounds.playBlip(400, 'sine', 0.08);
        notes = notes.filter((n) => n.id !== id);
        saveNotes();
      });
    });
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  searchInput?.addEventListener('input', () => {
    renderNotes();
  });

  renderNotes();
}

// Initialize Everything on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initAmbientCanvas();
  initCustomCursor();
  initPipelineVisualizer();
  initArchitectureExplorer();
  initPromptCalculator();
  initZonalMap();
  initCodeInspector();
  initRulesAccordion();
  initCountdown();
  initRegistrationModal();
  initKeepNotes();
  initAudioToggle();
  initMobileMenu();
  initGSAPScrollAnimations();
});
