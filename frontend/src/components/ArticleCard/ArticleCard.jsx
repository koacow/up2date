import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { dateFormatter } from '../../utils/formatters';

export default function ArticleCard({ article }) {
    return (
        <Card className='flex rounded-md'>
            <CardContent>
                <CardMedia 
                    src={article.urlToImage}
                    component='img' 
                    className='rounded-lg'
                />
                <aside className='flex flex-col my-2'>
                    <Typography variant='body5'>
                        {`${article.author ? article.author : 'Unknown'}`}
                    </Typography>
                    <Typography variant='body2'>
                        {dateFormatter(article.publishedAt)}
                    </Typography>
                </aside>
            </CardContent>
            <CardHeader
                title={article.title}
                subheader={article.description}
                titleTypographyProps={{ 
                    variant: 'h4', 
                    component: 'h2',
                    className: 'mb-5 cursor-pointer hover:text-blue-500',
                }}
                subheaderTypographyProps={{ variant: 'body1', component: 'p' }}
                className='mb-auto'
                onClick={() => window.open(article.url, '_blank')}
                aria-label='Link to article'
            />
        </Card>
    )
}