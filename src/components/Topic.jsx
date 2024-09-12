import Container from '@mui/material/Container';
import TopicCard from './TopicCard';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Topic(currentTab) {
    const savedTopics = useSelector((state) => state.topics.topics);
    const topic = savedTopics.find(topic => topic.id == currentTab);
    return (
        <Container component='main'>
            {
                <TopicCard topic={topic} />
            }
        </Container>
    )
}