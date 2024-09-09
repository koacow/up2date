import { React } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import fullLogo from '../assets/full-logo.png';
import supabaseIcon from '../assets/supabase-icon.png';
import yahoofinanceIcon from '../assets/yahoofinance-icon.png';
import newsapiIcon from '../assets/newsapi-icon.png';
import BoltIcon from '@mui/icons-material/Bolt';
import GitHub from '@mui/icons-material/GitHub';

export default function About() {
     
    return (
        <Container
            className='h-screen px-2 md:w-1/2 md:mx-auto flex flex-col items-center justify-center text-center space-y-5'
        >
            <Box className='h-[1000px] flex flex-col text-center'>
                <a href='/'>
                    <img src={fullLogo} alt='Up2Date' className='w-full md:w-[700px]' />
                </a>
                <Typography variant='h3' component={'h2'}>
                    Breaking news. Real-time stocks.
                </Typography>
                <Typography variant='h3' component={'h2'} color='secondary'>
                    Your way.
                </Typography>
                <Typography variant='subtitle1' component={'p'} className='mt-5'>
                    Customize your news feed with any topic you want, from any source you want, and in any language you want.
                    Stay up-to-date with the latest news from around the world.
                    Track stocks, ETFs, and Indices in real-time with graphical data.
                </Typography>
            </Box>
            <Box className='h-[500px] flex items-center justify-center space-x-5'>
                <RouterLink to='/' className='no-underline text-inherit'>
                    <Button variant='contained' className='tracking-wider py-2 rounded-lg'>
                        <BoltIcon color='secondary' />
                        Get Up2Date
                    </Button>
                </RouterLink>
                <Link href='https://www.github.com/koacow/up2date' target='_blank' rel='noreferrer' className='no-underline text-inherit'>
                    <Button variant='outlined' className='tracking-wider py-2 rounded-lg'>
                        <GitHub className='mr-2' />
                        Source Code
                    </Button>
                </Link>
            </Box>
            <Box className='h-[500px] flex flex-wrap justify-center gap-10'>
                <Typography variant='h5' component={'h2'} className='w-full font-light italic'>
                    Powered by
                </Typography>
                <a href='https://supabase.com' target='_blank' rel='noreferrer'>
                    <img src={supabaseIcon} alt='Supabase' className='h-12 md:h-16' />
                </a>
                <a href='https://finance.yahoo.com' target='_blank' rel='noreferrer'>
                    <img src={yahoofinanceIcon} alt='Yahoo Finance' className='h-12 md:h-16' />
                </a>
                <a href='https://newsapi.org' alt='News API' target='_blank' rel='noreferrer'>
                    <img src={newsapiIcon} alt='News API' className='h-12 md:h-16' />
                </a>
            </Box>
            {/* <Box className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <Card>
                    <CardMedia>

                    </CardMedia>
                </Card>
            </Box> */}
        </Container>
    );
}