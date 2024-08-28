import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
export default function StockPreviewCardLoading() {
    return (
        <Card className='flex flex-col aspect-auto'>
            <Skeleton variant='text' width='40%'/>
            <Skeleton variant='rect' width='100%' height='80%' />
        </Card>
    )
}