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
    const { data, error } = await supabase.from('user_topics').select('topics(topic)').eq('user_id', user_id);
    if (error) {
        return res.status(400).json({ error: 'Failed to fetch user topics' });
    }
    return res.status(200).json(data);
});

userRouter.put('/topics', async (req, res) => {
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

module.exports = userRouter;