// accountRouter matches /api/account paths

// Import required modules
const { query, body, validationResult } = require('express-validator');
const accountRouter = require('express').Router();
const accountSettingsRouter = require('./accountSettings');
const accountTopicsRouter = require('./accountTopics');
const accountStocksRouter = require('./accountStocks');
const supabase = require('../../models/db');

// Validates the user_id query parameter and checks if the user exists
accountRouter.use(query('user_id').isUUID().escape(), async (req, res, next) => {
	const validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		return res.status(400).json({ error: 'Invalid input' });
	}
	const { user_id } = req.query;
	const { data, error } = await supabase.from('user_profiles').select('*').eq('user_id', user_id);
	if (error) {
		return res.status(500).json({ error: 'Internal server error' });
	}
	if (data.length === 0) {
		return res.status(404).json({ error: 'User not found' });
	}
	next();
});

accountRouter.use('/settings', accountSettingsRouter);
accountRouter.use('/topics', accountTopicsRouter);
accountRouter.use('/stocks', accountStocksRouter);

accountRouter.get('/user', async (req, res) => {
	const { user_id } = req.query;
	const { data, error } = await supabase.from('user_profiles').select('user_id, first_name, last_name').eq('user_id', user_id);
	if (error) {
		return res.status(500).json({ error: 'Internal server error' });
	}
	return res.status(200).json(data);
});
module.exports = accountRouter;