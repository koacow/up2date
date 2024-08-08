import {
    Box,
    Container,
} from '@mui/material';
import TopicCard from '../components/TopicCard';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserSavedTopics, setPageNumForTopic, setTopics } from '../state/slices/topicsSlice';
import { fetchArticlesForSavedTopic } from '../state/slices/articlesSlice';

export default function Home() {
    const session = useSelector((state) => state.session.session);
    const dispatch = useDispatch();
    const articlesBySavedTopics = useSelector((state) => state.articles.articlesBySavedTopics);
    const savedTopics = useSelector((state) => state.topics.topics);

    const fetchAuthenticatedUserSavedTopics = async () => {
        const fetchedUserSavedTopics = await dispatch(fetchUserSavedTopics()).unwrap(); 
        for (const topic of fetchedUserSavedTopics) {
            dispatch(fetchArticlesForSavedTopic(topic));
        }
    }

    useEffect(() => {
        if (session) {
            fetchAuthenticatedUserSavedTopics();
        } else {
            for (const topic of savedTopics) {
                dispatch(fetchArticlesForSavedTopic(topic));
            }
        }
    }, [session]);

    return (
        <>
            <Container component='main'>
                {
                    // TO DO: fix the problem of old topics persisting in the render after logging in.
                    Object.keys(articlesBySavedTopics).map((topicId) => {
                        const topic = savedTopics.find((topic) => topic.id === parseInt(topicId));
                        const topicName = topic.topic;
                        const articlesByTopic = articlesBySavedTopics[topicId].articles;
                        const articlesByTopicError = articlesBySavedTopics[topicId].error;
                        const articlesBytopicLoading = articlesBySavedTopics[topicId].loading;
                        return (
                            <Box key={topicId}>
                                <TopicCard articlesByTopic={articlesByTopic} topicName={topicName} loading={articlesBytopicLoading} error={articlesByTopicError} />
                            </Box>
                        )
                    })
                }
            </Container>
        </>
    )
}