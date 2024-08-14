const accountStocksRouter = require('express').Router();
const supabase = require('../../models/db');
const { body, validationResult } = require('express-validator');

// Get user saved stocks
accountStocksRouter.get('/', async (req, res) => {
	const { user_id } = req.query;
	const { data, error } = await supabase.from('saved_stocks').select('stock_ticker').eq('user_id', user_id);
	if (error) {
		return res.status(500).json({ error: 'Internal server error' });
	}
	return res.status(200).json(data);
});

accountStocksRouter.put('/',
	body('stock_tickers').isArray(),
	body('stock_tickers.*').isString().escape().custom(async (value) => {
		const {STOCK_API_KEY} = process.env;
		const STOCK_API_ENDPOINT = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${value}&apikey=${STOCK_API_KEY}`;
		const response = await fetch(STOCK_API_ENDPOINT);
		if (!response.ok) {
			throw new Error('Failed to fetch stock data');
		}
		const data = await response.json();
		if (!data['Global Quote'] || !data['Global Quote']['01. symbol']) {
			throw new Error('Invalid stock ticker');
		}
	}),
	async (req, res) => {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.status(400).json({ error: 'Invalid input' });
		}
		const { user_id } = req.query;
		const { error: deleteError } = await supabase.from('saved_stocks').delete().eq('user_id', user_id);
		if (deleteError) {
			return res.status(500).json({ error: 'Internal server error' });
		}
		const { stock_tickers } = req.body;
		for (const stock_ticker of stock_tickers) {
			const { error } = await supabase.from('saved_stocks').upsert({ user_id, stock_ticker });
			if (error) {
				return res.status(500).json({ error: 'Internal server error' });
			}
		}
		return res.status(201).json({ stock_tickers, message: 'Stocks saved' });
	});

accountStocksRouter.delete('/', async (req, res) => {
	const { user_id } = req.query;
	const { error } = await supabase.from('saved_stocks').delete().eq('user_id', user_id);
	if (error) {
		return res.status(500).json({ error: 'Internal server error' });
	}
	return res.status(204).json({ message: 'Saved stocks deleted' });
});

module.exports = accountStocksRouter;