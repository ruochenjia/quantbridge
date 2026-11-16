# QuantBridge 📈
### Quantitative Finance Learning Platform for 1st-Year Undergraduate Math & Computer Science Students

**QuantBridge** is a comprehensive, standalone single-page web application (built in pure HTML5, modern CSS3, and vanilla JavaScript with zero framework dependencies) tailored specifically for undergraduate students in **Mathematics and Computer Science** looking to break into quantitative finance.

---

## 🌟 Key Features

### 1. 🎯 Role Navigator & Interactive Matcher
- Detailed breakdowns of the four main quant roles:
  - **Quantitative Researcher (QR)**: Statistical alpha discovery, factor modeling, backtesting, stochastic calculus.
  - **Quantitative Trader (QT)**: Spread capture, market making, options pricing intuition, risk management, Zetamac mental math.
  - **Quantitative Developer (QD)**: Microsecond/nanosecond C++ execution engines, CPU cache optimization, lock-free ring buffers, kernel bypass.
  - **Quantitative Risk & Portfolio Analyst**: Tail risk (VaR/CVaR), extreme value theory, quadratic programming, stress testing.
- **Interactive Role Matcher**: 3-question diagnostic quiz that recommends the best-fit quant track based on problem-solving preferences and coding style.

### 2. 🗺️ 4-Year Undergraduate Roadmap
- Semester-by-semester guide (Freshman Fall through Senior Spring) synchronizing university courses (Calc III, Linear Algebra, Discrete Math, Probability Theory, Systems/C++, Stochastics) with proprietary trading firm and hedge fund recruiting cycles.
- Interactive checkboxes that track course and milestone completion, dynamically updating the **Quant Readiness Index**.

### 3. 📚 Core Academic Knowledge Modules
Rigorous, undergraduate-level breakdowns with mathematical formulas, intuition, and runnable code examples:
1. **Probability & Stochastic Foundations**: Martingales, Bayes' rule in trading, Ito's Lemma derivation intuition, 1D random walk Python simulation.
2. **Derivatives & Black-Scholes Framework**: No-arbitrage replication, Put-Call Parity, Black-Scholes PDE, the Greeks ($\Delta, \Gamma, \Theta, \mathcal{V}, \rho$).
3. **Market Microstructure & Order Books**: Limit Order Book (LOB) mechanics, adverse selection, Glosten-Milgrom model, micro-price calculation.
4. **Quantitative Strategies & Portfolio Theory**: Pairs trading via cointegration, Ornstein-Uhlenbeck mean reversion, Kelly Criterion, Sharpe and Information ratios.
5. **Low-Latency Systems & C++ (QD Focus)**: Cache line false sharing (`alignas(64)`), lock-free SPSC ring buffers, CRTP static polymorphism, zero heap allocation on the hot path.
6. **Machine Learning in Quant Finance**: Lookahead bias prevention, Purged & Embargoed cross-validation (Lopez de Prado), Deflated Sharpe Ratio (DSR), fractional differentiation.

### 4. 🧪 5 Interactive Quant Simulation Labs
1. **Black-Scholes Options Pricer & Greeks Visualizer**: Real-time analytical pricing and interactive HTML5 Canvas plotting option curves and Greeks vs spot price.
2. **Geometric Brownian Motion (GBM) Monte Carlo Simulator**: Multi-path stochastic asset trajectory simulation via Box-Muller transform, empirical terminal mean, standard deviation, and 95% Value at Risk (VaR).
3. **Live Limit Order Book (LOB) & Matching Engine**: Visual Level-2 depth ladder with FIFO order matching, limit/market orders, time & sales trade tape, and live exchange market flow simulation bot.
4. **Kelly Criterion & Capital Growth Simulator**: Interactive betting simulation comparing optimal Kelly ($f^*$), Half-Kelly ($f^*/2$), over-betting ($2f^*$), and custom wagers on a logarithmic scale.
5. **Mental Math Speed Trainer**: Zetamac-style speed arithmetic trainer for prop trading screens (Optiver, Akuna, SIG) with instant auto-advancing, streak tracking, and local storage high scores.

### 5. 📝 Interactive Quizzes
- Topic-specific quizzes covering Probability, Options, Market Microstructure, ML, and Systems.
- Instant color-coded feedback and detailed step-by-step mathematical explanations.

### 6. 💼 Curated Interview & Exam Question Bank
- 22+ real interview questions from top firms (**Jane Street, Citadel, Optiver, SIG, IMC, Two Sigma, HRT, Jump, Akuna, D.E. Shaw**).
- Filterable by firm, difficulty (Easy, Medium, Hard), and mathematical topic.
- Toggleable **💡 Hint** and **📝 Full Step-by-Step Solution** accordions with complete mathematical proofs.
- "Mark as Mastered" toggle with progress saved in `localStorage`.

### 7. 🌐 Curated External Resources & Vault
- Recommended books (*The Green Book*, *Heard on the Street*, *Hull*, *Lopez de Prado*, *Shreve*, *Scott Meyers*).
- Free university courses (MIT 18.S096, Stanford CME 241, Columbia IEOR notes).
- Competitions and platforms (Jane Street ETC, Citadel Datathons, QuantConnect, Zetamac, OpenBB).

### 8. 📐 Formula Reference Sheet & Glossary
- Quick-reference cards for essential formulas with variable definitions and financial applications.
- Instant searchable glossary for quant terminology.

---

## 🚀 How to Run

Because this application uses standard client-side HTML, CSS, and JavaScript, you can run it in any modern web browser:

### Option A: Open directly in your browser
Simply double-click `index.html` or open it via your browser:
```bash
# Linux
xdg-open index.html

# macOS
open index.html

# Windows
start index.html
```

### Option B: Local HTTP Server (Recommended)
```bash
# Using Python
python3 -m http.server 8080

# Then open in your browser:
# http://127.0.0.1:8080
```

---

## 📁 File Structure

```
learn_quant2/
├── index.html        # Single-page web application markup & structure
├── style.css         # Modern dark/light theme, responsive grid, and UI components
├── data.js           # Structured educational data: roles, roadmap, modules, quizzes, questions, formulas
├── app.js            # Interactive calculators, canvas charts, matching engine, quiz runner, and state
└── README.md         # Documentation and guide
```
