import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function StocksWatchListError() {   
    return (
        <>
            <Typography variant='h6' component='h5'>
                There was an error fetching your watch list. Please try again later.
            </Typography>
        </>
    )
}