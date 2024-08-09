import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { resetPassword } from '../api/authAPI';
import { isValidEmail } from '../utils/authInputValidation';

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setEmail(e.target.value);
        setEmailError(!isValidEmail(e.target.value) || e.target.value.length === 0);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await resetPassword(email);
            setLoading(false);
            setMessage('We have sent you an email with instructions to reset your password');
        } catch (error) {
            setLoading(false);
            setMessage(error.message);
        }
    };

    const allowSubmit = () => {
        return isValidEmail(email) && !emailError;
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box>
                <Typography component="h1" variant="h5">
                    Enter your email address and we will send you a link to reset your password
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={handleChange}
                        error={emailError}
                        helperText={emailError ? 'Please enter a valid email address' : ''}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={!allowSubmit() || loading}
                    >
                        {loading ? 'Please wait while we process your request' : 'Reset password'}
                    </Button>
                    <Typography variant="body2" color="text.secondary" align="center">
                        {message}
                    </Typography>
                    <Box mt={5}>
                        <Typography variant="body2" color="text.secondary" align="center">
                            Remembered your password?&nbsp;
                            <Link to="/login" variant="body2">
                                Log in
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}