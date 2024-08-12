import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

export default function StockPreviewCard({ stock }) {
    const { symbol, name, quote } = stock;

    return (
        <Card>
            <CardHeader
                title={symbol}
                subheader={name}
            />
            <CardContent>
                <Typography variant='h4'>
                    {quote}
                </Typography>
            </CardContent>
        </Card>
    )
}