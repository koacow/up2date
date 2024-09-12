import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import TopicCard from '../components/TopicCard';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Home() {
    const savedTopics = useSelector((state) => state.topics.topics);
    const [ currentTab, setCurrentTab ] = useState(0);
    const [ currentTopic, setCurrentTopic ] = useState(savedTopics[0]);

    const handleTabChange = (e, newValue) => {
        setCurrentTab(newValue);
        setCurrentTopic(savedTopics.find(topic => topic.id === newValue));
    }

    return (
        <>
            <Tabs textColor='secondary' indicatorColor='secondary' centered scrollButtons allowScrollButtonsMobile value={currentTab}
            onChange={handleTabChange} >
                {
                    savedTopics.map((topic, index) => {
                        return <Tab 
                                    key={index} 
                                    label={topic.topic} 
                                    value={topic.id} />
                    })
                }
            </Tabs>
            <Container component='main'>
                <TopicCard topic={currentTopic} />
            </Container>
        </>
    )
}