import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import fullLogo from '../assets/full-logo.png';

export default function ComingSoon() {
    const navigate = useNavigate();
    const goBack = (e) => {
        e.preventDefault();
        navigate(-1);
    }
    return (
        <Container 
            maxWidth='xl'
            className='flex flex-col items-center justify-center text-center'
        >
            <img src={fullLogo} alt='Up2Date' className='h-44 md:h-72 overflow-hidden' />
            <Typography variant='h4' component='h1' className='font-light'>
                This feature is still cooking. Check back soon!
            </Typography>
            <Button variant='contained' className='mt-5' color='primary' onClick={goBack}>Go Back</Button>
        </Container>
    );
}