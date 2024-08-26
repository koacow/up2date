import Grid from '@mui/material/Grid';
import StockPreviewCard from '../StockPreviewCard/StockPreviewCard';

export default function StocksWatchListLoading() {
    return (
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
    )
}

 