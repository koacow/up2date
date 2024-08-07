import {
    Box,
    Container,
} from '@mui/material';
import TopicCard from '../components/TopicCard';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserSavedTopics, setPageNumForTopic, setTopics } from '../state/slices/topicsSlice';
import { fetchArticlesForSavedTopic } from '../state/slices/articlesSlice';

export default function Home() {
    const session = useSelector((state) => state.session.session);
    const dispatch = useDispatch();
    const articlesBySavedTopicsInStore = useSelector((state) => state.articles.articlesBySavedTopics);
    const savedTopicsInStore = useSelector((state) => state.topics.topics);

    const [articlesByTopic, setArticlesByTopic] = useState(articlesBySavedTopicsInStore);
    const [topics, setTopics] = useState(savedTopicsInStore);

    const fetchAuthenticatedUserSavedTopics = async () => {
        dispatch(setTopics([]));
        const fetchedUserSavedTopics = await dispatch(fetchUserSavedTopics()).unwrap(); 
        for (const topic of fetchedUserSavedTopics) {
            dispatch(fetchArticlesForSavedTopic(topic));
        }
    }

    useEffect(() => {
        if (session) {
            fetchAuthenticatedUserSavedTopics();
            setArticlesByTopic(articlesBySavedTopicsInStore);
            setTopics(savedTopicsInStore);
        } else {
            for (const topic of topics) {
                dispatch(fetchArticlesForSavedTopic(topic));
            }
            setArticlesByTopic(articlesBySavedTopicsInStore);
            setTopics(savedTopicsInStore);
        }
    }, [session, articlesBySavedTopicsInStore, savedTopicsInStore]);

    return (
        <>
            <Container component='main'>
                {
                    // TO DO: fix the problem of old topics persisting in the render after logging in.
                    Object.keys(articlesByTopic).map((topicId) => {
                        const topic = topics.find((topic) => topic.id === parseInt(topicId));
                        if (!topic) {
                            return <Box key={topicId}>
                                <TopicCard  error='Something went wrong when we were scouring the internet for news.' />
                            </Box>
                        }
                        const topicName = topic.topic;
                        const articlesByTopic = articlesByTopic[topicId].articles;
                        const articlesByTopicError = articlesByTopic[topicId].error;
                        const articlesBytopicLoading = articlesByTopic[topicId].loading;
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