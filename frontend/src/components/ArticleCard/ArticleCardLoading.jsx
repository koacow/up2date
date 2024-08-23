import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function ArticleCardLoading() {
    return (
        <Card>
            <Stack spacing={2}>
                <Skeleton variant='text' />
                <Skeleton variant='text' />
                <Skeleton variant='rect' />
                <Skeleton variant='rect' />
            </Stack>
        </Card>
    )
}