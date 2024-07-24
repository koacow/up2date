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
}
    
accountRouter.get('/settings',
    // Input validation chain
    query('user_id').isUUID().escape(), 
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
            return res.status(400).json({ error: 'Failed to fetch user settings' });
        }
        return res.status(200).json(data);
});

accountRouter.put('/settings',
    // Input validation chain
    query('user_id').isUUID().escape(),
    body('settings').isJSON().escape(),
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
            return res.status(400).json({ error: 'Failed to update user settings' });
        };
        return res.status(200).json({ message: 'User settings updated' });
});

accountRouter.delete('/settings',
    // Input validation chain
    query('user_id').isUUID().escape(), 
    async (req, res) => {
        // If there are validation errors, return a 400 response
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({ error: 'Invalid input' });
        };

        // Upsert user settings with default settings based on the user ID
        const { user_id } = req.query;
        const { error } = await supabase.from('user_settings').upsert({ user_id, settings: defaultSettings });
        if (error) {
            return res.status(400).json({ error: 'Failed to delete user settings' });
        };
        return res.status(200).json({ message: 'User settings deleted' });
});

// TO DO: Create a default setting object and insert it into user_settings table when a new user registers

accountRouter.get('/topics',
    // Input validation chain
    query('user_id').isUUID().escape, 
    async (req, res) => {
        // If there are validation errors, return a 400 response
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({ error: 'Invalid input' });
        };

        // Fetch user topics based on the user ID
        const { user_id } = req.query;
        const { data, error } = await supabase.from('user_topics').select('topics(topic)').eq('user_id', user_id);
        if (error) {
            return res.status(400).json({ error: 'Failed to fetch user topics' });
        }
        return res.status(200).json(data);
});

accountRouter.put('/topics',
    // Input validation chain 
    query('user_id').isUUID().escape(),
    body('topic_ids').isArray(),
    body('topic_ids.*').isUUID().escape(),
    async (req, res) => {
        // If there are validation errors, return a 400 response
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({ error: 'Invalid input' });
        };

        const { user_id, topic_ids } = req.body;

        // Fetch existing topic ids
        const { data: existingTopicIds, error: fetchExistingTopicIdsError } = await supabase.from('user_topics').select('topic_id').eq('user_id', user_id);
        if (fetchExistingTopicIdsError) {
            return res.status(400).json({ error: 'Failed to update user topics' });
        }
        
        // Delete existing topics that are not in the new list
        for (let existingTopicId of existingTopicIds) {
            if (!topic_ids.includes(existingTopicId)) {
                const { error } = await supabase.from('user_topics').delete().eq('user_id', user_id).eq('topic_id', existingTopicId);
                if (error) {
                    return res.status(400).json({ error: 'Failed to update user topics' });
                }
            }
        }

        // Upsert new topics
        for (let topic_id of topic_ids) {
            const { error } = await supabase.from('user_topics').upsert({ user_id, topic_id });
            if (error) {
                return res.status(400).json({ error: 'Failed to update user topics' });
            }
        }

        return res.status(200).json({newTopicIds: topic_ids, message: 'User topics updated' });
})

module.exports = accountRouter;