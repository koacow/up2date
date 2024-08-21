import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import WarningAmberOutlined from "@mui/icons-material/WarningAmberOutlined";

export default function StockQuote ({ data, loading, error }){
    if (loading) {
        return (
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Typography variant='h6' component='h3'>Previous close: loading...</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='h6' component='h3'>Regular Market Volume: loading... </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='h6' component='h3'>52 Week Range: loading...</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='h6' component='h3'>Open: loading...</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='h6' component='h3'>Day's Range: loading...</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='h6' component='h3'>Avg. 3mo. Volume: loading...</Typography>
                </Grid>
            </Grid>
        )
    } else if (error) {
        return (
            <Grid container>
                <Grid item>
                    <WarningAmberOutlined />
                    <Typography>Error: {error}</Typography>
                </Grid>
            </Grid>
        )
    } else return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Typography variant='h6' component='h3'>Previous close: {data.regularMarketPreviousClose}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant='h6' component='h3'>Regular Market Volume: {data.regularMarketPreviousClose}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant='h6' component='h3'>52 Week Range: {data.fiftyTwoWeekRange.low} - {data.fiftyTwoWeekRange.high}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant='h6' component='h3'>Open: {data.regularMarketOpen}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant='h6' component='h3'>Day's Range: {data.regularMarketDayRange.low} - {data.regularMarketDayRange.high}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant='h6' component='h3'>Avg. 3mo. Volume: {data.averageDailyVolume3Month}</Typography>
            </Grid>
        </Grid>
    )
}