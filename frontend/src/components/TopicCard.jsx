import { 
    Box,
    Typography,
 } from "@mui/material";
import ArticleCard from "./ArticleCard";

export default function TopicCard({ articlesByTopic, topicName, error }){
    return (
        <Box component='section'>
            <Typography component='h2' variant='h3'>
                {topicName}
            </Typography>
            <Box>
                {
                    error ? <Typography color='error'>{error}</Typography> :
                    articlesByTopic.map((article, index) => {
                        return (
                            <ArticleCard key={index} article={article} />
                        )
                    })
                }
            </Box>
        </Box>
    )
}