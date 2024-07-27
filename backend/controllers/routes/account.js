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
      return res.status(400).json({ error: 'Failed to fetch user settings' });
    }
    if ( data.length === 0 ) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(data);
  });

accountRouter.post('/settings', async (req, res) => {
  // If there are validation errors, return a 400 response
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ error: 'Invalid input' });
  };

  // Insert user settings based on the user ID
  const { user_id } = req.query;
  const { error } = await supabase.from('user_settings').insert({ user_id });
  if (error) {
    return res.status(400).json({ error: 'Failed to insert user settings' });
  };
  return res.status(201).json({ message: 'User settings inserted' });
});

accountRouter.put('/settings',
  // Input validation chain
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
        return false
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
      return res.status(400).json({ error: 'Failed to update user settings' });
    };
    return res.status(200).json({ message: 'User settings updated' });
  });

accountRouter.delete('/settings',
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
    return res.status(200).json({ message: 'Reset user\'s settings to default' });
  });

// TO DO: Create a default setting object and insert it into user_settings table when a new user registers

accountRouter.get('/topics',
  async (req, res) => {
    // If there are validation errors, return a 400 response
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid input' });
    };

    // Fetch user topics based on the user ID
    const { user_id } = req.query;
    const { data, error } = await supabase.from('user_topics').select('topic_id, topics(topic)').eq('user_id', user_id);
    if (error) {
      return res.status(400).json({ error: 'Failed to fetch user topics' });
    }
    return res.status(200).json(data);
  });

accountRouter.put('/topics',
  body('topic_ids').isArray(),
  body('topic_ids.*').isNumeric().escape(),
  async (req, res) => {
    // If there are validation errors, return a 400 response
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid input' });
    };

    const { user_id } = req.query;
    const newTopicIds = req.body.topic_ids.map(topic_id => parseInt(topic_id)); // Convert topic ids to integers

    // Fetch existing topic ids
    const { data: existingTopics, error: fetchExistingTopicIdsError } = await supabase.from('user_topics').select('topic_id').eq('user_id', user_id);
    if (fetchExistingTopicIdsError) {
      return res.status(400).json({ error: 'Failed to update user topics' });
    }
    
    // Upsert new topics
    for (const topic_id of newTopicIds) {
      const { error } = await supabase.from('user_topics').upsert({ user_id, topic_id });
      if (error) {
        return res.status(400).json({ error: 'Failed to update user topics' });
      }
    }

    if (!existingTopics || existingTopics.length === 0) {
      return res.status(200).json({newTopicIds, message: 'User topics updated' });
    }

    // Delete existing topics that are not in the new list
    for (const existingTopic of existingTopics) {
      if (!newTopicIds.includes(existingTopic.topic_id)) {
        const { error } = await supabase.from('user_topics').delete().eq('user_id', user_id).eq('topic_id', existingTopic.topic_id);
        if (error) {
          return res.status(400).json({ error: 'Failed to update user topics' });
        }
      }
    }


    return res.status(200).json({newTopicIds, message: 'User topics updated' });
  });

module.exports = accountRouter;