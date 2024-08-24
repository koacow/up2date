import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

export default function ArticleCardNoResults() {
    return (
        <Card>
            <CardHeader
                title={<Typography variant='h6' component='h3'>
                    We scoured the web, but couldn't find any articles matching your search.
                </Typography>}
            />
        </Card>
    )
}