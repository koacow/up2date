import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
export default function Footer () {
    return (
        <AppBar color='primary' className='flex fixed bottom-0 top-auto h-16 justify-center p-5'>
            <Container>
                <Typography variant='body1' className='text-center'>
                    &copy; 2024 Up2Date
                </Typography>
            </Container>
        </AppBar>
    )
}