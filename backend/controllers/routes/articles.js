// articlesRouter matches /api/articles paths

const articlesRouter = require('express').Router();
const supabase = require('../../models/db');
const NEWS_API_KEY = process.env.NEWS_API_KEY;

articlesRouter.get('/:topic', async (req, res) => {
    const { topic } = req.params;
    const { pageNum } = req.query;
    const response = await fetch(`https://newsapi.org/v2/everything?q=${topic}&apiKey=${NEWS_API_KEY}&sortBy=publishedAt&language=en&pageSize=10&page=${pageNum}`);
    if (response.ok) {
        const data = await response.json();
        return res.status(200).json(data);
    }
    return res.status(400).json({ error: 'Failed to fetch articles' });
});
module.exports = articlesRouter;