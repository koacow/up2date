import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function StocksWatchListError() {   
    return (
        <Box>
            <Typography variant='h4' component='h4'>Watch List</Typography>
            <Typography variant='h5' component='h5'>There was an error fetching your watch list. Please try again later.</Typography>
        </Box>
    )
}