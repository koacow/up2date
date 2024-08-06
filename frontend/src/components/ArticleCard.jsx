import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Typography,
    CardMedia,
    Link,
} from "@mui/material";

export default function ArticleCard({ article }) {
    console.log(article)
    return (
        <Card>
            <CardHeader
                title={article.title}
                
            />
            <CardContent>
                <Typography variant='body1'>
                    {article.description} 
                </Typography>
                <Typography variant='body3'>
                    {article.source.name}
                </Typography>
                <Typography variant='body3'>
                    {article.author}
                </Typography>
                <Typography variant='body2'>
                    {article.publishedAt}
                </Typography>
                <CardMedia 
                    src={article.urlToImage}
                    component='img' 
                />
            </CardContent>
            <CardActions>
                <Link href={article.url} target='_blank'>
                    Read More At {article.source.name}
                </Link>
            </CardActions>
        </Card>
    )
}