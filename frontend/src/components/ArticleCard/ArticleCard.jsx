import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LaunchIcon from '@mui/icons-material/Launch';
import { dateFormatter } from '../../utils/formatters';

export default function ArticleCard({ article }) {
    return (
        <Card>
            <CardHeader
                title={article.title}
                subheader={article.description}
                titleTypographyProps={{ variant: 'h4', component: 'h2' }}
                subheaderTypographyProps={{ variant: 'body1', component: 'p' }}
            />
            <CardContent>
                <CardMedia 
                    src={article.urlToImage}
                    component='img' 
                />
                <Typography variant='body3'>
                    {`By ${article.author ? article.author : 'Unknown'}`}
                </Typography>
                <Typography variant='body1'>
                    {dateFormatter(article.publishedAt)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button href={article.url} target='_blank' variant='contained' >
                {article.source.name} <LaunchIcon />
                </Button>
            </CardActions>
        </Card>
    )
}