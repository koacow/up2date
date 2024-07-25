// articlesRouter matches /api/articles paths

// Import required modules
const { query, param, validationResult } = require('express-validator');
const articlesRouter = require('express').Router();
const supabase = require('../../models/db');
const { NEWS_API_KEY } = process.env;

articlesRouter.get('/:topicId',
  // Input validation chain
  query('pageNum').isInt(),
  param('topicId').isInt().escape(),
  async (req, res) => {
    // If there are validation errors, return a 400 response
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Get topic title from the database based on the topic ID
    const { topic_id } = req.params;
    const { data, error } = await supabase.from('topics').select('*').eq('topic_id', topic_id);
    if (error) {
      return res.status(400).json({ error: 'Failed to fetch topic' });
    }
    const [ topic ] = data;
    const { pageNum } = req.query;

    // Fetch articles from the News API based on the topic and page number
    const response = await fetch(`https://newsapi.org/v2/everything?q=${topic}&apiKey=${NEWS_API_KEY}&sortBy=publishedAt&language=en&pageSize=10&page=${pageNum}`);
    if (response.ok) {
      const articles = await response.json();
      return res.status(200).json(articles);
    }
    return res.status(400).json({ error: 'Failed to fetch articles' });
  });

articlesRouter.get('/search',
  // Input validation chain 
  query('query').isString().escape(),
  query('pageNum').isInt(),
  async (req, res) => {
    // If there are validation errors, return a 400 response
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Fetch articles from the News API based on the search query and page number
    const { query, pageNum = '1'} = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${NEWS_API_KEY}&sortBy=relevancy&language=en&pageSize=10&page=${pageNum}`);
    if (response.ok) {
      const data = await response.json();
      return res.status(200).json(data);
    }
    return res.status(400).json({ error: 'Failed to fetch articles' });
  });

module.exports = articlesRouter;