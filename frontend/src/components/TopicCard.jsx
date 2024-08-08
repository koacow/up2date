import { 
    Box,
    Typography,
    Stack,
    Pagination
 } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageNumForTopic } from "../state/slices/topicsSlice";
import { fetchArticlesForSavedTopic } from "../state/slices/articlesSlice";
import ArticleCard from "./ArticleCard";

export default function TopicCard({ topic }) {
    const dispatch = useDispatch();
    const articlesByTopic = useSelector((state) => state.articles.articlesBySavedTopics[topic.id]);

    
    const { id, topic: topicName, pageNum } = topic;
    const { articles, loading, error } = articlesByTopic;
    
    const [paginationDisplayedNum, setPaginationDisplayedNum] = useState(pageNum);

    useEffect(() => {
        dispatch(fetchArticlesForSavedTopic(topic));
    }, [paginationDisplayedNum]);
    
    const handlePageChange = (e, value) => {
        dispatch(setPageNumForTopic({ topicId: id, pageNum: value }));
        setPaginationDisplayedNum(value);
    }

    const renderArticles = () => {
        if (loading) {
            return <Typography>Loading...</Typography>
        } else if (error) {
            return <Typography color='error'></Typography>
        } else {
            return (
                <Stack spacing={2}>
                    {articles.map((article, index) => {
                        return <ArticleCard key={index} article={article} />
                    })}
                    <Pagination count={10} page={paginationDisplayedNum} onChange={handlePageChange} color='primary' />
                </Stack>
            )
        }
    }

    return (
        <Box component='section'>
            <Typography component='h2' variant='h3'>
                {topicName}
            </Typography>
            <Box>
                {renderArticles()}
            </Box>
        </Box>
    )
}