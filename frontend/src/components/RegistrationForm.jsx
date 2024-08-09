import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { isValidEmail, isStrongPassword } from '../utils/authInputValidation';

export default function RegistrationForm({ handleSubmit, error, loading, firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword, registrationError, registrationLoading }) {
    const [firstNameEmpty, setFirstNameEmpty] = useState(false);
    const [lastNameEmpty, setLastNameEmpty] = useState(false);  
    const [emailError, setEmailError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
        setFirstNameEmpty(e.target.value === '');
    };
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
        setLastNameEmpty(e.target.value === '');
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        const isValid = isValidEmail(e.target.value);
        setEmailError(!isValid);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        const codeToMessage = {
            1: 'Password must contain a lowercase letter',
            2: 'Password must contain an uppercase letter',
            3: 'Password must contain a number',
            4: 'Password must contain a special character ($@#&!)',
            5: 'Password must be at least 6 characters long'
        };
        const error = isStrongPassword(e.target.value);
        const errorMessage = codeToMessage[error];
        setPasswordErrorMessage(errorMessage ? errorMessage : '');
    };

    const allowSubmit = () => (firstName !== '' && lastName !== '' && email !== '' && !emailError && passwordErrorMessage !== '');

    return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                error = {firstNameEmpty}
                helperText = {firstNameEmpty && 'Required field'}
                value={firstName}
                onChange={handleFirstNameChange}                
                type='text'
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error = {lastNameEmpty}
                helperText = {lastNameEmpty && 'Required field'}
                required
                fullWidth
                type='text'
                value={lastName}
                onChange={handleLastNameChange}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                value={email}
                onChange={handleEmailChange}
                error={emailError}
                helperText={emailError ? 'Invalid email address' : ''}
                fullWidth
                type='email'
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                value={password}
                onChange={handlePasswordChange}
                error={passwordErrorMessage !== ''}
                helperText={passwordErrorMessage}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={registrationLoading || !allowSubmit()}
          >
            {registrationLoading ? 'Signing you up...' : 'Sign Up'}
          </Button>
          {
            registrationError && <Typography color="error">{error}</Typography>
          }          
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to='/login'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
    )
}