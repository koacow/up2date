// accountRouter matches /api/account paths

// Import required modules
const { query, body, validationResult } = require('express-validator');
const accountRouter = require('express').Router();
const supabase = require('../../models/db');

// TO DO: remove hardcoded default settings
const defaultSettings = {
	"display": {
		"darkMode": false,
		"language": "en"
	},
	"notifications": {
		"email": {
			"dailyDigest": true,
			"newsletter": true
		},
		"push": {
			"dailyDigest": true,
			"newsletter": true
		}
	}
};

// Validates the user_id query parameter and checks if the user exists
accountRouter.use(query('user_id').isUUID().escape(), async (req, res, next) => {
	const validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		return res.status(400).json({ error: 'Invalid input' });
	}
	const { user_id } = req.query;
	const { data, error } = await supabase.from('user_profiles').select('user_id').eq('user_id', user_id);
	if (error) {
		return res.status(500).json({ error: 'Internal server error' });
	}
	if (data.length === 0) {
		return res.status(404).json({ error: 'User not found' });
	}
	next();
});
    
accountRouter.get('/settings',
	async (req, res) => {
		// If there are validation errors, return a 400 response
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.status(400).json({ error: 'Invalid input' });
		}

		// Fetch user settings based on the user ID
		const { user_id } = req.query;
		const { data, error } = await supabase.from('user_settings').select('*').eq('user_id', user_id);
		if (error) {
			return res.status(500).json({ error: 'Internal server error' });
		}
		if ( data.length === 0 ) {
			return res.status(404).json({ error: 'User not found' });
		}
		return res.status(200).json(data);
	});

accountRouter.post('/settings', async (req, res) => {
	// Insert user settings based on the user ID
	const { user_id } = req.query;
	const { error } = await supabase.from('user_settings').insert({ user_id });
	if (error) {
		return res.status(500).json({ error: 'Internal server error' });
	};
	return res.status(201).json({ message: 'User settings inserted' });
});

accountRouter.put('/settings',
	// Validate settings object
	body('settings').custom(settingsValue => {
		const settingsSchema = {
			display: {
				darkMode: value => typeof value === 'boolean',
				language: value => typeof value === 'string' && parseInt(value.length) === 2
			},
			notifications: {
				email: value => {
					if (typeof value !== 'object') return false;
					return Object.keys(value).every(key => ['dailyDigest', 'newsletter'].includes(key) && typeof value[key] === 'boolean');
				},
				push: value => {
					if (typeof value !== 'object') return false;
					return Object.keys(value).every(key => ['dailyDigest', 'newsletter'].includes(key) && typeof value[key] === 'boolean');
				}
			}
		};

		for (const [key, value] of Object.entries(settingsValue)) {
			if (!settingsSchema[key]) {
				return false;
			}
			for (const [subKey, subValue] of Object.entries(value)) {
				if (!settingsSchema[key][subKey] || !settingsSchema[key][subKey](subValue)) {
					return false;
				}
			}
		}
		return true;
	}),
	async (req, res) => {
		// If there are validation errors, return a 400 response
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.status(400).json({ error: 'Invalid input' });
		};

		// Update user settings based on the user ID
		const { user_id } = req.query;
		const { settings } = req.body;
		const { error } = await supabase.from('user_settings').upsert({ user_id, settings });
		if (error) {
			return res.status(500).json({ error: 'Internal server error' });
		};
		return res.status(200).json({ message: 'User settings updated' });
	});

accountRouter.delete('/settings',
	async (req, res) => {
		// Upsert user settings with default settings based on the user ID
		const { user_id } = req.query;
		const { error } = await supabase.from('user_settings').upsert({ user_id, settings: defaultSettings });
		if (error) {
			return res.status(500).json({ error: 'Internal server error' });
		};
		return res.status(200).json({ message: 'Reset user\'s settings to default' });
	});

accountRouter.get('/topics',
	async (req, res) => {
		// Fetch user topics based on the user ID
		const { user_id } = req.query;
		const { data, error } = await supabase.from('user_topics').select('topic_id, topics(topic)').eq('user_id', user_id);
		if (error) {
			return res.status(500).json({ error: 'Internal server error' });
		}
		return res.status(200).json(data);
	});

accountRouter.put('/topics',
	// Input validation chain
	body('topic_ids').isArray(),
	body('topic_ids.*').isNumeric().escape().custom(async (value) => {
		const { data, error } = await supabase.from('topics').select('id').eq('id', parseInt(value));
		if (error || data.length === 0) {
			throw new Error('Invalid topic ID');
		}
	}),
	async (req, res) => {
		// If there are validation errors, return a 400 response
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.status(400).json({ error: 'Invalid input' });
		};

		const { user_id } = req.query;
		const newTopicIds = req.body.topic_ids.map(topic_id => parseInt(topic_id)); // Convert topic ids to integers

		// Delete user topics based on the user ID
		const { error: deleteError } = await supabase.from('user_topics').delete().eq('user_id', user_id);
		if (deleteError) {
			return res.status(400).json({ error: 'Failed to update user topics' });
		}

		// Insert new user topics based on the user ID
		const { error: insertError } = await supabase.from('user_topics').insert(newTopicIds.map(topic_id => ({ user_id, topic_id })));
		if (insertError) {
			return res.status(400).json({ error: 'Failed to update user topics' });
		}
		return res.status(201).json({topic_ids: newTopicIds, message: 'User topics updated' });
	});

accountRouter.delete('/topics',
	async (req, res) => {
		// Delete user topics based on the user ID
		const { user_id } = req.query;
		const { error } = await supabase.from('user_topics').delete().eq('user_id', user_id);
		if (error) {
			return res.status(500).json({ error: 'Internal server error' });
		};
		return res.status(204).json({ message: 'User topics deleted' });
	});

// Get user saved stocks
accountRouter.get('/stocks', async (req, res) => {
	const { user_id } = req.query;
	const { data, error } = await supabase.from('saved_stocks').select('stock_ticker').eq('user_id', user_id);
	if (error) {
		return res.status(500).json({ error: 'Internal server error' });
	}
	return res.status(200).json(data);
});

accountRouter.put('/stocks',
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

accountRouter.delete('/stocks', async (req, res) => {
	const { user_id } = req.query;
	const { error } = await supabase.from('saved_stocks').delete().eq('user_id', user_id);
	if (error) {
		return res.status(500).json({ error: 'Internal server error' });
	}
	return res.status(204).json({ message: 'Saved stocks deleted' });
});

module.exports = accountRouter;