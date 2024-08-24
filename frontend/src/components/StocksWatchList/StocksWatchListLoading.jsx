import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import StockPreviewCard from '../StockPreviewCard/StockPreviewCard';

export default function StocksWatchListLoading() {
    return (
        <Box>
            <Typography variant='h4' component='h4'>Watch List</Typography>
            <Grid container spacing={2}>
                {
                    Array(4).fill(null).map((_, index) => {
                        return (
                            <Grid item sx={3} key={index}>
                                <StockPreviewCard />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

