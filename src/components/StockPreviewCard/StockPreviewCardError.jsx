import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function StockPreviewCardError({ ticker }) {
    return (
        <Card className='flex flex-col aspect-auto'>
            <CardHeader 
                title={ticker} 
                titleTypographyProps={{ 
                    className: 'font-semibold',
                    variant: 'h5',
                    component: 'h2'
                }}
            />
            <CardContent>
                <Typography variant='h6' component='h3' >
                    Something went wrong while fetching this stock's data.
                </Typography>
            </CardContent>
        </Card>
    )
}