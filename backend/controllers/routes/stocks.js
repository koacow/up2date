// stocksRouter matches /api/stocks paths

// Import required modules
const { query, param, validationResult } = require('express-validator');
const stocksRouter = require('express').Router();
const yahooFinance = require('yahoo-finance2').default;

stocksRouter.get('/search', async (req, res) => {
	// Fetch stock data based on the search query
	const { query } = req.query;
	try {
		const data = await yahooFinance.search(query);
		return res.status(200).json(data);
	} catch(err) {
		return res.status(500).json({ error: 'Internal server error' });
	}
});

// Validates the symbol query parameter
stocksRouter.use('/*/:ticker', 
	param('ticker').isString().escape().notEmpty(),
	(req, res, next) => {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.status(400).json({ error: 'Invalid input' });
		}
		next();
	}
);

stocksRouter.get('/quote/:ticker', async (req, res) => {
	// Fetch stock quote data based on the stock symbol
	const { ticker } = req.params;
	try {
		const data = await yahooFinance.quote(ticker);
		if (!data.symbol) {
			return res.status(404).json();
		}
		return res.status(200).json(data);
	} catch(err) {
		return res.status(500).json({ error: 'Internal server error' });
	}
});	

const getIntervalFromRange = (range) => {
	switch (range) {
		case 1:
			return '1m';
		case 5: 
			return '30m'
		case 30:
		case 180:
			return '1d';
		case 365:
			return '1wk';
		case 1825:
			return '1mo';
		default:
			return '3mo';
	}
}

stocksRouter.get('/chart/:ticker', 
	query('range').isInt().toInt().notEmpty().custom(val => val > 0),
	async (req, res) => {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.status(400).json({ error: 'Invalid input' });
		}
		const { ticker } = req.params;
		const { range } = req.query;

		const startDate = new Date() - (range * 24 * 60 * 60 * 1000);
		const interval = getIntervalFromRange(range);

		const queryOptions = {
			period1: new Date(startDate).toISOString(),
			interval
		}
		try {
			const data = await yahooFinance.chart(ticker, queryOptions);
			if (!data.meta) {
				return res.status(404).json();
			}
			return res.status(200).json(data);
		} catch(error) {
			console.log(error);
			return res.status(500).json({ error: 'Internal server error' });
		}
});

module.exports = stocksRouter;
