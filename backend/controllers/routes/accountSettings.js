const accountSettingsRouter = require('express').Router();
const supabase = require('../../models/db');
const { body, validationResult } = require('express-validator');

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

accountSettingsRouter.get('/',
	async (req, res) => {
		// If there are validation errors, return a 400 response
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.status(400).json({ error: 'Invalid input' });
		}

		// Fetch user settings based on the user ID
		const { user_id } = req.query;
		const { data, error } = await supabase.from('user_settings').select('settings').eq('user_id', user_id);
		if (error) {
			return res.status(500).json({ error: 'Internal server error' });
		}
		if ( data.length === 0 ) {
			return res.status(404).json({ error: 'User not found' });
		}
		return res.status(200).json(data);
	});

accountSettingsRouter.post('/', async (req, res) => {
	// Insert user settings based on the user ID
	const { user_id } = req.query;
	const { error } = await supabase.from('user_settings').insert({ user_id, settings: defaultSettings });
	if (error) {
		return res.status(500).json({ error: 'Internal server error' });
	};
	return res.status(201).json({ message: 'User settings inserted' });
});

accountSettingsRouter.put('/',
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

accountSettingsRouter.delete('/',
	async (req, res) => {
		// Upsert user settings with default settings based on the user ID
		const { user_id } = req.query;
		const { error } = await supabase.from('user_settings').upsert({ user_id, settings: defaultSettings });
		if (error) {
			return res.status(500).json({ error: 'Internal server error' });
		};
		return res.status(200).json({ message: 'Reset user\'s settings to default' });
	});

module.exports = accountSettingsRouter;