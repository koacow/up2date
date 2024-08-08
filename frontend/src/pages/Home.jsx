import {
    Box,
    Container,
} from '@mui/material';
import TopicCard from '../components/TopicCard';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserSavedTopics } from '../state/slices/topicsSlice';

export default function Home() {
    const session = useSelector((state) => state.session.session);
    const dispatch = useDispatch();
    const savedTopics = useSelector((state) => state.topics.topics);

    useEffect(() => {
        if (session) {
            dispatch(fetchUserSavedTopics());
        }
    }, [session]);

    return (
        <>
            <Container component='main'>
                {
                    savedTopics.map((topic, index) => {
                        return <TopicCard key={index} topic={topic} />
                    })
                }
            </Container>
        </>
    )
}