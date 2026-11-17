// QuantBridge - Extended Quiz Bank
// Concept checks mapped one-to-one onto the syllabus subtopics.

(function () {
	if (typeof QUANT_DATA === "undefined") return;

	const extraQuizzes = [
		{
			id: "qz13",
			topic: "Calculus & Optimization",
			question: "For a differentiable function f(x,y), the gradient vector grad f at a point points in the direction of:",
			options: [
				"Steepest descent",
				"Steepest ascent (maximum increase)",
				"Zero change in f",
				"The nearest critical point"
			],
			correct: 1,
			explanation: "The directional derivative in unit direction u is grad f · u, maximized when u is parallel to grad f. So grad f points toward the greatest increase; -grad f points toward steepest descent."
		},
		{
			id: "qz14",
			topic: "Calculus & Optimization",
			question: "Maximize xy subject to x + y = 10. The maximum value is:",
			options: ["20", "25", "50", "100"],
			correct: 1,
			explanation: "With Lagrange multipliers, y = lambda and x = lambda, so x = y = 5. The maximum is 5 x 5 = 25. This is also the AM-GM result: for fixed sum, the product is maximized when the numbers are equal."
		},
		{
			id: "qz15",
			topic: "Linear Algebra & Stats",
			question: "A real symmetric matrix is positive semi-definite if and only if:",
			options: [
				"All eigenvalues are non-negative",
				"All entries are positive",
				"The determinant is positive",
				"It is invertible"
			],
			correct: 0,
			explanation: "By the spectral theorem, a real symmetric matrix has real eigenvalues and an orthonormal eigenbasis. Positive semi-definiteness means x^T A x >= 0 for all x, equivalent to every eigenvalue being >= 0. A positive determinant alone is not sufficient."
		},
		{
			id: "qz16",
			topic: "Linear Algebra & Stats",
			question: "A 4x7 matrix has rank 4. What is its nullity?",
			options: ["0", "3", "4", "7"],
			correct: 1,
			explanation: "Rank-nullity states that rank + nullity = number of columns. Here 4 + nullity = 7, so nullity = 3. The null space has dimension 3."
		},
		{
			id: "qz17",
			topic: "Probability & Brainteasers",
			question: "A test for a disease with 1% prevalence has 99% sensitivity and 95% specificity. Given a positive test, the probability of disease is closest to:",
			options: ["99%", "16.7%", "50%", "95%"],
			correct: 1,
			explanation: "P(D|+) = (0.01)(0.99) / [(0.01)(0.99) + (0.99)(0.05)] = 0.0099/0.0594 = 1/6, about 16.7%. Low base rates make false positives dominate."
		},
		{
			id: "qz18",
			topic: "Probability & Brainteasers",
			question: "A fair die is rolled until the first 6 appears. What is the expected number of rolls?",
			options: ["3", "5", "6", "36"],
			correct: 2,
			explanation: "The number of rolls is Geometric with success probability 1/6, whose mean is 1/p = 6. The variance is (1-p)/p^2 = 30."
		},
		{
			id: "qz19",
			topic: "Probability & Brainteasers",
			question: "There are 4 equally likely coupon types. What is the expected number of draws to collect all 4?",
			options: ["4", "6.25", "8.33", "10"],
			correct: 2,
			explanation: "E[T] = 4(1 + 1/2 + 1/3 + 1/4) = 4(2.0833) = 8.33. The final coupon dominates the wait."
		},
		{
			id: "qz20",
			topic: "Programming & Data",
			question: "Under NumPy broadcasting, adding an array of shape (3,1) to one of shape (1,5) produces an array of shape:",
			options: ["(3,1)", "(1,5)", "(3,5)", "Error"],
			correct: 2,
			explanation: "Dimensions align from the right: 1 broadcasts to 5 and 1 broadcasts to 3, yielding (3,5). Broadcasting stretches size-1 dimensions without copying data explicitly."
		},
		{
			id: "qz21",
			topic: "Programming & Data",
			question: "Which pandas operation performs a point-in-time join on the nearest prior timestamp, helping avoid look-ahead bias?",
			options: ["merge", "merge_asof", "concat", "pivot_table"],
			correct: 1,
			explanation: "merge_asof matches each left timestamp to the most recent right timestamp at or before it. A regular merge on exact timestamps would miss asynchronous data and tempt forward-filling from the future."
		},
		{
			id: "qz22",
			topic: "Programming & Data",
			question: "The worst-case time complexity of a lookup in a hash table with chaining is:",
			options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
			correct: 2,
			explanation: "Average lookup is O(1), but if all keys collide into one bucket, the chain is scanned linearly, giving O(n) worst case. Good hashing and load-factor control keep it near O(1)."
		},
		{
			id: "qz23",
			topic: "Programming & Data",
			question: "In FX arbitrage detection with Bellman-Ford, an arbitrage opportunity corresponds to:",
			options: [
				"A positive-weight cycle",
				"A negative-weight cycle with edge weights -ln(rate)",
				"A shortest path longer than 3 hops",
				"Any cycle in the graph"
			],
			correct: 1,
			explanation: "A profitable currency cycle has a product of rates greater than 1, which becomes a sum of -ln(rate) less than 0. Bellman-Ford detects it by finding a negative-weight cycle."
		},
		{
			id: "qz24",
			topic: "Markets & Fixed Income",
			question: "A bond portfolio has modified duration 6. A parallel +1% yield shock causes an approximate price change of:",
			options: ["+6%", "-6%", "-0.6%", "+0.6%"],
			correct: 1,
			explanation: "dP/P ≈ -D_mod x dy = -6 x 0.01 = -6%. Convexity adds a small positive second-order correction, so the actual loss is slightly less than 6%."
		},
		{
			id: "qz25",
			topic: "Derivatives & Options",
			question: "A stock trades at $100 with continuous dividend yield 2%. The risk-free rate is 5%. The 1-year forward price is closest to:",
			options: ["$103.05", "$105.13", "$102.02", "$107.00"],
			correct: 0,
			explanation: "F = S e^((r-q)T) = 100 e^(0.03) = $103.05. The dividend yield lowers the forward because the holder of the forward does not receive the dividends."
		},
		{
			id: "qz26",
			topic: "Derivatives & Options",
			question: "If C - P > S - K e^(-rT) for European options, the arbitrage is to:",
			options: [
				"Buy the call, sell the put, short the stock, and lend",
				"Sell the call, buy the put, buy the stock, and borrow",
				"Buy both the call and the put",
				"Do nothing; the inequality is impossible"
			],
			correct: 1,
			explanation: "The synthetic call (put + stock - cash) is cheaper than the actual call, so buy the cheap synthetic and sell the rich call: sell call, buy put, buy stock, and borrow the present value of K. This locks in the difference with zero terminal payoff risk."
		},
		{
			id: "qz27",
			topic: "Market Microstructure",
			question: "Best bid $99.90 with 4,000 shares; best ask $100.10 with 1,000 shares. The micro-price is:",
			options: ["$100.00", "$100.06", "$99.94", "$100.10"],
			correct: 1,
			explanation: "Micro-price = (99.90 x 1,000 + 100.10 x 4,000)/5,000 = 100.06. Heavy bid depth implies buying pressure, tilting the estimate toward the ask."
		},
		{
			id: "qz28",
			topic: "Market Microstructure",
			question: "Which order type executes immediately for whatever quantity is available and cancels any remainder?",
			options: ["Post-only", "FOK", "IOC", "Stop-limit"],
			correct: 2,
			explanation: "IOC (immediate-or-cancel) fills what it can immediately and cancels the rest. FOK requires the entire quantity to fill immediately or the whole order cancels. Post-only only adds liquidity."
		},
		{
			id: "qz29",
			topic: "Portfolio & Risk",
			question: "Two assets have sigma1 = 20%, sigma2 = 30%, correlation 0.3. The minimum-variance portfolio volatility is approximately:",
			options: ["18.7%", "20.0%", "25.0%", "30.0%"],
			correct: 0,
			explanation: "The minimum-variance weights are about 76.6% and 23.4%, giving variance 0.03485 and volatility 18.67%. Diversification makes the portfolio safer than the less volatile asset alone."
		},
		{
			id: "qz30",
			topic: "Portfolio & Risk",
			question: "The risk-free rate is 4%, the equity risk premium is 6%, and a stock has beta 1.2. Its CAPM expected return is:",
			options: ["7.2%", "10.0%", "11.2%", "12.0%"],
			correct: 2,
			explanation: "E[R] = rf + beta x ERP = 4% + 1.2 x 6% = 11.2%. Beta measures systematic risk; idiosyncratic risk is not compensated in CAPM."
		},
		{
			id: "qz31",
			topic: "Derivatives & Options",
			question: "In a one-step binomial model with u = 1.2, d = 0.8, and r = 5% continuously compounded, the risk-neutral up probability is:",
			options: ["0.50", "0.628", "0.750", "0.372"],
			correct: 1,
			explanation: "p = (e^(rT) - d)/(u - d) = (1.05127 - 0.8)/0.4 = 0.628. This probability makes the discounted stock price a martingale; it is not the real-world probability."
		},
		{
			id: "qz32",
			topic: "Stochastic Calculus",
			question: "Applying Ito's lemma to f(W_t) = W_t^2 gives:",
			options: ["2W_t dW_t", "2W_t dW_t + dt", "W_t dW_t + dt", "dt"],
			correct: 1,
			explanation: "f_t = 0, f_x = 2W, f_xx = 2, and (dW)^2 = dt, so d(W^2) = 2W dW + dt. The extra dt is the Ito correction that ordinary calculus misses."
		},
		{
			id: "qz33",
			topic: "Stochastic Calculus",
			question: "For GBM dS = mu S dt + sigma S dW, the expected terminal price E[S_T] is:",
			options: ["S0 e^(mu T)", "S0 e^((mu - sigma^2/2)T)", "S0 e^((mu + sigma^2/2)T)", "S0 (1 + mu T)"],
			correct: 0,
			explanation: "The solution is S_T = S0 exp((mu - sigma^2/2)T + sigma W_T). Taking expectations multiplies by exp(sigma^2 T/2), leaving E[S_T] = S0 e^(mu T). The median grows at mu - sigma^2/2."
		},
		{
			id: "qz34",
			topic: "Time Series & Econometrics",
			question: "A GARCH(1,1) model has alpha = 0.08 and beta = 0.90. The persistence alpha + beta is:",
			options: ["0.82", "0.90", "0.98", "1.08"],
			correct: 2,
			explanation: "Persistence is alpha + beta = 0.98. Shocks decay slowly, with a half-life of about ln(0.5)/ln(0.98) = 34 periods. If alpha + beta = 1, the model is IGARCH and shocks never decay."
		},
		{
			id: "qz35",
			topic: "Time Series & Econometrics",
			question: "Two I(1) series are cointegrated if:",
			options: [
				"Their returns have correlation above 0.9",
				"Some linear combination of them is stationary (I(0))",
				"Both have zero mean",
				"One is a lagged version of the other"
			],
			correct: 1,
			explanation: "Cointegration means a stationary long-run equilibrium relationship exists: y_t - beta x_t is I(0). High correlation alone does not imply cointegration, and two independent random walks can be spuriously correlated."
		},
		{
			id: "qz36",
			topic: "Backtesting & ML",
			question: "A researcher tests 200 strategy variants and reports the best Sharpe ratio. The Deflated Sharpe Ratio is used to:",
			options: [
				"Annualize the Sharpe ratio",
				"Adjust significance for the number of trials and non-normal returns",
				"Remove the risk-free rate from returns",
				"Guarantee the strategy will work live"
			],
			correct: 1,
			explanation: "Testing many variants inflates the maximum Sharpe even under zero skill. The DSR adjusts for the number of trials, the variance of trial Sharpe ratios, sample length, skewness, and kurtosis, giving a selection-aware probability of true skill."
		},
		{
			id: "qz37",
			topic: "Backtesting & ML",
			question: "In purged K-fold cross-validation for 5-day forward-return labels, purging removes:",
			options: [
				"All samples with missing data",
				"Training samples whose label windows overlap the test window",
				"Every sample after the test window",
				"The largest 5% of returns"
			],
			correct: 1,
			explanation: "Overlapping label windows leak future information across folds. Purging drops training observations whose label horizon intersects the test period; embargoing additionally removes a buffer after the test set to handle serial correlation."
		},
		{
			id: "qz38",
			topic: "Systems & Networking",
			question: "False sharing occurs when:",
			options: [
				"Two threads share a mutex",
				"Two threads modify independent variables on the same 64-byte cache line",
				"A pointer is dereferenced after free",
				"A cache is flushed to disk"
			],
			correct: 1,
			explanation: "Independent variables on one cache line cause the coherence protocol to invalidate the whole line on every write, creating ping-pong traffic between cores. Align hot variables to separate cache lines with alignas(64)."
		},
		{
			id: "qz39",
			topic: "Systems & Networking",
			question: "Why is a struct-of-arrays layout often faster than an array-of-structs for a hot analytics loop?",
			options: [
				"It uses less total memory in every case",
				"It packs the fields actually used contiguously, improving cache utilization and SIMD",
				"It avoids all pointer arithmetic",
				"It is required by the C++ standard"
			],
			correct: 1,
			explanation: "SoA stores each field in its own contiguous array, so a loop over prices loads only prices. AoS wastes cache bandwidth on unused fields. The best layout depends on the access pattern."
		},
		{
			id: "qz40",
			topic: "Systems & Networking",
			question: "Head-of-line blocking is a key reason exchanges use UDP multicast for market data. It occurs when:",
			options: [
				"A lost TCP packet stalls delivery of all later packets until retransmission",
				"UDP packets arrive out of order",
				"Two threads write the same cache line",
				"A hash table has too many collisions"
			],
			correct: 0,
			explanation: "TCP enforces ordered, reliable delivery. If packet n is lost, later packets cannot be delivered to the application until n is retransmitted, creating a latency spike. UDP multicast avoids this, and stale market data can simply be dropped."
		}
	];

	extraQuizzes.forEach(q => {
		if (!QUANT_DATA.quizzes.some(existing => existing.id === q.id)) {
			QUANT_DATA.quizzes.push(q);
		}
	});
})();
