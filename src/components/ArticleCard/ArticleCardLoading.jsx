import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';

export default function ArticleCardLoading() {
    return (
        <Card
            className='space-y-5 flex rounded-md space-x-5 w-auto'
        >
            <CardContent>
                <Skeleton variant='rect' width={200} height={200} />
                <Skeleton variant='text' width={200} />
                <Skeleton variant='text' width={100} />
            </CardContent>
            <CardContent>
                <Skeleton variant='text' width={400} />
                <Skeleton variant='text' width={400} />
            </CardContent>
        </Card>
    )
}