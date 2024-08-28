import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
export default function StockPreviewCardLoading() {
    return (
        <Card className='flex flex-col w-[200px] h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px]'>
            <Skeleton variant='text' width='40%'/>
            <Skeleton variant='rect' width='100%' height='80%' />
        </Card>
    )
}