import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function AppError() {
    const navigate = useNavigate();
    const goBack = (e) => {
        e.preventDefault();
        navigate(-1);
    }
    return (
        <Container className='flex flex-col items-center justify-center space-y-5 text-center my-10' >
            <SentimentDissatisfiedOutlinedIcon color='error' className='size-20 md:size-28' />
            <Typography variant='h3' component='h2' color='error'>
                Yikes! Something went really wrong here, we are going to need to fix this.
            </Typography>
            <Button variant='contained' color='warning' onClick={goBack}>Go Back</Button>
        </Container>
    )
}