// QuantBridge - Extended Resources, Formula Sheet & Glossary
// Pulls together every open resource referenced in quant.tex plus canonical
// internet references, and expands the formula and terminology libraries.

(function () {
	if (typeof QUANT_DATA === "undefined") return;

	// ---------- Additional curated resource categories ----------
	const extraResourceCategories = [
		{
			category: "Mathematical Foundations",
			items: [
				{
					title: "Paul's Online Math Notes - Calculus III",
					author: "Paul Dawkins",
					desc: "Free, worked examples on partial derivatives, multiple integrals, line integrals, and vector calculus. Excellent for building Calc III fluency fast.",
					tags: ["Calculus", "Free Notes", "Calc III"],
					difficulty: "Freshman",
					url: "https://tutorial.math.lamar.edu/Classes/CalcIII/CalcIII.aspx"
				},
				{
					title: "MIT OCW 18.02SC - Multivariable Calculus",
					author: "MIT OpenCourseWare",
					desc: "Full video lectures, recitations, and problem sets covering gradients, Jacobians, Lagrange multipliers, and vector fields.",
					tags: ["MIT", "Video", "Calculus"],
					difficulty: "Freshman",
					url: "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/"
				},
				{
					title: "3Blue1Brown - Essence of Calculus",
					author: "Grant Sanderson",
					desc: "Visual intuition for derivatives, integrals, Taylor series, and the chain rule. Ideal before or alongside a rigorous calculus course.",
					tags: ["Visual", "Calculus", "Intuition"],
					difficulty: "Beginner",
					url: "https://www.3blue1brown.com/topics/calculus"
				},
				{
					title: "Boyd & Vandenberghe - Convex Optimization",
					author: "Stephen Boyd & Lieven Vandenberghe",
					desc: "The standard free textbook on convex sets, convex functions, duality, and KKT conditions, with applications to portfolio optimization.",
					tags: ["Optimization", "Free PDF", "KKT"],
					difficulty: "Junior / Senior",
					url: "https://web.stanford.edu/~boyd/cvxbook/"
				},
				{
					title: "MIT OCW 18.06 - Linear Algebra",
					author: "Gilbert Strang",
					desc: "The classic first course: elimination, vector spaces, eigenvalues, SVD, and positive definite matrices, with exams and solutions.",
					tags: ["Linear Algebra", "MIT", "Video"],
					difficulty: "Freshman / Sophomore",
					url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/"
				},
				{
					title: "MIT OCW 18.065 - Matrix Methods in Data Analysis, Signal Processing, and ML",
					author: "Gilbert Strang",
					desc: "Advanced follow-up on SVD, PCA, least squares, and matrix methods used in modern data science and factor modeling.",
					tags: ["SVD", "PCA", "MIT"],
					difficulty: "Sophomore / Junior",
					url: "https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/"
				},
				{
					title: "3Blue1Brown - Essence of Linear Algebra",
					author: "Grant Sanderson",
					desc: "Geometric intuition for vectors, matrices, determinants, eigenvectors, and linear transformations.",
					tags: ["Visual", "Linear Algebra", "Intuition"],
					difficulty: "Beginner",
					url: "https://www.3blue1brown.com/topics/linear-algebra"
				}
			]
		},
		{
			category: "Programming, Data & Computer Science",
			items: [
				{
					title: "Python for Data Analysis, 3rd Edition",
					author: "Wes McKinney",
					desc: "Free online book by the creator of pandas. Covers NumPy, pandas internals, time series, resampling, and data cleaning with real datasets.",
					tags: ["Python", "pandas", "Free Book"],
					difficulty: "Beginner / Intermediate",
					url: "https://wesmckinney.com/book/"
				},
				{
					title: "NumPy User Guide",
					author: "NumPy Developers",
					desc: "Official guide to ndarrays, broadcasting, vectorization, boolean masking, and linear algebra routines.",
					tags: ["NumPy", "Reference", "Vectorization"],
					difficulty: "Beginner",
					url: "https://numpy.org/doc/stable/user/index.html"
				},
				{
					title: "pandas Documentation",
					author: "pandas Developers",
					desc: "Official reference for DataFrames, DatetimeIndex, rolling windows, resampling, merge_asof, and groupby operations.",
					tags: ["pandas", "Reference", "Time Series"],
					difficulty: "Beginner / Intermediate",
					url: "https://pandas.pydata.org/docs/"
				},
				{
					title: "SciPy Documentation",
					author: "SciPy Developers",
					desc: "Statistical tests, optimization, root finding, interpolation, and numerical integration - the scientific computing toolkit behind many pricing libraries.",
					tags: ["SciPy", "Optimization", "Statistics"],
					difficulty: "Intermediate",
					url: "https://docs.scipy.org/doc/scipy/"
				},
				{
					title: "Matplotlib Gallery",
					author: "Matplotlib Developers",
					desc: "Copy-paste examples for multi-panel financial charts, subplots, heatmaps, and publication-quality figures.",
					tags: ["Visualization", "Charts", "Python"],
					difficulty: "Beginner",
					url: "https://matplotlib.org/stable/gallery/"
				},
				{
					title: "MIT OCW 6.006 - Introduction to Algorithms",
					author: "MIT OpenCourseWare",
					desc: "Rigorous algorithms course covering hashing, trees, heaps, graph search, shortest paths, and dynamic programming.",
					tags: ["DSA", "MIT", "Video"],
					difficulty: "Freshman / Sophomore",
					url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/"
				},
				{
					title: "NeetCode - Coding Interview Roadmap",
					author: "NeetCode",
					desc: "Structured 150-problem roadmap with video explanations. Ideal for building the DSA speed expected in quant developer screens.",
					tags: ["DSA", "Interview", "Practice"],
					difficulty: "Beginner / Intermediate",
					url: "https://neetcode.io/"
				},
				{
					title: "MIT Missing Semester of Your CS Education",
					author: "MIT",
					desc: "Shell, scripting, Git, debugging, profiling, and tooling skills that traditional CS courses skip but quant research demands daily.",
					tags: ["Unix", "Git", "Tooling"],
					difficulty: "Beginner",
					url: "https://missing.csail.mit.edu/"
				},
				{
					title: "Pro Git",
					author: "Scott Chacon & Ben Straub",
					desc: "Free, comprehensive Git book covering branching, rebasing, remotes, and recovery workflows.",
					tags: ["Git", "Free Book", "Version Control"],
					difficulty: "Beginner / Intermediate",
					url: "https://git-scm.com/book/en/v2"
				},
				{
					title: "pytest Documentation",
					author: "pytest Developers",
					desc: "Fixtures, parametrization, approx comparisons, and test organization for reliable financial code.",
					tags: ["Testing", "Python", "Reference"],
					difficulty: "Intermediate",
					url: "https://docs.pytest.org/"
				}
			]
		},
		{
			category: "Markets, Derivatives & Microstructure",
			items: [
				{
					title: "Khan Academy - Finance & Capital Markets",
					author: "Khan Academy",
					desc: "Free introductory videos on stocks, bonds, interest, and capital markets. The fastest zero-to-literacy path for a math/CS student.",
					tags: ["Markets", "Beginner", "Free Video"],
					difficulty: "Beginner",
					url: "https://www.khanacademy.org/economics-finance-domain/core-finance"
				},
				{
					title: "MIT OCW 15.401 - Finance Theory I",
					author: "Andrew Lo",
					desc: "Present value, fixed income, equity valuation, risk, and portfolio theory from MIT Sloan. Full lectures and slides.",
					tags: ["Finance Theory", "MIT", "Video"],
					difficulty: "Sophomore",
					url: "https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/"
				},
				{
					title: "CME Group Education Center",
					author: "CME Group",
					desc: "Exchange-authored courses on futures, options, hedging, margining, and market microstructure.",
					tags: ["Futures", "Options", "Exchange"],
					difficulty: "Beginner / Intermediate",
					url: "https://www.cmegroup.com/education.html"
				},
				{
					title: "Hull - Options, Futures, and Other Derivatives",
					author: "John C. Hull",
					desc: "The standard derivatives textbook. Chapters 1-13 cover mechanics, hedging, binomial trees, Black-Scholes, and Greeks.",
					tags: ["Derivatives", "Textbook", "Essential"],
					difficulty: "Core Undergrad",
					url: "https://www.pearson.com/en-us/subject-catalog/p/options-futures-and-other-derivatives/P200000005938"
				},
				{
					title: "MIT OCW 15.437 - Options and Futures Markets",
					author: "MIT OpenCourseWare",
					desc: "Advanced course on derivatives markets, hedging, volatility, and pricing applications.",
					tags: ["Options", "Futures", "MIT"],
					difficulty: "Junior / Senior",
					url: "https://ocw.mit.edu/courses/15-437-options-and-futures-markets-spring-2013/"
				},
				{
					title: "Harris - Trading and Exchanges",
					author: "Larry Harris",
					desc: "The definitive practitioner text on market microstructure: order types, market making, adverse selection, liquidity, and execution.",
					tags: ["Microstructure", "Market Making", "Textbook"],
					difficulty: "Intermediate / Advanced",
					url: "https://global.oup.com/academic/product/trading-and-exchanges-9780195144703"
				},
				{
					title: "MIT OCW 15.407 - Finance Theory II",
					author: "MIT OpenCourseWare",
					desc: "Continuous-time finance, derivatives pricing, and microstructure foundations.",
					tags: ["Microstructure", "Pricing", "MIT"],
					difficulty: "Junior / Senior",
					url: "https://ocw.mit.edu/courses/15-407-finance-theory-ii-spring-2003/"
				},
				{
					title: "SEC - Market Structure Resources",
					author: "U.S. Securities and Exchange Commission",
					desc: "Official explainers on exchanges, dark pools, order routing, and the National Market System.",
					tags: ["Regulation", "Market Structure", "Official"],
					difficulty: "Beginner",
					url: "https://www.sec.gov/marketstructure/"
				},
				{
					title: "Almgren & Chriss - Optimal Execution of Portfolio Transactions",
					author: "Robert Almgren & Neil Chriss",
					desc: "The foundational paper on balancing market impact against execution risk; the basis of modern optimal execution.",
					tags: ["Execution", "Market Impact", "Paper"],
					difficulty: "Advanced",
					url: "https://www.math.nyu.edu/~almgren/papers/optliq.pdf"
				}
			]
		},
		{
			category: "Pricing, Risk & Stochastic Calculus",
			items: [
				{
					title: "MIT OCW 18.S096 - Topics in Mathematics with Applications in Finance",
					author: "MIT OpenCourseWare",
					desc: "Lectures on Black-Scholes, stochastic calculus, portfolio theory, statistical arbitrage, and risk management, designed for math majors.",
					tags: ["Stochastics", "Pricing", "MIT"],
					difficulty: "Junior / Senior",
					url: "https://ocw.mit.edu/courses/18-s096-topics-in-mathematics-with-applications-in-finance-fall-2013/"
				},
				{
					title: "QuantEcon - Quantitative Economics with Python",
					author: "Thomas Sargent & John Stachurski",
					desc: "Free lectures and notebooks on dynamic programming, Markov chains, portfolio choice, and numerical methods.",
					tags: ["Python", "Economics", "Free"],
					difficulty: "Intermediate",
					url: "https://python.quantecon.org/"
				},
				{
					title: "scikit-learn - Covariance Estimation",
					author: "scikit-learn Developers",
					desc: "Guide to empirical covariance, shrinkage (Ledoit-Wolf, OAS), and graphical lasso for stable portfolio optimization.",
					tags: ["Covariance", "Shrinkage", "Portfolio"],
					difficulty: "Intermediate",
					url: "https://scikit-learn.org/stable/modules/covariance.html"
				},
				{
					title: "QuantLib",
					author: "QuantLib Project",
					desc: "Open-source C++ library for pricing, risk, curves, and calendars, with Python bindings. Read the source to see production design patterns.",
					tags: ["Library", "C++", "Pricing"],
					difficulty: "Advanced",
					url: "https://www.quantlib.org/"
				},
				{
					title: "Mike Giles - Monte Carlo Methods in Finance",
					author: "Mike Giles (Oxford)",
					desc: "Lecture notes on Monte Carlo simulation, variance reduction, quasi-Monte Carlo, and Greeks estimation.",
					tags: ["Monte Carlo", "Variance Reduction", "Notes"],
					difficulty: "Advanced",
					url: "https://people.maths.ox.ac.uk/gilesm/mc/"
				},
				{
					title: "Glasserman - Monte Carlo Methods in Financial Engineering",
					author: "Paul Glasserman",
					desc: "The reference text on simulation, discretization, variance reduction, and American option pricing.",
					tags: ["Monte Carlo", "Textbook", "Advanced"],
					difficulty: "Graduate",
					url: "https://link.springer.com/book/10.1007/978-0-387-21617-1"
				},
				{
					title: "Shreve - Stochastic Calculus for Finance I & II",
					author: "Steven Shreve",
					desc: "Volume I builds the binomial model rigorously; Volume II develops Brownian motion, Ito calculus, and continuous-time pricing.",
					tags: ["Stochastics", "Textbook", "Math Heavy"],
					difficulty: "Junior / Senior",
					url: "https://link.springer.com/book/10.1007/978-1-4757-4296-1"
				},
				{
					title: "Martin Haugh - Financial Engineering Lecture Notes",
					author: "Martin Haugh (Columbia)",
					desc: "Free PDF notes on Monte Carlo, term-structure models, Black-Scholes, credit risk, and portfolio optimization.",
					tags: ["Free PDF", "Financial Engineering", "Columbia"],
					difficulty: "Junior / Senior",
					url: "http://www.columbia.edu/~mh2078/FoundationsFE/"
				}
			]
		},
		{
			category: "Time Series, Alpha & Machine Learning",
			items: [
				{
					title: "The Elements of Statistical Learning",
					author: "Hastie, Tibshirani & Friedman",
					desc: "Free official PDF covering regression, regularization, model selection, trees, boosting, and unsupervised learning.",
					tags: ["ML", "Free PDF", "Statistics"],
					difficulty: "Advanced Undergrad",
					url: "https://hastie.su.domains/ElemStatLearn/"
				},
				{
					title: "An Introduction to Statistical Learning",
					author: "James, Witten, Hastie & Tibshirani",
					desc: "More accessible companion to ESL, with labs in Python and R. Ideal first ML textbook.",
					tags: ["ML", "Free PDF", "Beginner"],
					difficulty: "Undergraduate",
					url: "https://www.statlearning.com/"
				},
				{
					title: "Forecasting: Principles and Practice, 3rd Edition",
					author: "Rob Hyndman & George Athanasopoulos",
					desc: "Free online text on stationarity, ARIMA, exponential smoothing, and forecast evaluation, with R examples.",
					tags: ["Time Series", "Free Book", "Forecasting"],
					difficulty: "Intermediate",
					url: "https://otexts.com/fpp3/"
				},
				{
					title: "statsmodels - Time Series Analysis",
					author: "statsmodels Developers",
					desc: "Reference for ADF/KPSS tests, ACF/PACF, ARIMA, GARCH, cointegration, and state-space models.",
					tags: ["Time Series", "Python", "Reference"],
					difficulty: "Intermediate",
					url: "https://www.statsmodels.org/stable/tsa.html"
				},
				{
					title: "Kenneth French Data Library",
					author: "Kenneth French (Dartmouth)",
					desc: "Free factor returns and portfolios for Fama-French 3-factor, 5-factor, momentum, and industry sorts.",
					tags: ["Factors", "Data", "Fama-French"],
					difficulty: "Intermediate",
					url: "https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/"
				},
				{
					title: "QuantStart - Articles on Backtesting & Algorithmic Trading",
					author: "QuantStart",
					desc: "Practical tutorials on event-driven backtesting, portfolio construction, and strategy implementation.",
					tags: ["Backtesting", "Tutorial", "Python"],
					difficulty: "Intermediate",
					url: "https://www.quantstart.com/articles/"
				},
				{
					title: "Stanford CS229 - Machine Learning",
					author: "Stanford University",
					desc: "Full lecture notes and videos on supervised learning, optimization, regularization, and learning theory.",
					tags: ["ML", "Stanford", "Video"],
					difficulty: "Intermediate / Advanced",
					url: "https://cs229.stanford.edu/"
				},
				{
					title: "Advances in Financial Machine Learning",
					author: "Marcos Lopez de Prado",
					desc: "Essential for modern quant researchers: fractional differentiation, triple-barrier labeling, meta-labeling, purged CV, and the Deflated Sharpe Ratio.",
					tags: ["Financial ML", "Textbook", "Essential"],
					difficulty: "Advanced",
					url: "https://www.wiley.com/en-us/Advances+in+Financial+Machine+Learning-p-9781119482086"
				},
				{
					title: "The Deflated Sharpe Ratio",
					author: "Bailey & Lopez de Prado",
					desc: "Paper introducing the DSR, correcting for multiple testing, selection bias, and non-normal returns.",
					tags: ["Overfitting", "Paper", "Sharpe"],
					difficulty: "Advanced",
					url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2460551"
				},
				{
					title: "XGBoost Documentation",
					author: "XGBoost Developers",
					desc: "Reference for gradient boosted trees: regularization, early stopping, and feature importance.",
					tags: ["GBDT", "ML", "Reference"],
					difficulty: "Intermediate",
					url: "https://xgboost.readthedocs.io/"
				},
				{
					title: "LightGBM Documentation",
					author: "Microsoft",
					desc: "Fast, memory-efficient gradient boosting with leaf-wise growth, popular for tabular financial features.",
					tags: ["GBDT", "ML", "Reference"],
					difficulty: "Intermediate",
					url: "https://lightgbm.readthedocs.io/"
				}
			]
		},
		{
			category: "Low-Latency C++ & Systems",
			items: [
				{
					title: "LearnCpp.com",
					author: "Alex Allain et al.",
					desc: "Free, comprehensive modern C++ tutorial from basics through templates, move semantics, and smart pointers.",
					tags: ["C++", "Free", "Tutorial"],
					difficulty: "Beginner / Intermediate",
					url: "https://www.learncpp.com/"
				},
				{
					title: "cppreference",
					author: "cppreference Contributors",
					desc: "Canonical language and STL reference, including atomic memory ordering and container complexity guarantees.",
					tags: ["C++", "Reference", "STL"],
					difficulty: "Intermediate / Advanced",
					url: "https://en.cppreference.com/"
				},
				{
					title: "MIT OCW 6.172 - Performance Engineering of Software Systems",
					author: "MIT OpenCourseWare",
					desc: "Covers caching, branch prediction, vectorization, profiling, and low-level optimization with hands-on labs.",
					tags: ["Performance", "MIT", "Systems"],
					difficulty: "Advanced Undergrad",
					url: "https://ocw.mit.edu/courses/6-172-performance-engineering-of-software-systems-fall-2018/"
				},
				{
					title: "Agner Fog - Optimization Manuals",
					author: "Agner Fog",
					desc: "Deep technical manuals on x86 microarchitecture, instruction latency, assembly, and C++ optimization.",
					tags: ["Microarchitecture", "Optimization", "Manual"],
					difficulty: "Advanced",
					url: "https://www.agner.org/optimize/"
				},
				{
					title: "What Every Programmer Should Know About Memory",
					author: "Ulrich Drepper",
					desc: "The classic paper on caches, NUMA, TLB, and memory performance. Required reading for low-latency engineering.",
					tags: ["Memory", "Cache", "Paper"],
					difficulty: "Advanced",
					url: "https://people.freebsd.org/~lstewart/articles/cpumemory.pdf"
				},
				{
					title: "Google Benchmark",
					author: "Google",
					desc: "Microbenchmarking framework with statistical reporting, useful for measuring hot-path latency distributions.",
					tags: ["Benchmarking", "C++", "Tools"],
					difficulty: "Intermediate",
					url: "https://github.com/google/benchmark"
				},
				{
					title: "Beej's Guide to Network Programming",
					author: "Brian Hall",
					desc: "Free, practical guide to sockets, TCP/UDP, and network programming in C.",
					tags: ["Networking", "Sockets", "Free"],
					difficulty: "Intermediate",
					url: "https://beej.guide/bgnet/"
				},
				{
					title: "C++ Concurrency in Action, 2nd Edition",
					author: "Anthony Williams",
					desc: "The definitive guide to std::thread, atomics, memory ordering, lock-free data structures, and concurrency design.",
					tags: ["Concurrency", "C++", "Textbook"],
					difficulty: "Advanced",
					url: "https://www.manning.com/books/c-plus-plus-concurrency-in-action-second-edition"
				},
				{
					title: "Linux epoll(7) Manual",
					author: "Linux man-pages Project",
					desc: "Authoritative reference on level-triggered vs edge-triggered I/O multiplexing for high-throughput servers.",
					tags: ["Networking", "Linux", "Reference"],
					difficulty: "Advanced",
					url: "https://man7.org/linux/man-pages/man7/epoll.7.html"
				},
				{
					title: "DPDK - Data Plane Development Kit",
					author: "DPDK Project",
					desc: "Open-source kernel-bypass networking toolkit for high-packet-rate applications.",
					tags: ["Kernel Bypass", "Networking", "HFT"],
					difficulty: "Advanced",
					url: "https://www.dpdk.org/"
				}
			]
		},
		{
			category: "Interview Drills, Books & Competitions",
			items: [
				{
					title: "Zetamac Arithmetic Trainer",
					author: "Zetamac",
					desc: "The universal mental-math benchmark. Aim for more than 55 correct in 120 seconds before trading interviews.",
					tags: ["Mental Math", "QT Prep", "Free"],
					difficulty: "Daily Drill",
					url: "https://arithmetic.zetamac.com/"
				},
				{
					title: "TraderMath",
					author: "TraderMath",
					desc: "Trader-oriented arithmetic, percentages, and expected-value drills with timed scoring.",
					tags: ["Mental Math", "Practice", "QT Prep"],
					difficulty: "Daily Drill",
					url: "https://www.tradermath.org/"
				},
				{
					title: "QuantGuide",
					author: "QuantGuide",
					desc: "Curated probability, expected-value, and market-making problems organized by difficulty and topic.",
					tags: ["Interview", "Probability", "Practice"],
					difficulty: "All Levels",
					url: "https://quantguide.io/"
				},
				{
					title: "Codeforces",
					author: "Codeforces",
					desc: "Competitive programming contests for speed, C++ fluency, and algorithmic pattern recognition.",
					tags: ["DSA", "C++", "Competition"],
					difficulty: "All Levels",
					url: "https://codeforces.com/"
				},
				{
					title: "Jane Street - Programs & Events",
					author: "Jane Street",
					desc: "AMP, FOCUS, Electronic Trading Challenge, and other student programs with realistic trading games.",
					tags: ["Competition", "Jane Street", "Programs"],
					difficulty: "Undergraduate",
					url: "https://www.janestreet.com/join-jane-street/programs-and-events/"
				},
				{
					title: "Citadel & Citadel Securities Datathons",
					author: "Citadel",
					desc: "University data science competitions with real datasets and mentorship from quant researchers.",
					tags: ["Competition", "Citadel", "Data Science"],
					difficulty: "Undergraduate",
					url: "https://www.citadel.com/careers/students/datathons/"
				},
				{
					title: "QuantConnect - LEAN Engine",
					author: "QuantConnect",
					desc: "Free open-source backtesting and live-trading engine supporting Python and C# across equities, options, and futures.",
					tags: ["Backtesting", "Open Source", "Python"],
					difficulty: "Intermediate",
					url: "https://www.quantconnect.com"
				},
				{
					title: "OpenBB",
					author: "OpenBB",
					desc: "Open-source investment research platform for market data, fundamentals, macro series, and options.",
					tags: ["Data", "Open Source", "Research"],
					difficulty: "Beginner / Intermediate",
					url: "https://openbb.co"
				},
				{
					title: "A Practical Guide to Quantitative Finance Interviews (The Green Book)",
					author: "Xinfeng Zhou",
					desc: "The highest-ROI interview book: probability, brainteasers, calculus, stochastic processes, and finance questions with solutions.",
					tags: ["Interview", "Essential", "Book"],
					difficulty: "Undergrad to MS",
					url: "https://www.amazon.com/Practical-Guide-Quantitative-Finance-Interviews/dp/1438236662"
				},
				{
					title: "Heard on the Street",
					author: "Timothy Falcon Crack",
					desc: "Classic collection of quantitative interview questions on probability, options, and market intuition.",
					tags: ["Interview", "Brainteasers", "Book"],
					difficulty: "Freshman / Sophomore",
					url: "https://www.amazon.com/Heard-Street-Quantitative-Questions-Interviews/dp/0994115514"
				},
				{
					title: "50 Challenging Problems in Probability",
					author: "Frederick Mosteller",
					desc: "Short, elegant probability puzzles frequently adapted into phone screens.",
					tags: ["Probability", "Classic", "Book"],
					difficulty: "Beginner / Intermediate",
					url: "https://www.amazon.com/Challenging-Problems-Probability-Solutions-Dover/dp/0486653552"
				},
				{
					title: "Quant Job Interview Questions and Answers",
					author: "Mark Joshi, Nick Denson & Andrew Downes",
					desc: "Best for sell-side derivatives and quantitative research interviews, with rigorous solutions.",
					tags: ["Derivatives", "Interview", "Book"],
					difficulty: "Intermediate / Advanced",
					url: "https://www.amazon.com/Quant-Job-Interview-Questions-Answers/dp/0982828019"
				}
			]
		}
	];

	extraResourceCategories.forEach(cat => {
		if (!QUANT_DATA.resources.some(existing => existing.category === cat.category)) {
			QUANT_DATA.resources.push(cat);
		}
	});

	// ---------- Additional formulas ----------
	const extraFormulas = [
		{
			name: "Directional Derivative",
			formula: "D_u f = \\nabla f \\cdot u, \\quad \\|u\\| = 1",
			variables: "\\nabla f: gradient; u: unit direction vector",
			usage: "Measures the instantaneous rate of change of a function in a chosen direction; maximized along the gradient."
		},
		{
			name: "Second-Order Taylor Expansion",
			formula: "f(x + h) \\approx f(x) + \\nabla f(x)^T h + \\frac{1}{2} h^T H(x) h",
			variables: "H: Hessian matrix of second partial derivatives",
			usage: "Basis for Gamma/Theta P&L attribution and second-order optimization."
		},
		{
			name: "Lagrange Multiplier Condition",
			formula: "\\nabla f = \\sum_i \\lambda_i \\nabla g_i",
			variables: "f: objective; g_i: equality constraints; \\lambda_i: multipliers",
			usage: "First-order condition for constrained optimization, e.g. Markowitz with a target return."
		},
		{
			name: "Portfolio Variance (Matrix Form)",
			formula: "\\sigma_p^2 = w^T \\Sigma w = \\sum_i \\sum_j w_i w_j \\sigma_{ij}",
			variables: "w: weight vector; \\Sigma: covariance matrix",
			usage: "Central objective in Markowitz optimization; convex in w because Sigma is PSD."
		},
		{
			name: "Two-Asset Minimum-Variance Weights",
			formula: "w_1^* = \\frac{\\sigma_2^2 - \\rho \\sigma_1 \\sigma_2}{\\sigma_1^2 + \\sigma_2^2 - 2\\rho\\sigma_1\\sigma_2}",
			variables: "\\sigma_i: volatilities; \\rho: correlation",
			usage: "Closed-form minimum-variance portfolio for two risky assets."
		},
		{
			name: "CAPM Expected Return",
			formula: "E[R_i] = r_f + \\beta_i (E[R_m] - r_f)",
			variables: "\\beta_i = \\text{Cov}(R_i, R_m)/\\text{Var}(R_m)",
			usage: "Required return for systematic risk; the security market line."
		},
		{
			name: "Continuous Compounding",
			formula: "FV = PV \\cdot e^{rT}, \\quad PV = FV \\cdot e^{-rT}",
			variables: "r: continuously compounded rate; T: time in years",
			usage: "Discounting cash flows and pricing forwards in continuous time."
		},
		{
			name: "Discount Factor",
			formula: "DF(0,T) = e^{-z(T) T}",
			variables: "z(T): continuously compounded zero rate to maturity T",
			usage: "Present value of one unit paid at T; building blocks of the yield curve."
		},
		{
			name: "Forward Price with Carry",
			formula: "F_0 = S_0 e^{(r - q + u - y)T}",
			variables: "q: dividend or convenience yield; u: storage cost; y: convenience benefit",
			usage: "No-arbitrage forward/futures price for equities, FX, and commodities."
		},
		{
			name: "Modified Duration",
			formula: "D_{\\text{mod}} = \\frac{D_{\\text{Mac}}}{1 + y/m}, \\quad \\frac{\\Delta P}{P} \\approx -D_{\\text{mod}} \\Delta y",
			variables: "D_Mac: Macaulay duration; y: yield; m: compounding frequency",
			usage: "First-order interest-rate sensitivity of a bond portfolio."
		},
		{
			name: "Convexity Adjustment",
			formula: "\\frac{\\Delta P}{P} \\approx -D_{\\text{mod}} \\Delta y + \\frac{1}{2} C (\\Delta y)^2",
			variables: "C: convexity",
			usage: "Second-order correction for large yield moves; long convexity benefits from volatility."
		},
		{
			name: "Binomial Risk-Neutral Probability",
			formula: "p = \\frac{e^{rT} - d}{u - d}",
			variables: "u: up factor; d: down factor; r: risk-free rate",
			usage: "Probability that makes the discounted stock a martingale in the binomial tree."
		},
		{
			name: "GBM Closed-Form Solution",
			formula: "S_T = S_0 \\exp\\left(\\left(\\mu - \\frac{\\sigma^2}{2}\\right)T + \\sigma W_T\\right)",
			variables: "\\mu: drift; \\sigma: volatility; W_T ~ N(0,T)",
			usage: "Exact simulation and distribution of geometric Brownian motion."
		},
		{
			name: "GBM Expectation and Variance",
			formula: "E[S_T] = S_0 e^{\\mu T}, \\quad \\text{Var}(S_T) = S_0^2 e^{2\\mu T}(e^{\\sigma^2 T} - 1)",
			variables: "Same as GBM",
			usage: "Analytical benchmark for Monte Carlo simulations and risk estimates."
		},
		{
			name: "Ito's Lemma (General 1D)",
			formula: "df = \\left(f_t + \\mu f_x + \\frac{1}{2}\\sigma^2 f_{xx}\\right)dt + \\sigma f_x dW_t",
			variables: "f = f(t,x); dX_t = \\mu dt + \\sigma dW_t",
			usage: "Transforms functions of Ito processes; source of the Black-Scholes PDE."
		},
		{
			name: "Black-Scholes PDE",
			formula: "V_t + \\frac{1}{2}\\sigma^2 S^2 V_{SS} + rSV_S - rV = 0",
			variables: "V(S,t): derivative price",
			usage: "No-arbitrage PDE satisfied by all European derivatives under GBM."
		},
		{
			name: "Vega (per 1 vol point)",
			formula: "\\nu = S\\,\\phi(d_1)\\sqrt{T} \\quad (\\text{divide by 100 for 1\\%})",
			variables: "\\phi: standard normal PDF",
			usage: "Sensitivity of option price to a change in implied volatility."
		},
		{
			name: "Gamma-Theta Relation",
			formula: "\\Theta \\approx -\\frac{1}{2}\\sigma^2 S^2 \\Gamma \\quad (r \\approx 0)",
			variables: "\\Theta: time decay; \\Gamma: convexity",
			usage: "Explains why long gamma positions pay theta and short gamma collects it."
		},
		{
			name: "Monte Carlo Standard Error",
			formula: "SE = \\frac{s}{\\sqrt{N}}",
			variables: "s: sample standard deviation; N: number of independent paths",
			usage: "Error scales as N^-1/2; quadruple paths to halve the error."
		},
		{
			name: "GARCH(1,1) Long-Run Variance",
			formula: "\\bar{\\sigma}^2 = \\frac{\\omega}{1 - \\alpha - \\beta}",
			variables: "\\omega, \\alpha, \\beta: GARCH parameters; persistence \\alpha + \\beta",
			usage: "Unconditional volatility level in a GARCH volatility model."
		},
		{
			name: "Ornstein-Uhlenbeck Half-Life",
			formula: "t_{1/2} = \\frac{\\ln 2}{\\theta}",
			variables: "\\theta: mean-reversion speed",
			usage: "Expected time for a pairs spread to close half the distance to its mean."
		},
		{
			name: "Fundamental Law of Active Management",
			formula: "IR \\approx IC \\cdot \\sqrt{BR}",
			variables: "IC: information coefficient; BR: effective breadth",
			usage: "Links forecast skill and the number of independent bets to information ratio."
		},
		{
			name: "Square-Root Market Impact",
			formula: "\\text{Impact} \\approx k\\,\\sigma\\sqrt{\\frac{Q}{V}}",
			variables: "Q: order size; V: average daily volume; \\sigma: volatility; k: empirical constant",
			usage: "Estimates execution cost and the marginal cost of trading faster."
		},
		{
			name: "Micro-Price",
			formula: "P_{\\text{micro}} = \\frac{P_{\\text{bid}} Q_{\\text{ask}} + P_{\\text{ask}} Q_{\\text{bid}}}{Q_{\\text{bid}} + Q_{\\text{ask}}}",
			variables: "P: best bid/ask; Q: size at best bid/ask",
			usage: "Order-flow-weighted mid-price used to forecast the next tick direction."
		},
		{
			name: "Effective Spread",
			formula: "\\text{Effective Spread} = 2\\,|P_{\\text{trade}} - P_{\\text{mid}}|",
			variables: "P_trade: execution price; P_mid: prevailing midpoint",
			usage: "Measures realized trading cost relative to the true midpoint."
		},
		{
			name: "Kelly Criterion (General Odds)",
			formula: "f^* = \\frac{p(b+1) - 1}{b}",
			variables: "p: win probability; b: net odds (profit per unit staked)",
			usage: "Growth-optimal fraction of capital; practitioners often use half-Kelly."
		}
	];

	extraFormulas.forEach(f => {
		if (!QUANT_DATA.formulas.some(existing => existing.name === f.name)) {
			QUANT_DATA.formulas.push(f);
		}
	});

	// ---------- Additional glossary terms ----------
	const extraGlossary = [
		{ term: "Adverse Selection", def: "Losses suffered by a liquidity provider when trading against better-informed counterparties. The bid-ask spread must compensate for toxic order flow." },
		{ term: "Backwardation", def: "A futures curve where near-dated contracts trade above later-dated contracts (or below spot), producing positive roll yield for long holders." },
		{ term: "Basis Point (bp)", def: "One hundredth of a percentage point (0.01%). A 25bp rate cut is a 0.25% reduction." },
		{ term: "Cholesky Decomposition", def: "Factorization of a positive-definite matrix as A = L L^T, used to generate correlated random variables in Monte Carlo simulation." },
		{ term: "Clean vs Dirty Price", def: "The clean price excludes accrued interest; the dirty price includes it and is the actual cash amount paid for a bond." },
		{ term: "Contango", def: "A futures curve where later-dated contracts trade above nearer ones, producing negative roll yield for long-only futures investors." },
		{ term: "Convexity", def: "Second-order sensitivity of a bond's price to yield changes; long convexity means gains from rate falls exceed losses from equal rate rises." },
		{ term: "Deflated Sharpe Ratio (DSR)", def: "A Sharpe ratio significance test adjusted for the number of strategy trials, trial variance, sample length, skewness, and kurtosis." },
		{ term: "Delta Hedging", def: "Trading the underlying to offset an option's delta exposure, creating a locally riskless portfolio and underpinning Black-Scholes replication." },
		{ term: "Effective Breadth", def: "The number of genuinely independent bets in a strategy, accounting for correlation across signals and holding periods." },
		{ term: "Expected Shortfall (CVaR)", def: "The average loss conditional on losses exceeding the VaR threshold; a coherent tail-risk measure preferred to VaR in Basel regulation." },
		{ term: "Fama-French Factors", def: "Empirical equity factors: market, size, value, profitability, investment, and momentum, used to explain cross-sectional returns." },
		{ term: "GARCH", def: "Generalized Autoregressive Conditional Heteroskedasticity: a volatility model where today's variance depends on past squared shocks and past variance." },
		{ term: "Implied Volatility", def: "The volatility input that makes the Black-Scholes price equal the observed market price; reflects the market's forward-looking uncertainty." },
		{ term: "Ito's Lemma", def: "The stochastic chain rule. For f(t,X_t), it adds a second-order term (1/2) f_xx d[X,X]_t that ordinary calculus omits." },
		{ term: "Kalman Filter", def: "A recursive Bayesian estimator for latent state in a linear Gaussian system, used for time-varying hedge ratios and dynamic factor exposures." },
		{ term: "Limit Order", def: "A passive order to buy or sell at a specified price or better; it rests in the book until filled or cancelled." },
		{ term: "Market Impact", def: "The price move caused by one's own trading. Temporary impact reverts; permanent impact reflects information and liquidity consumption." },
		{ term: "Martingale", def: "A stochastic process whose conditional expectation equals its current value: E[X_{t+1} | F_t] = X_t. Discounted prices are martingales under a risk-neutral measure." },
		{ term: "Ornstein-Uhlenbeck Process", def: "A continuous-time mean-reverting process dX = theta(mu - X)dt + sigma dW, widely used for pairs-trading spreads." },
		{ term: "Post-Only Order", def: "A limit order that is rejected or cancelled if it would cross the spread, guaranteeing the order adds liquidity and earns maker rebates." },
		{ term: "Purged Cross-Validation", def: "A time-series CV scheme that removes overlapping training observations whose label windows intersect the test period." },
		{ term: "Risk-Neutral Measure (Q)", def: "A probability measure equivalent to the physical measure under which discounted tradable assets are martingales." },
		{ term: "SPSC Ring Buffer", def: "A single-producer single-consumer lock-free queue with separate read and write indices, common for low-latency inter-thread messaging." },
		{ term: "Survivorship Bias", def: "The upward bias from backtesting only on assets that survived to the present, excluding delisted or failed companies." },
		{ term: "Triple-Barrier Method", def: "A labeling scheme with profit-take, stop-loss, and time barriers; the first barrier touched determines the label." },
		{ term: "Vanna", def: "Cross Greek d2V/(dS dsigma): the sensitivity of delta to volatility, or equivalently of vega to spot." },
		{ term: "Vega", def: "Sensitivity of an option price to a change in implied volatility, usually quoted per 1 percentage point of vol." },
		{ term: "Volga (Vomma)", def: "Second derivative of option price with respect to volatility; measures the convexity of the option's vega profile." },
		{ term: "Yield Curve", def: "The relationship between yield and maturity for bonds of similar credit quality; spot, forward, and par curves are related by no-arbitrage." },
		{ term: "Zero-Coupon Bond", def: "A bond paying only principal at maturity, with no interim coupons; its price is the discount factor times face value." },
		{ term: "Z-Score", def: "A normalized deviation from a rolling mean, (x - mean)/std, used to size mean-reversion trades and rank cross-sectional signals." }
	];

	extraGlossary.forEach(g => {
		if (!QUANT_DATA.glossary.some(existing => existing.term === g.term)) {
			QUANT_DATA.glossary.push(g);
		}
	});
})();
