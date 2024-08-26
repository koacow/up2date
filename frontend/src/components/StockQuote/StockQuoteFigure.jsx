import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
export default function StockQuoteFigure({ label, value }) {
    return (
        <Grid item xs={6} md={4} lg={3} className='flex' >
            <Typography variant='h6' component='h3' className='font-light'>{label}: </Typography>
            <Typography variant='h6' component='h3' className='ml-auto font-semibold'>{value}</Typography>
        </Grid>
    )
}