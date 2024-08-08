import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {
    Box,
    Typography,
} from '@mui/material';

export default function AppError() {
    return (
        <Box>
            <Typography variant='h1' component='h1'>
                <WarningAmberIcon />
            </Typography>
            <Typography variant='h3' component='h2'>
                Oops something went really wrong here. We're going to need to fix this.
            </Typography>
        </Box>
    )
}