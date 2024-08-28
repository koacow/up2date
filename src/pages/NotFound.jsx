import Container from '@mui/material/Container';

export default function NotFound() {
    const imgSrc = "https://imgs.xkcd.com/comics/not_available_2x.png";
    return (
        <Container 
            maxWidth='xl'
            className='flex flex-col items-center justify-center h-screen'
        >
            <img src={imgSrc} alt="Not Found" />
        </Container>
    );
}