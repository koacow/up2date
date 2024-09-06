import { React } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import supabaseIcon from '../assets/supabase-icon.svg';
import yahoofinanceIcon from '../assets/yahoofinance-icon.svg';
import newsapiIcon from '../assets/newsapi-icon.png';

export default function About() {
     
    return (
        <main
            className='h-screen w-full flex flex-col items-center justify-center text-center space-y-5'
        >
            <Typography 
                variant='h1' 
                component={'h1'} 
                className='tracking-widest font-bold'
                color='primary'
            >
                UP2DATE
            </Typography>
            <Typography variant='h3' component={'h2'}>
                An Independent Fully Customizable News App
            </Typography>
            <Typography variant='h5' component={'h2'} className='font-light italic'>
                Powered by
            </Typography>
            <Box>
                <a href='https://supabase.com' target='_blank' rel='noreferrer'>
                    <img src={supabaseIcon} alt='Supabase' className='h-16 w-16' />
                </a>
                <a href='https://finance.yahoo.com' target='_blank' rel='noreferrer'>
                    <img src={yahoofinanceIcon} alt='Yahoo Finance' className='h-16 w-16' />
                </a>
                <a href='https://newsapi.org' alt='News API' target='_blank' rel='noreferrer'>
                    <img src={newsapiIcon} alt='News API' className='h-16' />
                </a>
            </Box>
            <Button variant='contained' className='text-lg py-3 px-4 rounded-lg'>
                <RouterLink to='/' className='no-underline text-inherit'>Get Up2Date</RouterLink>
            </Button>
        </main>
    );
}