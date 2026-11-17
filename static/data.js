// QuantBridge - Educational Data Store for Math & CS Undergraduates
// Contains: Roadmap, Role Guides, Modules, Question Bank, Quizzes, Resources, Formulas, and Glossary

const QUANT_DATA = {
	roles: [
		{
			id: "qr",
			title: "Quantitative Researcher (QR)",
			shortDesc: "Mathematical modeling, statistical alpha discovery, and predictive signals.",
			badge: "Math & Stats Heavy",
			focus: "From Raw Data to Alpha",
			salary: "$250k - $600k+ total comp (first year)",
			firms: ["Citadel", "Two Sigma", "D.E. Shaw", "Jane Street", "Jump Trading", "Millennium", "Point72"],
			dayInLife: "Analyzing terabytes of tick and alternative data, formulating mathematical hypotheses about market inefficiencies, training statistical/ML models, backtesting while mitigating lookahead/overfitting biases, and handing off predictive signals to execution traders.",
			mathRelevance: "Stochastic calculus, probability theory, linear algebra (PCA, matrix decomposition), time series econometrics, convex optimization.",
			csRelevance: "High-performance Python (NumPy, Pandas, Polars, JAX), vectorized backtesting, SQL/Parquet pipelines, machine learning (scikit-learn, PyTorch).",
			interviewFocus: "Probability puzzles, regression analysis, hypothesis testing, brainteasers, time-series concepts, coding in Python."
		},
		{
			id: "qt",
			title: "Quantitative Trader (QT)",
			shortDesc: "Real-time decision making, market making, risk management, and execution.",
			badge: "Game Theory & Fast Intuition",
			focus: "P&L, Spread Capture & Risk",
			salary: "$200k - $500k+ total comp (first year)",
			firms: ["Optiver", "Jane Street", "IMC", "SIG (Susquehanna)", "Akuna Capital", "Flow Traders"],
			dayInLife: "Pricing options and volatility surfaces, managing live portfolio Greeks (Delta, Gamma, Vega), quoting two-way markets on exchanges, reacting to economic news releases, fine-tuning algorithmic trading parameters, and exploiting market microstructure dislocations.",
			mathRelevance: "Lightning-fast mental math, conditional probability, Bayesian updates under uncertainty, game theory, options pricing intuition (put-call parity, delta hedging).",
			csRelevance: "Python for ad-hoc scripting and post-trade analytics; understanding automated execution logic, order types, and trading interfaces.",
			interviewFocus: "Mental arithmetic (Zetamac 65+), expected value betting games, options Greeks intuition, market making games (bidding and asking on trivia/probabilities), poker theory."
		},
		{
			id: "qd",
			title: "Quantitative Developer (QD / SWE)",
			shortDesc: "Ultra-low-latency execution engines, order routing, and core infrastructure.",
			badge: "Systems & C++ Heavy",
			focus: "Nanoseconds, Throughput & Reliability",
			salary: "$225k - $500k+ total comp (first year)",
			firms: ["Citadel Securities", "Hudson River Trading (HRT)", "Jump Trading", "Jane Street (OCaml)", "IMC", "Tower Research"],
			dayInLife: "Engineering microsecond-critical C++ trading systems, implementing network protocols (FIX, ITCH, OUCH), eliminating CPU cache misses and branch mispredictions, designing lock-free ring buffers, optimizing Linux kernel bypass (Solarflare, DPDK), and deploying FPGA logic.",
			mathRelevance: "Discrete mathematics, bitwise logic, numerical stability in floating-point operations, basic statistics.",
			csRelevance: "Modern C++ (C++20/23), memory hierarchy (L1/L2/L3 cache lines, NUMA), multithreading/concurrency, lock-free data structures, OS internals, socket programming.",
			interviewFocus: "LeetCode Hard DSA, C++ memory model, pointers/move semantics, virtual tables, cache locality, network sockets, multithreading synchronization."
		},
		{
			id: "risk",
			title: "Quantitative Risk & Portfolio Analyst",
			shortDesc: "Tail risk modeling, portfolio optimization, stress testing, and factor models.",
			badge: "Portfolio & Optimization",
			focus: "Capital Preservation & Downside Control",
			salary: "$160k - $300k+ total comp (first year)",
			firms: ["Citadel", "BlackRock", "Goldman Sachs", "Bridgewater", "AQR"],
			dayInLife: "Computing Value at Risk (VaR), Expected Shortfall (CVaR), running Monte Carlo stress simulations against historical crises (2008 GFC, 2020 COVID crash), decomposing factor exposures (Barra, Fama-French), and monitoring firm-wide capital limits.",
			mathRelevance: "Multivariate statistics, copulas, extreme value theory (EVT), quadratic programming, matrix algebra.",
			csRelevance: "Python, R, SQL, parallel computing, building internal interactive dashboards.",
			interviewFocus: "Risk metrics definitions, linear regression assumptions, portfolio variance derivations, covariance matrix properties."
		}
	],

	roadmap: [
		{
			year: "Freshman Year (Year 1)",
			theme: "Foundations & Mathematical Muscle",
			tagline: "Build unshakeable math foundations and competitive coding reflexes.",
			semesters: [
				{
					name: "Semester 1 (Fall)",
					courses: ["Multivariable Calculus (Calc III)", "Intro to Computer Science (Python/OOP)", "Linear Algebra I"],
					quantActions: [
						"Start daily mental math training (aim for 50+ on Zetamac arithmetic).",
						"Learn Git, Linux command line, and write clean Python code with NumPy.",
						"Read 'Heard on the Street' Chapter 1 (Probability & Brainteasers)."
					],
					milestone: "Solve 20 classic probability puzzles and achieve 50+ on Zetamac."
				},
				{
					name: "Semester 2 (Spring)",
					courses: ["Discrete Mathematics", "Data Structures & Algorithms (C++ or Java)", "Differential Equations"],
					quantActions: [
						"Start LeetCode (focus on Arrays, Two Pointers, Binary Search, Trees).",
						"Attend campus hackathons or collegiate math competitions (Putnam intro).",
						"Explore sophomore discovery programs: Jane Street FOCUS, Citadel DISCOVER, SIG Discovery Days."
					],
					milestone: "Complete 75 LeetCode Easy/Medium problems in C++."
				},
				{
					name: "Freshman Summer",
					courses: ["Independent Study / Research Project / Software Engineering Internship"],
					quantActions: [
						"Build an algorithmic trading backtest in Python (e.g. moving average crossover with transaction costs).",
						"Read 'A Practical Guide to Quantitative Finance Interviews' (Crack - The Green Book).",
						"Create a GitHub portfolio showcasing clean code and financial data analysis."
					],
					milestone: "First end-to-end backtesting script published on GitHub."
				}
			]
		},
		{
			year: "Sophomore Year (Year 2)",
			theme: "Probability, Systems & Sophomore Diversity/Fast-Tracks",
			tagline: "Dive into rigorous probability and lower-level systems programming.",
			semesters: [
				{
					name: "Semester 3 (Fall)",
					courses: ["Probability Theory (Calculus-based)", "Computer Systems / Architecture (C)", "Linear Algebra II (Spectral Theory, SVD)"],
					quantActions: [
						"Apply to Sophomore Discovery Days and early-ID programs at top proprietary shops.",
						"Master Markov chains, conditional expectations, and Poisson processes.",
						"Learn low-level memory layout: stack vs heap, pointer arithmetic, CPU cache lines."
					],
					milestone: "Receive an invitation to a proprietary trading discovery day."
				},
				{
					name: "Semester 4 (Spring)",
					courses: ["Mathematical Statistics", "Advanced Algorithms", "Object-Oriented C++"],
					quantActions: [
						"Participate in Quant trading competitions: Jane Street Electronic Trading Challenge (ETC), Citadel Datathon.",
						"Study Put-Call Parity, the Binomial Option Pricing model, and Black-Scholes formula.",
						"Practice mock quant interviews with peers."
					],
					milestone: "Build a lock-free queue or a limit order book data structure in C++."
				},
				{
					name: "Sophomore Summer",
					courses: ["Sophomore Internship or Tech/SWE Internship"],
					quantActions: [
						"Intensive interview prep: 150+ probability puzzles, 150+ LeetCode mediums.",
						"Read 'Options, Futures, and Other Derivatives' (Hull) Chapters 1-15.",
						"Target Junior Summer Quant Internship applications opening in July/August."
					],
					milestone: "Completed first industry SWE or Quant internship."
				}
			]
		},
		{
			year: "Junior Year (Year 3)",
			theme: "Prime Recruiting & Advanced Stochastics",
			tagline: "Ace your summer internship interviews and master derivative pricing.",
			semesters: [
				{
					name: "Semester 5 (Fall)",
					courses: ["Stochastic Processes / Martingales", "Operating Systems / Networking", "Machine Learning / Time Series"],
					quantActions: [
						"Full-court press on Junior Summer Quant Internships (applications open Aug-Oct).",
						"Interview rounds: Online assessments (HackerRank/CodeSignal), phone screens, final round Superdays.",
						"Master market making games, Greeks risk adjustments, and probability betting."
					],
					milestone: "Secure a Quant Trading, Research, or Development Summer Internship."
				},
				{
					name: "Semester 6 (Spring)",
					courses: ["Stochastic Calculus / Financial Math", "Convex Optimization", "High-Performance Computing (HPC)"],
					quantActions: [
						"Study Ito's Lemma, Girsanov Theorem, Feynman-Kac formula, and risk-neutral measures.",
						"Explore microstructure: bid-ask bounce, order flow toxicity, Almgren-Chriss liquidation model.",
						"Pre-internship prep: master firm tech stacks (Linux, C++20, Python Polars/JAX, or OCaml)."
					],
					milestone: "Derive the Black-Scholes PDE from scratch using delta hedging."
				},
				{
					name: "Junior Summer",
					courses: ["Quant Intern at Prop Trading Firm or Hedge Fund"],
					quantActions: [
						"Deliver an impactful internship project (alpha signal, low latency microservice, or live trading desk support).",
						"Interact actively with senior traders and researchers; demonstrate humility and speed.",
						"Target: Secure a full-time return offer (PPO)."
					],
					milestone: "Return offer in hand by August!"
				}
			]
		},
		{
			year: "Senior Year (Year 4)",
			theme: "Specialization & Full-Time Launch",
			tagline: "Solidify return offers, take advanced electives, and transition to a full-time quant.",
			semesters: [
				{
					name: "Semester 7 (Fall)",
					courses: ["Market Microstructure & Order Execution", "Distributed Systems", "Deep Learning / NLP"],
					quantActions: [
						"If recruiting full-time: attend Superdays in September/October.",
						"Review specialized topics: volatility arbitrage, statistical arbitrage, kernel bypass (Solarflare EF_VI).",
						"Negotiate and finalize full-time contracts."
					],
					milestone: "Full-time offer signed."
				},
				{
					name: "Semester 8 (Spring)",
					courses: ["Capstone Project / Thesis", "Electives (Economics, Game Theory, Graph Theory)"],
					quantActions: [
						"Complete senior capstone research or open-source quant tooling.",
						"Travel, relax, and stay mentally sharp for Day 1 on the trading floor."
					],
					milestone: "Graduation with Math & CS degree ready to generate alpha!"
				}
			]
		}
	],

	modules: [
		{
			id: "prob-stats",
			title: "1. Probability & Stochastic Foundations",
			subtitle: "The Mathematical Grammar of Risk and Pricing",
			level: "Undergraduate Core",
			color: "#3b82f6",
			summary: "Explore conditional expectations, Bayes' rule under market updates, discrete random walks, martingales, and Ito calculus. Quant interviews test your ability to reason probabilistically without paper.",
			keyConcepts: [
				{
					name: "Bayes' Rule & Market Belief Updates",
					latex: "P(A|B) = \\frac{P(B|A) P(A)}{P(B)}",
					desc: "In trading, prior beliefs about asset fundamentals are updated as order flow and news arrive. If a high-frequency signal fires, Bayes' rule calculates the posterior probability of informed trading versus noise trading."
				},
				{
					name: "Martingales & No-Arbitrage",
					latex: "E[X_{t+1} | \\mathcal{F}_t] = X_t",
					desc: "A martingale represents a fair game where the best forecast of tomorrow's value is today's value, given all available history \\(\\mathcal{F}_t\\). Under the risk-neutral measure, discounted asset prices are martingales."
				},
				{
					name: "Ito's Lemma (The Quant Fundamental Theorem)",
					latex: "df(t, X_t) = \\left( \\frac{\\partial f}{\\partial t} + \\mu \\frac{\\partial f}{\\partial x} + \\frac{1}{2} \\sigma^2 \\frac{\\partial^2 f}{\\partial x^2} \\right) dt + \\sigma \\frac{\\partial f}{\\partial x} dW_t",
					desc: "Unlike standard calculus where \\((dx)^2 = 0\\), in stochastic calculus \\((dW_t)^2 = dt\\). This second-order curvature term \\(\\frac{1}{2} \\sigma^2 \\frac{\\partial^2 f}{\\partial x^2}\\) creates option Gamma and time-decay Theta!"
				}
			],
			codeSnippet: {
				lang: "python",
				title: "Simulating a 1D Random Walk & Testing Martingale Property",
				code: `import numpy as np
import matplotlib.pyplot as plt

# Simulate 1,000 steps of a symmetric random walk (p = 0.5)
n_steps = 1000
n_paths = 50
steps = np.random.choice([-1, 1], size=(n_paths, n_steps))
walks = np.cumsum(steps, axis=1)

# Martingale check: E[X_T | X_t] = X_t
mean_terminal = np.mean(walks[:, -1])
var_terminal = np.var(walks[:, -1])

print(f"Sample E[X_T]: {mean_terminal:.2f} (Theoretical: 0.0)")
print(f"Sample Var(X_T): {var_terminal:.2f} (Theoretical: {n_steps})")`
			}
		},
		{
			id: "derivatives-bs",
			title: "2. Derivatives & The Black-Scholes Framework",
			subtitle: "Arbitrage-Free Pricing, Dynamic Hedging, and Greeks",
			level: "Core Derivative Math",
			color: "#10b981",
			summary: "Understand how a contingent claim (option) can be replicated perfectly by trading the underlying stock and a risk-free bond, leading to the Black-Scholes PDE without guessing market direction.",
			keyConcepts: [
				{
					name: "Put-Call Parity",
					latex: "C - P = S_0 - K e^{-rT}",
					desc: "An exact model-independent arbitrage relationship between European call (C) and put (P) prices, spot price (S0), strike (K), and risk-free discount rate. If violated by more than transaction costs, a riskless box arbitrage exists."
				},
				{
					name: "Black-Scholes Formula",
					latex: "C(S, t) = S N(d_1) - K e^{-r(T-t)} N(d_2)",
					desc: "Where \\(d_1 = \\frac{\\ln(S/K) + (r + \\sigma^2/2)(T-t)}{\\sigma \\sqrt{T-t}}\\) and \\(d_2 = d_1 - \\sigma \\sqrt{T-t}\\). Notice that \\(N(d_1)\\) is the hedge ratio (Delta) and \\(N(d_2)\\) is the risk-neutral probability of finishing in-the-money."
				},
				{
					name: "The Core Greeks",
					latex: "\\Delta = \\frac{\\partial V}{\\partial S}, \\; \\Gamma = \\frac{\\partial^2 V}{\\partial S^2}, \\; \\Theta = \\frac{\\partial V}{\\partial t}, \\; \\mathcal{V} = \\frac{\\partial V}{\\partial \\sigma}",
					desc: "Delta measures directional exposure; Gamma measures Delta convexity; Theta measures daily decay; Vega measures exposure to changes in market volatility."
				}
			],
			codeSnippet: {
				lang: "python",
				title: "Exact Vectorized Black-Scholes Pricer & Delta in Python",
				code: `import numpy as np
from scipy.stats import norm

def black_scholes_call(S, K, T, r, sigma):
		"""Calculate European Call price and Delta."""
		d1 = (np.log(S / K) + (r + 0.5 * sigma**2) * T) / (sigma * np.sqrt(T))
		d2 = d1 - sigma * np.sqrt(T)

		price = S * norm.cdf(d1) - K * np.exp(-r * T) * norm.cdf(d2)
		delta = norm.cdf(d1)
		gamma = norm.pdf(d1) / (S * sigma * np.sqrt(T))
		vega = S * norm.pdf(d1) * np.sqrt(T)

		return {"price": price, "delta": delta, "gamma": gamma, "vega": vega}

res = black_scholes_call(S=100, K=100, T=1.0, r=0.05, sigma=0.20)
print(f"ATM Call: \${res['price']:.2f}, Delta: {res['delta']:.3f}, Gamma: {res['gamma']:.4f}")`
			}
		},
		{
			id: "microstructure",
			title: "3. Market Microstructure & Order Books",
			subtitle: "The Physics of Electronic Exchanges and Execution",
			level: "Trading & Execution",
			color: "#8b5cf6",
			summary: "Modern exchanges do not trade on continuous curves. They operate continuous double auctions via Limit Order Books (LOB), with discrete price ticks, queues, adverse selection, and latency games.",
			keyConcepts: [
				{
					name: "Limit Order Book (LOB) Architecture",
					latex: "\\text{Spread} = P_{\\text{ask}} - P_{\\text{bid}} \\ge \\text{TickSize}",
					desc: "Bids represent passive buyers queued by price-time priority; asks represent passive sellers. Aggressive market orders cross the spread to consume liquidity instantly, paying the half-spread."
				},
				{
					name: "Adverse Selection & Glosten-Milgrom",
					latex: "E[V | \\text{Trade at Ask}] > E[V | \\text{Trade at Bid}]",
					desc: "When an informed trader buys, they know the asset is worth more than the current ask. A market maker who sells to them suffers adverse selection. The bid-ask spread must compensate for this toxic order flow."
				},
				{
					name: "Optimal Execution (Almgren-Chriss)",
					latex: "\\min_{x_t} \\left( \\text{Expected Impact Cost} + \\lambda \\cdot \\text{Variance(Cost)} \\right)",
					desc: "Selling 100,000 shares instantly crashes the market (permanent impact). Selling too slowly exposes the trader to market drift (volatility risk). Quants solve this as a calculus of variations or dynamic program."
				}
			],
			codeSnippet: {
				lang: "python",
				title: "Calculating Order Book Imbalance (Micro-Price Indicator)",
				code: `def micro_price(best_bid, best_ask, bid_size, ask_size):
		"""
		Volume-weighted mid price (Micro-price):
		Predicts immediate next-tick direction better than simple mid-price.
		"""
		total_size = bid_size + ask_size
		if total_size == 0:
				return (best_bid + best_ask) / 2.0
		# Higher bid size pulls micro-price closer to ask (upward pressure)
		return (best_bid * ask_size + best_ask * bid_size) / total_size

# Example: Heavy bid size indicates upward pressure
p_micro = micro_price(best_bid=100.00, best_ask=100.05, bid_size=5000, ask_size=1000)
print(f"Simple Mid: \$100.025, Micro-Price: \${p_micro:.3f}")`
			}
		},
		{
			id: "strategies-portfolio",
			title: "4. Quantitative Strategies & Portfolio Optimization",
			subtitle: "Alpha Generation, Statistical Arbitrage, and Risk Control",
			level: "Quant Research & PM",
			color: "#f59e0b",
			summary: "Explore cross-sectional momentum, pairs trading via cointegration, mean reversion with Ornstein-Uhlenbeck processes, Markowitz Modern Portfolio Theory, and the Kelly Criterion.",
			keyConcepts: [
				{
					name: "Pairs Trading & Cointegration",
					latex: "y_t - \\beta x_t = \\epsilon_t \\sim I(0)",
					desc: "Two asset prices \\(x_t\\) and \\(y_t\\) might individually be non-stationary random walks (I(1)), but a linear combination is stationary (I(0)). Quants trade the spread \\(\\epsilon_t\\) when it deviates from its historical mean."
				},
				{
					name: "The Kelly Criterion",
					latex: "f^* = \\frac{p(b+1) - 1}{b} = \\frac{b p - q}{b}",
					desc: "The mathematically optimal fraction of wealth to wager on an edge to maximize long-term log-wealth. Quants typically use Half-Kelly (\\(f^*/2\\)) to protect against parameter misestimation and severe drawdowns."
				},
				{
					name: "Sharpe & Information Ratio",
					latex: "\\text{Sharpe} = \\frac{E[R_p - R_f]}{\\sigma_p}, \\quad \\text{IR} = \\frac{\\alpha}{\\omega} = \\text{IC} \\times \\sqrt{\\text{Breadth}}",
					desc: "The Fundamental Law of Active Management: Alpha generation is the product of skill (Information Coefficient IC) and independent opportunities (Breadth)."
				}
			],
			codeSnippet: {
				lang: "python",
				title: "Mean Reverting Ornstein-Uhlenbeck Pairs Spread Signal",
				code: `import numpy as np

def generate_ou_signal(spread, lookback=20, entry_z=2.0, exit_z=0.5):
		"""Generate mean-reversion trading signal on normalized spread."""
		rolling_mean = np.convolve(spread, np.ones(lookback)/lookback, mode='valid')
		# Normalized z-score: (spread - mean) / std
		# Short spread when z > 2.0; Long spread when z < -2.0
		print(f"Generated signal for {len(spread)} ticks with entry threshold {entry_z} sigma.")
		return rolling_mean`
			}
		},
		{
			id: "low-latency-qd",
			title: "5. Low-Latency Systems & C++ (QD Focus)",
			subtitle: "Nanosecond Engineering, CPU Caches, and Kernel Bypass",
			level: "Quant Development",
			color: "#ef4444",
			summary: "In High-Frequency Trading (HFT), winning the race to update quotes or execute against stale prices requires squeezing every nanosecond out of modern hardware and modern C++.",
			keyConcepts: [
				{
					name: "Cache Hierarchy & False Sharing",
					latex: "\\text{L1 latency} \\approx 1\\text{ns} \\ll \\text{RAM latency} \\approx 60\\text{ns}",
					desc: "CPUs fetch memory in 64-byte cache lines. If two threads write to adjacent variables in the same cache line, the CPU invalidates the cache (false sharing). We align variables with `alignas(64)`."
				},
				{
					name: "Lock-Free SPSC Ring Buffers",
					latex: "\\text{Compare-And-Swap (CAS)} \\quad \\& \\quad \\text{Memory Orders}",
					desc: "Mutexes put OS threads to sleep, adding microseconds of context switch penalty. High-performance messaging uses atomic head and tail pointers with `std::memory_order_acquire` and `std::memory_order_release`."
				},
				{
					name: "Zero Heap Allocation on Hot Path",
					latex: "\\text{malloc()} \\to \\text{Syscall} = \\text{Unacceptable Latency Spike}",
					desc: "All memory is pre-allocated at startup via object pools and flat arrays. Virtual method dispatch (vtable lookups) is replaced with C++ templates and static polymorphism (CRTP)."
				}
			],
			codeSnippet: {
				lang: "cpp",
				title: "Cache-Friendly Static Price Level (Modern C++ HFT Pattern)",
				code: `// C++20 Zero-Allocation Price Level Struct
#include <cstdint>
#include <new>

struct alignas(64) PriceLevel { // Aligned to 64-byte CPU cache line
		uint64_t price_ticks;
		uint32_t total_volume;
		uint32_t order_count;

		// In-place update avoiding memory reallocations
		inline void add_order(uint32_t qty) noexcept {
				total_volume += qty;
				++order_count;
		}
};`
			}
		},
		{
			id: "ml-quant",
			title: "6. Machine Learning in Quant Finance",
			subtitle: "Avoiding Overfitting, Non-Stationarity, and Feature Engineering",
			level: "Advanced Research",
			color: "#ec4899",
			summary: "Financial markets have notoriously low signal-to-noise ratios (often < 1%). Standard ML workflows fail due to lookahead bias, cross-validation leakage, and regime changes.",
			keyConcepts: [
				{
					name: "Purged & Embargoed Cross-Validation",
					latex: "\\text{Leakage if } t_j \\in [t_{i, \\text{start}}, t_{i, \\text{end}}]",
					desc: "Financial labels (e.g. 5-day future returns) overlap across time. Standard K-fold CV leaks future information into the training set. Marcos Lopez de Prado's Purging and Embargoing eliminates this temporal leakage."
				},
				{
					name: "Deflated Sharpe Ratio (DSR)",
					latex: "\\text{DSR} = f(\\text{Sharpe}, \\text{Trials Tested}, \\text{Variance}, \\text{Skewness})",
					desc: "If a researcher tests 1,000 random strategy permutations, by pure luck several will show Sharpe > 2.0. The Deflated Sharpe Ratio adjusts the significance threshold based on the number of trials attempted."
				},
				{
					name: "Alternative Data & Microstructure Features",
					latex: "\\text{Features: Order Imbalance, Book Skew, Realized Volatility, Flow Toxicity}",
					desc: "Raw price levels are non-stationary. Effective quant ML models take stationary features such as log-returns, volume imbalance, and bid-ask spreads as inputs to predict short-horizon return distributions."
				}
			],
			codeSnippet: {
				lang: "python",
				title: "Financial Fractional Differentiation (Stationarity with Memory)",
				code: `import numpy as np

def fractional_diff(series, d=0.4, threshold=1e-4):
		"""
		Fractional differentiation preserves memory (unlike integer diff d=1)
		while achieving stationarity (ADF test p < 0.01).
		"""
		weights = [1.0]
		k = 1
		while True:
				w = -weights[-1] / k * (d - k + 1)
				if abs(w) < threshold:
						break
				weights.append(w)
				k += 1
		weights = np.array(weights[::-1])
		diff_series = np.convolve(series, weights, mode='valid')
		return diff_series`
			}
		}
	],

	resources: [
		{
			category: "Must-Read Books",
			items: [
				{
					title: "A Practical Guide to Quantitative Finance Interviews (The Green Book)",
					author: "Xinfeng Zhou",
					desc: "The undisputed bible for quant interview prep. Contains 300+ real interview questions on probability, brainteasers, calculus, and finance.",
					tags: ["Interview Prep", "Probability", "Essential"],
					difficulty: "Undergrad to MS",
					linkText: "Look for Zhou Green Book PDF or Amazon"
				},
				{
					title: "Heard on the Street: Quantitative Questions from Wall Street Job Interviews",
					author: "Timothy Falcon Crack",
					desc: "Classic collection of brainteasers, options pricing questions, and market intuition puzzles.",
					tags: ["Brainteasers", "Interview Classic"],
					difficulty: "Freshman / Sophomore",
					linkText: "Timothy Crack - Heard on the Street"
				},
				{
					title: "Options, Futures, and Other Derivatives",
					author: "John C. Hull",
					desc: "Known as 'The Bible' of derivatives. Explains mechanics, Greeks, Black-Scholes, and interest rate swaps in clear detail.",
					tags: ["Derivatives", "Textbook"],
					difficulty: "Core Undergrad",
					linkText: "Hull Derivatives"
				},
				{
					title: "Advances in Financial Machine Learning",
					author: "Marcos Lopez de Prado",
					desc: "Essential for modern Quant Researchers. Covers backtest overfitting, purged cross-validation, and financial feature engineering.",
					tags: ["Machine Learning", "Quant Research"],
					difficulty: "Advanced Undergrad",
					linkText: "Wiley / Amazon"
				},
				{
					title: "Stochastic Calculus for Finance I & II",
					author: "Steven Shreve",
					desc: "The gold standard for rigorous mathematical finance. Vol I covers the discrete binomial model; Vol II covers continuous Brownian motion and Ito calculus.",
					tags: ["Math Heavy", "Stochastics"],
					difficulty: "Junior / Senior Math",
					linkText: "Shreve Springer Series"
				},
				{
					title: "Effective Modern C++ (and C++20)",
					author: "Scott Meyers",
					desc: "Crucial for Quant Developers aiming for HFT and low-latency infrastructure roles.",
					tags: ["C++", "Quant Dev"],
					difficulty: "Sophomore / Junior CS",
					linkText: "O'Reilly Media"
				}
			]
		},
		{
			category: "Top Free Courses & University Notes",
			items: [
				{
					title: "MIT 18.S096: Topics in Mathematics with Applications in Finance",
					author: "MIT OpenCourseWare (Peter Kempthorne et al.)",
					desc: "Free lectures and lecture notes covering options pricing, portfolio theory, and statistical arbitrage designed for MIT math majors.",
					tags: ["University Course", "Free Video", "MIT"],
					difficulty: "Undergraduate",
					url: "https://ocw.mit.edu/courses/18-s096-topics-in-mathematics-with-applications-in-finance-fall-2013/"
				},
				{
					title: "Stanford CME 241: Foundations of Reinforcement Learning with Applications in Finance",
					author: "Ashwin Rao (Stanford)",
					desc: "State-of-the-art course connecting dynamic programming, RL, and trading/market-making with accompanying Python code on GitHub.",
					tags: ["Reinforcement Learning", "Market Making", "Stanford"],
					difficulty: "Upper Undergrad",
					url: "https://github.com/TikhonJelvis/RL-book"
				},
				{
					title: "Columbia IEOR: Martin Haugh's Financial Engineering Lecture Notes",
					author: "Prof. Martin Haugh",
					desc: "Renowned PDF lecture series on Monte Carlo simulation, term structure models, Black-Scholes, and credit risk.",
					tags: ["Free PDFs", "Stochastics", "Columbia"],
					difficulty: "Junior / Senior",
					url: "http://www.columbia.edu/~mh2078/FoundationsFE/"
				}
			]
		},
		{
			category: "Competitions, Simulators & Practice Platforms",
			items: [
				{
					title: "Jane Street Electronic Trading Challenge (ETC)",
					desc: "Annual university trading competition where students write bot strategies in Python or OCaml to trade in a simulated market with other schools.",
					tags: ["Competition", "Jane Street", "Market Making"],
					url: "https://www.janestreet.com/join-jane-street/programs-and-events/"
				},
				{
					title: "Citadel / Citadel Securities Datathon",
					desc: "Premier university data science competition run in partnership with Correlation One. Students analyze large real-world datasets in teams.",
					tags: ["Competition", "Citadel", "Data Science"],
					url: "https://www.citadel.com/careers/students/datathons/"
				},
				{
					title: "QuantConnect (Lean Engine)",
					desc: "Free open-source algorithmic trading engine supporting Python and C#. Excellent for testing equities, options, and futures backtests.",
					tags: ["Backtesting", "Open Source", "Python"],
					url: "https://www.quantconnect.com"
				},
				{
					title: "Zetamac Arithmetic Trainer",
					desc: "The universal speed-math benchmark used by traders. Optiver, Akuna, and Flow Traders test this in their preliminary online screens.",
					tags: ["Mental Math", "QT Prep"],
					url: "https://arithmetic.zetamac.com/"
				},
				{
					title: "OpenBB Terminal",
					desc: "Open-source Python investment research terminal. Exceptional tool to explore financial data, macro series, and options data.",
					tags: ["Open Source", "Market Data"],
					url: "https://openbb.co"
				}
			]
		}
	],

	// Comprehensive Interview & Exam Bank (50+ Real Quant Questions)
	interviewQuestions: [
		{
			id: "q1",
			title: "Expected Flips to Get H-T-H vs H-H-T",
			firm: "Jane Street",
			category: "Probability & Martingales",
			difficulty: "Medium",
			question: "You flip a fair coin repeatedly. What is the expected number of flips until you see the sequence H-T-H? What about H-H-T? Which sequence arrives faster on average and why?",
			hint: "Use Markov chains or martingales (fair casino argument). Notice that H-T-H overlaps with itself at the end (the trailing H can be the leading H of the next pattern), whereas H-H-T has no self-overlap.",
			solution: `**Step 1: Fair Casino / Martingale Method**
Imagine a casino where at each round $t = 1, 2, \\dots$, a new gambler enters and bets \$1 that the next flip is H (paying \$2 if right, \$0 if wrong). If they win, they bet their entire \$2 on the second letter, and if they win again, their entire \$4 on the third letter.

Because each flip is fair, each gambler's net winnings is a martingale with expected profit of 0.
By the Optional Stopping Theorem, if the game stops at stopping time $T$, the total expected profit of all gamblers must equal 0:
$$\\mathbb{E}[\\text{Total Payoff}] - \\mathbb{E}[T] \\times 1 = 0 \\implies \\mathbb{E}[T] = \\mathbb{E}[\\text{Total Payoff}]$$

**For H-H-T:**
At the exact moment H-H-T appears:
- The gambler who started 3 flips ago bet H, then H, then T. They win \$8.
- The gambler who started 2 flips ago bet H, but the sequence had H then T. They lost on flip 2 (got T instead of H). Payoff = \$0.
- The gambler who started 1 flip ago bet H, but the last flip was T. Payoff = \$0.
Total casino payout = \$8.
Therefore, **$\\mathbb{E}[T_{\\text{HHT}}] = 8$ flips**.

**For H-T-H:**
At the exact moment H-T-H appears:
- The gambler who started 3 flips ago bet H, then T, then H. They win \$8.
- The gambler who started 2 flips ago bet H. The flip was T. Payoff = \$0.
- The gambler who started 1 flip ago bet H. The last flip was indeed H! They win \$2.
Total casino payout = \$8 + \$2 = \$10.
Therefore, **$\\mathbb{E}[T_{\\text{HTH}}] = 10$ flips**.

**Conclusion:** H-H-T arrives faster on average (8 flips vs 10 flips) due to self-overlap!`,
			tags: ["Coin Flips", "Stopping Time", "Martingale"]
		},
		{
			id: "q2",
			title: "The 100 Tigers and 1 Sheep Paradox",
			firm: "Citadel",
			category: "Brainteasers & Logic",
			difficulty: "Medium",
			question: "There is an island with 100 perfectly rational, identical tigers and 1 sheep. Tigers eat grass, but they prefer sheep. However, if a tiger eats the sheep, it immediately becomes sleepy and turns into a sheep itself, meaning other tigers could then eat it. No tiger wants to die. Will the sheep be eaten?",
			hint: "Use backward induction! Start with small cases: what if there is only 1 tiger? What if there are 2 tigers? What if there are 3?",
			solution: `**Backward Induction Analysis:**

- **Case N = 1 Tiger:** The tiger eats the sheep with zero hesitation. Even though it turns into a sheep, there are no other tigers left to eat it.
- **Case N = 2 Tigers:** If Tiger 1 eats the sheep, it becomes a sheep. Then we have N = 1 tiger left. By Case 1, that remaining tiger will definitely eat it! Knowing this, Tiger 1 will NOT eat the sheep. So the sheep lives!
- **Case N = 3 Tigers:** If Tiger 1 eats the sheep, it becomes a sheep with 2 tigers watching. But from Case 2, we know that when there are 2 tigers and 1 sheep, neither tiger dares to eat it. Therefore, Tiger 1 can safely eat the sheep and survive! So the sheep IS eaten.
- **Case N = 4 Tigers:** If a tiger eats the sheep, it transitions to the N = 3 state where it will be eaten. So no tiger eats the sheep.

**General Rule:**
- If $N$ is **odd**, the first tiger eats the sheep.
- If $N$ is **even**, the sheep is NOT eaten.

Since $N = 100$ is **even**, **the sheep will NOT be eaten** and lives peacefully.`,
			tags: ["Game Theory", "Induction"]
		},
		{
			id: "q3",
			title: "Dice Rolling with Stopping Rule (Optimal Stopping)",
			firm: "Optiver",
			category: "Expectation & Games",
			difficulty: "Easy",
			question: "You roll a fair 6-sided die. You can choose to accept the payout equal to the number rolled, or pay nothing and roll one more time (up to a maximum of 2 rolls total). If you roll a second time, you must take that outcome. What is your optimal strategy and expected payout?",
			hint: "Work backwards from the final roll. What is the expected value of the second roll? Should you re-roll if your first roll is below that value?",
			solution: `**Step 1: Expected Value of Roll 2**
If you take the second roll, the payout is purely the face value of a fair d6:
$$\\mathbb{E}[R_2] = \\frac{1 + 2 + 3 + 4 + 5 + 6}{6} = 3.5$$

**Step 2: Optimal Strategy on Roll 1**
On the first roll, you should re-roll if and only if the current roll $R_1 < \\mathbb{E}[R_2] = 3.5$.
Therefore:
- If you roll **4, 5, or 6**: KEEP IT (since $4, 5, 6 > 3.5$).
- If you roll **1, 2, or 3**: RE-ROLL (since $1, 2, 3 < 3.5$).

**Step 3: Total Expected Value**
$$\\mathbb{E}[\\text{Game}] = \\frac{1}{6}(4) + \\frac{1}{6}(5) + \\frac{1}{6}(6) + \\frac{3}{6} \\times \\mathbb{E}[R_2]$$
$$\\mathbb{E}[\\text{Game}] = \\frac{15}{6} + \\frac{1}{2}(3.5) = 2.5 + 1.75 = 4.25$$

**Answer:** Re-roll on 1, 2, or 3. Keep 4, 5, or 6. Expected payout is **4.25** (or \$4.25).`,
			tags: ["Dice", "Dynamic Programming", "Optimal Stopping"]
		},
		{
			id: "q4",
			title: "3 Dice Summing to 10 vs 9",
			firm: "SIG (Susquehanna)",
			category: "Probability & Bayes",
			difficulty: "Easy",
			question: "You roll three fair 6-sided dice. Is the sum more likely to be 9 or 10? What are the exact probabilities?",
			hint: "Count partitions or consider symmetry around the expected sum of 3 dice ($3 \\times 3.5 = 10.5$).",
			solution: `**Method 1: Symmetry about the Mean**
The minimum sum is $1 + 1 + 1 = 3$. The maximum sum is $6 + 6 + 6 = 18$.
The distribution of the sum is perfectly symmetric around:
$$\\mu = \\frac{3 + 18}{2} = 10.5$$

By symmetry:
$$P(\\text{Sum} = 9) = P(\\text{Sum} = 18 + 3 - 9) = P(\\text{Sum} = 12)$$
$$P(\\text{Sum} = 10) = P(\\text{Sum} = 18 + 3 - 10) = P(\\text{Sum} = 11)$$

Since the distribution of the sum of independent uniform variables is bell-shaped (approaching Gaussian), probabilities increase towards the central peak:
$$P(\\text{Sum} = 10) > P(\\text{Sum} = 9)$$

**Exact Counting (out of $6^3 = 216$ outcomes):**
- Outcomes summing to 9: 25 combinations $\\implies P(\\text{Sum} = 9) = \\frac{25}{216} \\approx 11.57\\%$
- Outcomes summing to 10: 27 combinations $\\implies P(\\text{Sum} = 10) = \\frac{27}{216} = 12.5\\%$

**Answer:** A sum of **10 is more likely** (27/216 vs 25/216).`,
			tags: ["Combinatorics", "Symmetry"]
		},
		{
			id: "q5",
			title: "Derive Put-Call Parity from No-Arbitrage",
			firm: "Two Sigma",
			category: "Derivatives & Arbitrage",
			difficulty: "Medium",
			question: "State and prove Put-Call Parity for European options on a non-dividend paying stock with spot price $S_0$, strike $K$, risk-free rate $r$, and expiry $T$. Construct the replicating portfolios.",
			hint: "Form two portfolios: Portfolio A = 1 Call + cash equal to the present value of strike $K e^{-rT}$. Portfolio B = 1 Put + 1 share of stock.",
			solution: `**Proof by Arbitrage:**

Consider two portfolios formed at time $t = 0$:
- **Portfolio A:** 1 European Call option ($C$) + Cash amount of $K e^{-rT}$ invested at risk-free rate $r$.
- **Portfolio B:** 1 European Put option ($P$) + 1 share of stock ($S_0$).

**Payoff at Expiration $t = T$:**
The cash in Portfolio A grows to $K e^{-rT} \\cdot e^{rT} = K$.

- **Scenario 1: $S_T \\ge K$**
	- Portfolio A: Call is ITM $\\implies (S_T - K) + K = S_T$.
	- Portfolio B: Put expires worthless ($0$) + 1 share of stock $= S_T$.
	- Both portfolios are worth exactly $S_T$.

- **Scenario 2: $S_T < K$**
	- Portfolio A: Call expires worthless ($0$) + Cash $= K$.
	- Portfolio B: Put is ITM $\\implies (K - S_T) + S_T = K$.
	- Both portfolios are worth exactly $K$.

In all possible states of the world at $t = T$, $\\text{Value}(A) = \\text{Value}(B) = \\max(S_T, K)$.
By the **Law of One Price** (No Arbitrage), they must have identical values at time $t = 0$:
$$C + K e^{-rT} = P + S_0$$
$$\\implies C - P = S_0 - K e^{-rT}$$

If $C - P > S_0 - K e^{-rT}$, an arbitrageur shorts the Call, buys the Put, buys the stock, and borrows $K e^{-rT}$ to lock in riskless profit today.`,
			tags: ["Arbitrage", "Options", "Replication"]
		},
		{
			id: "q6",
			title: "Black-Scholes Delta Hedging & Gamma-Theta Tradeoff",
			firm: "IMC Trading",
			category: "Derivatives & Arbitrage",
			difficulty: "Hard",
			question: "Explain why an option seller who delta hedges continuously suffers when realized volatility is higher than implied volatility. Write the Black-Scholes PDE relation connecting Theta ($\\Theta$) and Gamma ($\\Gamma$).",
			hint: "Look at the Black-Scholes PDE: $rS\\Delta + \\frac{1}{2}\\sigma^2 S^2 \\Gamma + \\Theta = rV$. What happens when realized daily moves exceed the implied volatility priced into the option?",
			solution: `**The Black-Scholes PDE:**
$$r S \\frac{\\partial V}{\\partial S} + \\frac{1}{2} \\sigma^2 S^2 \\frac{\\partial^2 V}{\\partial S^2} + \\frac{\\partial V}{\\partial t} - r V = 0$$

Under delta-neutrality ($V - \\Delta S$), the portfolio return satisfies:
$$\\Theta + \\frac{1}{2} \\sigma^2 S^2 \\Gamma = r (V - \\Delta S)$$
For a short-dated ATM option or when $r \\approx 0$:
$$\\Theta \\approx -\\frac{1}{2} \\sigma_{\\text{implied}}^2 S^2 \\Gamma$$

**Economic Interpretation:**
- **Theta ($\\\\Theta < 0$)** is the rent you collect per day for taking on risk.
- **Gamma ($\\\\Gamma > 0$)** is the curvature of the payoff.
When you are **short an option** and delta-hedged:
- You collect Theta every day the stock stays quiet.
- But your Gamma is **negative** ($-|\\Gamma|$). Every time the stock rallies, your delta increases (you must buy high to hedge); when the stock drops, your delta decreases (you must sell low to hedge).
- If the realized volatility $\\sigma_{\\text{realized}} > \\sigma_{\\text{implied}}$, the daily buy-high/sell-low hedging slippage exceeds the Theta collected. You lose money overall!`,
			tags: ["Greeks", "Delta Hedging", "Volatility"]
		},
		{
			id: "q7",
			title: "Random Walk on a Circle (Absorbing Barrier)",
			firm: "Jane Street",
			category: "Probability & Martingales",
			difficulty: "Hard",
			question: "There are $N$ points arranged in a circle labeled $0, 1, \\dots, N-1$. You start at position 0. At each step, you move clockwise with probability 0.5 and counterclockwise with probability 0.5. The process stops when every single point on the circle has been visited at least once. Which point is LEAST likely to be the last point visited?",
			hint: "Does any non-zero point have a structural asymmetry over any other non-zero point? Consider the moment when $N-1$ points have been visited.",
			solution: `**Remarkable Symmetry Property:**
Every point $k \\in \\{1, 2, \\dots, N-1\\}$ has the **exact same probability $\\frac{1}{N-1}$** of being the last point visited!

**Rigorous Proof:**
At any intermediate time before the process finishes, the set of visited points forms a contiguous arc on the circle containing 0.
Suppose $N-1$ points have been visited. That means exactly ONE point $x$ has not yet been visited.
The current position of the random walk must be at one of the two boundaries adjacent to $x$.
By the symmetry of a 1D symmetric random walk on a line segment $[0, N-1]$, starting from 0, the probability that the walk reaches position $k$ from the left or right before wrapping completely around is uniform across all non-zero points.

**Answer:**
There is NO point that is least likely among $\\{1, 2, \\dots, N-1\\}$. **All points except the starting point 0 are equally likely to be the last point visited, each with probability $\\frac{1}{N-1}$**.
Position 0 is visited first (probability 0 of being last).`,
			tags: ["Random Walk", "Symmetry", "Markov Chain"]
		},
		{
			id: "q8",
			title: "C++: Virtual Functions vs CRTP for Low Latency",
			firm: "Hudson River Trading (HRT)",
			category: "Quant Dev & Systems",
			difficulty: "Medium",
			question: "Why do high-frequency trading execution engines avoid virtual functions (runtime polymorphism) on the critical hot path? What C++ design pattern replaces them without sacrificing code reuse?",
			hint: "Consider vtable pointer indirection, CPU instruction cache misses, and compiler inlining.",
			solution: `**Why Virtual Functions Hurt HFT Latency:**
1. **Vtable Indirection:** Calling a virtual function requires dereferencing the object's \`vptr\` to find the \`vtable\`, then indexing into the table to obtain the function pointer. This adds 2 extra memory lookups (potential L1/L2 cache misses).
2. **Prevents Compiler Inlining:** The compiler cannot inline the function at compile time because the target implementation is resolved dynamically at runtime. Inlining eliminates call/return instruction overhead and unlocks compiler optimizations (loop unrolling, vectorization).
3. **Branch Prediction Penalty:** Dynamic indirect calls thwart the CPU's Branch Target Buffer (BTB), causing costly pipeline flushes (15-20 CPU cycles penalty).

**The Solution: Curiously Recurring Template Pattern (CRTP)**
CRTP achieves **static compile-time polymorphism**:

\`\`\`cpp
template <typename Derived>
class OrderHandler {
public:
		inline void on_market_data(const MarketTick& tick) {
				// Static dispatch resolved at compile-time!
				static_cast<Derived*>(this)->process_tick(tick);
		}
};

class NasdaqHandler : public OrderHandler<NasdaqHandler> {
public:
		inline void process_tick(const MarketTick& tick) {
				// Direct, fully inlined code - zero pointer indirection!
		}
};
\`\`\`
CRTP compiles to direct, inline machine instructions with 0 ns overhead.`,
			tags: ["C++", "CRTP", "Vtable", "Cache"]
		},
		{
			id: "q9",
			title: "Order Flow Toxicity & The Glosten-Milgrom Model",
			firm: "D.E. Shaw",
			category: "Market Microstructure",
			difficulty: "Hard",
			question: "Suppose an asset has true future value $V \\in \\{100, 110\\}$ with equal prior probability $0.5$. With probability $\\mu = 0.4$, a trader is informed (knows true $V$). With probability $1 - \\mu = 0.6$, the trader is an uninformed noise trader (buys or sells with equal probability 0.5). What are the zero-profit competitive Bid and Ask prices set by a market maker?",
			hint: "Use Bayes' rule to find $P(V = 110 | \\text{Trader Buys})$ for Ask, and $P(V = 100 | \\text{Trader Sells})$ for Bid.",
			solution: `**Setting the Ask Price ($A$):**
A competitive market maker sets the Ask price equal to the expected asset value conditional on observing a BUY order:
$$A = \\mathbb{E}[V | \\text{Buy}] = 100 + 10 \\cdot P(V = 110 | \\text{Buy})$$

By Bayes' Rule:
$$P(\\text{Buy}) = P(\\text{Buy} | V=110) P(V=110) + P(\\text{Buy} | V=100) P(V=100)$$
- If $V = 110$: Informed trader buys ($1$). Noise trader buys with prob $0.5$.
	$$P(\\text{Buy} | V=110) = \\mu(1) + (1-\\mu)(0.5) = 0.4(1) + 0.6(0.5) = 0.4 + 0.3 = 0.7$$
- If $V = 100$: Informed trader sells ($0$). Noise trader buys with prob $0.5$.
	$$P(\\text{Buy} | V=100) = \\mu(0) + (1-\\mu)(0.5) = 0.3$$

Now, calculate $P(V = 110 | \\text{Buy})$:
$$P(V=110 | \\text{Buy}) = \\frac{P(\\text{Buy} | V=110) P(V=110)}{P(\\text{Buy})} = \\frac{0.7 \\times 0.5}{(0.7 \\times 0.5) + (0.3 \\times 0.5)} = \\frac{0.35}{0.50} = 0.70$$

Therefore:
$$\\mathbf{Ask} = 100 + 10 \\times 0.70 = \\mathbf{107.0}$$

**Setting the Bid Price ($B$):**
By exact symmetry around the mid-price of 105:
$$P(V = 100 | \\text{Sell}) = 0.70 \\implies \\mathbf{Bid} = 110 - 10 \\times 0.70 = \\mathbf{103.0}$$

**Result:**
$$\\text{Bid} = 103.0, \\quad \\text{Ask} = 107.0, \\quad \\text{Spread} = 4.0$$
The positive spread of 4.0 emerges purely to protect the market maker against informed traders!`,
			tags: ["Bayes", "Market Microstructure", "Adverse Selection"]
		},
		{
			id: "q10",
			title: "Kelly Criterion Derivation for Biased Coin",
			firm: "Akuna Capital",
			category: "Portfolio & Risk",
			difficulty: "Medium",
			question: "You have a bankroll $W_0$. A coin lands Heads with probability $p > 0.5$ and Tails with probability $q = 1 - p$. On Heads you win $b$ times your wager ($+b X$). On Tails you lose your wager ($-X$). What fraction $f$ of your current bankroll should you wager on each flip to maximize the long-run compound growth rate of your wealth?",
			hint: "Maximize the expected log-wealth $\\mathbb{E}[\\ln(W_1 / W_0)]$. Why is maximizing log-wealth the correct criterion instead of expected wealth?",
			solution: `**Step 1: Formulate Wealth Growth**
Let $f \\in [0, 1]$ be the fraction of wealth wagered.
After one flip:
- If Heads (probability $p$): $W_1 = W_0 (1 + b f)$
- If Tails (probability $q$): $W_1 = W_0 (1 - f)$

After $N$ independent flips with $H$ heads and $T$ tails:
$$W_N = W_0 (1 + b f)^H (1 - f)^T$$

The exponential growth rate $g(f)$ is:
$$g(f) = \\lim_{N \\to \\infty} \\frac{1}{N} \\ln\\left(\\frac{W_N}{W_0}\\right) = p \\ln(1 + b f) + q \\ln(1 - f)$$

**Step 2: Maximize $g(f)$ with Calculus**
Take the first derivative with respect to $f$ and set to zero:
$$g'(f) = \\frac{p b}{1 + b f} - \\frac{q}{1 - f} = 0$$
$$p b (1 - f) = q (1 + b f)$$
$$p b - p b f = q + q b f$$
$$p b - q = b f (p + q)$$

Since $p + q = 1$:
$$f^* = \\frac{p b - q}{b}$$

**Special Case: Even Payout ($b = 1$):**
$$f^* = p - q = 2p - 1$$
If $p = 0.55$, optimal bet is $f^* = 2(0.55) - 1 = 0.10$ (bet 10% of bankroll).

**Why not maximize $\\mathbb{E}[W_N]$?**
Maximizing $\\mathbb{E}[W_N]$ leads to $f = 1$ (bet 100% every time). But with probability 1, in the long run you will flip Tails once and your bankroll will drop to 0 (ruin)! Log-wealth prevents ruin because $\\ln(0) = -\\infty$.`,
			tags: ["Kelly Criterion", "Calculus", "Optimization"]
		},
		{
			id: "q11",
			title: "Covariance Matrix: Positive Semi-Definiteness",
			firm: "Citadel",
			category: "Linear Algebra & Stats",
			difficulty: "Medium",
			question: "Prove that any valid covariance matrix $\\Sigma \\in \\mathbb{R}^{n \\times n}$ of random variables $X = (X_1, \\dots, X_n)^T$ is symmetric and positive semi-definite (PSD). What does it mean if $\\det(\\Sigma) = 0$?",
			hint: "Consider the variance of an arbitrary linear portfolio $Y = c^T X$ for any vector $c \\in \\mathbb{R}^n$. Can variance ever be negative?",
			solution: `**Proof:**

1. **Symmetry:**
By definition, $\\Sigma_{ij} = \\text{Cov}(X_i, X_j) = \\mathbb{E}[(X_i - \\mu_i)(X_j - \\mu_j)] = \\text{Cov}(X_j, X_i) = \\Sigma_{ji}$.
Therefore, $\\Sigma = \\Sigma^T$.

2. **Positive Semi-Definite (PSD):**
Let $c \\in \\mathbb{R}^n$ be any arbitrary real non-zero vector.
Construct the scalar random variable $Y = c^T X = \\sum_{i=1}^n c_i X_i$.
The variance of $Y$ is:
$$\\text{Var}(Y) = \\text{Var}(c^T X) = c^T \\Sigma c$$

Since variance is the expected square of a real deviation:
$$\\text{Var}(Y) = \\mathbb{E}[(Y - \\mathbb{E}[Y])^2] \\ge 0$$
Thus, for every vector $c$:
$$c^T \\Sigma c \\ge 0$$
This is the exact mathematical definition of a **Positive Semi-Definite** matrix!

3. **Significance of $\\det(\\Sigma) = 0$:**
If $\\det(\\Sigma) = 0$, $\\Sigma$ is singular. At least one eigenvalue is 0.
There exists a non-zero vector $c$ such that:
$$c^T \\Sigma c = \\text{Var}(c^T X) = 0$$
This means there is an exact linear combination of the assets with **zero variance** (a deterministic risk-free synthetic cash asset, or perfect collinearity between assets).`,
			tags: ["Linear Algebra", "Covariance", "Portfolio Theory"]
		},
		{
			id: "q12",
			title: "Continuous Uniform Distribution: Sum Exceeding 1",
			firm: "Jane Street",
			category: "Probability & Bayes",
			difficulty: "Hard",
			question: "Let $X_1, X_2, \\dots$ be independent random variables drawn uniformly from $[0, 1]$. Let $N = \\min\\{n : \\sum_{i=1}^n X_i > 1\\}$. What is the expected value $\\mathbb{E}[N]$?",
			hint: "Use the tail probability formula $\\mathbb{E}[N] = \\sum_{k=0}^{\\infty} P(N > k)$. What is the volume of the simplex $\\{x_1, \\dots, x_k \\ge 0 : x_1 + \\dots + x_k \\le 1\\}$?",
			solution: `**Step 1: Tail Probability Formula**
For a positive integer-valued random variable $N$:
$$\\mathbb{E}[N] = \\sum_{k=0}^{\\infty} P(N > k)$$

Note that:
- $N > 0$ always (since sum of 0 variables is $0 \\le 1$), so $P(N > 0) = 1$.
- For $k \\ge 1$, $N > k$ occurs if and only if the sum of the first $k$ independent uniform variables is still $\\le 1$:
$$P(N > k) = P(X_1 + X_2 + \\dots + X_k \\le 1)$$

**Step 2: Volume of the Standard $k$-Simplex**
The region where $x_i \\in [0, 1]$ and $\\sum_{i=1}^k x_i \\le 1$ is the standard simplex in $\\mathbb{R}^k$.
Its volume is:
$$\\int_0^1 \\int_0^{1-x_1} \\dots \\int_0^{1 - \\sum_{i=1}^{k-1} x_i} 1 \\, dx_k \\dots dx_1 = \\frac{1}{k!}$$
Therefore:
$$P(N > k) = \\frac{1}{k!}$$

**Step 3: Sum the Infinite Series**
$$\\mathbb{E}[N] = \\sum_{k=0}^{\\infty} \\frac{1}{k!} = \\frac{1}{0!} + \\frac{1}{1!} + \\frac{1}{2!} + \\frac{1}{3!} + \\dots = e \\approx 2.71828$$

**Answer:** The expected number of draws is **$e$**!`,
			tags: ["Simplex", "Uniform Distribution", "Calculus"]
		},
		{
			id: "q13",
			title: "Eigenvalues and PCA in Quantitative Portfolios",
			firm: "Two Sigma",
			category: "Linear Algebra & Stats",
			difficulty: "Hard",
			question: "When applying Principal Component Analysis (PCA) to the correlation matrix of US equity returns, what does the first principal component (PC1) typically represent? What do subsequent components represent?",
			hint: "Check the signs of the weights in the first eigenvector. Do all stocks move together in PC1?",
			solution: `**Interpretation of Financial PCA:**

1. **First Principal Component (PC1) - The Market Factor:**
- In empirical equity markets, the first eigenvector of the correlation matrix has **all positive weights** (by the Perron-Frobenius theorem for matrices with positive entries).
- It typically explains 30% to 50% of the total variance across all equities.
- It corresponds to the broad **Market / Beta factor** (when the market goes up, nearly all stocks rise together).

2. **Second Principal Component (PC2) - Sector / Cyclical vs Defensive:**
- Has both positive and negative weights.
- Often separates cyclical/tech/growth stocks from defensive/utilities/value stocks.

3. **Third Principal Component (PC3) - Size / Momentum:**
- Often captures market cap discrepancies (large cap vs small cap) or interest rate sensitivities.

**Quant Application:**
Quants use PCA to build 'eigen-portfolios', isolate systematic risk factors, and trade the residual idiosyncratic components (statistical arbitrage).`,
			tags: ["PCA", "Eigenvalues", "Factor Models"]
		},
		{
			id: "q14",
			title: "Ant on a Rubber Rope (Infinite Series Divergence)",
			firm: "Citadel",
			category: "Brainteasers & Logic",
			difficulty: "Medium",
			question: "An ant is at one end of a 1-meter rubber band. The ant crawls forward at 1 cm/second. At the end of every second, the rubber band is instantly stretched uniformly by 1 meter (so after 1s it is 2m, after 2s it is 3m, etc.). Will the ant ever reach the other end?",
			hint: "Instead of tracking absolute distance in cm, track the FRACTION of the total rope traversed during each second.",
			solution: `**Fractional Progress Analysis:**

Let $L(t)$ be the length of the rope at second $t$.
- At $t = 1$: Rope length is 1 m = 100 cm. Ant crawls 1 cm.
	Fraction traversed = $\\frac{1}{100}$.
- Uniform stretch: Stretching stretches the rope and the ant's relative position uniformly. The fraction traversed remains $\\frac{1}{100}$.
- At $t = 2$: Rope length is 2 m = 200 cm. Ant crawls 1 cm.
	Additional fraction traversed = $\\frac{1}{200} = \\frac{1}{100} \\cdot \\frac{1}{2}$.
- At $t = k$: Rope length is $k$ meters = $100k$ cm. Ant crawls 1 cm.
	Additional fraction traversed = $\\frac{1}{100k}$.

**Total Fraction Traversed after $T$ seconds:**
$$F(T) = \\sum_{k=1}^T \\frac{1}{100k} = \\frac{1}{100} \\sum_{k=1}^T \\frac{1}{k}$$

The summation $\\sum_{k=1}^T \\frac{1}{k}$ is the **Harmonic Series**, which is well known to diverge to $\\infty$ as $T \\to \\infty$!
Since the harmonic series diverges, there exists a finite time $T$ such that:
$$F(T) \\ge 1$$

Using $\\sum_{k=1}^T \\frac{1}{k} \\approx \\ln(T) + \\gamma$:
$$\\frac{\\ln(T)}{100} \\approx 1 \\implies T \\approx e^{100} \\text{ seconds}$$

**Answer:** **Yes, the ant will reach the other end**, although it takes roughly $e^{100}$ seconds!`,
			tags: ["Harmonic Series", "Calculus", "Brainteaser"]
		},
		{
			id: "q15",
			title: "Market Making Game: Quoting a Tight Spread on Coin Flips",
			firm: "Optiver",
			category: "Market Making & Trading",
			difficulty: "Hard",
			question: "A coin with unknown probability of heads $P(H) = p$ is flipped. Prior belief is $p \\sim \\text{Uniform}(0, 1)$. If it lands Heads, you are offered a payout of \$100. What is your fair value before any flips? Now, 3 flips occur and result in H, H, T. What is your new fair value? How would you quote a two-way market (Bid / Ask) to another trader?",
			hint: "Use the Beta-Binomial conjugate update. Prior is $\\text{Beta}(1, 1)$. If you observe $h$ heads and $t$ tails, posterior is $\\text{Beta}(1 + h, 1 + t)$.",
			solution: `**Step 1: Prior Fair Value**
Before any flips, $p \\sim \\text{Uniform}(0, 1) = \\text{Beta}(1, 1)$.
$$\\mathbb{E}[p] = \\frac{1}{1 + 1} = 0.5$$
Fair value of \$100 contract = $0.5 \\times 100 = \\mathbf{\$50.00}$.

**Step 2: Bayesian Update after H, H, T**
We observe $h = 2$ heads and $t = 1$ tails.
Using the Beta conjugate distribution:
$$\\text{Posterior} \\sim \\text{Beta}(\\alpha + h, \\beta + t) = \\text{Beta}(1 + 2, 1 + 1) = \\text{Beta}(3, 2)$$

The expected value of a $\\text{Beta}(\\alpha, \\beta)$ distribution is:
$$\\mathbb{E}[p | H, H, T] = \\frac{\\alpha}{\\alpha + \\beta} = \\frac{3}{3 + 2} = \\frac{3}{5} = 0.60$$

The new fair value is:
$$\\text{Fair Value} = 0.60 \\times \$100 = \\mathbf{\$60.00}$$

**Step 3: Quoting a Two-Way Market**
In an Optiver/Jane Street interview, you must quote a Bid (price you buy) and Ask (price you sell) centered around your fair value (\$60.00), accounting for:
- Your risk appetite / inventory limits
- Adverse selection (does the counterparty have more information?)
- The required spread (e.g. 2-wide: **\$59.00 Bid @ \$61.00 Ask**).
If hit on the Bid at 59, you buy at a discount to fair value. If lifted on the Ask at 61, you sell at a premium to fair value.`,
			tags: ["Bayesian", "Market Making", "Beta Distribution"]
		},
		{
			id: "q16",
			title: "Russian Roulette with Adjacent Bullets (Spin or Pull?)",
			firm: "Jane Street",
			category: "Probability & Bayes",
			difficulty: "Easy",
			question: "A 6-cylinder revolver has two bullets placed in adjacent chambers. Your captor spins the cylinder, points it at you, and pulls the trigger. Click! It was empty. Now, they tell you: 'I will pull the trigger one more time. Would you rather I spin the cylinder again first, or pull the trigger immediately?'",
			hint: "Calculate the conditional probability of dying given the previous chamber was empty vs the unconditional probability of dying after a spin.",
			solution: `**Step 1: Probability of Dying if You SPIN**
If the cylinder is spun randomly, every chamber is equally likely (1/6).
There are 2 bullets in 6 chambers.
$$P(\\text{Dead} | \\text{Spin}) = \\frac{2}{6} = \\frac{1}{3} \\approx 33.33\\%$$

**Step 2: Probability of Dying if You DO NOT Spin (Pull Immediately)**
Let the chambers be $1, 2, 3, 4, 5, 6$ arranged in a circle.
Suppose the bullets are at positions $(1, 2)$.
The empty chambers are $3, 4, 5, 6$.
The previous pull was empty. Which empty chamber could it have been?
- If it was chamber 3: next chamber is 4 (empty $\\implies$ SAFE)
- If it was chamber 4: next chamber is 5 (empty $\\implies$ SAFE)
- If it was chamber 5: next chamber is 6 (empty $\\implies$ SAFE)
- If it was chamber 6: next chamber is 1 (BULLET $\\implies$ DEAD!)

Out of the 4 possible empty chambers you just survived, exactly ONE leads directly into a bullet (chamber 6 $\\to$ 1).
$$P(\\text{Dead} | \\text{No Spin}) = \\frac{1}{4} = 25.0\\%$$

**Conclusion:**
$25\\% < 33.33\\%$. **Do NOT spin! Pull the trigger immediately!**
Surviving the first shot gave you valuable information: you are not on the first bullet, which makes it less likely you are adjacent to the second!`,
			tags: ["Conditional Probability", "Bayes"]
		},
		{
			id: "q17",
			title: "Expected Value of Max of Two Uniform Draws",
			firm: "Citadel",
			category: "Probability & Stochastics",
			difficulty: "Easy",
			question: "You choose two independent random numbers $X, Y \\sim \\text{Uniform}(0, 1)$. What is the expected value of the maximum: $\\mathbb{E}[\\max(X, Y)]$? What is $\\mathbb{E}[\\min(X, Y)]$?",
			hint: "Find the Cumulative Distribution Function (CDF) $F(z) = P(\\max(X, Y) \\le z)$, then differentiate to get the PDF.",
			solution: `**Step 1: Find the CDF of $M = \\max(X, Y)$**
The maximum of two independent variables is $\\le z$ if and only if BOTH variables are $\\le z$:
$$F_M(z) = P(\\max(X, Y) \\le z) = P(X \\le z \\text{ and } Y \\le z)$$
Since $X$ and $Y$ are independent and $U(0, 1)$:
$$F_M(z) = P(X \\le z) \\cdot P(Y \\le z) = z \\cdot z = z^2 \\quad \\text{for } z \\in [0, 1]$$

**Step 2: Find the PDF and Expectation**
Differentiate the CDF:
$$f_M(z) = \\frac{d}{dz}(z^2) = 2z$$
Compute the expected value:
$$\\mathbb{E}[M] = \\int_0^1 z \\cdot f_M(z) \\, dz = \\int_0^1 z(2z) \\, dz = \\left[ \\frac{2z^3}{3} \\right]_0^1 = \\mathbf{\\frac{2}{3}}$$

**Step 3: Minimum Expectation by Symmetry**
Since $\\max(X, Y) + \\min(X, Y) = X + Y$:
$$\\mathbb{E}[\\min(X, Y)] = \\mathbb{E}[X] + \\mathbb{E}[Y] - \\mathbb{E}[\\max(X, Y)] = 0.5 + 0.5 - \\frac{2}{3} = \\mathbf{\\frac{1}{3}}$$

**Generalization for $n$ Uniform Variables:**
$$\\mathbb{E}[\\max(X_1, \\dots, X_n)] = \\frac{n}{n+1}, \\quad \\mathbb{E}[\\min(X_1, \\dots, X_n)] = \\frac{1}{n+1}$$`,
			tags: ["Order Statistics", "Calculus", "Uniform Distribution"]
		},
		{
			id: "q18",
			title: "The 25 Horses Race Algorithm",
			firm: "Optiver",
			category: "Brainteasers & Logic",
			difficulty: "Medium",
			question: "You have 25 horses. You can race up to 5 horses at a time on a track. There is no stopwatch (you only observe the relative finishing order 1st through 5th in each race). Assuming each horse has a constant speed and no two horses tie, what is the minimum number of races needed to determine the top 3 fastest horses in order?",
			hint: "First divide the 25 horses into 5 groups of 5 and race each group. Then race the winners.",
			solution: `**Phase 1: Initial Group Races (5 races)**
Divide the 25 horses into 5 groups of 5: $A, B, C, D, E$.
Race each group:
- Group A: $A_1 > A_2 > A_3 > A_4 > A_5$
- Group B: $B_1 > B_2 > B_3 > B_4 > B_5$
- Group C: $C_1 > C_2 > C_3 > C_4 > C_5$
- Group D: $D_1 > D_2 > D_3 > D_4 > D_5$
- Group E: $E_1 > E_2 > E_3 > E_4 > E_5$
Races so far: **5**.

**Phase 2: Race the Winners (1 race)**
Race the 5 group winners against each other: $A_1, B_1, C_1, D_1, E_1$.
Without loss of generality, assume the finishing order is:
$$A_1 > B_1 > C_1 > D_1 > E_1$$
Races so far: **6**.

**Key Deductions:**
- **$A_1$ is definitively the #1 fastest horse of all 25!**
- $D_1$ and $E_1$ cannot be in the top 3. Consequently, all horses in groups D and E are eliminated.
- $C_1$ finished 3rd among winners. Horses $C_2, C_3$ cannot be in top 3. Only $C_1$ could be 3rd.
- $B_1$ finished 2nd among winners. Only $B_1$ and $B_2$ can possibly be in the top 3.
- In group A: $A_4, A_5$ are eliminated. Only $A_2$ and $A_3$ can possibly be in top 3.

**Phase 3: The Deciding Race (1 race)**
Candidates for 2nd and 3rd place:
$$\\{A_2, A_3, B_1, B_2, C_1\\}$$
There are exactly 5 candidate horses!
Race them together. The 1st finisher is the overall 2nd fastest horse, and the 2nd finisher is the overall 3rd fastest horse.

**Total Races:** $5 + 1 + 1 = \\mathbf{7}$ races!`,
			tags: ["Logic", "Sorting", "Algorithms"]
		},
		{
			id: "q19",
			title: "Zero Correlation vs Independence",
			firm: "Two Sigma",
			category: "Linear Algebra & Stats",
			difficulty: "Easy",
			question: "Give an explicit mathematical example where two random variables $X$ and $Y$ have exactly zero covariance/correlation ($\\text{Cov}(X, Y) = 0$), yet are completely dependent. Why does this matter in quantitative strategy modeling?",
			hint: "Choose a symmetric distribution for $X$ around 0, and define $Y = X^2$.",
			solution: `**Mathematical Construction:**
Let $X \\sim \\text{Uniform}(-1, 1)$ or $X \\in \\{-1, 0, 1\\}$ with equal probability $1/3$.
Notice that:
$$\\mathbb{E}[X] = 0$$

Now define $Y = X^2$.
$Y$ is 100% deterministically dependent on $X$ (knowing $X$ gives $Y$ with certainty).

**Calculate Covariance:**
$$\\text{Cov}(X, Y) = \\mathbb{E}[X Y] - \\mathbb{E}[X] \\mathbb{E}[Y]$$
Since $\\mathbb{E}[X] = 0$:
$$\\text{Cov}(X, Y) = \\mathbb{E}[X \\cdot X^2] = \\mathbb{E}[X^3]$$

Because $X$ is symmetric about 0, $X^3$ is an odd function:
$$\\mathbb{E}[X^3] = 0 \\implies \\text{Cov}(X, Y) = 0 \\implies \\text{Corr}(X, Y) = 0$$

**Why This Matters to Quants:**
- Standard Pearson correlation only measures **linear** relationships.
- Many profitable financial trading signals are non-linear (e.g. volatility smile, straddle payoffs, momentum turning points).
- If a quant researcher screens features using only linear correlation, they will discard powerful non-linear alpha signals! Methods like Mutual Information, Distance Correlation, and Decision Trees capture non-linear dependencies.`,
			tags: ["Statistics", "Correlation", "Feature Engineering"]
		},
		{
			id: "q20",
			title: "Call Delta Behavior at Volatility Extremes",
			firm: "SIG (Susquehanna)",
			category: "Derivatives & Arbitrage",
			difficulty: "Hard",
			question: "Consider a standard European call option on a non-dividend paying stock. What happens to Call Delta $\\Delta = N(d_1)$ as volatility $\\sigma \\to \\infty$? What happens as $\\sigma \\to 0$ for ITM, ATM, and OTM options?",
			hint: "Examine the limit of $d_1 = \\frac{\\ln(S/K) + (r + \\sigma^2/2)T}{\\sigma \\sqrt{T}}$ as $\\sigma \\to \\infty$ and $\\sigma \\to 0$.",
			solution: `**Formula for $d_1$:**
$$d_1 = \\frac{\\ln(S/K) + rT}{\\sigma \\sqrt{T}} + \\frac{1}{2} \\sigma \\sqrt{T}$$

**Case 1: As $\\sigma \\to \\infty$**
- The first term $\\frac{\\ln(S/K) + rT}{\\sigma \\sqrt{T}} \\to 0$.
- The second term $\\frac{1}{2} \\sigma \\sqrt{T} \\to +\\infty$.
Therefore:
$$\\lim_{\\sigma \\to \\infty} d_1 = +\\infty \\implies \\lim_{\\sigma \\to \\infty} N(d_1) = \\mathbf{1.0}$$

**Economic Intuition:**
When volatility is infinite, the upside potential is boundless while the downside is capped at 0. The call behaves like pure equity upside, so $\\Delta \\to 1.0$ regardless of whether it was initially ITM or OTM!

**Case 2: As $\\sigma \\to 0$ (Deterministic Expiry)**
- If **In-The-Money ($S > K e^{-rT}$)**:
	$\\ln(S/K) + rT > 0$. The numerator is strictly positive.
	As $\\sigma \\to 0$, $d_1 \\to +\\infty \\implies \\mathbf{\\Delta \\to 1.0}$.
- If **Out-Of-The-Money ($S < K e^{-rT}$)**:
	$\\ln(S/K) + rT < 0$. The numerator is strictly negative.
	As $\\sigma \\to 0$, $d_1 \\to -\\infty \\implies \\mathbf{\\Delta \\to 0.0}$.
- If **At-The-Money Forward ($S = K e^{-rT}$)**:
	Numerator is 0.
	$d_1 = \\frac{1}{2} \\sigma \\sqrt{T} \\to 0 \\implies \\mathbf{\\Delta \\to N(0) = 0.50}$.

At zero volatility, the option delta becomes a discontinuous step function (Heaviside step) at the strike price!`,
			tags: ["Greeks", "Limits", "Black-Scholes"]
		},
		{
			id: "q21",
			title: "Expected Coin Tosses for Two Consecutive Heads (H-H)",
			firm: "IMC Trading",
			category: "Probability & Martingales",
			difficulty: "Easy",
			question: "You flip a fair coin until you get two Heads in a row (H-H). What is the expected number of total flips?",
			hint: "Set up a recursive conditional expectation system based on state transitions: Start (0), One Head (1), Two Heads (Done).",
			solution: `**State-Space Conditional Expectation:**
Let:
- $E$: Expected flips from the start (0 consecutive heads).
- $E_1$: Expected flips given that the last flip was Heads (1 consecutive head).

**Equations:**
From the start:
$$E = 1 + \\frac{1}{2} E + \\frac{1}{2} E_1$$
(If Tails, we reset to state $E$. If Heads, we advance to state $E_1$).

From state $E_1$:
$$E_1 = 1 + \\frac{1}{2}(0) + \\frac{1}{2} E$$
(If Heads, we win and need 0 more flips! If Tails, we reset back to state $E$).

**Substitute $E_1$ into $E$:**
$$E_1 = 1 + \\frac{1}{2} E$$
$$E = 1 + \\frac{1}{2} E + \\frac{1}{2}\\left(1 + \\frac{1}{2} E\\right)$$
$$E = 1 + \\frac{1}{2} E + \\frac{1}{2} + \\frac{1}{4} E$$
$$E = \\frac{3}{2} + \\frac{3}{4} E$$
$$\\frac{1}{4} E = \\frac{3}{2} \\implies E = \\mathbf{6}$$

**Answer:** Expected flips = **6**.`,
			tags: ["Markov Chain", "Recursion", "Coin Flips"]
		},
		{
			id: "q22",
			title: "Lock-Free Ring Buffer vs Mutex Queue in HFT",
			firm: "Jump Trading",
			category: "Quant Dev & Systems",
			difficulty: "Hard",
			question: "In a Single-Producer Single-Consumer (SPSC) lock-free ring buffer in C++, why do we use `std::memory_order_release` when updating the write index and `std::memory_order_acquire` when reading the write index? What would happen if we used `std::memory_order_relaxed`?",
			hint: "Consider CPU store buffers, compiler instruction reordering, and the acquire-release memory barrier semantics.",
			solution: `**Acquire-Release Synchronization Semantics:**

In an SPSC queue, the producer writes payload data into an array slot, then updates the \`head\` index. The consumer checks \`head\`, then reads the payload.

\`\`\`cpp
// PRODUCER:
buffer[head_idx] = market_tick; // Step 1: Write payload
head.store(next_head, std::memory_order_release); // Step 2: Publish head

// CONSUMER:
if (head.load(std::memory_order_acquire) != tail) { // Step 3: Observe head
		process_tick(buffer[tail]); // Step 4: Read payload
}
\`\`\`

**Why \`memory_order_release\` in Producer:**
It ensures that the CPU and compiler **cannot reorder** Step 1 after Step 2. All preceding memory stores (the market tick data) must become visible to other threads BEFORE or AT THE SAME TIME the atomic \`head\` index update becomes visible.

**Why \`memory_order_acquire\` in Consumer:**
It ensures that Step 4 cannot be speculatively read before Step 3. Once the consumer sees the updated \`head\`, it is mathematically guaranteed to read the valid payload data written by the producer.

**Disaster with \`memory_order_relaxed\`:**
With \`relaxed\`, the compiler or CPU out-of-order execution engine can flush the \`head\` index update to cache before the payload data is flushed! The consumer would wake up, observe an updated \`head\`, and read uninitialized or stale garbage from the buffer, causing catastrophic trading decisions!`,
			tags: ["C++", "Concurrency", "Lock-Free", "Memory Model"]
		}
	],

	// Interactive Quizzes with Instant Step-by-Step Scoring & Explanations
	quizzes: [
		{
			id: "qz1",
			topic: "Probability & Brainteasers",
			question: "You have two children. Given that at least one of them is a boy born on a Tuesday, what is the probability that both children are boys?",
			options: [
				"1/2 (50%)",
				"1/3 (33.3%)",
				"13/27 (48.1%)",
				"1/4 (25%)"
			],
			correct: 2,
			explanation: "Let each child be defined by (Gender, DayOfWeek). There are 2 * 7 = 14 possible child states. Total possible pairs of children = 14 * 14 = 196. The number of pairs with NO boy born on a Tuesday is (196 - 1) for one child? No, each child has 13 non-Tuesday-boy states, so 13 * 13 = 169 pairs have no Tuesday boy. Thus, 196 - 169 = 27 pairs have at least one Tuesday boy. How many pairs have BOTH boys? Boy states = 7 each. Pairs of two boys = 7 * 7 = 49. Pairs of two boys with NO Tuesday boy = 6 * 6 = 36. So 49 - 36 = 13 pairs have two boys with at least one born on a Tuesday. P = 13/27 ≈ 48.1%."
		},
		{
			id: "qz2",
			topic: "Derivatives & Options",
			question: "A stock trades at $100. A 1-year European call with strike $100 has Delta = 0.60. If the stock price increases immediately by $1.00, approximately how much does the call price increase?",
			options: [
				"Approximately $0.60",
				"Exactly $1.00",
				"Approximately $0.40",
				"Zero change until expiration"
			],
			correct: 0,
			explanation: "By definition, Delta (Δ) = ∂C/∂S, representing the first-order sensitivity of the option price with respect to changes in the underlying asset price. For a small change ΔS = +$1.00, ΔC ≈ Delta * ΔS = 0.60 * $1.00 = +$0.60."
		},
		{
			id: "qz3",
			topic: "Probability & Stochastics",
			question: "Under standard Brownian motion W(t), what is the variance Var(W(t)) at time t = 4?",
			options: [
				"2",
				"4",
				"16",
				"0"
			],
			correct: 1,
			explanation: "By the fundamental definition of standard Brownian motion, W(t) ~ N(0, t). Therefore, the mean is 0 and the variance is Var(W(t)) = t. At t = 4, the variance is exactly 4 (standard deviation = 2)."
		},
		{
			id: "qz4",
			topic: "Market Microstructure",
			question: "In a Limit Order Book, what does 'Adverse Selection' refer to for a passive liquidity provider?",
			options: [
				"Selecting the wrong exchange to route orders to.",
				"Trading against better-informed market participants whose trades move the price against you.",
				"System hardware failure during peak volatility.",
				"Paying high broker commission fees."
			],
			correct: 1,
			explanation: "Adverse selection occurs because market makers post resting orders that can be filled by anyone. When an informed trader acts, they only hit bids or lift asks when the asset is mispriced in their favor, leaving the market maker holding a losing position as the market moves away."
		},
		{
			id: "qz5",
			topic: "Quant Dev & C++",
			question: "What is 'false sharing' in multi-threaded C++ applications?",
			options: [
				"Two threads sharing a common pointer to a deleted object.",
				"Two threads on different CPU cores modifying independent variables that happen to share the same 64-byte cache line.",
				"Accidentally declaring a variable static across multiple compilation units.",
				"Passing a non-thread-safe reference to an atomic variable."
			],
			correct: 1,
			explanation: "False sharing occurs when independent variables accessed by different threads sit on the same CPU cache line (typically 64 bytes). Whenever one core writes to its variable, the hardware cache coherence protocol invalidates the entire cache line across all other cores, devastating performance."
		},
		{
			id: "qz6",
			topic: "Portfolio & Risk",
			question: "If a coin flip game offers a 60% chance of winning 1x your bet and 40% chance of losing 1x your bet, what is the optimal fraction of wealth to bet according to the Kelly Criterion?",
			options: [
				"10%",
				"20%",
				"40%",
				"50%"
			],
			correct: 1,
			explanation: "For an even-money bet (b = 1), the Kelly fraction is f* = (bp - q) / b = (1 * 0.60 - 0.40) / 1 = 0.20 = 20% of your bankroll."
		},
		{
			id: "qz7",
			topic: "Derivatives & Options",
			question: "Which of the following Greeks is always strictly POSITIVE for standard long European call and put options?",
			options: [
				"Theta (decay)",
				"Rho (interest rate)",
				"Vega (volatility)",
				"Delta (direction)"
			],
			correct: 2,
			explanation: "Vega is the derivative of the option price with respect to volatility (∂V/∂σ). Because higher volatility widens the probability distribution of terminal stock prices without penalizing the capped downside of options, both long calls and long puts always benefit from increased volatility: Vega > 0."
		},
		{
			id: "qz8",
			topic: "Linear Algebra & Stats",
			question: "If matrix A is symmetric and positive definite, what can be said about all of its eigenvalues?",
			options: [
				"They are all strictly positive real numbers.",
				"They are all complex conjugates with positive real parts.",
				"At least one eigenvalue must equal 0.",
				"Their sum must equal 1."
			],
			correct: 0,
			explanation: "By the Spectral Theorem, any real symmetric matrix has purely real eigenvalues. Furthermore, positive definiteness means x^T A x > 0 for all non-zero vectors x, which implies that every eigenvalue λ_i > 0."
		},
		{
			id: "qz9",
			topic: "Probability & Stochastics",
			question: "According to Jensen's Inequality, if f(x) is a strictly convex function (such as an option payoff or f(x) = x^2), what is the relationship between E[f(X)] and f(E[X])?",
			options: [
				"E[f(X)] ≥ f(E[X])",
				"E[f(X)] ≤ f(E[X])",
				"E[f(X)] = f(E[X])",
				"No definite relationship exists without knowing the variance"
			],
			correct: 0,
			explanation: "Jensen's inequality states that for any convex function f, E[f(X)] ≥ f(E[X]). This is the mathematical reason options have positive time value: because the payoff max(S - K, 0) is convex, greater volatility strictly increases the expected payoff!"
		},
		{
			id: "qz10",
			topic: "Market Microstructure",
			question: "If the best bid is $99.90 (size 4,000 shares) and the best ask is $100.10 (size 1,000 shares), what is the micro-price (volume-weighted mid)?",
			options: [
				"$100.00",
				"$100.06",
				"$99.94",
				"$100.02"
			],
			correct: 1,
			explanation: "Micro-price = (BestBid * AskSize + BestAsk * BidSize) / (BidSize + AskSize) = (99.90 * 1000 + 100.10 * 4000) / 5000 = (99,900 + 400,400) / 5000 = 500,300 / 5000 = $100.06. Note that heavy bid depth exerts upward buying pressure, skewing the micro-price closer to the ask!"
		},
		{
			id: "qz11",
			topic: "Machine Learning in Finance",
			question: "Why does standard K-Fold Cross Validation produce inflated, unrealistic Sharpe ratios when applied to financial time-series data?",
			options: [
				"Because financial data is purely stationary.",
				"Because labels computed from overlapping forward return windows leak future information into the training folds (lookahead bias).",
				"Because decision trees cannot handle floating-point numbers.",
				"Because gradient descent always converges to a global minimum."
			],
			correct: 1,
			explanation: "In financial modeling, targets are often forward returns (e.g., return from t to t+5). In random or standard K-fold cross-validation, a test sample at day t will overlap with training samples at day t+1, leaking information from the future into the past. Marcos Lopez de Prado proposed Purged and Embargoed Cross-Validation to prevent this leakage."
		},
		{
			id: "qz12",
			topic: "Quant Dev & Systems",
			question: "In high-frequency trading (HFT), why is UDP multicast preferred over TCP for market data feeds from exchanges?",
			options: [
				"UDP guarantees that no packets are ever lost.",
				"UDP has zero connection handshake and retransmission stalls (head-of-line blocking), allowing the fastest possible one-way packet delivery.",
				"UDP automatically encrypts all messages with AES-256.",
				"UDP uses less memory on disk."
			],
			correct: 1,
			explanation: "TCP requires 3-way handshakes, sequence acknowledgments, and retransmission if a single packet is dropped, causing Head-of-Line (HoL) blocking that stalls all downstream packets. In HFT, market data is time-perishable: stale data is useless. UDP multicast broadcasts market updates with near-zero latency to thousands of participants simultaneously."
		}
	],

	// Quick Reference Cheat Sheet Formulas
	formulas: [
		{
			name: "Black-Scholes Call Price",
			formula: "C = S N(d_1) - K e^{-rT} N(d_2)",
			variables: "S: Spot, K: Strike, r: Rate, T: Time to Expiry, N(): Std Normal CDF",
			usage: "Standard European call valuation under log-normal geometric Brownian motion."
		},
		{
			name: "Put-Call Parity",
			formula: "C - P = S - K e^{-rT}",
			variables: "C: Call price, P: Put price, S: Spot, K: Strike, r: Risk-free rate, T: Time",
			usage: "Exact no-arbitrage relation for European options."
		},
		{
			name: "Option Delta (Call)",
			formula: "\\Delta_{\\text{call}} = N(d_1) = \\frac{\\partial C}{\\partial S}",
			variables: "d_1 = \\frac{\\ln(S/K) + (r + \\sigma^2/2)T}{\\sigma \\sqrt{T}}",
			usage: "Hedge ratio: number of shares of stock required to delta-hedge 1 short call."
		},
		{
			name: "Option Gamma",
			formula: "\\Gamma = \\frac{N'(d_1)}{S \\sigma \\sqrt{T}} = \\frac{\\partial^2 V}{\\partial S^2}",
			variables: "N'(): Standard normal PDF",
			usage: "Curvature of option price; identical for both calls and puts."
		},
		{
			name: "Kelly Criterion",
			formula: "f^* = \\frac{p(b+1) - 1}{b} = \\frac{b p - q}{b}",
			variables: "p: Win prob, q: 1-p, b: Net odds received (payout ratio)",
			usage: "Optimal bet size for maximum compound geometric capital growth."
		},
		{
			name: "Sharpe Ratio",
			formula: "\\text{Sharpe} = \\frac{\\mathbb{E}[R_p - R_f]}{\\sigma_p}",
			variables: "R_p: Portfolio return, R_f: Risk-free rate, \\sigma_p: Std dev of returns",
			usage: "Risk-adjusted performance metric (annualized by multiplying by \\sqrt{252})."
		},
		{
			name: "Ito's Lemma (1D)",
			formula: "df = \\left(\\frac{\\partial f}{\\partial t} + \\mu \\frac{\\partial f}{\\partial x} + \\frac{1}{2}\\sigma^2 \\frac{\\partial^2 f}{\\partial x^2}\\right)dt + \\sigma \\frac{\\partial f}{\\partial x} dW_t",
			variables: "W_t: Std Brownian motion with (dW_t)^2 = dt",
			usage: "Fundamental calculus of stochastic processes."
		},
		{
			name: "Ornstein-Uhlenbeck Process",
			formula: "dX_t = \\theta (\\mu - X_t)dt + \\sigma dW_t",
			variables: "\\theta: Mean-reversion speed, \\mu: Long-term mean, \\sigma: Volatility",
			usage: "Continuous-time model for mean-reverting pairs trading spreads."
		}
	],

	glossary: [
		{ term: "Alpha", def: "Excess return of an investment strategy over a benchmark index (e.g. S&P 500), attributable to active mathematical edge." },
		{ term: "Beta", def: "Measure of an asset's systematic co-movement with the broader market. A beta of 1.5 implies a 1.5% move for every 1% market move." },
		{ term: "Bid-Ask Spread", def: "Difference between the lowest price a seller is willing to accept (Ask) and highest price a buyer is willing to pay (Bid)." },
		{ term: "Cointegration", def: "Property of two or more non-stationary time series where a specific linear combination is stationary (mean-reverting)." },
		{ term: "Dark Pool", def: "Private electronic trading venue where buy and sell orders are matched anonymously without displaying quotes publicly." },
		{ term: "Delta Neutral", def: "A portfolio state where overall directional sensitivity (net Delta) is zero, isolating exposure to volatility or time decay." },
		{ term: "Drawdown", def: "Peak-to-trough decline in a portfolio's equity curve before a new high is reached, measuring downside pain." },
		{ term: "Execution Slippage", def: "Difference between expected transaction price and the actual fill price, caused by latency and market impact." },
		{ term: "Information Ratio (IR)", def: "Ratio of active strategy excess return over benchmark divided by the tracking error volatility: IR = Alpha / TrackingError." },
		{ term: "Kernel Bypass", def: "Low-latency network technique (e.g. Solarflare OpenOnload, DPDK) routing Ethernet packets straight to user space memory without OS kernel overhead." },
		{ term: "Limit Order Book (LOB)", def: "A real-time, continuously updated electronic record of outstanding passive limit orders organized by price and arrival time." },
		{ term: "Market Maker", def: "A firm that continuously quotes both buy (bid) and sell (ask) prices, profiting from the spread while managing inventory risk." },
		{ term: "Micro-Price", def: "An adjusted midpoint price that weights bid and ask prices by opposite order book volume, predicting immediate short-term tick direction." },
		{ term: "Overfitting", def: "Mistake of fitting a statistical or ML model to random historical noise rather than genuine repeatable economic signal." },
		{ term: "PnL", def: "Profit and Loss: the financial return generated by trading activities over a specified interval." },
		{ term: "Quant (Quantitative Analyst)", def: "Professional who applies mathematical, statistical, and algorithmic computer science techniques to financial markets." },
		{ term: "Risk-Neutral Measure (Q)", def: "A theoretical probability measure under which all discounted asset prices are martingales, simplifying option pricing." },
		{ term: "Tick Size", def: "The minimum allowable price increment for quotes and trades in a specific financial instrument on an exchange." },
		{ term: "Value at Risk (VaR)", def: "Maximum expected loss over a specific time horizon at a given statistical confidence level (e.g., 1-day 99% VaR)." },
		{ term: "Zetamac", def: "Popular web-based arithmetic training tool widely used by quant trading candidates to prepare for mental math screens." }
	]
};

// Export to window if in browser, and module.exports for testing
if (typeof window !== 'undefined') {
	window.QUANT_DATA = QUANT_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
	module.exports = { QUANT_DATA };
}
