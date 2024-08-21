const accountStocksRouter = require('express').Router();
const supabase = require('../../models/db');
const { body, validationResult, header } = require('express-validator');
const yahooFinance = require('yahoo-finance2').default;

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
	header('Action').exists().isString().escape().custom((value) => {
		return ['add', 'addMany', 'remove'].includes(value);
	}),
	body('stock_ticker').optional().isString().escape().custom(async (value) => {
		try {
			const stock = await yahooFinance.quote(value);
			if (!stock) {
				throw new Error('Invalid stock ticker');
			}
		} catch (error) {
			throw new Error('Invalid stock ticker');
		}
	}),
	body('stock_tickers').optional().isArray(),
	body('stock_tickers.*').optional().isString().escape().custom(async (value) => {
		try {
			const stock = await yahooFinance.quote(value);
			if (!stock) {
				throw new Error('Invalid stock ticker');
			}
		} catch (error) {
			throw new Error('Invalid stock ticker');
		}
	}),
	async (req, res) => {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.status(400).json({ error: 'Invalid input' });
		}
		const { user_id } = req.query;
		const action = req.header('Action');
				if (action === 'add') {
			const { stock_ticker } = req.body;
			const { error } = await supabase.from('saved_stocks').upsert({ user_id, stock_ticker });
			if (error) {
				return res.status(500).json({ error: 'Internal server error' });
			}
			return res.status(201).json({ message: 'Stock saved' });
		} else if (action === 'addMany') {
			const { stock_tickers } = req.body;
			const { error } = await supabase.from('saved_stocks').upsert(stock_tickers.map(stock_ticker => ({ user_id, stock_ticker })));
			if (error) {
				return res.status(500).json({ error: 'Internal server error' });
			}
			return res.status(201).json({ message: 'Stocks saved' });
		} else if (action === 'remove') {
			const { stock_ticker } = req.body;
			const { error } = await supabase.from('saved_stocks').delete().eq('user_id', user_id).eq('stock_ticker', stock_ticker);
			if (error) {
				return res.status(500).json({ error: 'Internal server error' });
			}
			return res.status(204).json({ message: 'Stock removed' });
		} else {
			return res.status(400).json({ error: 'Invalid action' });
		}
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