// stocksRouter matches /api/stocks paths

// Import required modules
const { query, param, validationResult } = require('express-validator');
const stocksRouter = require('express').Router();
const { STOCK_API_KEY } = process.env;
const STOCK_API_ENDPOINT = 'https://www.alphavantage.co/query';

const stockFunctions = {
	'search': 'SYMBOL_SEARCH',
	'quote': 'GLOBAL_QUOTE',
	'daily': 'TIME_SERIES_DAILY',
	'weekly': 'TIME_SERIES_WEEKLY',
	'monthly': 'TIME_SERIES_MONTHLY'
};

stocksRouter.get('/search', async (req, res) => {
	// Fetch stock data based on the search query
	const { query } = req.query;
	const endpoint = `${STOCK_API_ENDPOINT}?function=${stockFunctions['search']}&keywords=${query}&apikey=${STOCK_API_KEY}`;
    
	const response = await fetch(endpoint);
	if (response.ok) {
		const data = await response.json();
		return res.status(200).json(data);
	}
	return res.status(500).json({ error: 'Internal server error' });
});

// Validates the symbol query parameter
stocksRouter.use('/:function', 
	param('function').isIn(Object.keys(stockFunctions)).escape(),
	query('symbol').isString().escape().notEmpty(),
	(req, res, next) => {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.status(400).json({ error: 'Bad request. Check endpoint or query.' });
		}
		next();
	}
);

stocksRouter.get('/:function', async (req, res) => {
	// Fetch stock data based on the function and symbol
	const { symbol } = req.query;
	const { function: stockFunction } = req.params;
	const endpoint = `${STOCK_API_ENDPOINT}?function=${stockFunctions[stockFunction]}&symbol=${symbol}&apikey=${STOCK_API_KEY}`;

	const response = await fetch(endpoint);
	if (response.ok) {
		const data = await response.json();
		return res.status(200).json(data);
	}
	return res.status(500).json({ error: 'Internal server error' });
});
module.exports = stocksRouter;
