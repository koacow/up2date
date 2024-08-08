import {
    Container
} from '@mui/material';

export default function NotFound() {
    const imgSrc = "https://imgs.xkcd.com/comics/not_available_2x.png";
    return (
        <Container 
            maxWidth='xl'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }} 
        >
            <img src={imgSrc} alt="Not Found" />
        </Container>
    );
}