import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import WarningAmberOutlined from "@mui/icons-material/WarningAmberOutlined";
import { currencyFormatter } from "../utils/formatters";

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
                <Typography variant='h6' component='h3'>Previous close: {currencyFormatter(data.regularMarketPreviousClose)}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant='h6' component='h3'>Regular Market Volume: {currencyFormatter(data.regularMarketPreviousClose)}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant='h6' component='h3'>52 Week Range: {currencyFormatter(data.fiftyTwoWeekRange.low)} - {currencyFormatter(data.fiftyTwoWeekRange.high)}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant='h6' component='h3'>Open: {currencyFormatter(data.regularMarketOpen)}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant='h6' component='h3'>Day's Range: {currencyFormatter(data.regularMarketDayRange.low)} - {currencyFormatter(data.regularMarketDayRange.high)}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant='h6' component='h3'>Avg. 3mo. Volume: {data.averageDailyVolume3Month}</Typography>
            </Grid>
        </Grid>
    )
}