import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function AppError() {
    const navigate = useNavigate();
    const goBack = (e) => {
        e.preventDefault();
        navigate(-1);
    }
    return (
        <Box>
            <Typography variant='h1' component='h1'>
                <WarningAmberIcon />
            </Typography>
            <Typography variant='h3' component='h2'>
                Oops something went really wrong here. We are going to need to fix this.
            </Typography>
            <Button variant='outlined' onClick={goBack}>Go Back</Button>
        </Box>
    )
}