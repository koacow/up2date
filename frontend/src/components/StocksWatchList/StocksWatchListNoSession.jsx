import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function StocksWatchListNoSession() {
    return (
        <Box>
            <Typography variant='h5' component='h5'>
                <Link href='/login'>Log in</Link> to view your watch list.
            </Typography>
        </Box>
    )
}