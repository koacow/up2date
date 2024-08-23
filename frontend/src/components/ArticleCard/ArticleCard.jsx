import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Typography,
    CardMedia,
    Button,
} from "@mui/material";

export default function ArticleCard({ article }) {
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
                <Button href={article.url} target='_blank' variant='contained' >
                    Continue Reading At {article.source.name}
                </Button>
            </CardActions>
        </Card>
    )
}