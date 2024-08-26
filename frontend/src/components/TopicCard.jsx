import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageNumForTopic } from "../state/slices/topicsSlice";
import { fetchArticlesForSavedTopic } from "../state/slices/articlesSlice";
import ArticleCard from "./ArticleCard/ArticleCard";
import ArticleCardLoading from "./ArticleCard/ArticleCardLoading";
import ArticleCardError from "./ArticleCard/ArticleCardError";

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
            return [...Array(4)].map((_, index) => {
                return <ArticleCardLoading key={index} />
            })
        } else if (error) {
            return <ArticleCardError />
        } else {
            return (
                <Stack spacing={4}>
                    {articles.map((article, index) => {
                        return <ArticleCard key={index} article={article} />
                    })}
                    <Pagination 
                        count={totalPages} 
                        page={paginationDisplayedNum} 
                        onChange={handlePageChange}
                        className='mx-auto' 
                    />
                </Stack>
            )
        }
    }

    return (
        <Box component='section'>
            <Typography 
                component='h1' 
                variant='h1'
                className='text-center tracking-wider font-semibold m-4'
            >
                {topicName}
            </Typography>
            <Box>
                {renderArticles()}
            </Box>
        </Box>
    )
}