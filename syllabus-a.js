// QuantBridge - Full Curriculum Syllabus (Modules 0-3)
// Mirrors the six-module course in quant.tex, with every detailed subtopic,
// curated open resources, and specific practice questions per subtopic.

const QUANT_SYLLABUS_A = [
	{
		id: "m0",
		num: "0",
		title: "Orientation: The Quantitative Finance Landscape",
		timeline: "Before Year 1",
		prereqs: "None - start here",
		objective: "Understand the institutional ecosystem before writing code or deriving pricing equations: who hires quants, what each track does, and how the buy-side differs from the sell-side.",
		color: "#38bdf8",
		topics: [
			{
				code: "0.1",
				id: "0-1",
				title: "The Institutional Map: Sell-Side, Buy-Side & The Three Tracks",
				subtopics: [
					"Sell-side (investment banks) structures, prices, and hedges products for clients; buy-side (hedge funds, prop shops, asset managers) deploys capital to generate returns.",
					"Quantitative Researcher (QR): discovers statistical patterns in market data, builds predictive or pricing models. Skills: probability, statistics, econometrics, ML, Python/C++.",
					"Quantitative Trader (QT): manages automated strategies, prices risk in real time, makes fast expected-value decisions. Skills: mental math, game theory, probability intuition, microstructure.",
					"Quantitative Developer (QD): builds ultra-low-latency execution engines, data pipelines, backtesters, and risk infrastructure. Skills: modern C++, algorithms, OS/networking, CPU architecture.",
					"Protect your university GPA: it is the primary first-round filter. Projects and competitions are the differentiator after the filter."
				],
				resources: [
					{ label: "Jane Street - Programs & Events (incl. AMP, ETC)", url: "https://www.janestreet.com/join-jane-street/programs-and-events/" },
					{ label: "Citadel - Students & Datathons", url: "https://www.citadel.com/careers/students/datathons/" },
					{ label: "QuantGuide - Curated quant interview problems", url: "https://quantguide.io/" },
					{ label: "OpenBB - Open-source investment research terminal", url: "https://openbb.co" }
				],
				practice: [
					{
						q: "Explain in one sentence the economic difference between a sell-side quant and a buy-side quant.",
						a: "A sell-side quant prices, structures, and hedges products so the bank can intermediate client flow and earn spread/fees, while a buy-side quant tries to generate alpha or control risk by deploying the firm's own capital."
					},
					{
						q: "Which track is the best fit for someone who loves cache-line optimization and lock-free queues, and which for someone who loves Bayesian updating and market-making games?",
						a: "Cache-line optimization and lock-free queues point to Quantitative Developer (QD). Bayesian updating and market-making games point to Quantitative Trader (QT)."
					}
				]
			}
		],
		project: null
	},
	{
		id: "m1",
		num: "1",
		title: "Module 1: The Mathematical Bedrock",
		timeline: "Year 1, alongside core coursework",
		prereqs: "High-school algebra and single-variable calculus",
		objective: "Develop rigorous intuition for multi-dimensional spaces, optimization, linear transformations, and probability - the language of every pricing and alpha model.",
		color: "#3b82f6",
		topics: [
			{
				code: "1.1",
				id: "1-1",
				title: "Multivariable Calculus & Optimization",
				subtopics: [
					"Partial derivatives, directional derivatives, and the gradient vector grad f.",
					"Jacobian matrices for vector-valued transformations and Hessian matrices for curvature and second-order optimality.",
					"Multivariable Taylor expansions up to second order - the mathematical basis of option Greeks and P&L attribution.",
					"Unconstrained and constrained optimization with Lagrange multipliers and Karush-Kuhn-Tucker (KKT) conditions.",
					"Convex sets and convex functions, the foundation of Markowitz portfolio optimization."
				],
				resources: [
					{ label: "Paul's Online Math Notes - Calculus III", url: "https://tutorial.math.lamar.edu/Classes/CalcIII/CalcIII.aspx" },
					{ label: "3Blue1Brown - Essence of Calculus", url: "https://www.3blue1brown.com/topics/calculus" },
					{ label: "Boyd & Vandenberghe - Convex Optimization (free PDF)", url: "https://web.stanford.edu/~boyd/cvxbook/" },
					{ label: "MIT OCW 18.02SC - Multivariable Calculus", url: "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/" }
				],
				practice: [
					{
						q: "Let f(x,y) = x^2 y + 3xy^2. Compute grad f at (1,1) and the directional derivative in the direction (3,4).",
						a: "df/dx = 2xy + 3y^2 = 5 and df/dy = x^2 + 6xy = 7 at (1,1), so grad f = (5,7). The unit direction is (3/5,4/5), giving D_u f = 5(3/5) + 7(4/5) = 3 + 28/5 = 43/5 = 8.6."
					},
					{
						q: "Classify the critical point of f(x,y) = x^2 + y^2 - 4x + 2y + 5 using the Hessian.",
						a: "Setting the gradient to zero gives 2x - 4 = 0 and 2y + 2 = 0, so (x,y) = (2,-1). The Hessian is [[2,0],[0,2]], which is positive definite, so this is a strict local minimum. f(2,-1) = 0."
					},
					{
						q: "Maximize xy subject to x + y = 10 using Lagrange multipliers.",
						a: "L = xy - lambda(x + y - 10). Then y = lambda and x = lambda, so x = y = 5 and the maximum is 25. The bordered Hessian confirms a maximum for this symmetric problem."
					},
					{
						q: "Is f(x,y) = x^2 y convex on R^2? Justify with the Hessian.",
						a: "No. The Hessian is [[2y, 2x],[2x, 0]]. At (0,-1) it is [[-2,0],[0,0]], which has a negative eigenvalue, so f is not convex. Convexity requires the Hessian to be positive semi-definite everywhere."
					}
				]
			},
			{
				code: "1.2",
				id: "1-2",
				title: "Linear Algebra",
				subtopics: [
					"Vector spaces, linear independence, basis, dimension, rank-nullity theorem, and orthogonal projections.",
					"Matrix decompositions: LU, QR (least-squares regression), and eigenvalue/eigenvector decomposition.",
					"Spectral theorem for symmetric matrices - covariance matrices are symmetric positive semi-definite.",
					"Singular Value Decomposition (SVD) and Principal Component Analysis (PCA) for yield-curve and factor modeling.",
					"Cholesky decomposition A = L L^T for generating correlated random variables in Monte Carlo."
				],
				resources: [
					{ label: "MIT OCW 18.06 - Linear Algebra (Gilbert Strang)", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/" },
					{ label: "3Blue1Brown - Essence of Linear Algebra", url: "https://www.3blue1brown.com/topics/linear-algebra" },
					{ label: "MIT OCW 18.065 - Matrix Methods in Data Analysis, Signal Processing, and ML", url: "https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/" },
					{ label: "scikit-learn - Covariance Estimation (shrinkage, Ledoit-Wolf)", url: "https://scikit-learn.org/stable/modules/covariance.html" }
				],
				practice: [
					{
						q: "For A = [[4,1],[1,3]], find the eigenvalues and an eigenvector, and state whether A is positive definite.",
						a: "trace = 7 and det = 11, so eigenvalues solve lambda^2 - 7 lambda + 11 = 0: lambda = (7 +/- sqrt(5))/2, about 4.618 and 2.382. Both are positive, so A is positive definite. For lambda = 4.618, (4 - lambda)x + y = 0 gives y = 0.618x, so an eigenvector is (1, 0.618)."
					},
					{
						q: "Project v = (1,2,3) onto the span of (1,0,0) and (0,1,0).",
						a: "The span is the xy-plane, so the orthogonal projection is (1,2,0). The residual (0,0,3) is orthogonal to both basis vectors."
					},
					{
						q: "Compute the Cholesky factor L for A = [[4,2],[2,2]].",
						a: "l11 = sqrt(4) = 2; l21 = 2/2 = 1; l22 = sqrt(2 - 1^2) = 1. Thus L = [[2,0],[1,1]] and L L^T = A."
					},
					{
						q: "A 3x5 matrix has rank 3. What is its nullity, and what does that imply about the solution set of Ax = b?",
						a: "By rank-nullity, nullity = 5 - 3 = 2. If a solution exists, the solution set is a 2-dimensional affine subspace (two free parameters), so it is not unique."
					},
					{
						q: "In PCA of a US equity correlation matrix, what does the first principal component usually represent and roughly how much variance does it explain?",
						a: "PC1 usually has all-positive weights and represents the broad market/beta factor, typically explaining about 30-50% of total variance. Later components capture sector, size, and style rotations."
					}
				]
			},
			{
				code: "1.3",
				id: "1-3",
				title: "Probability & Combinatorics (The #1 Interview Topic)",
				subtopics: [
					"Axiomatic probability, counting, conditional probability, Bayes' theorem, and the law of total probability.",
					"Discrete distributions: Bernoulli, Binomial, Geometric, Negative Binomial, Hypergeometric, and Poisson.",
					"Continuous distributions: Uniform, Exponential, Normal, Log-normal, Chi-squared, and Student's t for fat tails.",
					"Expectation, variance, covariance, correlation, conditional expectation, and the law of total variance (Eve's law).",
					"Moment generating functions, weak/strong law of large numbers, and the central limit theorem.",
					"Discrete-time Markov chains, transition matrices, stationary distributions, and hitting times (Gambler's Ruin)."
				],
				resources: [
					{ label: "Harvard Stat 110 - Probability (Joe Blitzstein, lectures + free book)", url: "https://projects.iq.harvard.edu/stat110" },
					{ label: "MIT OCW RES.6-012 - Introduction to Probability", url: "https://ocw.mit.edu/courses/res-6-012-introduction-to-probability-spring-2018/" },
					{ label: "Mosteller - 50 Challenging Problems in Probability", url: "https://www.amazon.com/Challenging-Problems-Probability-Solutions-Dover/dp/0486653552" },
					{ label: "QuantGuide - Probability & expected-value practice", url: "https://quantguide.io/" }
				],
				practice: [
					{
						q: "A disease affects 1% of a population. A test is 99% sensitive and 95% specific. Given a positive test, what is the probability the person has the disease?",
						a: "Bayes: P(D|+) = (0.01 x 0.99) / (0.01 x 0.99 + 0.99 x 0.05) = 0.0099 / 0.0594 = 1/6, about 16.7%. The base rate dominates the result."
					},
					{
						q: "A fair die is rolled until the first 6. What is the expected number of rolls?",
						a: "The number of rolls is Geometric(p = 1/6) with mean 1/p = 6."
					},
					{
						q: "There are 5 coupon types, each equally likely per draw. What is the expected number of draws to collect all 5?",
						a: "Coupon collector: n H_n = 5(1 + 1/2 + 1/3 + 1/4 + 1/5) = 5 x 2.2833 = 11.4167 draws."
					},
					{
						q: "In a fair Gambler's Ruin game starting with i = 3 and target N = 5, what is the probability of reaching 5 before ruin?",
						a: "For a fair game the hitting probability is i/N = 3/5 = 0.6."
					},
					{
						q: "If X ~ Poisson(lambda = 3), compute P(X = 2).",
						a: "P(X = 2) = e^-3 3^2 / 2! = 4.5 e^-3, about 0.224."
					},
					{
						q: "State the law of total variance and explain it in one line.",
						a: "Var(X) = E[Var(X|Y)] + Var(E[X|Y]). Total uncertainty equals average within-group uncertainty plus the variance of conditional means."
					}
				]
			}
		],
		project: {
			title: "Hands-On Project 1: The Probability & Markov Simulator",
			points: [
				"Simulate 100,000 trials of Gambler's Ruin (fair and biased coins); verify the hitting probability and expected game duration against the analytical formulas.",
				"Simulate the Coupon Collector's Problem and verify E[T] = n H_n for several n.",
				"Implement a 3-state Bull/Bear/Sideways Markov chain and verify that long-run frequencies converge to the left eigenvector of the transition matrix."
			]
		}
	},
	{
		id: "m2",
		num: "2",
		title: "Module 2: Programming & Computer Science Fundamentals",
		timeline: "Year 1 - Summer 1",
		prereqs: "Intro to Programming (CS 101)",
		objective: "Write vectorized, algorithmically efficient, reproducible scientific code - the daily substrate of quant research and development.",
		color: "#10b981",
		topics: [
			{
				code: "2.1",
				id: "2-1",
				title: "Python Scientific & Data Stack",
				subtopics: [
					"NumPy: contiguous C-arrays vs Python lists, vectorization, broadcasting rules, boolean masking, and numpy.linalg.",
					"Pandas: Series/DataFrame internals, DatetimeIndex, resampling tick data to OHLCV bars, rolling/expanding windows, shift(), and merge_asof to avoid look-ahead.",
					"SciPy: statistical tests, numerical integration, root-finding with brentq for implied volatility, and constrained optimization with scipy.optimize.minimize.",
					"Visualization: clean multi-panel financial plots with Matplotlib or Plotly."
				],
				resources: [
					{ label: "Wes McKinney - Python for Data Analysis, 3rd Ed. (free online)", url: "https://wesmckinney.com/book/" },
					{ label: "NumPy User Guide", url: "https://numpy.org/doc/stable/user/index.html" },
					{ label: "pandas Documentation", url: "https://pandas.pydata.org/docs/" },
					{ label: "SciPy Documentation", url: "https://docs.scipy.org/doc/scipy/" },
					{ label: "Matplotlib Gallery", url: "https://matplotlib.org/stable/gallery/" }
				],
				practice: [
					{
						q: "What is the shape of the result of adding a (3,1) array to a (1,4) array under NumPy broadcasting?",
						a: "Broadcasting aligns trailing dimensions: (3,1) and (1,4) expand to (3,4). Each row is repeated across columns and each column across rows."
					},
					{
						q: "Why is a vectorized NumPy expression usually much faster than an equivalent Python for-loop?",
						a: "The loop runs in compiled C over contiguous memory, avoids per-element Python object and interpreter overhead, improves cache locality, and can use SIMD instructions."
					},
					{
						q: "Write the pandas expression for a 60-day rolling z-score of a price series without look-ahead.",
						a: "z = (px - px.rolling(60).mean()) / px.rolling(60).std(). If the signal trades on the current close, shift the signal by one bar: signal = z.shift(1)."
					},
					{
						q: "How do you invert an option price to implied volatility with SciPy?",
						a: "Define f(sigma) = black_scholes_price(S,K,T,r,sigma) - market_price, then call scipy.optimize.brentq(f, 1e-4, 5.0). Brent's method is robust when vega is small or the price is near an arbitrage bound."
					},
					{
						q: "What problem does pandas.merge_asof solve in a backtest?",
						a: "It aligns two time series on the nearest prior timestamp (point-in-time join), so a trade at time t only sees the most recent information available at or before t, preventing look-ahead bias."
					}
				]
			},
			{
				code: "2.2",
				id: "2-2",
				title: "Data Structures & Algorithms (DSA)",
				subtopics: [
					"Asymptotic analysis: Big-O, Omega, Theta notation, and amortized time complexity.",
					"Fundamental structures: dynamic arrays, hash tables with collision resolution, stacks, queues, and priority queues/heaps for order-book matching.",
					"Trees and graphs: binary search trees, tries, BFS/DFS, Dijkstra, and Bellman-Ford for arbitrage detection via negative-weight cycles in FX graphs.",
					"Algorithmic paradigms: divide and conquer, greedy algorithms, and dynamic programming for optimal execution and stochastic control."
				],
				resources: [
					{ label: "MIT OCW 6.006 - Introduction to Algorithms", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/" },
					{ label: "NeetCode - Structured coding interview roadmap", url: "https://neetcode.io/" },
					{ label: "Codeforces - Competitive programming for speed and C++ fluency", url: "https://codeforces.com/" },
					{ label: "VisuAlgo - Algorithm visualizations", url: "https://visualgo.net/en" }
				],
				practice: [
					{
						q: "What is the average and worst-case time complexity of a lookup in a hash table, and why the difference?",
						a: "Average O(1) with a good hash and low load factor; worst O(n) when many keys collide into the same bucket and the table degrades to a linked list or probe cluster."
					},
					{
						q: "How do you model FX rates as a graph for Bellman-Ford arbitrage detection?",
						a: "Each currency is a node and each rate r(i,j) is an edge with weight -ln r(i,j). A negative-weight cycle means the product of rates around the cycle exceeds 1, which is a riskless arbitrage."
					},
					{
						q: "Why is a heap useful in a limit order book matching engine?",
						a: "A heap gives O(log n) insertion and O(log n) extraction of the best bid or best ask, which is efficient when price levels are created and removed dynamically."
					},
					{
						q: "Give a DP formulation for optimal execution of a large order over T periods.",
						a: "State: remaining shares and period. Control: shares traded this period. Minimize expected impact cost plus a risk penalty lambda times variance of execution cost, subject to the inventory transition. Solve backward with dynamic programming or a quadratic program for the Almgren-Chriss special case."
					},
					{
						q: "When would you choose BFS over DFS in a trading-data graph?",
						a: "BFS for shortest paths in unweighted graphs (fewest hops) and level-order exploration; DFS for connectivity, cycle detection, topological ordering, and backtracking search."
					}
				]
			},
			{
				code: "2.3",
				id: "2-3",
				title: "Software Engineering & Research Tooling",
				subtopics: [
					"Git version control: commits, branching, merging, rebasing, and .gitignore hygiene.",
					"Reproducible environments: venv/conda, pip/poetry, and dependency pinning.",
					"Unix/Linux command-line proficiency: bash scripting, grep, awk, sed, ssh, and tmux.",
					"Testing and profiling: unit testing financial logic with pytest and bottleneck profiling via cProfile and line_profiler."
				],
				resources: [
					{ label: "MIT Missing Semester of Your CS Education", url: "https://missing.csail.mit.edu/" },
					{ label: "Pro Git (free book)", url: "https://git-scm.com/book/en/v2" },
					{ label: "pytest Documentation", url: "https://docs.pytest.org/" },
					{ label: "The Turing Way - Reproducible Research Guide", url: "https://the-turing-way.netlify.app/" }
				],
				practice: [
					{
						q: "What is the practical difference between git merge and git rebase?",
						a: "Merge preserves history and creates a merge commit with two parents; rebase rewrites your commits onto a new base, producing a linear history but changing commit hashes. Rebase local feature branches; avoid rebasing shared branches."
					},
					{
						q: "How do you activate a Python virtual environment on Linux/macOS, and why pin dependencies?",
						a: "Run source venv/bin/activate. Pinning exact versions (requirements.txt or poetry.lock) makes backtests and research reproducible months later and prevents silent numerical or API changes."
					},
					{
						q: "Write an awk one-liner that prints the second whitespace-separated field of a CSV-like text file.",
						a: "awk '{print $2}' file.txt. For comma-separated data, use awk -F, '{print $2}' file.csv."
					},
					{
						q: "How should a pytest unit test compare two floating-point option prices?",
						a: "Use pytest.approx(expected, rel=1e-9, abs=1e-12) instead of exact equality, because binary floating-point arithmetic is not exact."
					},
					{
						q: "When profiling a backtest, what is the difference between cProfile tottime and cumtime?",
						a: "tottime is time spent in the function itself excluding subcalls; cumtime includes time in subcalls. Use cumtime to find expensive call trees and tottime to find the actual hot function."
					}
				]
			}
		],
		project: {
			title: "Hands-On Project 2: Financial Data Explorer & FX Arbitrage Detector",
			points: [
				"Build a pipeline pulling 10 years of daily data for SPY, QQQ, TLT, GLD, and USO. Compute simple vs log returns, annualized volatility, rolling 60-day correlations, and drawdowns.",
				"Model a 6-currency exchange-rate matrix as a directed graph with weights -ln(rate); implement Bellman-Ford to detect triangular and multi-hop arbitrage."
			]
		}
	},
	{
		id: "m3",
		num: "3",
		title: "Module 3: Financial Markets & Instruments",
		timeline: "Summer 1 - Year 2",
		prereqs: "Basic calculus and Module 2",
		objective: "Understand what is traded, how contracts are structured, and how electronic exchanges match orders.",
		color: "#8b5cf6",
		topics: [
			{
				code: "3.1",
				id: "3-1",
				title: "Asset Classes & Macro Mechanics",
				subtopics: [
					"Equities: common vs preferred stock, market capitalization, dividends and ex-dividend dates, stock splits, and index construction (price-weighted vs market-cap-weighted).",
					"Fixed income: zero-coupon vs coupon bonds, clean vs dirty prices, yield to maturity, spot vs forward curves, Macaulay/modified duration, and convexity.",
					"FX and commodities: spot and forward exchange rates, interest-rate parity, convenience yield, contango vs backwardation."
				],
				resources: [
					{ label: "Khan Academy - Finance & Capital Markets", url: "https://www.khanacademy.org/economics-finance-domain/core-finance" },
					{ label: "MIT OCW 15.401 - Finance Theory I (Andrew Lo)", url: "https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/" },
					{ label: "Aswath Damodaran - Free valuation courses and data", url: "https://pages.stern.nyu.edu/~adamodar/" },
					{ label: "CME Group Education Center", url: "https://www.cmegroup.com/education.html" }
				],
				practice: [
					{
						q: "How does a price-weighted index differ from a market-cap-weighted index when one constituent has a stock split?",
						a: "A price-weighted index (like the Dow) gives more influence to high-priced stocks and must adjust its divisor after a split. A cap-weighted index (like the S&P 500) weights by market value, so a split changes nothing because price and share count offset."
					},
					{
						q: "A 5-year bond pays a 4% annual coupon and yields 5%. Describe how to compute its price.",
						a: "Price = sum over t=1..5 of 4/(1.05)^t plus 100/(1.05)^5. The coupon stream is an annuity and the final principal is discounted at the 5% yield; the bond trades below par because the coupon is below the yield."
					},
					{
						q: "If modified duration is 6 and yield rises by 1%, estimate the percentage price change.",
						a: "dP/P is approximately -D_mod x dy = -6 x 0.01 = -6%. Convexity adds a small positive second-order correction of about 0.5 x C x (dy)^2."
					},
					{
						q: "A commodity futures curve is in contango. What does that imply for a long-only futures investor's roll yield?",
						a: "Contango means futures price is above spot and later-dated contracts are more expensive. Rolling a expiring long into a higher-priced later contract produces a negative roll yield, a drag on returns."
					},
					{
						q: "Why does a stock price typically drop by roughly the dividend amount on the ex-dividend date?",
						a: "On the ex-date the buyer no longer has a claim to the declared dividend, so the claim on the firm's cash falls by the dividend amount. In an efficient market the price drops by approximately the after-tax dividend."
					}
				]
			},
			{
				code: "3.2",
				id: "3-2",
				title: "Time Value of Money & No-Arbitrage",
				subtopics: [
					"Discrete compounding (1 + r/m)^(mt) vs continuous compounding e^(rt).",
					"Discount factors DF(t,T), net present value, and internal rate of return.",
					"The law of one price, static replication, and cash-and-carry arbitrage."
				],
				resources: [
					{ label: "MIT OCW 15.401 - Lectures 2-5: Present Value Relations", url: "https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/" },
					{ label: "Khan Academy - Present Value and Discounting", url: "https://www.khanacademy.org/economics-finance-domain/core-finance/interest-tutorial" },
					{ label: "Hull - Options, Futures, and Other Derivatives (Ch. 1-5)", url: "https://www.pearson.com/en-us/subject-catalog/p/options-futures-and-other-derivatives/P200000005938" }
				],
				practice: [
					{
						q: "Convert a 5% annual effective rate to a continuously compounded rate.",
						a: "1 + r_a = e^(r_c), so r_c = ln(1.05) = 0.04879, about 4.879%."
					},
					{
						q: "A project costs 100 today and pays 60 at the end of each of the next two years. At a 10% discount rate, what is the NPV?",
						a: "NPV = -100 + 60/1.1 + 60/1.1^2 = -100 + 54.545 + 49.587 = 4.13. Positive NPV, so accept."
					},
					{
						q: "What is the IRR of an investment of 100 that returns 110 after one year?",
						a: "Solve 100 = 110/(1 + IRR), so IRR = 10%."
					},
					{
						q: "Spot gold is 2,000, the risk-free rate is 4%, storage costs 1% per year, and the 1-year futures price is 2,120. Is there an arbitrage?",
						a: "The no-arbitrage futures price is 2,000 x e^(0.05) = 2,102.5. The market futures price of 2,120 is rich, so sell the future, buy gold, and store it: lock in about 17.5 riskless profit per unit before transaction costs."
					},
					{
						q: "Given a continuously compounded zero rate of 5% for 2 years, what is the discount factor?",
						a: "DF = e^(-0.05 x 2) = e^(-0.1) = 0.9048."
					}
				]
			},
			{
				code: "3.3",
				id: "3-3",
				title: "Derivatives Fundamentals",
				subtopics: [
					"Forwards and futures: payoffs, forward pricing F0 = S0 e^((r-q)T), initial/variation margin, daily marking-to-market, and clearinghouses.",
					"Swaps: plain-vanilla interest-rate swaps (fixed-for-floating), SOFR benchmarks, and swap valuation as a portfolio of bonds.",
					"Options: European vs American exercise, calls and puts, moneyness (ITM/ATM/OTM), intrinsic vs extrinsic (time) value.",
					"Model-free bounds: put-call parity C - P = S0 e^(-qT) - K e^(-rT), convexity of option prices in strike, and vertical/butterfly arbitrage bounds."
				],
				resources: [
					{ label: "CME Group Education Center", url: "https://www.cmegroup.com/education.html" },
					{ label: "Hull - Options, Futures, and Other Derivatives (Ch. 1-13)", url: "https://www.pearson.com/en-us/subject-catalog/p/options-futures-and-other-derivatives/P200000005938" },
					{ label: "MIT OCW 15.437 - Options and Futures Markets", url: "https://ocw.mit.edu/courses/15-437-options-and-futures-markets-spring-2013/" },
					{ label: "CFA Institute - Derivatives readings (free samples)", url: "https://www.cfainstitute.org/" }
				],
				practice: [
					{
						q: "A stock trades at 100 with dividend yield 2%. The risk-free rate is 5%. What is the 1-year forward price?",
						a: "F = S e^((r - q)T) = 100 e^(0.03) = 103.05."
					},
					{
						q: "S = 100, K = 100, r = 5%, T = 1, C = 8, P = 3. Does put-call parity hold, and if not, construct the arbitrage?",
						a: "C - P = 5 while S - K e^(-rT) = 100 - 95.12 = 4.88. The call is rich relative to the put by 0.12. Short the call, buy the put, buy the stock, and borrow 95.12: receive about 0.12 today with zero payoff at expiry."
					},
					{
						q: "How is a plain-vanilla interest-rate swap valued as a bond portfolio?",
						a: "A payer swap (pay fixed, receive floating) equals the value of a floating-rate bond minus the value of a fixed-rate bond. At inception the two bond values are equal, so the swap value is zero."
					},
					{
						q: "A call has price 7, S = 100, K = 95. What are its intrinsic and time value?",
						a: "Intrinsic = max(S - K, 0) = 5. Time value = 7 - 5 = 2. The 2 is the extra premium for upside before expiry."
					},
					{
						q: "Why must a butterfly spread with equally spaced strikes have non-negative cost in an arbitrage-free market?",
						a: "Its payoff is non-negative in every terminal state (a tent function), so a negative cost would create a riskless profit. Option prices must be convex in strike, which is exactly the butterfly non-negativity condition."
					},
					{
						q: "How does daily marking-to-market differ for a futures contract versus a forward?",
						a: "Futures are marked to market daily: gains and losses are credited or debited from variation margin, resetting exposure to zero each day. A forward accumulates unrealized P&L until maturity and carries counterparty credit risk."
					}
				]
			},
			{
				code: "3.4",
				id: "3-4",
				title: "Market Microstructure",
				subtopics: [
					"Order-driven (central limit order book) vs quote-driven (OTC dealer) markets.",
					"Limit order book anatomy: bid/ask price levels, depth, tick size, and price-time priority (FIFO) vs pro-rata matching.",
					"Order types: market, limit, stop, immediate-or-cancel (IOC), fill-or-kill (FOK), and post-only.",
					"Market-making economics: earning the bid-ask spread vs adverse selection (toxic order flow) and inventory risk.",
					"Execution realities: slippage, temporary vs permanent market impact, and dark pools."
				],
				resources: [
					{ label: "Larry Harris - Trading and Exchanges: Market Microstructure for Practitioners", url: "https://global.oup.com/academic/product/trading-and-exchanges-9780195144703" },
					{ label: "MIT OCW 15.407 - Finance Theory II", url: "https://ocw.mit.edu/courses/15-407-finance-theory-ii-spring-2003/" },
					{ label: "SEC - Market Structure resources", url: "https://www.sec.gov/marketstructure/" },
					{ label: "Almgren & Chriss - Optimal Execution of Portfolio Transactions", url: "https://www.math.nyu.edu/~almgren/papers/optliq.pdf" }
				],
				practice: [
					{
						q: "Best ask is 100.05 with 200 shares and next ask is 100.06 with 200 shares. A market buy for 300 shares arrives. What is the average fill price?",
						a: "Fill 200 at 100.05 and 100 at 100.06: (200 x 100.05 + 100 x 100.06)/300 = 100.0533. The order walks the book, paying slippage beyond the best price."
					},
					{
						q: "Best bid 99.90 with 4,000 shares, best ask 100.10 with 1,000 shares. Compute the micro-price.",
						a: "Micro-price = (bid x ask_size + ask x bid_size)/(bid_size + ask_size) = (99.90 x 1,000 + 100.10 x 4,000)/5,000 = 100.06. Heavy bid depth pulls the price toward the ask."
					},
					{
						q: "Explain adverse selection for a market maker quoting 99.95 bid / 100.05 ask.",
						a: "If an informed buyer knows fair value is 100.20, they lift the 100.05 ask. The maker sells too cheaply and loses 0.15 as the price converges. The spread must compensate for this toxic flow."
					},
					{
						q: "Contrast IOC, FOK, and post-only orders.",
						a: "IOC executes whatever is immediately available and cancels the rest; FOK must fill entirely and immediately or cancels; post-only adds liquidity only and is cancelled if it would cross the spread, avoiding taker fees."
					},
					{
						q: "Estimate the market impact of trading 1% of average daily volume when daily volatility is 20%, using a square-root impact model with coefficient 0.5.",
						a: "Impact is about k x sigma x sqrt(Q/V) = 0.5 x 0.20 x sqrt(0.01) = 0.5 x 0.20 x 0.10 = 0.01, or 1%."
					},
					{
						q: "A trade prints at 100.07 while the prevailing mid is 100.02. What is the effective spread?",
						a: "Effective spread = 2 x |trade price - mid| = 2 x 0.05 = 0.10. It measures the actual cost paid relative to the true midpoint."
					}
				]
			}
		],
		project: {
			title: "Hands-On Project 3: Multi-Leg Option Strategy Analyzer",
			points: [
				"Build a Python module accepting any portfolio of European calls, puts, and shares (straddle, strangle, iron condor, butterfly) and plot exact expiration P&L across a grid of terminal prices.",
				"Automatically solve all breakevens, maximum profit, and maximum loss.",
				"Check a real option chain from yfinance for put-call parity violations after accounting for the bid-ask spread."
			]
		}
	}
];

if (typeof window !== "undefined") {
	window.QUANT_SYLLABUS_A = QUANT_SYLLABUS_A;
}
