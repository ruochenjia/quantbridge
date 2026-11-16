// QuantBridge - Main Application Logic, Interactive Labs & State Manager

(function () {
  'use strict';

  // --- Global Application State & Storage ---
  const state = {
    theme: localStorage.getItem('quant_theme') || 'dark',
    activeTab: 'roles',
    activeLab: 'bs',
    masteredQuestions: new Set(JSON.parse(localStorage.getItem('quant_mastered') || '[]')),
    quizAnswers: JSON.parse(localStorage.getItem('quant_quiz_answers') || '{}'),
    checkedRoadmap: new Set(JSON.parse(localStorage.getItem('quant_roadmap_checked') || '[]')),
    mentalMathHighScore: parseInt(localStorage.getItem('quant_mental_highscore') || '0', 10),
    // Interactive Labs State
    bs: {
      S: 100,
      K: 100,
      days: 90,
      sigma: 0.25,
      r: 0.05,
      chartMode: 'price' // 'price', 'delta', 'gamma', 'vega'
    },
    mc: {
      S0: 100,
      mu: 0.10,
      sigma: 0.20,
      T: 1.0,
      steps: 252,
      paths: 25,
      simulatedPaths: null
    },
    kelly: {
      p: 0.55,
      b: 1.0,
      fCustom: 0.10,
      nBets: 150,
      initialWealth: 1000
    },
    lob: {
      bids: [],
      asks: [],
      tape: [],
      autoFlowInterval: null,
      orderSeq: 1000
    },
    trainer: {
      isRunning: false,
      timer: 60,
      duration: 60,
      score: 0,
      streak: 0,
      currentProblem: null,
      mode: 'arithmetic', // 'arithmetic', 'percent', 'ev'
      interval: null
    }
  };

  // --- Normal Distribution & Math Helpers ---
  function stdNormPDF(x) {
    return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
  }

  // Hart's approximation of standard normal cumulative distribution
  function stdNormCDF(x) {
    const a1 = 0.319381530;
    const a2 = -0.356563782;
    const a3 = 1.781477937;
    const a4 = -1.821255978;
    const a5 = 1.330274429;
    const k = 1.0 / (1.0 + 0.2316419 * Math.abs(x));
    const poly = ((((a5 * k + a4) * k + a3) * k + a2) * k + a1) * k;
    const cdf = 1.0 - stdNormPDF(x) * poly;
    return x >= 0 ? cdf : 1.0 - cdf;
  }

  // Black-Scholes Analytical Pricing & Greeks
  function calcBlackScholes(S, K, T, r, sigma) {
    if (T <= 0.0001) T = 0.0001;
    if (sigma <= 0.0001) sigma = 0.0001;

    const sqrtT = Math.sqrt(T);
    const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * sqrtT);
    const d2 = d1 - sigma * sqrtT;

    const expRT = Math.exp(-r * T);
    const nd1 = stdNormCDF(d1);
    const nd2 = stdNormCDF(d2);
    const n_minus_d1 = stdNormCDF(-d1);
    const n_minus_d2 = stdNormCDF(-d2);
    const npd1 = stdNormPDF(d1);

    const callPrice = S * nd1 - K * expRT * nd2;
    const putPrice = K * expRT * n_minus_d2 - S * n_minus_d1;

    const callDelta = nd1;
    const putDelta = nd1 - 1.0;
    const gamma = npd1 / (S * sigma * sqrtT);
    const vega = (S * npd1 * sqrtT) / 100; // per 1% vol

    // 1-day theta
    const callTheta = (-(S * npd1 * sigma) / (2 * sqrtT) - r * K * expRT * nd2) / 365;
    const putTheta = (-(S * npd1 * sigma) / (2 * sqrtT) + r * K * expRT * n_minus_d2) / 365;

    // Rho per 1% interest rate
    const callRho = (K * T * expRT * nd2) / 100;
    const putRho = (-K * T * expRT * n_minus_d2) / 100;

    return {
      callPrice: Math.max(0, callPrice),
      putPrice: Math.max(0, putPrice),
      callDelta,
      putDelta,
      gamma,
      vega,
      callTheta,
      putTheta,
      callRho,
      putRho,
      d1,
      d2
    };
  }

  // Box-Muller Standard Normal Generator
  function randomNormal() {
    let u1 = 0, u2 = 0;
    while (u1 === 0) u1 = Math.random();
    while (u2 === 0) u2 = Math.random();
    return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  }

  // --- KaTeX Auto-Render Helper with Graceful Fallback ---
  function triggerMathRendering(element = document.body) {
    if (typeof renderMathInElement === 'function') {
      try {
        renderMathInElement(element, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false },
            { left: '\\[', right: '\\]', display: true }
          ],
          throwOnError: false
        });
      } catch (err) {
        console.warn('Math rendering notice:', err);
      }
    }
  }

  // --- DOM Helpers ---
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

  // --- Theme Management ---
  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('quant_theme', theme);
    const themeBtn = $('#themeToggleBtn');
    if (themeBtn) {
      themeBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
      themeBtn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    }
    // Redraw active canvas if needed
    if (state.activeTab === 'labs') {
      redrawActiveLab();
    }
  }

  // --- Tab Navigation ---
  function setActiveTab(tabId) {
    state.activeTab = tabId;
    $$('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    $$('.tab-content').forEach(panel => {
      panel.classList.toggle('active', panel.id === `tab-${tabId}`);
    });
    window.location.hash = tabId;

    if (tabId === 'labs') {
      redrawActiveLab();
    }
    updateProgressUI();

    // Trigger Math rendering with retry in case KaTeX loads asynchronously
    triggerMathRendering();
    setTimeout(triggerMathRendering, 300);
    setTimeout(triggerMathRendering, 1000);
  }

  // --- Render Progress Tracker ---
  function updateProgressUI() {
    const totalQuestions = (QUANT_DATA.interviewQuestions || []).length;
    const masteredCount = state.masteredQuestions.size;
    const masteredPct = totalQuestions > 0 ? Math.round((masteredCount / totalQuestions) * 100) : 0;

    const totalQuizzes = (QUANT_DATA.quizzes || []).length;
    const answeredCount = Object.keys(state.quizAnswers).length;
    let correctCount = 0;
    QUANT_DATA.quizzes.forEach((q, idx) => {
      if (state.quizAnswers[q.id] === q.correct) correctCount++;
    });

    const totalSemesters = 8;
    const checkedCount = state.checkedRoadmap.size;

    // Overall readiness index
    const readiness = Math.min(100, Math.round((masteredPct * 0.45) + ((correctCount / Math.max(1, totalQuizzes)) * 35) + ((checkedCount / totalSemesters) * 20)));

    const dial = $('#userProgressDial');
    if (dial) {
      dial.style.setProperty('--percent', readiness);
      dial.querySelector('.progress-dial-val').textContent = `${readiness}%`;
    }

    const statMastered = $('#statQuestionsMastered');
    if (statMastered) statMastered.textContent = `${masteredCount}/${totalQuestions}`;

    const statQuiz = $('#statQuizScore');
    if (statQuiz) statQuiz.textContent = `${correctCount}/${totalQuizzes}`;

    const badgeQ = $('#badgeQuestionsDone');
    if (badgeQ) badgeQ.innerHTML = `🎯 <strong>${masteredCount}</strong> Mastered`;

    const badgeQuiz = $('#badgeQuizDone');
    if (badgeQuiz) badgeQuiz.innerHTML = `📝 <strong>${correctCount}/${totalQuizzes}</strong> Quizzes Passed`;

    const badgeHigh = $('#badgeHighScore');
    if (badgeHigh) badgeHigh.innerHTML = `⚡ <strong>${state.mentalMathHighScore}</strong> Math High Score`;
  }

  // --- Render 1: Roles Grid & Matcher ---
  function initRolesTab() {
    const grid = $('#rolesGrid');
    if (!grid) return;

    grid.innerHTML = QUANT_DATA.roles.map(r => `
      <div class="role-card ${r.id}">
        <div class="role-header">
          <div class="role-title">${r.title}</div>
          <span class="role-badge">${r.badge}</span>
        </div>
        <div class="role-focus">${r.focus} • ${r.salary}</div>
        <div class="role-desc">${r.dayInLife}</div>
        <div class="role-details">
          <div class="role-detail-row">
            <strong>Math & Stats Focus:</strong>
            <span>${r.mathRelevance}</span>
          </div>
          <div class="role-detail-row">
            <strong>CS & Tech Stack:</strong>
            <span>${r.csRelevance}</span>
          </div>
          <div class="role-detail-row">
            <strong>Interview Screen:</strong>
            <span>${r.interviewFocus}</span>
          </div>
        </div>
        <div class="role-firms">
          ${r.firms.map(f => `<span class="firm-tag">${f}</span>`).join('')}
        </div>
      </div>
    `).join('');

    // Interactive Role Matcher
    const matcherBtn = $('#roleMatcherSubmit');
    if (matcherBtn) {
      matcherBtn.addEventListener('click', () => {
        const q1 = $('input[name="matcher_q1"]:checked')?.value;
        const q2 = $('input[name="matcher_q2"]:checked')?.value;
        const q3 = $('input[name="matcher_q3"]:checked')?.value;

        if (!q1 || !q2 || !q3) {
          alert("Please select an answer for all 3 questions to discover your best fit!");
          return;
        }

        let bestRole = "qr";
        let matchReason = "";

        if (q2 === "cs" || q3 === "latency") {
          bestRole = "qd";
          matchReason = "Your passion for low-level systems, C++, and hardware latency makes Quantitative Development (QD) your highest probability edge. Firms like Citadel Securities, HRT, and Jump will love your profile.";
        } else if (q1 === "speed" || q3 === "poker") {
          bestRole = "qt";
          matchReason = "Your fast arithmetic reflexes, competitive gaming/poker mindset, and quick decision-making under uncertainty align perfectly with Quantitative Trading (QT) at market makers like Optiver, Jane Street, and SIG.";
        } else if (q1 === "stoch" || q3 === "ml") {
          bestRole = "qr";
          matchReason = "Your strength in rigorous mathematical proofs, probability distributions, and machine learning models points directly to Quantitative Research (QR) at quantitative hedge funds like Two Sigma, D.E. Shaw, and Citadel.";
        } else {
          bestRole = "risk";
          matchReason = "Your well-rounded analytical rigor and macroeconomic/portfolio perspective fit Quantitative Risk and Portfolio Management.";
        }

        const roleObj = QUANT_DATA.roles.find(r => r.id === bestRole);
        const resultBox = $('#roleMatcherResult');
        resultBox.innerHTML = `
          <h4 style="font-size: 1.15rem; color: var(--accent-cyan); margin-bottom: 0.4rem;">🎯 Recommended Match: ${roleObj.title}</h4>
          <p style="font-size: 0.9rem; color: var(--text-primary); margin-bottom: 0.6rem;">${matchReason}</p>
          <div style="font-size: 0.85rem; color: var(--text-secondary);"><strong>Target Firms:</strong> ${roleObj.firms.join(', ')}</div>
        `;
        resultBox.classList.add('visible');
      });
    }
  }

  // --- Render 2: 4-Year Roadmap ---
  function initRoadmapTab() {
    const container = $('#roadmapTimeline');
    if (!container) return;

    container.innerHTML = QUANT_DATA.roadmap.map((y, yIdx) => `
      <div class="year-block">
        <div class="year-header">
          <div class="year-title-grp">
            <h3>${y.year}</h3>
            <div class="year-theme">${y.theme} — ${y.tagline}</div>
          </div>
        </div>
        <div class="semesters-grid">
          ${y.semesters.map((s, sIdx) => {
            const semKey = `sem_${yIdx}_${sIdx}`;
            const isChecked = state.checkedRoadmap.has(semKey);
            return `
              <div class="sem-card">
                <h4>
                  <input type="checkbox" class="action-checkbox roadmap-sem-chk" data-key="${semKey}" ${isChecked ? 'checked' : ''} />
                  ${s.name}
                </h4>
                <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.4rem;">Key University Courses</div>
                <ul class="sem-courses">
                  ${s.courses.map(c => `<li>${c}</li>`).join('')}
                </ul>
                <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.4rem;">Quant Action Items</div>
                <ul class="sem-actions">
                  ${s.quantActions.map(a => `<li><span>→</span> ${a}</li>`).join('')}
                </ul>
                <div class="sem-milestone">
                  <span>🏆 Milestone:</span> ${s.milestone}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `).join('');

    $$('.roadmap-sem-chk', container).forEach(chk => {
      chk.addEventListener('change', e => {
        const key = e.target.dataset.key;
        if (e.target.checked) {
          state.checkedRoadmap.add(key);
        } else {
          state.checkedRoadmap.delete(key);
        }
        localStorage.setItem('quant_roadmap_checked', JSON.stringify(Array.from(state.checkedRoadmap)));
        updateProgressUI();
      });
    });
  }

  // --- Render 3: Core Knowledge Modules ---
  function initModulesTab() {
    const list = $('#modulesList');
    if (!list) return;

    list.innerHTML = QUANT_DATA.modules.map(m => `
      <div class="module-card" id="module-${m.id}">
        <div class="module-meta">
          <span class="module-level-badge">${m.level}</span>
        </div>
        <h3>${m.title}</h3>
        <div class="module-subtitle">${m.subtitle}</div>
        <div class="module-summary">${m.summary}</div>

        <div class="concepts-grid">
          ${m.keyConcepts.map(c => `
            <div class="concept-box">
              <h4>${c.name}</h4>
              <div class="formula-display">
                <code>${c.latex}</code>
              </div>
              <div class="concept-desc">${c.desc}</div>
            </div>
          `).join('')}
        </div>

        <div class="code-wrapper">
          <div class="code-header">
            <span><strong>Code Example:</strong> ${m.codeSnippet.title}</span>
            <span class="lang">${m.codeSnippet.lang}</span>
          </div>
          <pre><code>${escapeHtml(m.codeSnippet.code)}</code></pre>
        </div>
      </div>
    `).join('');
  }

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // --- Render 4: Interactive Quant Labs Hub ---
  function initLabsHub() {
    $$('.lab-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const labId = btn.dataset.lab;
        state.activeLab = labId;
        $$('.lab-tab-btn').forEach(b => b.classList.toggle('active', b === btn));
        $$('.lab-panel').forEach(p => p.classList.toggle('active', p.id === `lab-${labId}`));
        redrawActiveLab();
      });
    });

    initLab1BlackScholes();
    initLab2MonteCarlo();
    initLab3OrderBook();
    initLab4Kelly();
    initLab5MentalTrainer();
  }

  function redrawActiveLab() {
    if (state.activeLab === 'bs') updateBlackScholesChart();
    if (state.activeLab === 'mc') drawMonteCarloChart();
    if (state.activeLab === 'kelly') runKellySimulation();
  }

  // === LAB 1: Black-Scholes Options Pricer & Greeks Visualizer ===
  function initLab1BlackScholes() {
    const sInput = $('#bsInputS');
    const kInput = $('#bsInputK');
    const tInput = $('#bsInputT');
    const volInput = $('#bsInputVol');
    const rInput = $('#bsInputR');

    function syncInputs() {
      state.bs.S = parseFloat(sInput.value);
      state.bs.K = parseFloat(kInput.value);
      state.bs.days = parseInt(tInput.value, 10);
      state.bs.sigma = parseFloat(volInput.value) / 100.0;
      state.bs.r = parseFloat(rInput.value) / 100.0;

      $('#bsValS').textContent = `$${state.bs.S.toFixed(2)}`;
      $('#bsValK').textContent = `$${state.bs.K.toFixed(2)}`;
      $('#bsValT').textContent = `${state.bs.days} days (${(state.bs.days / 365).toFixed(2)}y)`;
      $('#bsValVol').textContent = `${(state.bs.sigma * 100).toFixed(0)}%`;
      $('#bsValR').textContent = `${(state.bs.r * 100).toFixed(1)}%`;

      const T = state.bs.days / 365.0;
      const res = calcBlackScholes(state.bs.S, state.bs.K, T, state.bs.r, state.bs.sigma);

      // Update metrics pills
      $('#bsMetricCallPrice').textContent = `$${res.callPrice.toFixed(2)}`;
      $('#bsMetricPutPrice').textContent = `$${res.putPrice.toFixed(2)}`;
      $('#bsMetricCallDelta').textContent = res.callDelta.toFixed(3);
      $('#bsMetricPutDelta').textContent = res.putDelta.toFixed(3);
      $('#bsMetricGamma').textContent = res.gamma.toFixed(4);
      $('#bsMetricVega').textContent = `$${res.vega.toFixed(3)}`;
      $('#bsMetricCallTheta').textContent = `$${res.callTheta.toFixed(3)}/d`;
      $('#bsMetricPutTheta').textContent = `$${res.putTheta.toFixed(3)}/d`;

      updateBlackScholesChart();
    }

    [sInput, kInput, tInput, volInput, rInput].forEach(inp => {
      inp.addEventListener('input', syncInputs);
    });

    $$('.chart-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.chart-toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.bs.chartMode = btn.dataset.mode;
        updateBlackScholesChart();
      });
    });

    syncInputs();
  }

  function updateBlackScholesChart() {
    const canvas = $('#bsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const isDark = state.theme === 'dark';

    // Clear background
    ctx.fillStyle = isDark ? '#111827' : '#ffffff';
    ctx.fillRect(0, 0, w, h);

    const padLeft = 55;
    const padRight = 25;
    const padTop = 30;
    const padBottom = 40;
    const plotW = w - padLeft - padRight;
    const plotH = h - padTop - padBottom;

    const K = state.bs.K;
    const S_curr = state.bs.S;
    const T = state.bs.days / 365.0;
    const r = state.bs.r;
    const sigma = state.bs.sigma;
    const mode = state.bs.chartMode;

    const minS = Math.max(1, K * 0.4);
    const maxS = K * 1.6;
    const numPoints = 120;
    const stepS = (maxS - minS) / (numPoints - 1);

    const callVals = [];
    const putVals = [];
    let minY = Infinity, maxY = -Infinity;

    for (let i = 0; i < numPoints; i++) {
      const s = minS + i * stepS;
      const bs = calcBlackScholes(s, K, T, r, sigma);
      let yCall, yPut;
      if (mode === 'price') {
        yCall = bs.callPrice;
        yPut = bs.putPrice;
      } else if (mode === 'delta') {
        yCall = bs.callDelta;
        yPut = bs.putDelta;
      } else if (mode === 'gamma') {
        yCall = bs.gamma;
        yPut = bs.gamma;
      } else if (mode === 'vega') {
        yCall = bs.vega;
        yPut = bs.vega;
      }
      callVals.push({ s, y: yCall });
      putVals.push({ s, y: yPut });

      minY = Math.min(minY, yCall, yPut);
      maxY = Math.max(maxY, yCall, yPut);
    }

    if (mode === 'price') {
      minY = 0;
      maxY = Math.max(maxY, K * 0.6);
    } else if (mode === 'delta') {
      minY = -1.05;
      maxY = 1.05;
    } else {
      minY = 0;
      maxY = maxY * 1.15 || 0.1;
    }

    const mapX = (s) => padLeft + ((s - minS) / (maxS - minS)) * plotW;
    const mapY = (y) => padTop + plotH - ((y - minY) / (maxY - minY)) * plotH;

    // Draw Grid Lines
    ctx.strokeStyle = isDark ? '#1f2937' : '#f1f5f9';
    ctx.lineWidth = 1;
    const gridRows = 5;
    for (let i = 0; i <= gridRows; i++) {
      const yVal = minY + (i / gridRows) * (maxY - minY);
      const py = mapY(yVal);
      ctx.beginPath();
      ctx.moveTo(padLeft, py);
      ctx.lineTo(w - padRight, py);
      ctx.stroke();

      ctx.fillStyle = isDark ? '#64748b' : '#94a3b8';
      ctx.font = '10px -apple-system, BlinkMacSystemFont, monospace';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      const label = mode === 'delta' || mode === 'gamma' ? yVal.toFixed(2) : `$${yVal.toFixed(1)}`;
      ctx.fillText(label, padLeft - 6, py);
    }

    // Vertical line at Strike K
    const kX = mapX(K);
    ctx.save();
    ctx.strokeStyle = isDark ? '#475569' : '#cbd5e1';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(kX, padTop);
    ctx.lineTo(kX, h - padBottom);
    ctx.stroke();
    ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Strike K ($${K})`, kX, padTop - 8);
    ctx.restore();

    // Call Curve
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    callVals.forEach((p, idx) => {
      const px = mapX(p.s);
      const py = mapY(p.y);
      if (idx === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();

    // Put Curve (if applicable)
    if (mode === 'price' || mode === 'delta') {
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      putVals.forEach((p, idx) => {
        const px = mapX(p.s);
        const py = mapY(p.y);
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
    }

    // Spot Price Marker Dot
    const currRes = calcBlackScholes(S_curr, K, T, r, sigma);
    let currYCall = mode === 'price' ? currRes.callPrice : (mode === 'delta' ? currRes.callDelta : (mode === 'gamma' ? currRes.gamma : currRes.vega));
    const currX = mapX(S_curr);
    const currY = mapY(currYCall);

    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(currX, currY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Legend
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText(mode === 'price' ? '— Call Price' : (mode === 'delta' ? '— Call Delta' : `— ${mode.toUpperCase()}`), padLeft + 10, padTop + 15);

    if (mode === 'price' || mode === 'delta') {
      ctx.fillStyle = '#f43f5e';
      ctx.fillText(mode === 'price' ? '— Put Price' : '— Put Delta', padLeft + 110, padTop + 15);
    }
  }

  // === LAB 2: Monte Carlo Geometric Brownian Motion Simulator ===
  function initLab2MonteCarlo() {
    const s0Input = $('#mcInputS0');
    const muInput = $('#mcInputMu');
    const volInput = $('#mcInputVol');
    const tInput = $('#mcInputT');
    const pathsInput = $('#mcInputPaths');
    const runBtn = $('#mcRunBtn');

    function syncInputs() {
      state.mc.S0 = parseFloat(s0Input.value);
      state.mc.mu = parseFloat(muInput.value) / 100.0;
      state.mc.sigma = parseFloat(volInput.value) / 100.0;
      state.mc.T = parseFloat(tInput.value);
      state.mc.paths = parseInt(pathsInput.value, 10);

      $('#mcValS0').textContent = `$${state.mc.S0.toFixed(2)}`;
      $('#mcValMu').textContent = `${(state.mc.mu * 100).toFixed(0)}%`;
      $('#mcValVol').textContent = `${(state.mc.sigma * 100).toFixed(0)}%`;
      $('#mcValT').textContent = `${state.mc.T.toFixed(1)} yr`;
      $('#mcValPaths').textContent = `${state.mc.paths} paths`;
    }

    [s0Input, muInput, volInput, tInput, pathsInput].forEach(inp => {
      inp.addEventListener('input', syncInputs);
    });

    if (runBtn) {
      runBtn.addEventListener('click', runMonteCarloSimulation);
    }

    syncInputs();
    runMonteCarloSimulation();
  }

  function runMonteCarloSimulation() {
    const S0 = state.mc.S0;
    const mu = state.mc.mu;
    const sigma = state.mc.sigma;
    const T = state.mc.T;
    const steps = state.mc.steps;
    const numPaths = state.mc.paths;
    const dt = T / steps;
    const drift = (mu - 0.5 * sigma * sigma) * dt;
    const vol = sigma * Math.sqrt(dt);

    const allPaths = [];
    const terminalPrices = [];

    for (let p = 0; p < numPaths; p++) {
      const path = [S0];
      let currentPrice = S0;
      for (let s = 1; s <= steps; s++) {
        const z = randomNormal();
        currentPrice = currentPrice * Math.exp(drift + vol * z);
        path.push(currentPrice);
      }
      allPaths.push(path);
      terminalPrices.push(currentPrice);
    }

    state.mc.simulatedPaths = allPaths;

    // Calculate Empirical Statistics
    const meanTerm = terminalPrices.reduce((a, b) => a + b, 0) / numPaths;
    const variance = terminalPrices.reduce((a, b) => a + Math.pow(b - meanTerm, 2), 0) / (numPaths - 1 || 1);
    const stdDev = Math.sqrt(variance);
    const theoMean = S0 * Math.exp(mu * T);

    terminalPrices.sort((a, b) => a - b);
    const p5Index = Math.floor(numPaths * 0.05);
    const var95Price = terminalPrices[p5Index];
    const var95Loss = Math.max(0, S0 - var95Price);
    const positiveCount = terminalPrices.filter(p => p > S0).length;
    const winRate = ((positiveCount / numPaths) * 100).toFixed(1);

    $('#mcStatMean').textContent = `$${meanTerm.toFixed(2)}`;
    $('#mcStatTheoMean').textContent = `$${theoMean.toFixed(2)}`;
    $('#mcStatStdDev').textContent = `$${stdDev.toFixed(2)}`;
    $('#mcStatVaR95').textContent = `$${var95Loss.toFixed(2)} (${((var95Loss / S0) * 100).toFixed(1)}%)`;
    $('#mcStatWinRate').textContent = `${winRate}%`;

    drawMonteCarloChart();
  }

  function drawMonteCarloChart() {
    const canvas = $('#mcCanvas');
    if (!canvas || !state.mc.simulatedPaths) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const isDark = state.theme === 'dark';

    ctx.fillStyle = isDark ? '#111827' : '#ffffff';
    ctx.fillRect(0, 0, w, h);

    const padLeft = 55;
    const padRight = 25;
    const padTop = 25;
    const padBottom = 35;
    const plotW = w - padLeft - padRight;
    const plotH = h - padTop - padBottom;

    const paths = state.mc.simulatedPaths;
    const steps = state.mc.steps;

    let minPrice = Infinity;
    let maxPrice = -Infinity;

    paths.forEach(p => {
      p.forEach(val => {
        if (val < minPrice) minPrice = val;
        if (val > maxPrice) maxPrice = val;
      });
    });

    minPrice = Math.max(0, minPrice * 0.9);
    maxPrice = maxPrice * 1.05;

    const mapX = (step) => padLeft + (step / steps) * plotW;
    const mapY = (price) => padTop + plotH - ((price - minPrice) / (maxPrice - minPrice)) * plotH;

    // Draw Grid
    ctx.strokeStyle = isDark ? '#1f2937' : '#f1f5f9';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const pVal = minPrice + (i / 5) * (maxPrice - minPrice);
      const py = mapY(pVal);
      ctx.beginPath();
      ctx.moveTo(padLeft, py);
      ctx.lineTo(w - padRight, py);
      ctx.stroke();

      ctx.fillStyle = isDark ? '#64748b' : '#94a3b8';
      ctx.font = '10px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`$${pVal.toFixed(0)}`, padLeft - 6, py + 3);
    }

    // Horizontal Line at Initial S0
    const s0Y = mapY(state.mc.S0);
    ctx.save();
    ctx.strokeStyle = isDark ? '#475569' : '#cbd5e1';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padLeft, s0Y);
    ctx.lineTo(w - padRight, s0Y);
    ctx.stroke();
    ctx.restore();

    // Render paths
    const colors = [
      '#38bdf8', '#818cf8', '#34d399', '#f472b6', '#fbbf24', '#a78bfa', '#2dd4bf'
    ];

    paths.forEach((p, pIdx) => {
      const color = colors[pIdx % colors.length];
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.3;
      ctx.globalAlpha = 0.75;
      ctx.beginPath();
      p.forEach((val, step) => {
        const px = mapX(step);
        const py = mapY(val);
        if (step === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
    });
    ctx.globalAlpha = 1.0;
  }

  // === LAB 3: Limit Order Book (LOB) Simulator ===
  function initLab3OrderBook() {
    resetOrderBook();

    const buyLimitBtn = $('#lobBuyLimitBtn');
    const sellLimitBtn = $('#lobSellLimitBtn');
    const marketBuyBtn = $('#lobMarketBuyBtn');
    const marketSellBtn = $('#lobMarketSellBtn');
    const autoFlowToggle = $('#lobAutoFlowToggle');

    if (buyLimitBtn) {
      buyLimitBtn.addEventListener('click', () => {
        const price = parseFloat($('#lobOrderPrice').value);
        const qty = parseInt($('#lobOrderQty').value, 10);
        if (price > 0 && qty > 0) {
          executeLimitOrder('BUY', price, qty);
          renderOrderBook();
        }
      });
    }

    if (sellLimitBtn) {
      sellLimitBtn.addEventListener('click', () => {
        const price = parseFloat($('#lobOrderPrice').value);
        const qty = parseInt($('#lobOrderQty').value, 10);
        if (price > 0 && qty > 0) {
          executeLimitOrder('SELL', price, qty);
          renderOrderBook();
        }
      });
    }

    if (marketBuyBtn) {
      marketBuyBtn.addEventListener('click', () => {
        const qty = parseInt($('#lobOrderQty').value, 10);
        if (qty > 0) {
          executeMarketOrder('BUY', qty);
          renderOrderBook();
        }
      });
    }

    if (marketSellBtn) {
      marketSellBtn.addEventListener('click', () => {
        const qty = parseInt($('#lobOrderQty').value, 10);
        if (qty > 0) {
          executeMarketOrder('SELL', qty);
          renderOrderBook();
        }
      });
    }

    if (autoFlowToggle) {
      autoFlowToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
          startAutoMarketFlow();
        } else {
          stopAutoMarketFlow();
        }
      });
    }

    renderOrderBook();
  }

  function resetOrderBook() {
    state.lob.bids = [
      { price: 99.95, size: 800, count: 4 },
      { price: 99.90, size: 1400, count: 6 },
      { price: 99.85, size: 2200, count: 9 },
      { price: 99.80, size: 3100, count: 12 },
      { price: 99.75, size: 4500, count: 15 }
    ];
    state.lob.asks = [
      { price: 100.05, size: 750, count: 3 },
      { price: 100.10, size: 1200, count: 5 },
      { price: 100.15, size: 1800, count: 8 },
      { price: 100.20, size: 2600, count: 11 },
      { price: 100.25, size: 3900, count: 14 }
    ];
    state.lob.tape = [
      { time: '14:20:01', side: 'BUY', price: 100.05, size: 150 },
      { time: '14:20:04', side: 'SELL', price: 99.95, size: 200 }
    ];
  }

  function executeLimitOrder(side, price, size) {
    if (side === 'BUY') {
      // Check if price crosses best ask
      if (state.lob.asks.length > 0 && price >= state.lob.asks[0].price) {
        let remaining = size;
        while (state.lob.asks.length > 0 && price >= state.lob.asks[0].price && remaining > 0) {
          const topAsk = state.lob.asks[0];
          const fillQty = Math.min(remaining, topAsk.size);
          logTrade('BUY', topAsk.price, fillQty);
          remaining -= fillQty;
          topAsk.size -= fillQty;
          if (topAsk.size <= 0) state.lob.asks.shift();
        }
        if (remaining > 0) addPassiveOrder('bids', price, remaining);
      } else {
        addPassiveOrder('bids', price, size);
      }
    } else {
      // Sell limit order
      if (state.lob.bids.length > 0 && price <= state.lob.bids[0].price) {
        let remaining = size;
        while (state.lob.bids.length > 0 && price <= state.lob.bids[0].price && remaining > 0) {
          const topBid = state.lob.bids[0];
          const fillQty = Math.min(remaining, topBid.size);
          logTrade('SELL', topBid.price, fillQty);
          remaining -= fillQty;
          topBid.size -= fillQty;
          if (topBid.size <= 0) state.lob.bids.shift();
        }
        if (remaining > 0) addPassiveOrder('asks', price, remaining);
      } else {
        addPassiveOrder('asks', price, size);
      }
    }
  }

  function executeMarketOrder(side, size) {
    let remaining = size;
    if (side === 'BUY') {
      while (state.lob.asks.length > 0 && remaining > 0) {
        const topAsk = state.lob.asks[0];
        const fillQty = Math.min(remaining, topAsk.size);
        logTrade('BUY', topAsk.price, fillQty);
        remaining -= fillQty;
        topAsk.size -= fillQty;
        if (topAsk.size <= 0) state.lob.asks.shift();
      }
    } else {
      while (state.lob.bids.length > 0 && remaining > 0) {
        const topBid = state.lob.bids[0];
        const fillQty = Math.min(remaining, topBid.size);
        logTrade('SELL', topBid.price, fillQty);
        remaining -= fillQty;
        topBid.size -= fillQty;
        if (topBid.size <= 0) state.lob.bids.shift();
      }
    }
  }

  function addPassiveOrder(sideKey, price, size) {
    const list = state.lob[sideKey];
    const existing = list.find(l => Math.abs(l.price - price) < 0.001);
    if (existing) {
      existing.size += size;
      existing.count += 1;
    } else {
      list.push({ price, size, count: 1 });
      if (sideKey === 'bids') list.sort((a, b) => b.price - a.price);
      else list.sort((a, b) => a.price - b.price);
    }
  }

  function logTrade(side, price, size) {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    state.lob.tape.unshift({ time: timeStr, side, price, size });
    if (state.lob.tape.length > 20) state.lob.tape.pop();
  }

  function startAutoMarketFlow() {
    if (state.lob.autoFlowInterval) return;
    state.lob.autoFlowInterval = setInterval(() => {
      const rand = Math.random();
      const bestBid = state.lob.bids[0]?.price || 99.50;
      const bestAsk = state.lob.asks[0]?.price || 100.50;

      if (rand < 0.35) {
        // Market aggressive sweep
        const side = Math.random() < 0.5 ? 'BUY' : 'SELL';
        const qty = Math.floor(Math.random() * 250) + 50;
        executeMarketOrder(side, qty);
      } else if (rand < 0.70) {
        // New passive limit near inside spread
        const side = Math.random() < 0.5 ? 'bids' : 'asks';
        const offset = Math.round(Math.random() * 4) * 0.05;
        const price = side === 'bids' ? +(bestBid - offset).toFixed(2) : +(bestAsk + offset).toFixed(2);
        const qty = Math.floor(Math.random() * 400) + 100;
        addPassiveOrder(side, price, qty);
      } else {
        // Random cancellation
        const side = Math.random() < 0.5 ? 'bids' : 'asks';
        const list = state.lob[side];
        if (list.length > 1) {
          const idx = Math.floor(Math.random() * list.length);
          list[idx].size = Math.max(50, list[idx].size - 200);
        }
      }
      renderOrderBook();
    }, 1200);
  }

  function stopAutoMarketFlow() {
    if (state.lob.autoFlowInterval) {
      clearInterval(state.lob.autoFlowInterval);
      state.lob.autoFlowInterval = null;
    }
  }

  function renderOrderBook() {
    const asksContainer = $('#lobAsksRows');
    const bidsContainer = $('#lobBidsRows');
    const tapeContainer = $('#lobTradeTape');
    if (!asksContainer || !bidsContainer) return;

    const asks = [...state.lob.asks].slice(0, 5).reverse(); // top 5 asks descending
    const bids = [...state.lob.bids].slice(0, 5); // top 5 bids descending

    const maxSize = Math.max(
      ...asks.map(a => a.size),
      ...bids.map(b => b.size),
      1000
    );

    asksContainer.innerHTML = asks.map(a => {
      const pct = Math.round((a.size / maxSize) * 100);
      return `
        <div class="lob-row ask">
          <div class="depth-bar" style="width: ${pct}%"></div>
          <span>${a.count}</span>
          <span>${a.size.toLocaleString()}</span>
          <span>$${a.price.toFixed(2)}</span>
          <span style="color: var(--accent-rose); font-weight: 700;">ASK</span>
        </div>
      `;
    }).join('');

    bidsContainer.innerHTML = bids.map(b => {
      const pct = Math.round((b.size / maxSize) * 100);
      return `
        <div class="lob-row bid">
          <div class="depth-bar" style="width: ${pct}%"></div>
          <span>${b.count}</span>
          <span>${b.size.toLocaleString()}</span>
          <span>$${b.price.toFixed(2)}</span>
          <span style="color: var(--accent-emerald); font-weight: 700;">BID</span>
        </div>
      `;
    }).join('');

    const bestBid = state.lob.bids[0]?.price || 0;
    const bestAsk = state.lob.asks[0]?.price || 0;
    const spread = (bestAsk - bestBid).toFixed(2);
    const mid = ((bestBid + bestAsk) / 2).toFixed(2);

    const banner = $('#lobSpreadDisplay');
    if (banner) {
      banner.innerHTML = `
        <span>Mid: <strong>$${mid}</strong></span>
        <span>Spread: <strong>$${spread}</strong></span>
      `;
    }

    if (tapeContainer) {
      tapeContainer.innerHTML = state.lob.tape.map(t => `
        <div class="tape-row ${t.side.toLowerCase()}">
          <span>${t.time}</span>
          <span><strong>${t.side}</strong></span>
          <span>${t.size} @ $${t.price.toFixed(2)}</span>
        </div>
      `).join('');
    }
  }

  // === LAB 4: Kelly Criterion & Bankroll Growth Simulator ===
  function initLab4Kelly() {
    const pInput = $('#kellyInputP');
    const bInput = $('#kellyInputB');
    const fInput = $('#kellyInputF');
    const nInput = $('#kellyInputN');
    const runBtn = $('#kellyRunBtn');

    function sync() {
      state.kelly.p = parseFloat(pInput.value) / 100.0;
      state.kelly.b = parseFloat(bInput.value);
      state.kelly.fCustom = parseFloat(fInput.value) / 100.0;
      state.kelly.nBets = parseInt(nInput.value, 10);

      const fStar = Math.max(0, (state.kelly.b * state.kelly.p - (1 - state.kelly.p)) / state.kelly.b);

      $('#kellyValP').textContent = `${(state.kelly.p * 100).toFixed(0)}%`;
      $('#kellyValB').textContent = `${state.kelly.b.toFixed(1)}:1`;
      $('#kellyValF').textContent = `${(state.kelly.fCustom * 100).toFixed(0)}%`;
      $('#kellyValN').textContent = `${state.kelly.nBets} bets`;
      $('#kellyOptimalF').textContent = `${(fStar * 100).toFixed(1)}%`;

      runKellySimulation();
    }

    [pInput, bInput, fInput, nInput].forEach(inp => inp.addEventListener('input', sync));
    if (runBtn) runBtn.addEventListener('click', runKellySimulation);

    sync();
  }

  function runKellySimulation() {
    const p = state.kelly.p;
    const b = state.kelly.b;
    const n = state.kelly.nBets;
    const W0 = state.kelly.initialWealth;
    const fOpt = Math.max(0, (b * p - (1 - p)) / b);
    const fHalf = fOpt * 0.5;
    const fDouble = Math.min(0.95, fOpt * 2.0);
    const fUser = state.kelly.fCustom;

    const trajOpt = [W0];
    const trajHalf = [W0];
    const trajDouble = [W0];
    const trajUser = [W0];

    let wOpt = W0, wHalf = W0, wDouble = W0, wUser = W0;

    for (let i = 0; i < n; i++) {
      const win = Math.random() < p;
      const mult = win ? b : -1.0;

      wOpt = Math.max(1, wOpt * (1 + fOpt * mult));
      wHalf = Math.max(1, wHalf * (1 + fHalf * mult));
      wDouble = Math.max(1, wDouble * (1 + fDouble * mult));
      wUser = Math.max(1, wUser * (1 + fUser * mult));

      trajOpt.push(wOpt);
      trajHalf.push(wHalf);
      trajDouble.push(wDouble);
      trajUser.push(wUser);
    }

    $('#kellyStatFinalOpt').textContent = `$${Math.round(wOpt).toLocaleString()}`;
    $('#kellyStatFinalHalf').textContent = `$${Math.round(wHalf).toLocaleString()}`;
    $('#kellyStatFinalDouble').textContent = `$${Math.round(wDouble).toLocaleString()}`;
    $('#kellyStatFinalUser').textContent = `$${Math.round(wUser).toLocaleString()}`;

    drawKellyChart([
      { name: 'Optimal Kelly', data: trajOpt, color: '#10b981' },
      { name: 'Half-Kelly (Industry)', data: trajHalf, color: '#38bdf8' },
      { name: 'Over-bet (2x Kelly)', data: trajDouble, color: '#f43f5e' },
      { name: 'Custom Bet', data: trajUser, color: '#fbbf24' }
    ]);
  }

  function drawKellyChart(seriesList) {
    const canvas = $('#kellyCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const isDark = state.theme === 'dark';

    ctx.fillStyle = isDark ? '#111827' : '#ffffff';
    ctx.fillRect(0, 0, w, h);

    const padLeft = 60;
    const padRight = 20;
    const padTop = 25;
    const padBottom = 35;
    const plotW = w - padLeft - padRight;
    const plotH = h - padTop - padBottom;
    const n = state.kelly.nBets;

    let minVal = Infinity, maxVal = -Infinity;
    seriesList.forEach(s => {
      s.data.forEach(v => {
        const logV = Math.log10(Math.max(1, v));
        if (logV < minVal) minVal = logV;
        if (logV > maxVal) maxVal = logV;
      });
    });

    minVal = Math.floor(minVal);
    maxVal = Math.ceil(maxVal);
    if (maxVal === minVal) maxVal = minVal + 1;

    const mapX = (idx) => padLeft + (idx / n) * plotW;
    const mapY = (val) => {
      const logV = Math.log10(Math.max(1, val));
      return padTop + plotH - ((logV - minVal) / (maxVal - minVal)) * plotH;
    };

    // Draw logarithmic grid
    ctx.strokeStyle = isDark ? '#1f2937' : '#f1f5f9';
    ctx.lineWidth = 1;
    for (let e = minVal; e <= maxVal; e++) {
      const py = mapY(Math.pow(10, e));
      ctx.beginPath();
      ctx.moveTo(padLeft, py);
      ctx.lineTo(w - padRight, py);
      ctx.stroke();

      ctx.fillStyle = isDark ? '#64748b' : '#94a3b8';
      ctx.font = '10px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`$10^${e}`, padLeft - 6, py + 3);
    }

    // Render Curves
    seriesList.forEach(s => {
      ctx.strokeStyle = s.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      s.data.forEach((val, idx) => {
        const px = mapX(idx);
        const py = mapY(val);
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
    });
  }

  // === LAB 5: Mental Math Speed Trainer (QT Prep) ===
  function initLab5MentalTrainer() {
    const startBtn = $('#trainerStartBtn');
    const input = $('#trainerInput');
    const problemEl = $('#trainerProblem');
    const timerEl = $('#trainerTimer');
    const scoreEl = $('#trainerScore');
    const streakEl = $('#trainerStreak');
    const highEl = $('#trainerHighScore');
    const modeSelect = $('#trainerModeSelect');
    const durationSelect = $('#trainerDurationSelect');

    if (highEl) highEl.textContent = state.mentalMathHighScore;

    function generateProblem() {
      const mode = state.trainer.mode;
      let text = "", ans = 0;

      if (mode === 'arithmetic') {
        const ops = ['+', '-', '*'];
        const op = ops[Math.floor(Math.random() * ops.length)];
        if (op === '+') {
          const a = Math.floor(Math.random() * 80) + 15;
          const b = Math.floor(Math.random() * 80) + 15;
          text = `${a} + ${b}`;
          ans = a + b;
        } else if (op === '-') {
          const a = Math.floor(Math.random() * 85) + 20;
          const b = Math.floor(Math.random() * (a - 10)) + 5;
          text = `${a} - ${b}`;
          ans = a - b;
        } else {
          // Multiplication up to 25x25
          const a = Math.floor(Math.random() * 16) + 4;
          const b = Math.floor(Math.random() * 20) + 3;
          text = `${a} × ${b}`;
          ans = a * b;
        }
      } else if (mode === 'percent') {
        const pList = [5, 10, 15, 20, 25, 30, 40, 50, 75];
        const p = pList[Math.floor(Math.random() * pList.length)];
        const b = (Math.floor(Math.random() * 20) + 2) * 20;
        text = `${p}% of ${b}`;
        ans = Math.round((p / 100) * b);
      } else {
        // Expected Value / Games
        const cases = [
          { q: "Fair d6 roll. Payout = face. EV?", a: 3.5 },
          { q: "d6 roll: 1-3 pays $0, 4-6 pays $10. EV?", a: 5 },
          { q: "Flip coin: H pays $6, T loses $2. EV?", a: 2 },
          { q: "Roll 2d6. Most likely sum?", a: 7 }
        ];
        const c = cases[Math.floor(Math.random() * cases.length)];
        text = c.q;
        ans = c.a;
      }

      state.trainer.currentProblem = { text, ans };
      problemEl.textContent = text;
      input.value = "";
    }

    function checkAnswer() {
      if (!state.trainer.isRunning || !state.trainer.currentProblem) return;
      const userVal = parseFloat(input.value.trim());
      if (isNaN(userVal)) return;

      if (Math.abs(userVal - state.trainer.currentProblem.ans) < 0.01) {
        state.trainer.score++;
        state.trainer.streak++;
        scoreEl.textContent = state.trainer.score;
        streakEl.textContent = state.trainer.streak;

        input.classList.add('flash-correct');
        setTimeout(() => input.classList.remove('flash-correct'), 200);

        generateProblem();
      }
    }

    input.addEventListener('input', checkAnswer);

    startBtn.addEventListener('click', () => {
      if (state.trainer.isRunning) {
        endSession();
        return;
      }

      state.trainer.isRunning = true;
      state.trainer.duration = parseInt(durationSelect.value, 10);
      state.trainer.timer = state.trainer.duration;
      state.trainer.score = 0;
      state.trainer.streak = 0;
      state.trainer.mode = modeSelect.value;

      scoreEl.textContent = "0";
      streakEl.textContent = "0";
      timerEl.textContent = state.trainer.timer;
      startBtn.textContent = "Stop Session";
      startBtn.classList.add('active');
      input.disabled = false;
      input.focus();

      generateProblem();

      state.trainer.interval = setInterval(() => {
        state.trainer.timer--;
        timerEl.textContent = state.trainer.timer;

        if (state.trainer.timer <= 0) {
          endSession();
        }
      }, 1000);
    });

    function endSession() {
      state.trainer.isRunning = false;
      clearInterval(state.trainer.interval);
      startBtn.textContent = "Start Mental Drill";
      startBtn.classList.remove('active');
      input.disabled = true;
      problemEl.textContent = `Time's Up! Score: ${state.trainer.score}`;

      if (state.trainer.score > state.mentalMathHighScore) {
        state.mentalMathHighScore = state.trainer.score;
        localStorage.setItem('quant_mental_highscore', state.mentalMathHighScore);
        if (highEl) highEl.textContent = state.mentalMathHighScore;
        updateProgressUI();
      }
    }
  }

  // --- Render 5: Interactive Quiz Center ---
  function initQuizTab() {
    const list = $('#quizCardsList');
    const topicNav = $('#quizTopicNav');
    if (!list) return;

    // Collect topics
    const topics = ['All', ...new Set(QUANT_DATA.quizzes.map(q => q.topic))];

    if (topicNav) {
      topicNav.innerHTML = topics.map((t, idx) => `
        <button class="quiz-topic-btn ${idx === 0 ? 'active' : ''}" data-topic="${t}">${t}</button>
      `).join('');

      $$('.quiz-topic-btn', topicNav).forEach(btn => {
        btn.addEventListener('click', () => {
          $$('.quiz-topic-btn', topicNav).forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          renderQuizzes(btn.dataset.topic);
        });
      });
    }

    renderQuizzes('All');
  }

  function renderQuizzes(filterTopic) {
    const list = $('#quizCardsList');
    if (!list) return;

    const filtered = filterTopic === 'All'
      ? QUANT_DATA.quizzes
      : QUANT_DATA.quizzes.filter(q => q.topic === filterTopic);

    list.innerHTML = filtered.map(q => {
      const savedAnswer = state.quizAnswers[q.id];
      const hasAnswered = savedAnswer !== undefined;

      return `
        <div class="quiz-card" id="quiz-${q.id}">
          <div class="quiz-card-header">
            <span class="quiz-topic-tag">${q.topic}</span>
            <span style="font-size: 0.8rem; color: var(--text-muted);">Question ID: ${q.id}</span>
          </div>
          <div class="quiz-question-text">${q.question}</div>
          <div class="quiz-options">
            ${q.options.map((opt, oIdx) => {
              let optClass = "";
              if (hasAnswered) {
                if (oIdx === q.correct) optClass = "correct";
                else if (oIdx === savedAnswer) optClass = "incorrect";
              }
              return `
                <label class="quiz-option-label ${optClass}" data-qid="${q.id}" data-opt="${oIdx}">
                  <input type="radio" name="opt_${q.id}" value="${oIdx}" ${savedAnswer === oIdx ? 'checked' : ''} ${hasAnswered ? 'disabled' : ''} />
                  <span>${opt}</span>
                </label>
              `;
            }).join('')}
          </div>
          <div class="quiz-explanation-box ${hasAnswered ? 'visible' : ''}">
            <strong>💡 Step-by-Step Mathematical Explanation:</strong><br/>
            ${q.explanation}
          </div>
        </div>
      `;
    }).join('');

    // Attach listeners
    $$('.quiz-option-label', list).forEach(label => {
      label.addEventListener('click', () => {
        const qid = label.dataset.qid;
        const opt = parseInt(label.dataset.opt, 10);
        if (state.quizAnswers[qid] !== undefined) return; // already answered

        state.quizAnswers[qid] = opt;
        localStorage.setItem('quant_quiz_answers', JSON.stringify(state.quizAnswers));
        renderQuizzes(filterTopic);
        updateProgressUI();
      });
    });
  }

  // --- Render 6: Interview & Exam Question Bank ---
  function initInterviewTab() {
    renderQuestionBank();

    const firmFilter = $('#filterFirm');
    const diffFilter = $('#filterDiff');
    const catFilter = $('#filterCategory');
    const searchInput = $('#bankSearchInput');

    [firmFilter, diffFilter, catFilter].forEach(sel => {
      if (sel) sel.addEventListener('change', renderQuestionBank);
    });

    if (searchInput) {
      searchInput.addEventListener('input', renderQuestionBank);
    }
  }

  function renderQuestionBank() {
    const list = $('#interviewQuestionsList');
    if (!list) return;

    const firm = $('#filterFirm')?.value || 'all';
    const diff = $('#filterDiff')?.value || 'all';
    const cat = $('#filterCategory')?.value || 'all';
    const qStr = ($('#bankSearchInput')?.value || '').toLowerCase().trim();

    const filtered = QUANT_DATA.interviewQuestions.filter(q => {
      if (firm !== 'all' && q.firm !== firm) return false;
      if (diff !== 'all' && q.difficulty !== diff) return false;
      if (cat !== 'all' && q.category !== cat) return false;
      if (qStr) {
        const text = (q.title + ' ' + q.question + ' ' + (q.tags || []).join(' ')).toLowerCase();
        if (!text.includes(qStr)) return false;
      }
      return true;
    });

    const countBadge = $('#bankResultCount');
    if (countBadge) countBadge.textContent = `${filtered.length} questions`;

    list.innerHTML = filtered.map(q => {
      const isMastered = state.masteredQuestions.has(q.id);
      return `
        <div class="interview-card ${isMastered ? 'mastered' : ''}" id="card-${q.id}">
          <div class="interview-card-top">
            <div class="card-tags">
              <span class="firm-badge">${q.firm}</span>
              <span class="diff-badge ${q.difficulty}">${q.difficulty}</span>
              <span class="res-tag">${q.category}</span>
            </div>
            <button class="mastered-btn ${isMastered ? 'active' : ''}" data-qid="${q.id}">
              <span>${isMastered ? '✓ Mastered' : '○ Mark as Mastered'}</span>
            </button>
          </div>
          <div class="interview-title">${q.title}</div>
          <div class="interview-question-body">${q.question}</div>
          
          <div class="card-action-bar">
            <div style="display: flex; gap: 0.5rem;">
              <button class="accordion-btn btn-hint" data-qid="${q.id}">💡 Hint</button>
              <button class="accordion-btn btn-sol" data-qid="${q.id}">📝 Full Solution</button>
            </div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">
              ${(q.tags || []).map(t => `#${t}`).join(' ')}
            </div>
          </div>

          <div class="hint-box" id="hint-${q.id}">
            <strong>Hint:</strong> ${q.hint}
          </div>

          <div class="solution-box" id="sol-${q.id}">
            ${formatMarkdownSimple(q.solution)}
          </div>
        </div>
      `;
    }).join('');

    // Accordion toggles
    $$('.btn-hint', list).forEach(btn => {
      btn.addEventListener('click', () => {
        const hintBox = $(`#hint-${btn.dataset.qid}`);
        hintBox.classList.toggle('open');
        if (hintBox.classList.contains('open')) triggerMathRendering(hintBox);
      });
    });

    $$('.btn-sol', list).forEach(btn => {
      btn.addEventListener('click', () => {
        const solBox = $(`#sol-${btn.dataset.qid}`);
        solBox.classList.toggle('open');
        if (solBox.classList.contains('open')) triggerMathRendering(solBox);
      });
    });

    // Mastered toggle
    $$('.mastered-btn', list).forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.dataset.qid;
        if (state.masteredQuestions.has(qid)) {
          state.masteredQuestions.delete(qid);
        } else {
          state.masteredQuestions.add(qid);
        }
        localStorage.setItem('quant_mastered', JSON.stringify(Array.from(state.masteredQuestions)));
        renderQuestionBank();
        updateProgressUI();
      });
    });
  }

  function formatMarkdownSimple(text) {
    if (!text) return "";
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code style="background: rgba(255,255,255,0.06); padding: 0.1rem 0.3rem; border-radius: 4px; font-family: monospace;">$1</code>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n- /g, '<br/>• ');
  }

  // --- Render 7: Curated Resources ---
  function initResourcesTab() {
    const grid = $('#resourcesGrid');
    if (!grid) return;

    grid.innerHTML = QUANT_DATA.resources.map(cat => `
      <div class="resource-category-card">
        <h3>${cat.category}</h3>
        <div class="resource-items-list">
          ${cat.items.map(item => `
            <div class="resource-item">
              <div class="resource-item-top">
                <div class="resource-title">${item.title}</div>
                ${item.difficulty ? `<span class="res-tag">${item.difficulty}</span>` : ''}
              </div>
              ${item.author ? `<div class="resource-author">${item.author}</div>` : ''}
              <div class="resource-desc">${item.desc}</div>
              <div class="resource-tags">
                ${(item.tags || []).map(t => `<span class="res-tag">${t}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  // --- Render 8: Cheat Sheet & Glossary ---
  function initCheatsheetTab() {
    const formulaGrid = $('#formulasGrid');
    const glossaryBody = $('#glossaryTableBody');
    const glossarySearch = $('#glossarySearchInput');

    if (formulaGrid) {
      formulaGrid.innerHTML = QUANT_DATA.formulas.map(f => `
        <div class="formula-card">
          <h4>${f.name}</h4>
          <div class="formula-code">${f.formula}</div>
          <div class="formula-vars"><strong>Variables:</strong> ${f.variables}</div>
          <div class="formula-usage"><strong>Application:</strong> ${f.usage}</div>
        </div>
      `).join('');
    }

    function renderGlossary(filter = "") {
      if (!glossaryBody) return;
      const filtered = QUANT_DATA.glossary.filter(g =>
        g.term.toLowerCase().includes(filter.toLowerCase()) ||
        g.def.toLowerCase().includes(filter.toLowerCase())
      );
      glossaryBody.innerHTML = filtered.map(g => `
        <tr>
          <td>${g.term}</td>
          <td>${g.def}</td>
        </tr>
      `).join('');
    }

    if (glossarySearch) {
      glossarySearch.addEventListener('input', (e) => {
        renderGlossary(e.target.value);
      });
    }

    renderGlossary();
  }

  // --- Global Search Bar ---
  function initGlobalSearch() {
    const input = $('#globalSearchInput');
    if (!input) return;

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = input.value.trim().toLowerCase();
        if (!val) return;

        // Switch to questions tab and search
        setActiveTab('questions');
        const bankInput = $('#bankSearchInput');
        if (bankInput) {
          bankInput.value = val;
          renderQuestionBank();
        }
      }
    });

    // Keyboard shortcut '/' to search
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== input && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        input.focus();
      }
    });
  }

  // --- Initialization Entry Point ---
  function init() {
    applyTheme(state.theme);

    const themeBtn = $('#themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        applyTheme(state.theme === 'dark' ? 'light' : 'dark');
      });
    }

    $$('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setActiveTab(btn.dataset.tab);
      });
    });

    initRolesTab();
    initRoadmapTab();
    initModulesTab();
    initLabsHub();
    initQuizTab();
    initInterviewTab();
    initResourcesTab();
    initCheatsheetTab();
    initGlobalSearch();

    // Check hash for direct tab linking
    const hash = window.location.hash.replace('#', '');
    if (['roles', 'roadmap', 'modules', 'labs', 'quizzes', 'questions', 'resources', 'cheatsheet'].includes(hash)) {
      setActiveTab(hash);
    } else {
      setActiveTab('roles');
    }

    updateProgressUI();

    // Trigger Math rendering with retry in case KaTeX loads asynchronously
    triggerMathRendering();
    setTimeout(triggerMathRendering, 300);
    setTimeout(triggerMathRendering, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
