// usersRouter matches /api/users paths

const usersRouter = require('express').Router();
const supabase = require('../../models/db');

usersRouter.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signIn({
        email,
        password
    });
    if (error) {
        return res.status(400).json({ error: error.message });
    }
    return res.status(200).json(data);
});

usersRouter.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });
    if (error) {
        return res.status(400).json({ error: error.message });
    }
    return res.status(200).json(data);
});

module.exports = usersRouter;