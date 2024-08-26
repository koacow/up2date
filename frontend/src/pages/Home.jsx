import Container from '@mui/material/Container';
import TopicCard from '../components/TopicCard';
import { useSelector } from 'react-redux';

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