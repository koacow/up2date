// usersRouter matches /api/users paths

// Import required modules
const { body, validationResult } = require('express-validator');
const usersRouter = require('express').Router();
const supabase = require('../../models/db');

usersRouter.post('/authenticate', 
    // Input validation chain
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    async (req, res) => {
        // If there are validation errors, return a 400 response
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({ error: 'Invalid input' });
        }

        // Authenticate user with email and password
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

usersRouter.post('/register',
    // Input validation chain
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('first_name').notEmpty().isString().escape(),
    body('last_name').notEmpty().isString().escape(),
    async (req, res) => {
        // If there are validation errors, return a 400 response
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({ error: 'Invalid input' });
        }

        // Register user with email, password, first name, and last name
        const { email, password, first_name, last_name, region_code } = req.body;
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

        // Insert user profile data into the user_profiles table
        const user_id = authData.user.id;
        const { error: insertError } = await supabase.from('user_profiles').insert({ user_id, first_name, last_name });
        if (insertError) {
            return res.status(400).json({ 
                error: userError.message,
                code: userError.code
            });
        }
        return res.status(200).json(authData);
});

usersRouter.put('/reset-password',
    // Input validation chain
    body('email').isEmail().normalizeEmail(), 
    async (req, res) => {
        // If there are validation errors, return a 400 response
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({ error: 'Invalid input' });
        }

        // Send password reset email to user
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