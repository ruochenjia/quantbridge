// QuantBridge - Extended Interview & Exam Question Bank
// New questions mapped to the subtopics of quant.tex (calculus, linear algebra,
// programming, markets, stochastic calculus, econometrics, ML, and systems).

(function () {
	if (typeof QUANT_DATA === "undefined") return;

	const extraQuestions = [
		{
			id: "q23",
			title: "Constrained Optimization with Lagrange Multipliers",
			firm: "Citadel",
			category: "Calculus & Optimization",
			difficulty: "Easy",
			question: "Maximize f(x,y) = x^2 y subject to the constraint x + y = 6, with x, y > 0. Use Lagrange multipliers and verify that the solution is a maximum.",
			hint: "Form L = x^2 y - lambda(x + y - 6), set all partial derivatives to zero, and compare candidate values.",
			solution: `**Lagrangian:**
$$\\mathcal{L} = x^2 y - \\lambda(x + y - 6)$$

**First-order conditions:**
$$\\frac{\\partial \\mathcal{L}}{\\partial x} = 2xy - \\lambda = 0, \\qquad \\frac{\\partial \\mathcal{L}}{\\partial y} = x^2 - \\lambda = 0, \\qquad x + y = 6$$

From the first two equations, $2xy = x^2$. Since $x > 0$, divide by $x$:
$$2y = x$$

Substitute into the constraint:
$$2y + y = 6 \\implies y = 2, \\quad x = 4$$

The objective is $f(4,2) = 16 \\times 2 = 32$.

**Check the boundary:** as $x \\to 0$ or $y \\to 0$, $f \\to 0$, so 32 is the global maximum on the positive quadrant.

**Answer:** $x = 4$, $y = 2$, maximum value 32.`,
			tags: ["Lagrange", "Optimization", "Calculus"]
		},
		{
			id: "q24",
			title: "Second-Order P&L Attribution: Delta, Gamma, Theta",
			firm: "Optiver",
			category: "Derivatives & Arbitrage",
			difficulty: "Medium",
			question: "A delta-hedged option portfolio has Gamma = 0.06 per $1 move and Theta = -$40 per day. The underlying moves $3 in one day. Estimate the P&L, and explain when the portfolio makes money.",
			hint: "Use dV ≈ (1/2) Gamma (dS)^2 + Theta dt. Remember the portfolio is delta-hedged, so the Delta term vanishes.",
			solution: `**Second-order Taylor expansion (delta-hedged):**
$$dP\\&L \\approx \\frac{1}{2}\\Gamma (dS)^2 + \\Theta\\, dt + \\nu\\, d\\sigma$$

Plug in:
$$dP\\&L \\approx \\frac{1}{2}(0.06)(3)^2 - 40(1) = 0.27 - 40 = -\\$39.73$$

**Interpretation:**
- The long-gamma position earned only $0.27 from the $3 move.
- It paid $40 of time decay.
- The move was too small relative to the implied volatility priced into Theta.

**Break-even move:** set $(1/2)\\Gamma (dS)^2 = 40$, so $(dS)^2 = 40/0.03 = 1333$ and $|dS| \\approx \\$36.5$. The underlying must move about $36.5 in a day to offset one day of decay.

**Conclusion:** long gamma profits when realized volatility is high enough that the convexity gain exceeds theta; otherwise it bleeds time value.`,
			tags: ["Greeks", "Gamma", "Theta", "P&L Attribution"]
		},
		{
			id: "q25",
			title: "Least Squares as an Orthogonal Projection",
			firm: "Two Sigma",
			category: "Linear Algebra & Stats",
			difficulty: "Medium",
			question: "Show that the OLS fitted values y_hat = X beta_hat are the orthogonal projection of y onto the column space of X. What does this imply about the residuals?",
			hint: "Minimize ||y - X beta||^2, take the gradient with respect to beta, and interpret the normal equations X^T(y - X beta) = 0.",
			solution: `**Minimize squared error:**
$$\\hat{\\beta} = \\arg\\min_\\beta \\|y - X\\beta\\|^2$$

**Gradient and normal equations:**
$$\\nabla_\\beta \\|y - X\\beta\\|^2 = -2X^T(y - X\\beta) = 0$$
$$X^T X \\hat{\\beta} = X^T y \\implies \\hat{\\beta} = (X^T X)^{-1} X^T y$$

**Fitted values:**
$$\\hat{y} = X\\hat{\\beta} = X(X^T X)^{-1}X^T y = Py$$
where $P = X(X^T X)^{-1}X^T$ is the projection matrix onto $\\operatorname{col}(X)$.

**Properties of P:** $P^2 = P$ (idempotent) and $P^T = P$ (symmetric), which is exactly the definition of an orthogonal projection.

**Residuals:**
$$X^T(y - \\hat{y}) = X^T y - X^T X \\hat{\\beta} = 0$$
So the residual vector is orthogonal to every column of X (and to $\\hat{y}$). Geometrically, OLS drops a perpendicular from y to the column space.

**Implication:** if the residuals still correlate with a feature, that feature was omitted or the model is misspecified.`,
			tags: ["OLS", "Projection", "Linear Algebra"]
		},
		{
			id: "q26",
			title: "Cholesky Decomposition for Correlated Monte Carlo",
			firm: "D.E. Shaw",
			category: "Linear Algebra & Stats",
			difficulty: "Medium",
			question: "You have a 2x2 correlation matrix Rho = [[1, 0.6],[0.6, 1]]. Compute its Cholesky factor and explain how to generate two correlated standard normal variables from independent normals.",
			hint: "Write Rho = L L^T with L lower triangular, then multiply L by a vector of independent standard normals.",
			solution: `**Cholesky factor:**
$$L = \\begin{pmatrix} 1 & 0 \\\\ \\rho & \\sqrt{1-\\rho^2} \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 0.6 & 0.8 \\end{pmatrix}$$

Check:
$$LL^T = \\begin{pmatrix} 1 & 0 \\\\ 0.6 & 0.8 \\end{pmatrix}\\begin{pmatrix} 1 & 0.6 \\\\ 0 & 0.8 \\end{pmatrix} = \\begin{pmatrix} 1 & 0.6 \\\\ 0.6 & 0.36 + 0.64 \\end{pmatrix} = \\begin{pmatrix} 1 & 0.6 \\\\ 0.6 & 1 \\end{pmatrix}$$

**Simulation:**
Draw independent $Z_1, Z_2 \\sim \\mathcal{N}(0,1)$ and set
$$\\begin{pmatrix} X_1 \\\\ X_2 \\end{pmatrix} = L\\begin{pmatrix} Z_1 \\\\ Z_2 \\end{pmatrix} = \\begin{pmatrix} Z_1 \\\\ 0.6 Z_1 + 0.8 Z_2 \\end{pmatrix}$$

Then $\\operatorname{Var}(X_1) = 1$, $\\operatorname{Var}(X_2) = 0.36 + 0.64 = 1$, and $\\operatorname{Cov}(X_1,X_2) = 0.6$.

**Why it matters:** a valid covariance matrix must be positive semi-definite for a real Cholesky factor to exist. If it is not PSD, the correlation assumptions are internally inconsistent.`,
			tags: ["Cholesky", "Monte Carlo", "Correlation"]
		},
		{
			id: "q27",
			title: "Bellman-Ford and Triangular FX Arbitrage",
			firm: "Jump Trading",
			category: "Programming & DSA",
			difficulty: "Medium",
			question: "You are given a matrix of exchange rates between 6 currencies. Explain precisely how to detect a triangular arbitrage using Bellman-Ford, including the edge weights and the detection condition.",
			hint: "Multiplying rates becomes adding logs. A profitable cycle has a product greater than 1, which becomes a negative cycle after taking negative logs.",
			solution: `**Graph construction:**
- One node per currency.
- For each directed rate $r_{ij}$ (units of currency j per unit of currency i), add an edge $i \\to j$ with weight
$$w_{ij} = -\\ln(r_{ij})$$

**Why logs:** a cycle $i \\to j \\to k \\to i$ is profitable if
$$r_{ij} r_{jk} r_{ki} > 1$$
Taking logs:
$$\\ln r_{ij} + \\ln r_{jk} + \\ln r_{ki} > 0 \\iff w_{ij} + w_{jk} + w_{ki} < 0$$
So a profitable arbitrage is exactly a **negative-weight cycle**.

**Algorithm:**
1. Initialize $d[s] = 0$ for a source node and $d[v] = \\infty$ otherwise.
2. Relax every edge $|V| - 1 = 5$ times: if $d[u] + w_{uv} < d[v]$, update.
3. Run one more relaxation pass over all edges. If any edge can still be relaxed, a negative cycle exists.

**Reconstructing the trade:** walk parent pointers from the relaxed edge to recover the cycle, then execute the currency conversions and verify the product of rates exceeds 1 after fees and bid-ask spreads.

**Complexity:** $O(|V||E|)$, trivial for 6 currencies. Real arbitrage must also account for transaction costs, latency, and rate staleness.`,
			tags: ["Bellman-Ford", "FX Arbitrage", "Graphs"]
		},
		{
			id: "q28",
			title: "Design an O(1) LRU Cache for Market Data",
			firm: "Hudson River Trading (HRT)",
			category: "Programming & DSA",
			difficulty: "Medium",
			question: "Design a data structure supporting get(key) and put(key, value) in O(1) average time with a fixed capacity, evicting the least-recently-used entry. What structures do you combine and why?",
			hint: "A hash map alone cannot track recency order efficiently. Combine it with a doubly linked list.",
			solution: `**Data structures:**
1. A hash map from key to a node pointer: $O(1)$ lookup.
2. A doubly linked list storing nodes in recency order: most recent at the head, least recent at the tail.

**Node fields:** key, value, prev, next.

**get(key):**
- If absent, return miss.
- If present, unlink the node and move it to the head (now most recent), return its value.
- Both operations are $O(1)$ because the hash map gives the node directly.

**put(key, value):**
- If key exists, update the value and move the node to the head.
- If new and capacity is full, remove the tail node and delete its key from the hash map, then insert the new node at the head.
- $O(1)$ average.

**Caveats for a trading system:** hash-map node allocation can trigger heap allocations on the hot path; use a pre-allocated node pool or an intrusive list embedded in the order objects. For deterministic latency, a flat open-addressing map is often preferred over std::unordered_map.

**Complexity:** $O(1)$ average time, $O(\\text{capacity})$ memory.`,
			tags: ["Hash Map", "Linked List", "LRU", "Design"]
		},
		{
			id: "q29",
			title: "Pandas Look-Ahead Bias in a Rolling Signal",
			firm: "Two Sigma",
			category: "Programming & DSA",
			difficulty: "Easy",
			question: "You compute signal = (close - close.rolling(20).mean()) / close.rolling(20).std() and trade at the same day's close. Why is the backtest biased, and how do you fix it?",
			hint: "The rolling statistic at time t includes the close at time t. Can you know that close before trading at it?",
			solution: `**The bug:** the rolling mean and standard deviation at row $t$ use the closing price at row $t$. If the trade is also executed at the close of row $t$, the signal and the execution use the same information simultaneously, which is not implementable. This is look-ahead (same-bar) bias.

**Fix:** shift the signal by one bar before applying it to returns:
$$\\text{position}_t = \\text{signal}_{t-1}$$

In pandas:
\`\`\`python
mu = close.rolling(20).mean()
sd = close.rolling(20).std()
signal = (close - mu) / sd
position = signal.shift(1)          # trade at t using information through t-1
pnl = position * close.pct_change().shift(-1)
\`\`\`

**Subtle point:** \`shift(-1)\` on the return is how you align a position at t with the return from t to t+1. Equivalently, use \`position * returns\` where \`returns = close.pct_change()\` and \`position\` was already shifted.

**Check:** every feature timestamp must be strictly earlier than the execution timestamp.`,
			tags: ["Pandas", "Look-Ahead Bias", "Backtesting"]
		},
		{
			id: "q30",
			title: "Duration, Convexity, and a 100bp Rate Shock",
			firm: "Citadel",
			category: "Markets & Fixed Income",
			difficulty: "Medium",
			question: "A bond portfolio has modified duration 7.5 and convexity 120. Estimate the percentage price change for a +100bp parallel shift in yields, and explain why convexity improves the estimate.",
			hint: "Use dP/P ≈ -D_mod dy + (1/2) C (dy)^2 with dy expressed in decimal form.",
			solution: `**First-order (duration) effect:**
$$\\frac{dP}{P} \\approx -D_{\\text{mod}} \\Delta y = -7.5 \\times 0.01 = -7.5\\%$$

**Second-order (convexity) effect:**
$$\\frac{1}{2} C (\\Delta y)^2 = \\frac{1}{2}(120)(0.01)^2 = 0.006 = +0.6\\%$$

**Total estimate:**
$$-7.5\\% + 0.6\\% = -6.9\\%$$

**Why convexity helps:** duration is a tangent-line approximation and overstates the loss for a large move. The true price-yield curve is convex, so the actual price is above the tangent line. For a yield decrease, both terms are positive and convexity adds to the gain.

**Limits:** convexity is still a local approximation. For very large shocks or non-parallel curve shifts, key-rate durations or full repricing are required.`,
			tags: ["Bonds", "Duration", "Convexity"]
		},
		{
			id: "q31",
			title: "Contango, Backwardation, and Roll Yield",
			firm: "Optiver",
			category: "Markets & Fixed Income",
			difficulty: "Easy",
			question: "Crude oil spot is $80. The 1-month future is $81 and the 2-month future is $82. Is the curve in contango or backwardation? What is the approximate annualized roll yield for a long-only futures investor?",
			hint: "Compare futures to spot. Rolling a long position sells the expiring contract and buys the next, more expensive one.",
			solution: `**Curve shape:** futures prices increase with maturity ($81 < $82), so the curve is in **contango**.

**Roll mechanics for a long:** as the front contract approaches expiry it converges toward spot ($80). To maintain exposure, the investor sells the expiring contract near $81 and buys the next at $82, realizing a loss of about $1 per barrel. This is negative roll yield.

**Approximate annualized roll yield:**
$$\\text{Roll} \\approx \\frac{F_{\\text{near}} - F_{\\text{far}}}{F_{\\text{far}}} \\times 12 \\approx \\frac{81 - 82}{82} \\times 12 \\approx -14.6\\% \\text{ per year}$$

**Caveat:** this assumes the curve shape persists. In backwardation (futures below spot), rolling a long earns positive roll yield. Commodity index returns decompose into spot return plus roll yield plus collateral yield.`,
			tags: ["Commodities", "Contango", "Roll Yield"]
		},
		{
			id: "q32",
			title: "Forward Price with Dividends and Storage Costs",
			firm: "IMC Trading",
			category: "Derivatives & Arbitrage",
			difficulty: "Easy",
			question: "A stock trades at $100, pays a continuous dividend yield of 2%, and the risk-free rate is 5%. What is the 1-year forward price? If the market forward is $104, is there an arbitrage?",
			hint: "F = S e^((r - q)T). Compare the fair forward with the quoted forward.",
			solution: `**Fair forward:**
$$F_0 = S_0 e^{(r - q)T} = 100 e^{(0.05 - 0.02)(1)} = 100 e^{0.03} = \\$103.05$$

**Market forward is $104**, which is rich by about $0.955.

**Arbitrage construction:**
1. Buy $e^{-qT} = e^{-0.02} = 0.9802$ shares today for $98.02.
2. Finance the purchase by borrowing $98.02 at 5%.
3. Sell one forward contract at $104.

Because the stock pays a 2% continuous dividend yield, reinvesting the dividends grows 0.9802 shares into exactly 1 share at maturity.

**At maturity:**
- Deliver the 1 share and receive $104.
- Repay the loan: $98.02 e^{0.05} = $103.045.
- Riskless profit: $104 - $103.045 = **$0.955** per share.

**Rule:** arbitrage exists whenever the quoted forward differs from $S e^{(r-q)T}$ by more than transaction costs. If the forward were below $103.05, the reverse trade (short stock, invest proceeds, buy forward) would be profitable.`,
			tags: ["Forwards", "Dividends", "No-Arbitrage"]
		},
		{
			id: "q33",
			title: "Interest Rate Swap as a Bond Portfolio",
			firm: "Citadel",
			category: "Derivatives & Arbitrage",
			difficulty: "Medium",
			question: "Explain why a plain-vanilla interest rate swap can be valued as a difference of two bonds. If the fixed rate is above the current par swap rate, which bond is more valuable for a payer swap?",
			hint: "A payer swap pays fixed and receives floating. The floating leg is equivalent to a floating-rate note that resets to par at each payment date.",
			solution: `**Decomposition:**
A payer swap (pay fixed $c$, receive floating) has the same cash flows as:
- **Long** a floating-rate note (FRN) that pays the floating rate and returns principal.
- **Short** a fixed-rate bond with coupon $c$ and the same principal and maturity.

$$V_{\\text{payer}} = V_{\\text{FRN}} - V_{\\text{fixed}}$$

**Floating leg:** immediately after a reset, a par FRN is worth its notional $N$ (its coupon is the market rate). So $V_{\\text{FRN}} \\approx N$.

**Fixed leg:** $V_{\\text{fixed}} = N c \\sum_{i=1}^{n} DF(t_i) + N \\cdot DF(t_n)$.

**If the fixed rate c is above the current par swap rate:** the fixed bond yields more than the market, so it is worth more than par. For a payer swap, you are short that rich bond, so the swap has **negative value** to the payer (and positive to the receiver).

**At inception** the fixed rate is set so that $V_{\\text{fixed}} = N$ and the swap value is zero. Afterwards, the swap value moves with the difference between the locked fixed rate and the current swap curve.`,
			tags: ["Swaps", "Bonds", "Valuation"]
		},
		{
			id: "q34",
			title: "Butterfly Spread Arbitrage Bound",
			firm: "SIG (Susquehanna)",
			category: "Derivatives & Arbitrage",
			difficulty: "Medium",
			question: "European call prices for strikes 90, 100, and 110 are C(90) = 14, C(100) = 7, C(110) = 3. Is there an arbitrage? Construct the butterfly and compute the payoff.",
			hint: "A long butterfly buys the low strike, sells two of the middle, and buys the high strike. Its payoff is non-negative, so its cost must be non-negative.",
			solution: `**Butterfly cost:**
$$C(90) - 2C(100) + C(110) = 14 - 14 + 3 = 3 > 0$$
The cost is positive, so this particular butterfly is not a free lunch.

**But check convexity in strike.** For equally spaced strikes, option prices must be convex:
$$C(100) \\le \\frac{C(90) + C(110)}{2} = \\frac{14 + 3}{2} = 8.5$$
Here $C(100) = 7 \\le 8.5$, so convexity holds. No butterfly arbitrage.

**Payoff of the long butterfly at expiry:**
- $S_T \\le 90$: 0
- $90 < S_T \\le 100$: $S_T - 90$
- $100 < S_T \\le 110$: $110 - S_T$
- $S_T > 110$: 0

Maximum payoff is $10 at $S_T = 100$, achieved for a cost of $3, so maximum profit is $7.

**Arbitrage condition:** if the cost were negative, you would receive cash today and own a non-negative payoff at expiry - a pure arbitrage. Hence $C(K_1) - 2C(K_2) + C(K_3) \\ge 0$ for equally spaced strikes.`,
			tags: ["Options", "Butterfly", "Convexity", "Arbitrage"]
		},
		{
			id: "q35",
			title: "Price-Time Priority Matching and VWAP",
			firm: "Optiver",
			category: "Market Microstructure",
			difficulty: "Easy",
			question: "The ask side has 200 shares at $100.05 (order A, arrived first), 200 at $100.05 (order B, arrived second), and 300 at $100.06. A market buy for 500 shares arrives. Which orders fill, and what is the volume-weighted average price?",
			hint: "Price-time priority fills the best price first and, within a price, the earliest order first.",
			solution: `**Price-time priority:**
1. $100.05 is better than $100.06, so both A and B are ahead.
2. Within $100.05, A arrived first: fill 200 from A.
3. Fill 200 from B.
4. 100 shares remain, which fill at $100.06.

**VWAP:**
$$\\text{VWAP} = \\frac{200(100.05) + 200(100.05) + 100(100.06)}{500} = \\frac{40{,}020 + 10{,}006}{500} = \\frac{50{,}026}{500} = \\$100.052$$

**Slippage:** the best ask was $100.05 but the average fill is $100.052, so the order paid $0.002 per share of slippage by walking into the next level. For 500 shares that is $1.00.

**Note:** under pro-rata matching, the 500 shares at $100.05 would be split proportionally between A and B instead of FIFO.`,
			tags: ["Order Book", "FIFO", "VWAP", "Slippage"]
		},
		{
			id: "q36",
			title: "Micro-Price and Short-Horizon Direction",
			firm: "Jane Street",
			category: "Market Microstructure",
			difficulty: "Easy",
			question: "Best bid is $99.90 with 4,000 shares and best ask is $100.10 with 1,000 shares. Compute the micro-price and explain why it differs from the mid-price.",
			hint: "Weight each side by the opposite side's size: (bid x ask_size + ask x bid_size) / total size.",
			solution: `**Mid-price:**
$$\\frac{99.90 + 100.10}{2} = \\$100.00$$

**Micro-price:**
$$P_{\\text{micro}} = \\frac{P_{\\text{bid}} Q_{\\text{ask}} + P_{\\text{ask}} Q_{\\text{bid}}}{Q_{\\text{bid}} + Q_{\\text{ask}}} = \\frac{99.90(1{,}000) + 100.10(4{,}000)}{5{,}000}$$
$$= \\frac{99{,}900 + 400{,}400}{5{,}000} = \\$100.06$$

**Interpretation:** bid depth (4,000) is four times ask depth (1,000), so buyers are more aggressive/patient and the next trade is more likely to occur at the ask. The micro-price tilts upward toward the ask.

**Use:** short-horizon market-making and execution models use micro-price (or order-book imbalance) as a feature for next-tick direction. It is not a fair-value estimate; it is a flow-pressure estimate.`,
			tags: ["Micro-Price", "Order Imbalance", "Market Making"]
		},
		{
			id: "q37",
			title: "Square-Root Market Impact and Optimal Trade Size",
			firm: "Citadel",
			category: "Market Microstructure",
			difficulty: "Medium",
			question: "A stock has daily volatility 2% and average daily volume 10 million shares. Using an impact model cost = 0.3 x sigma x sqrt(Q/V), estimate the impact of trading 250,000 shares. What happens to the percentage cost if you double the order?",
			hint: "Compute Q/V first, then take the square root. Impact scales with the square root of participation.",
			solution: `**Participation rate:**
$$Q/V = 250{,}000 / 10{,}000{,}000 = 0.025 = 2.5\\%$$

**Impact:**
$$\\text{Cost} = 0.3 \\times 0.02 \\times \\sqrt{0.025} = 0.3 \\times 0.02 \\times 0.1581 = 0.000949 \\approx 9.5 \\text{ bps}$$

**If the order doubles to 500,000 shares:** $Q/V = 5\\%$ and $\\sqrt{0.05} = 0.2236$, so cost becomes
$$0.3 \\times 0.02 \\times 0.2236 = 0.00134 \\approx 13.4 \\text{ bps}$$

**Scaling:** doubling the order multiplies impact by $\\sqrt{2} = 1.414$, not 2. Total dollar cost still rises: $2 \\times 1.414 = 2.83$ times the original dollar cost.

**Practical use:** choose trade duration and participation rate to balance impact cost against volatility risk (Almgren-Chriss).`,
			tags: ["Market Impact", "Almgren-Chriss", "Execution"]
		},
		{
			id: "q38",
			title: "Minimum-Variance Portfolio of Two Assets",
			firm: "AQR",
			category: "Portfolio & Risk",
			difficulty: "Medium",
			question: "Assets have sigma1 = 20%, sigma2 = 30%, and correlation 0.3. Find the minimum-variance weights and the resulting portfolio volatility. Is it lower than the lower-volatility asset alone?",
			hint: "Use w1* = (sigma2^2 - rho sigma1 sigma2)/(sigma1^2 + sigma2^2 - 2 rho sigma1 sigma2).",
			solution: `**Numerator:**
$$\\sigma_2^2 - \\rho\\sigma_1\\sigma_2 = 0.09 - 0.3(0.2)(0.3) = 0.09 - 0.018 = 0.072$$

**Denominator:**
$$\\sigma_1^2 + \\sigma_2^2 - 2\\rho\\sigma_1\\sigma_2 = 0.04 + 0.09 - 0.036 = 0.094$$

**Weights:**
$$w_1^* = 0.072/0.094 = 0.766, \\quad w_2^* = 0.234$$

**Portfolio variance:**
$$\\sigma_p^2 = w_1^2(0.04) + w_2^2(0.09) + 2w_1w_2(0.3)(0.2)(0.3)$$
$$= 0.5868(0.04) + 0.0548(0.09) + 2(0.766)(0.234)(0.018)$$
$$= 0.02347 + 0.00493 + 0.00645 = 0.03485$$
$$\\sigma_p = \\sqrt{0.03485} = 18.67\\%$$

**Answer:** about 76.6% in asset 1 and 23.4% in asset 2, with volatility 18.67%.

**Key insight:** the minimum-variance portfolio volatility is **lower** than the 20% volatility of the less risky asset alone, because imperfect correlation ($\\rho = 0.3 < 1$) provides diversification. With $\\rho = 1$ there is no diversification benefit.`,
			tags: ["Markowitz", "Minimum Variance", "Diversification"]
		},
		{
			id: "q39",
			title: "One-Step Binomial Pricing and Replication",
			firm: "SIG (Susquehanna)",
			category: "Derivatives & Arbitrage",
			difficulty: "Medium",
			question: "S = 100, u = 1.2, d = 0.8, r = 5% continuously compounded, T = 1, K = 100. Price a European call using the risk-neutral measure, then verify with a replicating portfolio.",
			hint: "p = (e^(rT) - d)/(u - d); delta = (C_u - C_d)/(S(u - d)).",
			solution: `**Risk-neutral probability:**
$$p = \\frac{e^{rT} - d}{u - d} = \\frac{1.05127 - 0.8}{0.4} = 0.62818$$

**Terminal payoffs:**
$$C_u = \\max(120 - 100, 0) = 20, \\quad C_d = \\max(80 - 100, 0) = 0$$

**Price:**
$$C_0 = e^{-rT}[p C_u + (1-p)C_d] = e^{-0.05}(0.62818 \\times 20) = 0.95123 \\times 12.5636 = \\$11.95$$

**Replication:**
$$\\Delta = \\frac{C_u - C_d}{S(u-d)} = \\frac{20}{40} = 0.5$$
Buy 0.5 shares for $50. The cash position $B$ must satisfy:
$$0.5(120) + B e^{0.05} = 20 \\implies B e^{0.05} = -40 \\implies B = -38.05$$
So borrow $38.05 and buy half a share. The net cost is $50 - $38.05 = **$11.95**, matching the risk-neutral price.

**Interpretation:** p is not the real probability of an up move; it is the probability that makes the discounted stock a martingale.`,
			tags: ["Binomial", "Risk-Neutral", "Replication"]
		},
		{
			id: "q40",
			title: "Physical vs Risk-Neutral Measure",
			firm: "Jane Street",
			category: "Probability & Martingales",
			difficulty: "Medium",
			question: "A stock has real-world expected return 12% and volatility 20%. The risk-free rate is 4%. Explain the difference between the physical measure P and the risk-neutral measure Q, and why option pricing uses Q.",
			hint: "Under Q, the discounted stock price is a martingale. The drift changes from mu to r, but the volatility is the same.",
			solution: `**Physical measure P:** describes actual probabilities. Under GBM,
$$dS_t = \\mu S_t dt + \\sigma S_t dW_t^P$$
with $\\mu = 12\\%$ and $\\sigma = 20\\%$.

**Risk-neutral measure Q:** an equivalent probability measure under which the discounted stock price $e^{-rt}S_t$ is a martingale:
$$dS_t = r S_t dt + \\sigma S_t dW_t^Q$$
The drift becomes the risk-free rate $r = 4\\%$; volatility is unchanged.

**Girsanov theorem:** the two Brownian motions are related by
$$dW_t^Q = dW_t^P + \\frac{\\mu - r}{\\sigma}dt$$
so the market price of risk $(\\mu - r)/\\sigma$ shifts the drift.

**Why price under Q:** a derivative can be replicated by a self-financing portfolio of the stock and bond. Under no-arbitrage, its discounted price must be a martingale under some EMM. Therefore
$$V_0 = e^{-rT}\\mathbb{E}^Q[\\text{payoff}]$$
The real-world expected return $\\mu$ never appears, because the hedge removes directional risk. Different investors can disagree about $\\mu$ and still agree on the option price.

**Caveat:** Q is not a forecast. Real-world risk management, scenario analysis, and expected returns use P (or a subjective measure).`,
			tags: ["Risk-Neutral", "Girsanov", "Martingale"]
		},
		{
			id: "q41",
			title: "Ito's Lemma: d(W_t^2) and the Ito Correction",
			firm: "Citadel",
			category: "Stochastic Calculus",
			difficulty: "Medium",
			question: "Apply Ito's lemma to f(W_t) = W_t^2 and use the result to compute E[W_t^2]. Why does ordinary calculus fail here?",
			hint: "For f(x) = x^2, f' = 2x and f'' = 2. Include the (1/2) f'' (dW)^2 term with (dW)^2 = dt.",
			solution: `**Ito's lemma:**
$$df(t,W_t) = f_t dt + f_x dW_t + \\frac{1}{2}f_{xx}(dW_t)^2$$

For $f(x) = x^2$:
$$d(W_t^2) = 2W_t dW_t + \\frac{1}{2}(2)dt = 2W_t dW_t + dt$$

**Integrate from 0 to t:**
$$W_t^2 = W_0^2 + 2\\int_0^t W_s dW_s + t = 2\\int_0^t W_s dW_s + t$$

The Ito integral has expectation zero, so:
$$\\mathbb{E}[W_t^2] = t$$

**Why ordinary calculus fails:** classically, $(dW)^2$ would be negligible, giving $d(W^2) = 2W dW$ and zero expected value. But Brownian motion has infinite first variation and finite quadratic variation, $[W,W]_t = t$. The second-order term contributes a deterministic drift $t$. This is the origin of the Ito correction and of option Theta/Gamma.

**Check:** $\\operatorname{Var}(W_t^2) = \\mathbb{E}[W_t^4] - t^2 = 3t^2 - t^2 = 2t^2$.`,
			tags: ["Ito", "Quadratic Variation", "Brownian Motion"]
		},
		{
			id: "q42",
			title: "Implied vs Realized Volatility for a Delta-Hedged Book",
			firm: "Optiver",
			category: "Derivatives & Arbitrage",
			difficulty: "Medium",
			question: "You sell an ATM straddle at 20% implied volatility and delta-hedge it. Realized volatility over the option's life turns out to be 28%. Do you make or lose money, and roughly by how much?",
			hint: "Compare the theta collected at 20% implied with the gamma losses generated by 28% realized. The P&L is roughly proportional to implied^2 - realized^2.",
			solution: `**Core relationship:** for a delta-hedged option position, the expected P&L over a small interval is approximately
$$dP\\&L \\approx \\frac{1}{2}\\Gamma S^2 (\\sigma_{\\text{realized}}^2 - \\sigma_{\\text{implied}}^2)dt$$

**Short straddle:** you are short gamma. The sign flips, so
$$\\mathbb{E}[dP\\&L] \\approx -\\frac{1}{2}|\\Gamma| S^2 (\\sigma_{\\text{realized}}^2 - \\sigma_{\\text{implied}}^2)dt$$

With $\\sigma_{\\text{realized}} = 28\\%$ and $\\sigma_{\\text{implied}} = 20\\%$:
$$\\sigma_r^2 - \\sigma_i^2 = 0.0784 - 0.04 = 0.0384$$

**Loss** is proportional to $0.0384$, scaled by gamma, spot squared, and time to expiry. For an ATM option, gamma is largest near the strike and grows as expiry approaches, so the bleed accelerates.

**Intuition:** you sold insurance priced at 20% vol but had to pay out claims generated by 28% vol. Hedging forces you to buy high and sell low, and the extra 8 vol points of realized movement overwhelm the theta you collected.

**Rule of thumb:** a delta-hedged short option position is long theta and short gamma; it profits when realized < implied and loses when realized > implied.`,
			tags: ["Implied Volatility", "Realized Volatility", "Gamma", "Theta"]
		},
		{
			id: "q43",
			title: "Monte Carlo Standard Error and Antithetic Variates",
			firm: "Millennium",
			category: "Numerical Methods",
			difficulty: "Medium",
			question: "A Monte Carlo option price using 10,000 paths has a standard error of $0.10. How many paths are needed for a standard error of $0.025? How do antithetic variates help?",
			hint: "Monte Carlo error scales as 1/sqrt(N). Antithetic variates use Z and -Z pairs to induce negative correlation.",
			solution: `**Error scaling:**
$$SE \\propto \\frac{1}{\\sqrt{N}}$$

To reduce the error by a factor of 4 (from 0.10 to 0.025), increase the number of paths by $4^2 = 16$:
$$N = 10{,}000 \\times 16 = 160{,}000$$

**Antithetic variates:** for each path driven by normal vector $Z$, simulate a second path driven by $-Z$ and average the two payoffs. For a monotone payoff, the two payoffs are negatively correlated, so
$$\\operatorname{Var}\\left(\\frac{f(Z) + f(-Z)}{2}\\right) = \\frac{1}{2}\\operatorname{Var}(f(Z)) + \\frac{1}{2}\\operatorname{Cov}(f(Z), f(-Z))$$
The negative covariance reduces variance, often substantially, at the cost of generating paired paths. The estimator remains unbiased.

**Limit:** antithetic variates do not help much for non-monotone payoffs (e.g. some barrier or digital options) and can even increase variance. Control variates and quasi-Monte Carlo are alternatives.`,
			tags: ["Monte Carlo", "Standard Error", "Variance Reduction"]
		},
		{
			id: "q44",
			title: "Crank-Nicolson Scheme for the Black-Scholes PDE",
			firm: "QuantGuide",
			category: "Numerical Methods",
			difficulty: "Hard",
			question: "Explain how the Crank-Nicolson scheme discretizes the Black-Scholes PDE. What are its stability and accuracy properties, and what boundary conditions would you impose for a European call?",
			hint: "Average the explicit and implicit spatial operators at time levels n and n+1. It is the trapezoidal rule in time.",
			solution: `**PDE:**
$$\\frac{\\partial V}{\\partial t} + \\frac{1}{2}\\sigma^2 S^2 \\frac{\\partial^2 V}{\\partial S^2} + rS\\frac{\\partial V}{\\partial S} - rV = 0$$

Write it as $\\partial V/\\partial t = \\mathcal{L}V$, where $\\mathcal{L}$ is the spatial operator.

**Crank-Nicolson (trapezoidal in time):**
$$\\frac{V^{n+1} - V^n}{\\Delta t} = \\frac{1}{2}\\left(\\mathcal{L}V^{n+1} + \\mathcal{L}V^n\\right)$$

This produces a tridiagonal linear system for $V^{n+1}$:
$$\\left(I - \\frac{\\Delta t}{2}L\\right)V^{n+1} = \\left(I + \\frac{\\Delta t}{2}L\\right)V^n$$

**Properties:**
- Unconditionally stable for the diffusion problem.
- Second-order accurate in both $\\Delta t$ and $\\Delta S$.
- Can produce oscillations for discontinuous payoffs (e.g. digitals); Rannacher smoothing (a few implicit steps at the start) fixes this.

**Boundary conditions for a European call:**
- At $S = 0$: $V = 0$.
- As $S \\to S_{\\max}$: $V \\approx S - K e^{-r(T-t)}$ (deep in-the-money, delta ≈ 1).
- Terminal condition: $V(S,T) = \\max(S - K, 0)$.

**American options:** at each time step, apply $V = \\max(V, \\text{intrinsic})$; for the implicit scheme this requires PSOR or a penalty method because the exercise constraint couples the linear solve.`,
			tags: ["Finite Difference", "Crank-Nicolson", "PDE", "American Options"]
		},
		{
			id: "q45",
			title: "OLS, R-Squared, and Newey-West Standard Errors",
			firm: "AQR",
			category: "Time Series & Econometrics",
			difficulty: "Medium",
			question: "In a regression of strategy returns on the market factor, R^2 = 0.15 and the alpha t-statistic is 2.4 using ordinary standard errors but 1.6 using Newey-West. Which do you trust, and why?",
			hint: "Financial residuals are often heteroskedastic and autocorrelated. Ordinary OLS standard errors assume i.i.d. errors.",
			solution: `**What the regression says:**
$$R_{\\text{strategy},t} = \\alpha + \\beta R_{\\text{market},t} + \\varepsilon_t$$
$R^2 = 0.15$ means the market explains 15% of strategy return variance; the rest is idiosyncratic or other factors.

**Ordinary OLS standard errors** assume $\\varepsilon_t$ are i.i.d. with constant variance. In financial return regressions, residuals are often heteroskedastic (volatility clustering) and autocorrelated (overlapping windows, momentum, smoothing).

**Newey-West (HAC) standard errors** are robust to heteroskedasticity and autocorrelation. They typically widen the confidence interval, lowering the t-statistic from 2.4 to 1.6.

**Which to trust?** Newey-West, because it does not rely on the false i.i.d. assumption. A t-stat of 1.6 is below the conventional 1.96 threshold, so the alpha is not statistically significant at 5%.

**Practical lesson:** always report HAC standard errors for time-series alpha regressions, and be aware that even HAC cannot fix omitted factors, look-ahead bias, or data snooping.`,
			tags: ["OLS", "Newey-West", "Alpha", "Inference"]
		},
		{
			id: "q46",
			title: "GARCH(1,1) Long-Run Volatility and Persistence",
			firm: "Millennium",
			category: "Time Series & Econometrics",
			difficulty: "Medium",
			question: "A GARCH(1,1) model has omega = 2e-6, alpha = 0.08, and beta = 0.90. Compute the long-run variance, long-run volatility, and the persistence. What happens if alpha + beta = 1?",
			hint: "The unconditional variance is omega/(1 - alpha - beta). Persistence is alpha + beta.",
			solution: `**Model:**
$$\\sigma_t^2 = \\omega + \\alpha \\varepsilon_{t-1}^2 + \\beta \\sigma_{t-1}^2$$

**Long-run (unconditional) variance:**
$$\\bar{\\sigma}^2 = \\frac{\\omega}{1 - \\alpha - \\beta} = \\frac{2 \\times 10^{-6}}{1 - 0.08 - 0.90} = \\frac{2 \\times 10^{-6}}{0.02} = 1 \\times 10^{-4}$$

**Long-run volatility:**
$$\\bar{\\sigma} = \\sqrt{10^{-4}} = 0.01 = 1\\% \\text{ per period}$$

**Persistence:** $\\alpha + \\beta = 0.98$. Shocks decay with a half-life of
$$\\frac{\\ln 0.5}{\\ln 0.98} \\approx 34.3 \\text{ periods}$$
so volatility clustering is long-lasting.

**If alpha + beta = 1:** the process is integrated in variance (IGARCH). The unconditional variance is undefined, shocks never decay, and volatility forecasts become highly persistent. This is often used as a practical approximation for long-memory volatility.

**If alpha + beta > 1:** the variance process is explosive and non-stationary.`,
			tags: ["GARCH", "Volatility Clustering", "Time Series"]
		},
		{
			id: "q47",
			title: "Cointegration vs Correlation",
			firm: "Point72",
			category: "Time Series & Econometrics",
			difficulty: "Medium",
			question: "Two stock prices are both non-stationary random walks and have a sample correlation of 0.95, but their spread is also a random walk. Are they cointegrated? Why is correlation alone a dangerous pairs-trading filter?",
			hint: "Cointegration requires the spread to be stationary (I(0)). Correlation measures co-movement of levels or returns, not long-run mean reversion.",
			solution: `**Definitions:**
- Two series are $I(1)$ if they need one difference to become stationary.
- They are **cointegrated** if some linear combination $y_t - \\beta x_t$ is $I(0)$, i.e. stationary and mean-reverting.
- Correlation measures linear co-movement, usually of returns or levels, and does not require stationarity.

**In the question:** the spread is a random walk, so it is $I(1)$, not $I(0)$. Therefore the pair is **not cointegrated**, despite the 0.95 correlation.

**Why correlation misleads:** two independent random walks can drift in the same direction for long periods and show high sample correlation by chance. A pairs trade on such a spread has no reliable mean reversion; the spread can wander arbitrarily far, causing large losses or margin calls.

**Correct workflow:**
1. Test each series for a unit root (ADF/KPSS).
2. Estimate the hedge ratio (OLS or Johansen).
3. Test the residual spread for stationarity (Engle-Granger ADF or Johansen trace test).
4. Estimate mean-reversion speed and half-life (Ornstein-Uhlenbeck), and only then design entry/exit z-scores.

**Practical note:** cointegration relationships can break structurally, so monitor rolling tests and include a stop-loss.`,
			tags: ["Cointegration", "Pairs Trading", "ADF", "Spurious Regression"]
		},
		{
			id: "q48",
			title: "Fundamental Law of Active Management",
			firm: "AQR",
			category: "Portfolio & Risk",
			difficulty: "Easy",
			question: "A strategy has an information coefficient of 0.06 and makes 500 independent bets per year. What is its expected information ratio? If bets are correlated with effective breadth 150, what happens?",
			hint: "IR = IC x sqrt(BR). Use effective breadth, not raw trade count, when bets overlap.",
			solution: `**Basic law:**
$$IR \\approx IC \\times \\sqrt{BR}$$

**With BR = 500:**
$$IR = 0.06 \\times \\sqrt{500} = 0.06 \\times 22.36 = 1.34$$

**With effective breadth 150:**
$$IR = 0.06 \\times \\sqrt{150} = 0.06 \\times 12.25 = 0.735$$

**Interpretation:** breadth only counts **independent** bets. Correlated signals across similar stocks, overlapping holding periods, or shared risk factors reduce effective breadth. A strategy that looks like 500 bets may behave like 150.

**Practical levers:**
- Improve IC through better features and cleaner data.
- Increase true breadth by covering more independent instruments, horizons, or regions.
- Avoid double-counting correlated bets in the IR forecast.

**Caveat:** the law assumes stationarity and independent bets; it is a planning heuristic, not a guarantee.`,
			tags: ["Information Ratio", "IC", "Breadth", "Alpha"]
		},
		{
			id: "q49",
			title: "Deflated Sharpe Ratio and Backtest Overfitting",
			firm: "Two Sigma",
			category: "Backtesting & ML",
			difficulty: "Hard",
			question: "You test 200 strategy variants and find one with an annualized Sharpe of 2.1 over 5 years. Why is the naive Sharpe misleading, and what does the Deflated Sharpe Ratio adjust for?",
			hint: "Under the null of zero skill, the maximum of many noisy Sharpe estimates is biased upward. The DSR accounts for the number of trials, their variance, and non-normal returns.",
			solution: `**Selection bias:** if you test $N$ independent zero-skill strategies, the best sample Sharpe is not zero. Its expected maximum grows roughly like
$$\\mathbb{E}[\\max_i \\widehat{SR}_i] \\approx \\sqrt{\\operatorname{Var}(\\widehat{SR})}\\left((1-\\gamma)\\Phi^{-1}\\left(1 - \\frac{1}{N}\\right) + \\gamma \\Phi^{-1}\\left(1 - \\frac{1}{Ne}\\right)\\right)$$
where $\\gamma$ is the Euler-Mascheroni constant. With $N = 200$, even pure noise can produce an impressive-looking best Sharpe.

**Deflated Sharpe Ratio (Bailey & Lopez de Prado)** adjusts the observed Sharpe for:
- The number of independent trials $N$.
- The variance of Sharpe ratios across trials.
- The sample length.
- Non-normality: skewness and kurtosis of returns.

It computes the probability that the true Sharpe exceeds zero after accounting for the selection process. A naive Sharpe of 2.1 can deflate to a statistically insignificant result when 200 variants were tried.

**Practical defenses:**
- Pre-register hypotheses and count every variant tested.
- Use walk-forward or purged out-of-sample validation.
- Report the DSR, not just the Sharpe.
- Apply a multiple-testing haircut or a higher hurdle (e.g. t > 3) for data-mined signals.`,
			tags: ["Deflated Sharpe", "Overfitting", "Multiple Testing"]
		},
		{
			id: "q50",
			title: "Purged and Embargoed Cross-Validation",
			firm: "Point72",
			category: "Backtesting & ML",
			difficulty: "Hard",
			question: "Explain why standard K-fold cross-validation leaks information in financial ML. Design a purged and embargoed split for 5-day forward-return labels.",
			hint: "Labels overlap in time. Remove training samples whose label windows overlap the test window, and add a gap after the test set.",
			solution: `**The leakage:** a sample at time $t$ has a label built from the return over $[t, t+5]$. A test sample at $t+1$ shares four days of future information with the training sample at $t$. Random K-fold puts these neighbors in different folds, so the model effectively trains on the test period.

**Purge:** remove from the training set every observation whose label window $[t, t+h]$ overlaps the test set's label window. With $h = 5$ days, purge at least 5 observations before and after each test block.

**Embargo:** additionally drop a small buffer (e.g. 1-2% of the sample, or at least $h$ days) immediately **after** the test block from training. This protects against serial correlation and feature lookback overlapping the test period.

**Example split:**
- Test block: days 100-149.
- Purge training days 95-99 and 150-154 (label overlap).
- Embargo training days 155-160 (serial correlation buffer).
- Train on days 1-94 and 161-end, then roll forward.

**Validation scheme:** use walk-forward or combinatorial purged CV (CPCV), which generates multiple train/test combinations with purging and embargoing. Report the distribution of out-of-sample Sharpe, not a single lucky path.

**Extra safeguards:** fit all preprocessing (scaling, PCA, feature selection) inside the training fold only; otherwise normalization statistics leak test information.`,
			tags: ["Cross-Validation", "Purging", "Embargo", "Leakage"]
		},
		{
			id: "q51",
			title: "False Sharing in a Multi-Threaded Risk Engine",
			firm: "Hudson River Trading (HRT)",
			category: "Quant Dev & Systems",
			difficulty: "Medium",
			question: "A risk engine has two threads updating separate atomic counters that are declared next to each other. Throughput is terrible. Diagnose the problem and write the C++ fix.",
			hint: "CPUs transfer memory in 64-byte cache lines. Independent variables on the same line cause coherence traffic.",
			solution: `**Diagnosis: false sharing.** The two counters likely occupy the same 64-byte cache line. When core 0 writes its counter, the cache-coherence protocol invalidates the line in core 1's L1/L2, forcing a reload on the next access. The cores ping-pong the line even though they never touch the same variable.

**Fix: pad each hot variable to its own cache line.**
\`\`\`cpp
#include <atomic>
#include <cstddef>

struct alignas(64) PaddedCounter {
    std::atomic<std::uint64_t> value{0};
    char padding[64 - sizeof(std::atomic<std::uint64_t>)];
};

PaddedCounter counterA;
PaddedCounter counterB;
\`\`\`

**Alternative:** give each thread a thread-local counter and aggregate periodically, or use a per-thread array indexed by thread id with cache-line padding.

**Verification:** benchmark before/after with Google Benchmark or perf stat; watch for a drop in cache-miss and coherence events. Also check that the atomic operation itself is necessary - if only one thread writes a counter, a plain uint64_t plus a final synchronization is cheaper.`,
			tags: ["False Sharing", "Cache Line", "Concurrency", "C++"]
		},
		{
			id: "q52",
			title: "Struct of Arrays vs Array of Structs in Market Data",
			firm: "Tower Research",
			category: "Quant Dev & Systems",
			difficulty: "Medium",
			question: "A tick struct contains symbol, price, size, timestamp, and exchange id. A hot loop computes a volume-weighted average price using only price and size over 10 million ticks. Would you store an array of structs or struct of arrays? Why?",
			hint: "Consider cache-line utilization: how many useful bytes are loaded per 64-byte line?",
			solution: `**Array of structs (AoS):** each tick loads a cache line containing all fields, but the VWAP loop only needs price and size. If the struct is, say, 64 bytes and only 16 bytes are useful, 75% of cache bandwidth is wasted. Iterating also touches every field, increasing the working set.

**Struct of arrays (SoA):**
\`\`\`cpp
struct TickColumns {
    std::vector<double> price;
    std::vector<uint32_t> size;
    std::vector<uint64_t> timestamp;
    std::vector<uint16_t> exchange;
};
\`\`\`
The price array is contiguous, so each cache line holds 8 doubles (64 bytes) instead of one or two useful values. The loop is cache-efficient, prefetcher-friendly, and auto-vectorizable with SIMD.

**Verdict:** use **SoA** for the analytics hot loop. Keep AoS only if the code frequently needs all fields of one record together (e.g. serialization) or if the record is small and accessed whole.

**Caveat:** SoA complicates adding fields and can hurt when the access pattern is row-wise. Profile the actual workload; data-oriented design is about matching layout to access pattern, not a universal rule.`,
			tags: ["Data-Oriented Design", "Cache", "SIMD", "C++"]
		},
		{
			id: "q53",
			title: "TCP vs UDP for Order Entry and Market Data",
			firm: "Jump Trading",
			category: "Quant Dev & Systems",
			difficulty: "Easy",
			question: "Why do trading firms typically use TCP (or a reliable session protocol) for order entry but UDP multicast for exchange market data? What is head-of-line blocking?",
			hint: "Order entry cannot lose or reorder messages. Market data is time-perishable and one-to-many.",
			solution: `**Order entry - TCP / reliable session:**
- Orders, cancels, and modifications must be delivered exactly once, in order, with acknowledgment.
- Losing a cancel can leave an unintended live order; duplicated orders can create double exposure.
- TCP provides sequencing, retransmission, and flow control, at the cost of latency and head-of-line blocking.

**Market data - UDP multicast:**
- One publisher sends the same feed to many subscribers efficiently.
- No handshake, no acknowledgment, no retransmission stalls.
- If a packet is lost, it is often better to wait for the next update than to block the stream waiting for a retransmit. Exchanges typically provide a separate recovery service for gaps.

**Head-of-line blocking:** in TCP, if packet $n$ is lost, later packets $n+1, n+2, \\dots$ cannot be delivered to the application until $n$ is retransmitted, even if they are already buffered. This creates a latency spike exactly when the market is moving. UDP has no such ordering guarantee, so a lost packet does not stall subsequent packets.

**Kernel bypass:** to remove OS networking overhead, firms use DPDK, Solarflare OpenOnload/EF_VI, or FPGA NICs, mapping packets directly into user space and polling instead of interrupting.`,
			tags: ["Networking", "TCP", "UDP", "Multicast", "HFT"]
		},
		{
			id: "q54",
			title: "The ABA Problem in Lock-Free Queues",
			firm: "Hudson River Trading (HRT)",
			category: "Quant Dev & Systems",
			difficulty: "Hard",
			question: "Explain the ABA problem with a lock-free stack. Why can a compare-and-swap succeed incorrectly, and what are three practical fixes?",
			hint: "Thread 1 reads top = A, is preempted, and the stack changes A -> B -> A. Its CAS sees A and succeeds even though the stack was modified.",
			solution: `**Scenario:**
1. Thread 1 reads the stack top, \`top = A\`, and \`A.next = B\`.
2. Thread 1 is preempted.
3. Thread 2 pops A (top becomes B), pops B (top becomes C), then pushes A back (top becomes A, with A.next = C).
4. Thread 1 resumes and executes \`CAS(top, A, B)\`. The top is still A, so the CAS succeeds.
5. But \`B\` has already been popped and may be freed. The stack is corrupted: \`top = B\` points to freed memory.

**Why it is dangerous:** the CAS compares only the value, not the history. A -> B -> A looks unchanged, but the structure around it changed. In a matching engine this can corrupt the order queue or cause use-after-free.

**Fixes:**
1. **Tagged pointers / version counters:** store a monotonically increasing version alongside the pointer in a 128-bit CAS (\`std::atomic<__int128>\` or a double-width CAS). A -> B -> A now has a different tag.
2. **Hazard pointers:** each thread publishes the pointers it is accessing; reclamation waits until no hazard pointer references the node.
3. **Epoch-based reclamation (EBR):** defer freeing until all threads have passed a quiescent epoch.
4. **Avoid the problem entirely:** use an SPSC ring buffer with separate head/tail indices, where only one thread writes each index and ABA cannot occur. This is why HFT messaging favors SPSC over a general lock-free stack.

**Also:** in C++, \`std::atomic<std::shared_ptr<T>>\` (C++20) provides atomic shared-pointer operations, but it is not lock-free on most implementations.`,
			tags: ["Lock-Free", "ABA", "CAS", "Memory Reclamation"]
		},
		{
			id: "q55",
			title: "Price-Weighted vs Market-Cap-Weighted Index Rebalancing",
			firm: "Flow Traders",
			category: "Markets & Fixed Income",
			difficulty: "Easy",
			question: "A price-weighted index contains stocks A ($100) and B ($50). A does a 2-for-1 split. What happens to the index divisor, and how does a cap-weighted index handle the same event?",
			hint: "A price-weighted index averages prices, so a split changes the sum. A cap-weighted index weights by price times shares outstanding.",
			solution: `**Price-weighted index (e.g. Dow):**
Before the split, the index level is $(100 + 50)/d = 150/d$. After a 2-for-1 split, A trades at $50. To keep the index level unchanged, the divisor must change:
$$\\frac{50 + 50}{d'} = \\frac{150}{d} \\implies d' = \\frac{100}{150}d = \\frac{2}{3}d$$
The divisor is reduced so the split is index-neutral. High-priced stocks still dominate the index, so a 1% move in A has twice the index impact of a 1% move in B.

**Market-cap-weighted index (e.g. S&P 500):**
Weight is $P_i Q_i / \\sum P_j Q_j$. A 2-for-1 split doubles $Q_i$ and halves $P_i$, so $P_i Q_i$ is unchanged. No divisor adjustment is needed and index weights do not change.

**Practical implication:** price-weighted indices require frequent divisor maintenance for splits and can be dominated by one high-priced stock. Cap-weighted indices automatically give more weight to larger companies and require rebalancing only when share counts or constituents change.`,
			tags: ["Equities", "Index Construction", "Stock Split"]
		},
		{
			id: "q56",
			title: "Expected Duration of a Fair Gambler's Ruin Game",
			firm: "Jane Street",
			category: "Probability & Martingales",
			difficulty: "Medium",
			question: "A fair random walk starts at i = 3 with absorbing barriers at 0 and N = 5. What is the expected number of steps until absorption?",
			hint: "Use the martingale M_t = X_t^2 - t and optional stopping, or solve the recurrence E_i = 1 + (1/2)E_{i-1} + (1/2)E_{i+1}.",
			solution: `**Martingale method:**
For a symmetric random walk, $X_t^2 - t$ is a martingale. Let $T$ be the absorption time. By optional stopping:
$$\\mathbb{E}[X_T^2 - T] = X_0^2 = i^2$$
At absorption, $X_T \\in \\{0, N\\}$. For a fair game,
$$P(\\text{hit } N) = \\frac{i}{N}, \\quad P(\\text{hit } 0) = 1 - \\frac{i}{N}$$
So
$$\\mathbb{E}[X_T^2] = N^2 \\cdot \\frac{i}{N} = N i$$
Therefore:
$$\\mathbb{E}[T] = \\mathbb{E}[X_T^2] - i^2 = N i - i^2 = i(N - i)$$

**Plug in i = 3, N = 5:**
$$\\mathbb{E}[T] = 3(5 - 3) = 6$$

**Answer:** 6 steps on average.

**Recurrence check:** solve $E_i = 1 + (E_{i-1} + E_{i+1})/2$ with $E_0 = E_5 = 0$. The solution is $E_i = i(5-i)$, giving $E_3 = 6$.

**Extension:** for a biased walk with $p \\ne 1/2$, the expected duration is more complex and includes the drift term.`,
			tags: ["Gambler's Ruin", "Martingale", "Optional Stopping"]
		},
		{
			id: "q57",
			title: "Coupon Collector: Expected Draws for 5 Coupons",
			firm: "IMC Trading",
			category: "Probability & Martingales",
			difficulty: "Easy",
			question: "There are 5 equally likely coupon types. What is the expected number of draws to collect all 5? What is the expected number of draws to go from having k distinct coupons to k+1?",
			hint: "When you have k distinct coupons, the probability that the next draw is new is (5-k)/5. The waiting time is geometric.",
			solution: `**Stage k -> k+1:**
With $k$ distinct coupons collected, the probability that the next draw is new is
$$p_k = \\frac{5 - k}{5}$$
The waiting time is geometric with mean $1/p_k = 5/(5-k)$.

**Total expectation:**
$$\\mathbb{E}[T] = \\sum_{k=0}^{4} \\frac{5}{5-k} = 5\\left(1 + \\frac{1}{2} + \\frac{1}{3} + \\frac{1}{4} + \\frac{1}{5}\\right)$$
$$= 5(2.28333) = 11.4167$$

**General formula:**
$$\\mathbb{E}[T] = n H_n = n \\sum_{k=1}^{n} \\frac{1}{k} \\approx n(\\ln n + \\gamma)$$

**Variance intuition:** the last coupon dominates the wait; once 4 of 5 are collected, the expected wait is 5 draws for the final one.

**Answer:** about **11.42 draws** on average.`,
			tags: ["Coupon Collector", "Geometric", "Harmonic Series"]
		},
		{
			id: "q58",
			title: "SVD, PCA, and Variance Explained",
			firm: "Two Sigma",
			category: "Linear Algebra & Stats",
			difficulty: "Medium",
			question: "A data matrix X is centered and has singular values 10, 4, and 2. What are the eigenvalues of the sample covariance matrix (up to the 1/(n-1) factor), and how much variance does the first principal component explain?",
			hint: "The eigenvalues of X^T X are the squared singular values. PCA variance explained is lambda_i divided by the sum of eigenvalues.",
			solution: `**SVD:** $X = U\\Sigma V^T$, where $\\Sigma$ contains singular values $s_i$. The eigenvalues of $X^T X$ (and of the covariance up to the $1/(n-1)$ scaling) are $s_i^2$:
$$\\lambda_1 = 100, \\quad \\lambda_2 = 16, \\quad \\lambda_3 = 4$$

**Total variance (up to scaling):**
$$100 + 16 + 4 = 120$$

**Variance explained by PC1:**
$$\\frac{100}{120} = 83.3\\%$$

**PC2:** $16/120 = 13.3\\%$, **PC3:** $4/120 = 3.3\\%$.

**Interpretation:** the first principal component captures most of the common variation, which in equity data is the market factor. The remaining components capture sector, style, and idiosyncratic effects.

**Dimensionality reduction:** keeping PC1 and PC2 retains 96.7% of variance while reducing three dimensions to two. In factor modeling, the discarded components are candidates for statistical arbitrage residuals.

**Caveat:** PCA is sensitive to scaling. Standardize features when units differ; otherwise high-variance variables dominate by construction.`,
			tags: ["SVD", "PCA", "Eigenvalues", "Factor Models"]
		}
	];

	extraQuestions.forEach(q => {
		if (!QUANT_DATA.interviewQuestions.some(existing => existing.id === q.id)) {
			QUANT_DATA.interviewQuestions.push(q);
		}
	});
})();
