import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
export default function StockPreviewCardLoading() {
    return (
        <Card className='flex flex-col'>
            <Skeleton variant='rect' width={200} height={100} />
            <Skeleton variant='text' width='100%' height={75} />
        </Card>
    )
}