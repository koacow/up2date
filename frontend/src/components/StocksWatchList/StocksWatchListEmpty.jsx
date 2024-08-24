import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function StocksWatchListEmpty() {
    return (
        <Box>
            <Typography variant='h4' component='h4'>Watch List</Typography>
            <Typography variant='h5' component='h5'>Your watch list is empty. Search for some stocks to track!</Typography>
        </Box>
    )
}