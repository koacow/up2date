// usersRouter matches /api/users paths

const usersRouter = require('express').Router();
const supabase = require('../../models/db');

usersRouter.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
            emailRedirectTo: 'http://localhost:5173',
        },
    });
    if (error) {
        return res.status(400).json({ 
            error: error.message,
            code: error.code
         });
    }
    return res.status(200).json(data);
});

usersRouter.post('/register', async (req, res) => {
    const { email, password, first_name, last_name } = req.body;
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password
    });
    if (authError) {
        return res.status(400).json({ 
            error: authError.message,
            code: authError.code
         });
    }
    const user_id = authData.user.id;
    const { error: insertError } = await supabase.from('user_profiles').insert({ user_id, first_name, last_name, region_code });
    if (insertError) {
        return res.status(400).json({ 
            error: userError.message,
            code: userError.code
        });
    }
    return res.status(200).json(authData);
});

usersRouter.put('/reset-password', async (req, res) => {
    const { email } = req.body;
    const { error} = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:5173',
    });
    if (error) {
        return res.status(400).json({ 
            error: error.message,
            code: error.code
         });
    }
    return res.status(200).json({ message: 'Password reset email sent' });
});
module.exports = usersRouter;