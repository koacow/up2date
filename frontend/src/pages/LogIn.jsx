import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import LoginForm from '../components/LoginForm';
import Copyright from '../components/Copyright';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logUserIn } from '../state/slices/sessionSlice';

export default function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginError = useSelector((state) => state.session.error);
  const loginLoading = useSelector((state) => state.session.loading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(logUserIn({ email, password }));
    if (!loginError) {
      navigate('/');
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundColor: 'secondary.main',
          backgroundSize: 'cover',
          backgroundPosition: 'left',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          className='flex flex-col items-center my-8 mx-4'
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
            loginError={loginError}
            loginLoading={loginLoading}
          />
          <Copyright className='mt-5' />
        </Box>
      </Grid>
    </Grid>
  );
}