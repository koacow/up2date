import {
    Container,
} from '@mui/material';
import TopicCard from '../components/TopicCard';
import { useSelector, useDispatch } from 'react-redux';

export default function Home() {
    const savedTopics = useSelector((state) => state.topics.topics);  

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