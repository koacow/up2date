import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { dateFormatter } from '../../utils/formatters';

export default function ArticleCard({ article }) {
    return (
        <Card className='flex flex-col md:flex-row rounded-md'>
            <CardContent>
                <CardMedia 
                    src={article.urlToImage}
                    component='img' 
                    className='rounded-lg'
                />
                <aside className='flex-col mt-2 hidden md:flex'>
                    <Typography variant='subtitle1'>
                        {`${article.author ? article.author : 'Unknown'}`}
                    </Typography>
                    <Typography variant='subtitle2'>
                        {dateFormatter(article.publishedAt)}
                    </Typography>
                </aside>
            </CardContent>
            <CardHeader
                title={<Link href={article.url} target='_blank' rel='noreferrer' className='no-underline text-inherit'>{article.title}</Link>}
                subheader={article.description}
                titleTypographyProps={{ 
                    variant: 'h4', 
                    component: 'h2',
                    className: 'mb-5',
                }}
                subheaderTypographyProps={{ variant: 'body1', component: 'p' }}
                className='mb-auto'
                aria-label='Link to article'
            />
        </Card>
    )
}