import {
    Box,
    Container,
    Typography,
} from '@mui/material';
import TopicCard from '../components/TopicCard';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserSavedTopics, setPageNumForTopic } from '../state/slices/topicsSlice';
import { fetchArticlesForSavedTopic } from '../state/slices/articlesSlice';

export default function Home() {
    const session = useSelector((state) => state.session.session);
    const dispatch = useDispatch();
    const articlesBySavedTopics = useSelector((state) => state.articles.articlesBySavedTopics);
    const savedTopics = useSelector((state) => state.topics.topics);

    useEffect(() => {
        if (session) {
            dispatch(fetchUserSavedTopics())
        }
        dispatch(fetchArticlesForSavedTopic(savedTopics[0])); // TO DO: Change this to fetch articles for all saved topics
    }, [session, dispatch]);

    return (
        <>
            <Box component='header'>
                <Typography
                    variant='h1'
                    component={'h1'}
                    align='center'
                    >
                    UP2DATE
                </Typography>
            </Box>
            <Container component='main'>
                {
                    Object.keys(articlesBySavedTopics).map((topicId) => {
                        const topicName = savedTopics.find((topic) => topic.id === parseInt(topicId)).topic;
                        const articlesByTopic = articlesBySavedTopics[topicId].articles;
                        console.log
                        return (
                            <Box key={topicId}>
                                <TopicCard articlesByTopic={articlesByTopic} topicName={topicName} />
                            </Box>
                        )
                    })
                }
            </Container>
        </>
    )
}