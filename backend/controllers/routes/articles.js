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

articlesRouter.get('/search', async (req, res) => {
    const { query, pageNum } = req.query;
    const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${NEWS_API_KEY}&sortBy=relevancy&language=en&pageSize=10&page=${pageNum}`);
    if (response.ok) {
        const data = await response.json();
        return res.status(200).json(data);
    }
    return res.status(400).json({ error: 'Failed to fetch articles' });
});

articlesRouter.get('/saved', async (req, res) => {
    const { user_id } = req.query;
    const { data, error } = await supabase.from('articles').select(
        `*, saved_articles(user_id)`
    ).eq('saved_articles(user_id)', user_id);
    if (error) {
        return res.status(400).json({ error: 'Failed to fetch saved articles' });
    }
    return res.status(200).json(data);
});

articlesRouter.post('/saved', async (req, res) => {
    const { user_id, article_id } = req.body;
    const { error } = await supabase.from('articles').insert({ user_id, article_id });
});

module.exports = articlesRouter;