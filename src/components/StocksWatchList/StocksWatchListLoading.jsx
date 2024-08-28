import Grid from '@mui/material/Grid';
import StockPreviewCard from '../StockPreviewCard/StockPreviewCard';

export default function StocksWatchListLoading() {
    return (
        <Grid container rowGap={1} columnSpacing={1}>
            {
                [1,2,3,4].map((_, index) => {
                    return (
                        <Grid item sx={6} md={4} lg={3} key={index}>
                            <StockPreviewCard data={null} />
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

 