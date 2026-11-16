// QuantBridge - Full Curriculum Syllabus (Modules 4-6)
// Continuous-time pricing, risk, time series, machine learning, C++ and low-latency systems.

const QUANT_SYLLABUS_B = [
	{
		id: "m4",
		num: "4",
		title: "Module 4: Core Quantitative Finance (Pricing & Risk)",
		timeline: "Year 2",
		prereqs: "Modules 1-3: multivariable calculus, linear algebra, probability",
		objective: "Master no-arbitrage pricing theory, stochastic calculus, the Greeks, and numerical valuation methods.",
		color: "#f59e0b",
		topics: [
			{
				code: "4.1",
				id: "4-1",
				title: "Modern Portfolio Theory & Factor Pricing",
				subtopics: [
					"Mean-variance optimization (Markowitz): minimize w^T Sigma w subject to w^T mu = mu_p and w^T 1 = 1.",
					"The efficient frontier, tangency portfolio, capital market line, and two-fund separation.",
					"Capital Asset Pricing Model (CAPM): systematic beta vs idiosyncratic risk and the security market line.",
					"Performance metrics: Sharpe, Sortino, Information, and Calmar ratios, plus Value at Risk and Expected Shortfall (CVaR).",
					"Estimation error: why sample covariance matrices blow up in optimization and remedies such as Ledoit-Wolf shrinkage."
				],
				resources: [
					{ label: "QuantEcon - Quantitative Economics with Python", url: "https://python.quantecon.org/" },
					{ label: "scikit-learn - Covariance Estimation Guide", url: "https://scikit-learn.org/stable/modules/covariance.html" },
					{ label: "Markowitz (1952) - Portfolio Selection", url: "https://onlinelibrary.wiley.com/doi/10.1111/j.1540-6261.1952.tb01525.x" },
					{ label: "Kenneth French Data Library - Factor returns", url: "https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/" }
				],
				practice: [
					{
						q: "Two assets have sigma1 = 20%, sigma2 = 30%, correlation 0.3, and equal weights. What is portfolio volatility?",
						a: "Var = 0.25(0.04) + 0.25(0.09) + 2(0.25)(0.3)(0.2)(0.3) = 0.01 + 0.0225 + 0.009 = 0.0415, so sigma = sqrt(0.0415) = 20.37%. Diversification lowers risk below the 25% weighted average."
					},
					{
						q: "Derive the two-asset minimum-variance weight formula.",
						a: "Minimize w^2 sigma1^2 + (1-w)^2 sigma2^2 + 2w(1-w) rho sigma1 sigma2. Differentiate and set to zero: w1* = (sigma2^2 - rho sigma1 sigma2)/(sigma1^2 + sigma2^2 - 2 rho sigma1 sigma2), w2* = 1 - w1*."
					},
					{
						q: "Risk-free rate is 4%, beta is 1.2, and the equity risk premium is 6%. What is the CAPM expected return?",
						a: "E[R] = rf + beta(E[R_m] - rf) = 4% + 1.2(6%) = 11.2%."
					},
					{
						q: "A strategy has monthly mean excess return 1% and monthly volatility 4%. Annualize its Sharpe ratio.",
						a: "Monthly Sharpe = 0.01/0.04 = 0.25. Annualized = 0.25 x sqrt(12) = 0.866, assuming i.i.d. returns."
					},
					{
						q: "A $1M portfolio has daily volatility 2%. Estimate 1-day 95% normal VaR.",
						a: "95% one-sided z = 1.645, so VaR = 1.645 x 0.02 x $1M = $32,900."
					},
					{
						q: "Why does the sample covariance matrix become unstable when the number of assets N is close to the number of observations T?",
						a: "The sample covariance has rank at most T-1, so if N is close to T it is singular or near-singular. Small estimation errors get amplified by matrix inversion in Markowitz, producing extreme and unstable weights. Shrinkage (Ledoit-Wolf) or factor models regularize it."
					}
				]
			},
			{
				code: "4.2",
				id: "4-2",
				title: "Discrete-Time Asset Pricing",
				subtopics: [
					"One-step and multi-step binomial asset pricing models (Cox-Ross-Rubinstein parameterization).",
					"Dynamic replication and self-financing portfolios (Delta_t shares plus B_t cash).",
					"Risk-neutral probability measure Q vs real-world physical measure P.",
					"Filtrations, adapted processes, martingales, and the First and Second Fundamental Theorems of Asset Pricing."
				],
				resources: [
					{ label: "MIT OCW 18.S096 - Topics in Mathematics with Applications in Finance", url: "https://ocw.mit.edu/courses/18-s096-topics-in-mathematics-with-applications-in-finance-fall-2013/" },
					{ label: "Shreve - Stochastic Calculus for Finance I: The Binomial Asset Pricing Model", url: "https://link.springer.com/book/10.1007/978-0-387-22527-2" },
					{ label: "CFM - Binomial option pricing notes", url: "https://www.cfm.fr/" }
				],
				practice: [
					{
						q: "One-step binomial model: S = 100, u = 1.2, d = 0.8, r = 5%, T = 1, K = 100. Find the risk-neutral probability and the call price.",
						a: "p = (e^(rT) - d)/(u - d) = (1.05127 - 0.8)/0.4 = 0.6282. Call payoffs are 20 and 0, so C = e^(-0.05)(0.6282 x 20) = 11.95."
					},
					{
						q: "In the same model, find the replicating delta and cash position.",
						a: "Delta = (C_u - C_d)/(S(u - d)) = 20/40 = 0.5. Cash B solves 0.5 x 120 + B e^(0.05) = 20 and 0.5 x 80 + B e^(0.05) = 0, so B e^(0.05) = -40 and B = -38.05. The call is worth 0.5 x 100 - 38.05 = 11.95."
					},
					{
						q: "Two-step binomial model: S = 100, u = 1.1, d = 0.9, r = 0, K = 100. Price a European put.",
						a: "p = (1 - 0.9)/0.2 = 0.5. Terminal prices are 121, 99, 81 with put payoffs 0, 1, 19. The down node is worth 0.5(1 + 19) = 10 and the up node 0.5(0 + 1) = 0.5. Today's price is 0.5(0.5 + 10) = 5.25."
					},
					{
						q: "State the two Fundamental Theorems of Asset Pricing.",
						a: "First: a market has no arbitrage if and only if there exists an equivalent martingale measure (EMM). Second: the market is complete if and only if the EMM is unique."
					},
					{
						q: "What is the difference between the physical measure P and the risk-neutral measure Q?",
						a: "P describes actual real-world probabilities and includes the risk premium. Q is the pricing measure under which discounted tradable assets are martingales; it adjusts probabilities so expected returns equal the risk-free rate."
					}
				]
			},
			{
				code: "4.3",
				id: "4-3",
				title: "Stochastic Calculus & Continuous-Time Models",
				subtopics: [
					"Scaling limit of symmetric random walks to standard Brownian motion W_t: independent increments, W_t - W_s ~ N(0, t-s), nowhere-differentiable paths.",
					"Quadratic variation [W,W]_t = t and informal box calculus: dW^2 = dt, dt dW = 0, dt^2 = 0.",
					"Ito's integral and Ito's lemma for transforming functions f(t, X_t) of Ito processes.",
					"Geometric Brownian Motion: dS_t = mu S_t dt + sigma S_t dW_t and its exact log-normal solution.",
					"Derivation of the Black-Scholes-Merton PDE by dynamic delta hedging and its closed-form European solutions.",
					"Implied volatility, volatility skew/smile, and local/stochastic volatility concepts (Heston overview)."
				],
				resources: [
					{ label: "MIT OCW 18.S096 - Stochastic Calculus & Black-Scholes Lectures", url: "https://ocw.mit.edu/courses/18-s096-topics-in-mathematics-with-applications-in-finance-fall-2013/" },
					{ label: "Shreve - Stochastic Calculus for Finance II: Continuous-Time Models", url: "https://link.springer.com/book/10.1007/978-1-4757-4296-1" },
					{ label: "QuantLib - Open-source pricing library", url: "https://www.quantlib.org/" },
					{ label: "Martin Haugh - Financial Engineering Lecture Notes", url: "http://www.columbia.edu/~mh2078/FoundationsFE/" }
				],
				practice: [
					{
						q: "For standard Brownian motion, compute E[W_t^2] and Var(W_t^2).",
						a: "W_t ~ N(0,t), so E[W_t^2] = t. Var(W_t^2) = E[W_t^4] - t^2 = 3t^2 - t^2 = 2t^2."
					},
					{
						q: "Apply Ito's lemma to f(W_t) = W_t^2.",
						a: "f_t = 0, f_x = 2W, f_xx = 2, so d(W^2) = 2W dW + (1/2)(2) dt = 2W dW + dt. The extra dt term is the Ito correction."
					},
					{
						q: "For GBM dS = mu S dt + sigma S dW, find E[S_T].",
						a: "The solution is S_T = S_0 exp((mu - sigma^2/2)T + sigma W_T). Since E[exp(sigma W_T)] = exp(sigma^2 T/2), E[S_T] = S_0 e^(mu T). Note the drift of log S is mu - sigma^2/2, not mu."
					},
					{
						q: "Compute the quadratic variation of 2W over [0,t].",
						a: "Quadratic variation scales by the square of the factor: [2W,2W]_t = 4[W,W]_t = 4t."
					},
					{
						q: "Write the Black-Scholes PDE for a European derivative V(S,t).",
						a: "dV/dt + (1/2) sigma^2 S^2 d2V/dS2 + r S dV/dS - r V = 0, with terminal condition V(S,T) = payoff(S). The mu term disappears because delta hedging removes the directional risk."
					},
					{
						q: "Why does the Black-Scholes model produce a volatility smile in practice?",
						a: "BS assumes constant volatility and log-normal returns with no jumps. Real markets have fat tails, leverage effects, jumps, and stochastic volatility, so out-of-the-money options trade at higher implied vols, producing a skew or smile."
					}
				]
			},
			{
				code: "4.4",
				id: "4-4",
				title: "The Greeks & Dynamic Hedging",
				subtopics: [
					"First-order Greeks: Delta, Vega, Theta, Rho.",
					"Second-order and cross Greeks: Gamma, Vanna, Volga (Vomma), Charm.",
					"Gamma-Theta trade-off and dynamic hedging P&L attribution: dV = Delta dS + (1/2) Gamma (dS)^2 + Theta dt + Vega dsigma.",
					"Discrete hedging error and rebalancing frequency vs transaction costs."
				],
				resources: [
					{ label: "QuantLib Documentation & Open-Source Library", url: "https://www.quantlib.org/" },
					{ label: "Hull - Options, Futures, and Other Derivatives (Greeks chapters)", url: "https://www.pearson.com/en-us/subject-catalog/p/options-futures-and-other-derivatives/P200000005938" },
					{ label: "Taleb - Dynamic Hedging", url: "https://www.wiley.com/en-us/Dynamic+Hedging%3A+Managing+Vanilla+and+Exotic+Options-p-9780471152804" }
				],
				practice: [
					{
						q: "A call has delta 0.55 and gamma 0.04. Estimate the new delta after the stock rises by 2.",
						a: "New delta is approximately 0.55 + 0.04 x 2 = 0.63. Gamma measures how quickly delta changes."
					},
					{
						q: "A delta-hedged portfolio has gamma 0.05. Estimate the second-order P&L from a $2 move in the underlying.",
						a: "0.5 x Gamma x (dS)^2 = 0.5 x 0.05 x 4 = 0.10. For a long-gamma position this is a gain regardless of direction."
					},
					{
						q: "A position has vega 0.12 per 1% vol. What is the P&L if implied volatility rises 3 points?",
						a: "0.12 x 3 = 0.36 per unit of the underlying (or per 100 shares, depending on convention). Vega scales linearly for small vol moves."
					},
					{
						q: "Using the approximation Theta = -(1/2) sigma^2 S^2 Gamma with r = 0, explain the gamma-theta trade-off.",
						a: "Long gamma is financed by negative theta: you pay time decay to own convexity. Short gamma collects theta but loses on large moves. The market price of this trade-off is implied volatility."
					},
					{
						q: "Why does a short-gamma, delta-hedged option position lose money when realized volatility exceeds implied volatility?",
						a: "Hedging a short option forces you to buy after prices rise and sell after they fall, systematically buying high and selling low. When realized moves exceed the implied vol you sold, the hedging slippage exceeds the theta collected."
					},
					{
						q: "Define vanna and charm.",
						a: "Vanna = d2V/(dS dsigma), the change in delta for a change in vol (or vega for a change in spot). Charm = dDelta/dt, the change in delta as time passes; it matters for expiring option hedges."
					}
				]
			},
			{
				code: "4.5",
				id: "4-5",
				title: "Numerical Pricing Methods",
				subtopics: [
					"Monte Carlo: discretizing SDEs with Euler-Maruyama and Milstein, convergence O(N^-1/2), pricing path-dependent exotics (Asian, barrier, lookback).",
					"Variance reduction: antithetic variates, control variates, stratified sampling, and quasi-Monte Carlo with Sobol sequences.",
					"Finite difference methods: discretizing the Black-Scholes PDE on an (S,t) grid with explicit, implicit, and Crank-Nicolson schemes; stability analysis and American early exercise via PSOR or Longstaff-Schwartz."
				],
				resources: [
					{ label: "Mike Giles (Oxford) - Monte Carlo Methods in Finance Notes", url: "https://people.maths.ox.ac.uk/gilesm/mc/" },
					{ label: "Glasserman - Monte Carlo Methods in Financial Engineering", url: "https://link.springer.com/book/10.1007/978-0-387-21617-1" },
					{ label: "QuantLib - Numerical pricing implementations", url: "https://www.quantlib.org/" },
					{ label: "Hull - Finite difference and Monte Carlo chapters", url: "https://www.pearson.com/en-us/subject-catalog/p/options-futures-and-other-derivatives/P200000005938" }
				],
				practice: [
					{
						q: "A Monte Carlo estimate uses 10,000 paths and has standard error 0.10. How many paths are needed to reduce the standard error to 0.05?",
						a: "Error scales as 1/sqrt(N). Halving the error requires 4x the paths, so 40,000."
					},
					{
						q: "How do antithetic variates reduce Monte Carlo variance?",
						a: "For each path driven by normals Z, also simulate the path driven by -Z. For monotone payoffs the two errors are negatively correlated, so the average has lower variance; the estimator remains unbiased."
					},
					{
						q: "Compare the strong convergence orders of Euler-Maruyama and Milstein.",
						a: "Euler-Maruyama has strong order 0.5 (weak order 1); Milstein adds the correction (1/2) sigma sigma' (dW^2 - dt) and achieves strong order 1.0, at the cost of evaluating the derivative of the diffusion."
					},
					{
						q: "Why is the Crank-Nicolson scheme popular for the Black-Scholes PDE?",
						a: "It averages explicit and implicit time stepping, is unconditionally stable, and is second-order accurate in both space and time, giving a good accuracy/stability balance."
					},
					{
						q: "Outline the Longstaff-Schwartz method for American options.",
						a: "Simulate paths; at each exercise date going backward, regress the discounted future cash flows on basis functions of the current state (e.g. polynomials in S), compare the fitted continuation value with immediate intrinsic value, and exercise if intrinsic is higher. Average the discounted optimal cash flows to price the option."
					},
					{
						q: "Write the payoff of an arithmetic-average Asian call.",
						a: "max( (1/n) sum_{i=1..n} S_{t_i} - K, 0 ). It is path-dependent and has no simple closed form under GBM, so Monte Carlo is the standard approach."
					}
				]
			}
		],
		project: {
			title: "Hands-On Project 4: Unified Option Pricing & Hedging Engine",
			points: [
				"Implement closed-form Black-Scholes, an N-step binomial tree, and a vectorized Monte Carlo pricer with antithetic variates; assert convergence to the same European price.",
				"Build an implied-volatility solver with Newton-Raphson or Brent and plot a 3D volatility surface.",
				"Simulate 1,000 GBM paths and delta-hedge a short call daily vs hourly; plot the distribution of final hedging error."
			]
		}
	},
	{
		id: "m5",
		num: "5",
		title: "Module 5: Quantitative Trading, Time Series & Machine Learning",
		timeline: "Year 2 Summer - Year 3",
		prereqs: "Probability, linear algebra, and Module 4",
		objective: "Master buy-side alpha research, time-series econometrics, rigorous backtesting, and financial machine learning.",
		color: "#ec4899",
		topics: [
			{
				code: "5.1",
				id: "5-1",
				title: "Statistical Inference & Econometrics",
				subtopics: [
					"OLS: matrix solution beta_hat = (X^T X)^-1 X^T y, Gauss-Markov theorem, multicollinearity, and heteroskedasticity-consistent standard errors (Newey-West).",
					"Regularized regression: Ridge (L2), Lasso (L1), and ElasticNet for high-dimensional feature spaces.",
					"Maximum likelihood estimation and information criteria (AIC, BIC).",
					"Hypothesis-testing pitfalls: p-hacking, look-elsewhere effect, and multiple-testing adjustments (Bonferroni, Benjamini-Hochberg FDR)."
				],
				resources: [
					{ label: "Hastie, Tibshirani & Friedman - The Elements of Statistical Learning (free PDF)", url: "https://hastie.su.domains/ElemStatLearn/" },
					{ label: "An Introduction to Statistical Learning (free PDF)", url: "https://www.statlearning.com/" },
					{ label: "statsmodels Documentation", url: "https://www.statsmodels.org/stable/index.html" },
					{ label: "Mostly Harmless Econometrics - companion resources", url: "https://www.mostlyharmlesseconometrics.com/" }
				],
				practice: [
					{
						q: "In a simple regression y = a + bx + e, what is the OLS slope estimate?",
						a: "b_hat = Cov(x,y)/Var(x). The intercept is a_hat = y_bar - b_hat x_bar, so the fitted line passes through the sample means."
					},
					{
						q: "What does R^2 measure, and what does an R^2 of 0.02 in a return-prediction model tell you?",
						a: "R^2 is the fraction of variance in y explained by the regressors. An R^2 of 0.02 means 2% of return variance is explained; low but potentially economically significant in finance, where signal-to-noise is tiny."
					},
					{
						q: "Contrast Ridge and Lasso regression.",
						a: "Ridge adds an L2 penalty, shrinking coefficients smoothly toward zero but rarely to exactly zero. Lasso adds an L1 penalty, which can set coefficients exactly to zero and perform variable selection. ElasticNet combines both."
					},
					{
						q: "How do AIC and BIC penalize model complexity?",
						a: "AIC = 2k - 2 ln L and BIC = k ln(n) - 2 ln L, where k is the number of parameters. BIC penalizes more heavily once ln(n) > 2 (n > about 7), favoring sparser models."
					},
					{
						q: "When should you use Bonferroni versus Benjamini-Hochberg?",
						a: "Bonferroni controls the family-wise error rate (probability of any false positive) and is conservative. Benjamini-Hochberg controls the false discovery rate (expected proportion of false positives among rejections), giving more power in large screening problems such as alpha research."
					},
					{
						q: "Why use Newey-West standard errors in a time-series regression?",
						a: "They are heteroskedasticity- and autocorrelation-consistent (HAC), producing valid t-statistics when errors are serially correlated, which is common in overlapping financial returns."
					}
				]
			},
			{
				code: "5.2",
				id: "5-2",
				title: "Financial Time Series Analysis",
				subtopics: [
					"Strict vs weak (covariance) stationarity; unit roots and Augmented Dickey-Fuller / KPSS tests.",
					"Autocorrelation (ACF) and partial autocorrelation (PACF); Ljung-Box test for serial correlation.",
					"Linear models: AR(p), MA(q), ARMA(p,q), and ARIMA(p,d,q).",
					"Volatility modeling: volatility clustering, stylized facts of returns, ARCH(q) and GARCH(1,1).",
					"Cointegration vs correlation: Engle-Granger two-step method, Johansen test, Ornstein-Uhlenbeck mean-reversion speed, and Kalman filters for time-varying hedge ratios."
				],
				resources: [
					{ label: "Hyndman & Athanasopoulos - Forecasting: Principles and Practice, 3rd Ed.", url: "https://otexts.com/fpp3/" },
					{ label: "statsmodels - Time Series Analysis (TSA)", url: "https://www.statsmodels.org/stable/tsa.html" },
					{ label: "Hamilton - Time Series Analysis", url: "https://press.princeton.edu/books/hardcover/9780691042893/time-series-analysis" },
					{ label: "QuantStart - Time series and pairs trading articles", url: "https://www.quantstart.com/articles/" }
				],
				practice: [
					{
						q: "What is the stationarity condition for an AR(1) process x_t = c + phi x_(t-1) + e_t?",
						a: "The process is stationary when |phi| < 1. If phi = 1 it is a random walk with a unit root; if |phi| > 1 it explodes."
					},
					{
						q: "What does the ACF of a stationary AR(1) look like?",
						a: "It decays geometrically: rho(k) = phi^k. A slow decay suggests a near-unit root; a sharp cutoff after lag q suggests an MA(q) component."
					},
					{
						q: "For GARCH(1,1) with omega = 0.00001, alpha = 0.08, beta = 0.90, what is the long-run variance?",
						a: "Long-run variance = omega/(1 - alpha - beta) = 0.00001/0.02 = 0.0005, so long-run volatility is sqrt(0.0005) = 2.24% per period."
					},
					{
						q: "An Ornstein-Uhlenbeck spread has mean-reversion speed theta = 0.1 per day. What is its half-life?",
						a: "Half-life = ln(2)/theta = 0.693/0.1 = 6.93 days."
					},
					{
						q: "Can two series be highly correlated but not cointegrated? Explain.",
						a: "Yes. Correlation measures co-movement of short-term changes, while cointegration requires a stationary long-run linear combination. Two independent random walks can wander together for long stretches and show high sample correlation, yet their spread is non-stationary."
					},
					{
						q: "State the null hypotheses of the ADF and KPSS tests.",
						a: "ADF null: the series has a unit root (non-stationary); rejection supports stationarity. KPSS null: the series is stationary (level or trend); rejection supports a unit root. They are complementary."
					}
				]
			},
			{
				code: "5.3",
				id: "5-3",
				title: "Alpha Research & Factor Modeling",
				subtopics: [
					"Cross-sectional equity factor models: Fama-French 3-factor and 5-factor models (size, value, momentum, profitability, investment).",
					"Alpha signals: cross-sectional momentum vs time-series trend following, short-term reversal, statistical arbitrage, and order-book imbalance features.",
					"Portfolio construction: dollar neutrality, beta neutrality, sector neutrality, and turnover constraints.",
					"Grinold's Fundamental Law of Active Management: IR = IC x sqrt(BR)."
				],
				resources: [
					{ label: "Kenneth French Data Library - Empirical Factor Datasets", url: "https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/" },
					{ label: "Ernest Chan - Quantitative Trading", url: "https://www.wiley.com/en-us/Quantitative+Trading%3A+How+to+Build+Your+Own+Algorithmic+Trading+Business-p-9780470284889" },
					{ label: "Grinold & Kahn - Active Portfolio Management", url: "https://www.mheducation.com/highered/product/active-portfolio-management-theory-and-practice-grinold-kahn/M9780070248823.html" },
					{ label: "AQR - Factor research library", url: "https://www.aqr.com/Insights/Research" }
				],
				practice: [
					{
						q: "If the information coefficient is 0.05 and you make 252 independent bets per year, what is the expected information ratio?",
						a: "IR = IC x sqrt(BR) = 0.05 x sqrt(252) = 0.05 x 15.87 = 0.79."
					},
					{
						q: "How do you construct a dollar-neutral, beta-neutral long-short portfolio?",
						a: "Choose weights w with sum(w) = 0 (equal dollar long and short) and sum(w_i beta_i) = 0 (zero portfolio beta), then scale to the target gross exposure and apply sector and turnover constraints."
					},
					{
						q: "Contrast cross-sectional momentum with short-term reversal.",
						a: "Cross-sectional momentum ranks stocks by past 3-12 month returns and buys winners/sells losers, betting on continuation. Short-term reversal bets that 1-day to 1-month winners underperform next period, exploiting liquidity and overreaction effects."
					},
					{
						q: "In a Fama-French regression, what does a positive and significant alpha mean?",
						a: "It means the strategy earns a return not explained by its exposures to the market, size, value, profitability, and investment factors - evidence of genuine alpha rather than repackaged factor beta."
					},
					{
						q: "Why does high turnover erode a statistically strong alpha?",
						a: "Each trade pays spreads, commissions, and market impact. Net alpha equals gross alpha minus turnover times cost per unit traded. High-turnover signals can have strong gross IC yet negative net returns."
					},
					{
						q: "Why do practitioners clip or winsorize z-score signals?",
						a: "Extreme observations are often data errors or illiquid outliers. Clipping at, say, +/-3 reduces estimation noise and prevents a handful of names from dominating portfolio risk."
					}
				]
			},
			{
				code: "5.4",
				id: "5-4",
				title: "Backtesting Engineering & Pitfalls",
				subtopics: [
					"Data biases: look-ahead bias, survivorship bias (missing delisted stocks), restatement bias, and point-in-time databases.",
					"Statistical overfitting: data snooping, backtest overfitting, and the Deflated Sharpe Ratio.",
					"Realistic execution modeling: bid-ask crossing, short-borrow fees, commissions, and square-root market impact (dP proportional to sigma sqrt(Q/V)).",
					"Vectorized backtesting for fast research vs event-driven backtesting for production-accurate execution."
				],
				resources: [
					{ label: "QuantStart - Backtesting & Algorithmic Trading Articles", url: "https://www.quantstart.com/articles/" },
					{ label: "Bailey & Lopez de Prado - The Deflated Sharpe Ratio", url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2460551" },
					{ label: "Lopez de Prado - Advances in Financial Machine Learning", url: "https://www.wiley.com/en-us/Advances+in+Financial+Machine+Learning-p-9781119482086" },
					{ label: "QuantConnect - Open-source LEAN backtesting engine", url: "https://www.quantconnect.com" }
				],
				practice: [
					{
						q: "How does survivorship bias inflate a backtest?",
						a: "The sample only includes firms that survived to today. Bankrupt, delisted, or acquired losers are excluded, so historical returns look better and risk looks lower than an investable universe would have delivered."
					},
					{
						q: "Give a concrete example of look-ahead bias in a daily backtest.",
						a: "Using today's closing price to decide a trade executed at today's close, or using restated fundamentals that were not published until weeks later. Decisions must use only information available before the execution timestamp."
					},
					{
						q: "What problem does the Deflated Sharpe Ratio solve?",
						a: "It adjusts an observed Sharpe ratio for the number of strategy configurations tested, the variance of the trials, and non-normal skew/kurtosis, reducing the chance of mistaking data-mined luck for skill."
					},
					{
						q: "Estimate impact cost for Q/V = 4%, daily volatility 20%, and impact coefficient 0.5.",
						a: "Cost = 0.5 x 0.20 x sqrt(0.04) = 0.5 x 0.20 x 0.20 = 0.02, or 2%. Trading 4% of daily volume is expensive."
					},
					{
						q: "Why can a vectorized backtest overstate performance relative to an event-driven backtest?",
						a: "Vectorized code ignores queue position, partial fills, latency, order rejections, borrow availability, and path-dependent cash. Event-driven simulation models the actual order lifecycle and is more realistic."
					},
					{
						q: "What is point-in-time data?",
						a: "Data recorded as it was actually known at each historical timestamp, including original releases and later restatements separately. It prevents using revised or subsequently published information in historical decisions."
					}
				]
			},
			{
				code: "5.5",
				id: "5-5",
				title: "Machine Learning in Finance",
				subtopics: [
					"Why textbook ML fails in finance: non-stationarity, extremely low signal-to-noise ratio, and regime shifts.",
					"Financial feature engineering: information-driven bars (volume/dollar bars) and fractional differentiation preserving memory while achieving stationarity.",
					"Labeling and meta-labeling: the triple-barrier method (profit-take, stop-loss, vertical time-out) and bet sizing.",
					"Modeling: gradient boosted decision trees (XGBoost, LightGBM), regularized linear models, and walk-forward validation.",
					"Preventing leakage: purged and embargoed K-fold cross-validation."
				],
				resources: [
					{ label: "Stanford CS229 - Machine Learning", url: "https://cs229.stanford.edu/" },
					{ label: "Lopez de Prado - Advances in Financial Machine Learning", url: "https://www.wiley.com/en-us/Advances+in+Financial+Machine+Learning-p-9781119482086" },
					{ label: "XGBoost Documentation", url: "https://xgboost.readthedocs.io/" },
					{ label: "LightGBM Documentation", url: "https://lightgbm.readthedocs.io/" }
				],
				practice: [
					{
						q: "Why does random K-fold cross-validation leak future information in financial ML?",
						a: "Labels are built from forward-looking windows (e.g. 5-day returns) that overlap across samples. Random folds put temporally adjacent, overlapping observations in both train and test, so the model effectively sees the future. Purging and embargoing remove overlapping neighbors."
					},
					{
						q: "What is the purpose of fractional differentiation?",
						a: "It transforms a price series toward stationarity while preserving long memory. Integer differencing (d = 1) makes returns stationary but discards memory; fractional d between 0 and 1 keeps predictive memory while passing stationarity tests."
					},
					{
						q: "Describe the triple-barrier labeling method.",
						a: "For each event, set an upper profit-take barrier, a lower stop-loss barrier, and a vertical time barrier. The label is which barrier is touched first (or 0 if none), turning the problem into a classification of path outcomes rather than a fixed-horizon return."
					},
					{
						q: "What does meta-labeling add on top of a primary signal?",
						a: "A secondary model predicts whether the primary signal will be correct (precision), rather than the direction itself. It filters low-confidence trades and sizes bets, improving F1 and risk-adjusted returns."
					},
					{
						q: "Why is walk-forward validation preferred to a single train/test split?",
						a: "It repeatedly retrains on a rolling window and tests on the next out-of-sample block, mimicking live deployment and revealing performance stability across regimes."
					},
					{
						q: "Why is accuracy a poor metric for rare-event financial classification?",
						a: "With a 1% positive rate, predicting all negatives gives 99% accuracy while being useless. Use precision, recall, F1, and the confusion matrix, and address imbalance with class weights or resampling."
					}
				]
			}
		],
		project: {
			title: "Hands-On Project 5: Event-Driven Statistical Arbitrage Backtester",
			points: [
				"Build an event-driven backtester from scratch (no backtesting wrappers) for a pairs-trading strategy in a sector such as semiconductors or consumer staples.",
				"Use walk-forward splits (2 years in-sample, 6 months out-of-sample, rolling) and Engle-Granger cointegration to select pairs; estimate dynamic hedge ratios with a Kalman filter.",
				"Generate z-score entry/exit signals, charge 5-10 bps slippage and commissions, and report out-of-sample Sharpe, turnover, and maximum drawdown."
			]
		}
	},
	{
		id: "m6",
		num: "6",
		title: "Module 6: C++ & Low-Latency Systems (Quant Dev / HFT Track)",
		timeline: "Year 2 - Year 3",
		prereqs: "Data structures, algorithms, and computer systems",
		objective: "Write deterministic, cache-friendly, nanosecond-scale C++ for trading infrastructure.",
		color: "#ef4444",
		topics: [
			{
				code: "6.1",
				id: "6-1",
				title: "Modern C++ (C++17 / C++20)",
				subtopics: [
					"Memory model: stack vs heap allocation, pointers, references, object lifetimes, and undefined behavior.",
					"Resource management: RAII, std::unique_ptr, std::shared_ptr, move semantics, rvalue references (&&), and copy elision.",
					"Generic and compile-time programming: templates, SFINAE/concepts (C++20), constexpr, and CRTP to eliminate virtual-function overhead.",
					"STL internals: performance tradeoffs of std::vector, std::deque, std::map (red-black tree), and std::unordered_map (pointer chasing vs flat hash maps)."
				],
				resources: [
					{ label: "LearnCpp.com - Modern C++ Tutorial", url: "https://www.learncpp.com/" },
					{ label: "cppreference - Canonical Language & STL Reference", url: "https://en.cppreference.com/" },
					{ label: "Scott Meyers - Effective Modern C++", url: "https://www.oreilly.com/library/view/effective-modern-c/9781491908419/" },
					{ label: "C++ Core Guidelines", url: "https://isocpp.github.io/CppCoreGuidelines/" }
				],
				practice: [
					{
						q: "Give three examples of undefined behavior in C++ that can silently corrupt a trading system.",
						a: "Dereferencing a dangling or null pointer, reading/writing out of array bounds, and signed integer overflow. Others include use-after-free, uninitialized reads, and data races. UB lets the optimizer produce arbitrary behavior."
					},
					{
						q: "Compare std::unique_ptr and std::shared_ptr overhead.",
						a: "unique_ptr is a zero-overhead wrapper around a raw pointer with move-only ownership. shared_ptr has a control block with an atomic reference count, so copies incur atomic operations and extra memory, which is expensive on a hot path."
					},
					{
						q: "What does move semantics accomplish, and what is the state of a moved-from object?",
						a: "It transfers resources (buffers, pointers) instead of copying them, avoiding allocations and O(n) copies. A moved-from object is valid but unspecified; you may destroy it or assign to it, but should not assume its value."
					},
					{
						q: "How does CRTP eliminate virtual dispatch overhead?",
						a: "The base template is parameterized on the derived type and casts this to Derived, so the call is resolved at compile time. The compiler can inline it, avoiding vtable indirection and branch-target misprediction."
					},
					{
						q: "Compare lookup complexity and cache behavior for std::vector, std::map, and std::unordered_map.",
						a: "vector: O(1) index, contiguous and cache-friendly. map: O(log n), red-black tree, pointer chasing and poor locality. unordered_map: O(1) average, bucket array plus node pointers; flat open-addressing maps are often faster in practice."
					},
					{
						q: "State the Rule of Five.",
						a: "If a class manages a resource, define (or delete) all five: destructor, copy constructor, copy assignment, move constructor, and move assignment. This preserves RAII and avoids double frees or leaks."
					}
				]
			},
			{
				code: "6.2",
				id: "6-2",
				title: "Computer Architecture & High-Performance Engineering",
				subtopics: [
					"CPU microarchitecture: instruction pipelining, superscalar execution, branch prediction ([[likely]]/[[unlikely]]), and branchless programming.",
					"Memory hierarchy: registers, L1/L2/L3 caches, TLB, DRAM; spatial and temporal locality; data-oriented design (struct of arrays vs array of structs).",
					"Cache-line physics: 64-byte cache lines and avoiding false sharing with alignas(64).",
					"Eliminating hot-path latency: custom object pools, arena allocators, pre-allocation, and benchmarking with Google Benchmark or rdtsc."
				],
				resources: [
					{ label: "MIT OCW 6.172 - Performance Engineering of Software Systems", url: "https://ocw.mit.edu/courses/6-172-performance-engineering-of-software-systems-fall-2018/" },
					{ label: "Agner Fog - Optimization manuals", url: "https://www.agner.org/optimize/" },
					{ label: "What Every Programmer Should Know About Memory (Ulrich Drepper)", url: "https://people.freebsd.org/~lstewart/articles/cpumemory.pdf" },
					{ label: "Google Benchmark", url: "https://github.com/google/benchmark" }
				],
				practice: [
					{
						q: "Two threads increment separate counters that sit next to each other in memory, and performance collapses. Diagnose and fix.",
						a: "False sharing: both counters share a 64-byte cache line, so each write invalidates the other core's copy. Pad/align each counter to its own cache line with alignas(64), or give each thread a local counter and merge periodically."
					},
					{
						q: "Why can struct-of-arrays beat array-of-structs in a market-data pipeline?",
						a: "If the hot loop only reads prices, SoA packs prices contiguously, improving cache utilization and enabling SIMD. AoS wastes cache bandwidth fetching unused fields from each struct."
					},
					{
						q: "Write a branchless integer absolute value expression.",
						a: "int mask = x >> 31; return (x + mask) ^ mask;. For non-negative x the mask is 0; for negative x it is -1. Modern compilers may also emit conditional moves for a plain if/else, so measure."
					},
					{
						q: "Approximate the latency gap between an L1 cache hit and a DRAM access.",
						a: "L1 is about 1 ns (roughly 4 cycles), while DRAM is about 60-100 ns. A cache miss can cost two orders of magnitude more than an L1 hit, which is why locality dominates hot-path design."
					},
					{
						q: "What is an object pool and why use one on the matching-engine hot path?",
						a: "A pre-allocated array of reusable objects. It avoids malloc/free syscalls, allocator locks, and fragmentation, giving deterministic latency and keeping objects contiguous in cache."
					},
					{
						q: "What are the pitfalls of benchmarking with rdtsc?",
						a: "The timestamp counter can be reordered unless serialized (lfence/rdtscp), its frequency may differ from the core clock, and virtualization or frequency scaling can distort results. Warm up caches, pin the thread, and report distributions rather than a single run."
					}
				]
			},
			{
				code: "6.3",
				id: "6-3",
				title: "Concurrency & Low-Latency Networking",
				subtopics: [
					"Multithreading primitives: std::thread, std::jthread, mutexes, condition variables, and why OS context switches destroy tail latency.",
					"Lock-free programming: std::atomic, memory ordering (acquire, release, relaxed), compare-and-swap, and the ABA problem.",
					"Designing a lock-free single-producer single-consumer (SPSC) ring buffer for inter-thread messaging.",
					"Financial networking: socket programming, TCP order entry (FIX/binary) vs UDP multicast market data, epoll, and kernel bypass concepts (DPDK, Solarflare OpenOnload)."
				],
				resources: [
					{ label: "Beej's Guide to Network Programming", url: "https://beej.guide/bgnet/" },
					{ label: "Anthony Williams - C++ Concurrency in Action", url: "https://www.manning.com/books/c-plus-plus-concurrency-in-action-second-edition" },
					{ label: "Linux epoll(7) man page", url: "https://man7.org/linux/man-pages/man7/epoll.7.html" },
					{ label: "DPDK - Data Plane Development Kit", url: "https://www.dpdk.org/" }
				],
				practice: [
					{
						q: "Describe the indices of an SPSC ring buffer and the condition for a full buffer.",
						a: "A write index (head) is advanced only by the producer and a read index (tail) only by the consumer. With capacity N (a power of two), the buffer is full when head - tail == N and empty when head == tail; index with pos & (N - 1)."
					},
					{
						q: "Why does the producer use memory_order_release and the consumer memory_order_acquire?",
						a: "Release ensures all payload writes are visible before the head update is published. Acquire ensures the consumer sees those payload writes after observing the new head, preventing the CPU or compiler from reordering data access across the flag."
					},
					{
						q: "What is the ABA problem in lock-free programming?",
						a: "A CAS sees the value A, another thread changes it to B and back to A, and the first CAS succeeds even though the state changed. Fixes include version counters, tagged pointers, or hazard pointers."
					},
					{
						q: "Why do exchanges use UDP multicast for market data but TCP for order entry?",
						a: "Market data is one-to-many and time-perishable: UDP multicast avoids handshakes and head-of-line blocking, and stale packets can be dropped. Order entry requires reliable, ordered, acknowledged delivery, so TCP (or a reliable session protocol) is used."
					},
					{
						q: "Contrast level-triggered and edge-triggered epoll.",
						a: "Level-triggered reports a file descriptor whenever it is ready, so you can read partially. Edge-triggered reports only on state changes, so you must drain the socket until EAGAIN or you may never be notified again."
					},
					{
						q: "How should the producer and consumer indices be laid out in memory, and why?",
						a: "Place them in separate cache lines (alignas(64)) to avoid false sharing between the producer core and consumer core. The payload ring itself should be contiguous and sized to a power of two for cheap masking."
					}
				]
			}
		],
		project: {
			title: "Hands-On Project 6: High-Throughput Limit Order Book in C++",
			points: [
				"Implement a standalone C++20 matching engine supporting ADD, CANCEL, and MODIFY with strict price-time priority using intrusive doubly-linked lists per price level and O(1) cancel lookup.",
				"Eliminate dynamic heap allocation on the hot path with a pre-allocated object pool.",
				"Benchmark p50 and p99.9 latency over 1,000,000 simulated ITCH/order messages and document each optimization."
			]
		}
	}
];

if (typeof window !== "undefined") {
	window.QUANT_SYLLABUS_B = QUANT_SYLLABUS_B;
}
