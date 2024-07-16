// userRouter matches /api/user paths

const userRouter = require('express').Router();
const supabase = require('../../models/db');

userRouter.get('/settings', async (req, res) => {
    const { user_id } = req.query;
    const { data, error } = await supabase.from('user_settings').select('*').eq('user_id', user_id);
    if (error) {
        return res.status(400).json({ error: 'Failed to fetch user settings' });
    }
    return res.status(200).json(data);
});

userRouter.put('/settings', async (req, res) => {
    const { user_id, settings: newSettings } = req.body;
    const { error } = await supabase.from('user_settings').upsert({ user_id, newSettings });
    if (error) {
        return res.status(400).json({ error: 'Failed to update user settings' });
    }
    return res.status(200).json({ message: 'User settings updated' });
});

// TO DO: Create a default setting object and insert it into user_settings table when a new user registers

userRouter.get('/topics', async (req, res) => {
    const { user_id } = req.query;
    const { data, error } = await supabase.from('user_topics').select('*').eq('user_id', user_id);
    if (error) {
        return res.status(400).json({ error: 'Failed to fetch user topics' });
    }
    return res.status(200).json(data);
});

userRouter.put('/topics', async (req, res) => {
    const { user_id, topics } = req.body;
    const topic_ids = [];
    try {
        topics.forEach(async (topic) => {
            const { data, error } = await supabase.from('topics').select('id').eq('topic', topic);
            if (error) {
                throw new Error();
            }
            topic_ids.push(data[0].id);
        });
    } catch (error) {
        return res.status(400).json({ error: 'Failed to fetch topic ids' });
    };
    try {
        topic
    }

})

module.exports = userRouter;