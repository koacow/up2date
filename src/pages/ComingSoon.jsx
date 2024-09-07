import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import fullLogo from '../assets/full-logo.png';

export default function ComingSoon() {
    return (
        <Container 
            maxWidth='xl'
            className='flex flex-col items-center justify-center text-center'
        >
            <img src={fullLogo} alt='Up2Date' className='h-44 md:h-72 overflow-hidden' />
            <Typography variant='h4' component='h1' className='font-light'>
                This feature is still cooking. Check back soon!
            </Typography>
        </Container>
    );
}