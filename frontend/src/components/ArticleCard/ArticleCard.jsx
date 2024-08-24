import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Typography,
    CardMedia,
    Button,
} from "@mui/material";
import LaunchIcon from '@mui/icons-material/Launch';

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
                {article.source.name} <LaunchIcon />
                </Button>
            </CardActions>
        </Card>
    )
}