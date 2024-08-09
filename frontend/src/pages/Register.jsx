import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import RegistrationForm from '../components/RegistrationForm';
import Copyright from '../components/Copyright';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../state/slices/sessionSlice';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registrationError = useSelector((state) => state.session.error);
  const registrationLoading = useSelector((state) => state.session.loading);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerUser({ first_name: firstName, last_name: lastName, email, password }));
    navigate('/register/configure-preferences');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <RegistrationForm 
          handleSubmit={handleSubmit}
          registrationError={registrationError}
          registrationLoading={registrationLoading}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}