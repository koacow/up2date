import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function StockPreviewCardError({ ticker }) {
    return (
        <Card>
            <CardHeader 
                title={ticker} 
                titleTypographyProps={{ className: 'font-semibold' }}
            />
            <CardContent>
                <Typography variant='body1' component='h6' >
                    Something went wrong while fetching this stock's data.
                </Typography>
            </CardContent>
        </Card>
    )
}