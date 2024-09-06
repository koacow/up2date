import { React } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function About() {
     
    return (
        <main
            className='h-screen w-full flex flex-col items-center justify-center text-center space-y-5'
        >
            <Typography 
                variant='h1' 
                component={'h1'} 
                className='tracking-widest font-bold'
            >
                UP2DATE
            </Typography>
            <Typography variant='h3' component={'h2'}>
                An Independent Fully Customizable News App
            </Typography>
            <Typography variant='h5' component={'h2'} className='font-light italic'>
                Powered by
                <img src='../assets/newsapi-icon.png' alt="" />
            </Typography>
            <Button variant='contained' className='text-lg py-3 px-4 rounded-lg'>
                <RouterLink to='/' className='no-underline text-inherit'>Get Up2Date</RouterLink>
            </Button>
        </main>
    );
}