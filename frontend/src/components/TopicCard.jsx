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
    const session = useSelector((state) => state.session.session);
    const dispatch = useDispatch();
    const { id, topic: topicName, pageNum } = topic;
    const [paginationDisplayedNum, setPaginationDisplayedNum] = useState(pageNum);

    useEffect(() => {
        dispatch(fetchArticlesForSavedTopic(topic));
    }, [session, paginationDisplayedNum]);
    
    const articlesByTopic = useSelector((state) => state.articles.articlesBySavedTopics[topic.id]);
    const { articles, totalPages, loading, error } = articlesByTopic ? articlesByTopic : { articles: [], totalPages: 0, loading: true, error: null };

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
                    <Pagination count={totalPages} page={paginationDisplayedNum} onChange={handlePageChange} color='primary' />
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