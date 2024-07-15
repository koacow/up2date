// usersRouter matches /api/users paths

const usersRouter = require('express').Router();
const supabase = require('../../models/db');

usersRouter.post('/authenticate', async (req, res) => {
    const { username, email, password } = req.body;
    const { data, error } = await supabase.auth.signIn({
        email,
        password,
        options: {
            emailRedirectTo: 'http://localhost:3000',
        },
    });
    if (error) {
        console.log(error);
        return res.status(400).json({ error: error.message });
    }
    console.log(data);
    return res.status(200).json(data);
});

usersRouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const { authData, authError } = await supabase.auth.signUp({
        email,
        password
    });
    if (authError) {
        return res.status(400).json({ error: authError.message });
    }
    return res.status(200).json(authData);
});

usersRouter.put('/reset-password', async (req, res) => {
    const { email } = req.body;
    await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:3000',
    });
});
module.exports = usersRouter;