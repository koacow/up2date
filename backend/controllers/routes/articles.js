// articlesRouter matches /api/articles paths

const { query, param } = require('express-validator');
const articlesRouter = require('express').Router();
const supabase = require('../../models/db');
const NEWS_API_KEY = process.env.NEWS_API_KEY;

articlesRouter.get('/:topicId',
    query('pageNum').isInt(),
    param('topicId').isInt().escape(),
    async (req, res) => {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({ error: 'Invalid input' });
        }
        const { topic_id } = req.params;
        const { data, error } = await supabase.from('topics').select('*').eq('topic_id', topic_id);
        if (error) {
            return res.status(400).json({ error: 'Failed to fetch topic' });
        }
        const topic = data[0].topic;
        const { pageNum } = req.query;
        const response = await fetch(`https://newsapi.org/v2/everything?q=${topic}&apiKey=${NEWS_API_KEY}&sortBy=publishedAt&language=en&pageSize=10&page=${pageNum}`);
        if (response.ok) {
            const articles = await response.json();
            return res.status(200).json(articles);
        }
        return res.status(400).json({ error: 'Failed to fetch articles' });
});

articlesRouter.get('/search', 
    query('query').isString().escape(),
    query('pageNum').isInt(),
    async (req, res) => {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({ error: 'Invalid input' });
        }
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