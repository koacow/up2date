import { React } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';

export default function Index() {
     
    return (
        <>
            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                    }}
                >
                    <Typography 
                        variant='h1' 
                        component={'h1'} 
                        sx={{
                            letterSpacing: '0.1em',
                            lineHeight: '1.2',
                        }}>
                            UP2DATE
                    </Typography>
                    <Typography variant='h3' component={'h2'}>An Independent Fully Customizable News App</Typography>
                    <Typography variant='h5' component={'h2'}>
                        Already have an account with us? <Link to='/login'>Login</Link>
                    </Typography>
                    <Typography variant='h5' component={'h2'}>
                        First time here? <Link to='/register'>Register</Link>
                    </Typography>
                </Box>
            </Container>
        </>
    );
}