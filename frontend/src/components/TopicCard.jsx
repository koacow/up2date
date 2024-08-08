import { 
    Box,
    Typography,
 } from "@mui/material";
import ArticleCard from "./ArticleCard";

export default function TopicCard({ articlesByTopic, topicName, loading, error }){

    const render = () => {
        if (loading) {
            return <Typography>Loading...</Typography>
        } else if (error) {
            return <Typography color='error'></Typography>
        } else {
            return articlesByTopic.map((article, index) => {
                return (
                    <ArticleCard key={index} article={article} />
                )
            })
        }
    }

    return (
        <Box component='section'>
            <Typography component='h2' variant='h3'>
                {topicName}
            </Typography>
            <Box>
                {render()}
            </Box>
        </Box>
    )
}