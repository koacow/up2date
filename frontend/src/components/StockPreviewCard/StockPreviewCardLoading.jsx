import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
export default function StockPreviewCardLoading() {
    return (
        <Card>
            <CardHeader 
                title={<Skeleton variant='text' />}
                subheader={<Skeleton variant='text' />}/>
            <CardContent>
                <Skeleton variant='rectangular' />
                <Skeleton variant='rectangular' height={100} />
                <Skeleton variant='rectangular' height={100} />
            </CardContent>
            <CardActions>
                <Skeleton variant='circular' />
            </CardActions>
        </Card>
    )
}