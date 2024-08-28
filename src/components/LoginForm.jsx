import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { isValidEmail } from '../utils/authInputValidation';
import { useState } from 'react';

export default function LoginForm({ email, setEmail, password, setPassword, handleSubmit, loginError, loginLoading }) {
    const [emailError, setEmailError] = useState(false);
    const [passwordEmpty, setPasswordEmpty] = useState(true);
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError(!isValidEmail(e.target.value));
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordEmpty(e.target.value === '');
    };

    const allowSubmit = () => (email !== '' && !emailError && !passwordEmpty);
    
    return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                value={email}
                onChange={handleEmailChange}       
                error={emailError}
                helperText={emailError && 'Please enter a valid email address'}         
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
            />
            <TextField
                margin="normal"
                value={password}
                onChange={handlePasswordChange}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
            />
            {
                loginError && <Typography color="error">{loginError}</Typography>
            }
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!allowSubmit() || loginLoading}
            >
              {loginLoading ? 'Logging you in...' : 'Log In'}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to='/reset-password'>
                    Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
    )
}