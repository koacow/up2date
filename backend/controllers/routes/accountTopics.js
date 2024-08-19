const accountTopicsRouter = require('express').Router();
const supabase = require('../../models/db');
const { body, validationResult } = require('express-validator');

accountTopicsRouter.get('/',
	async (req, res) => {
		// Fetch user topics based on the user ID
		const { user_id } = req.query;
		const { data, error } = await supabase.from('user_topics').select('topic_id, topics(topic)').eq('user_id', user_id);
		if (error) {
			return res.status(500).json({ error: 'Internal server error' });
		}
		return res.status(200).json(data);
	});

accountTopicsRouter.put('/',
	// Input validation chain
	body('topic_ids').isArray(),
	body('topic_ids.*').isNumeric().escape().custom(async (value) => {
		const { data, error } = await supabase.from('topics').select('id').eq('id', parseInt(value));
		if (error || data.length === 0) {
			throw new Error('Invalid topic ID');
		}
	}),
	async (req, res) => {
		const validationErrors = validationResult(req);
		// If there are validation errors, return a 400 response
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
		const {data: insertedData, error: insertError } = await supabase.from('user_topics').insert(newTopicIds.map(topic_id => ({ user_id, topic_id }))).select();
		if (insertError) {
			return res.status(400).json({ error: 'Failed to update user topics' });
		}
		return res.status(201).json({ topics: insertedData, message: 'User topics updated' });
	});

accountTopicsRouter.delete('/',
	async (req, res) => {
		// Delete user topics based on the user ID
		const { user_id } = req.query;
		const { error } = await supabase.from('user_topics').delete().eq('user_id', user_id);
		if (error) {
			return res.status(500).json({ error: 'Internal server error' });
		};
		return res.status(204).json({ message: 'User topics deleted' });
	});

module.exports = accountTopicsRouter;