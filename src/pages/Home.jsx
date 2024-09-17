import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import TopicCard from '../components/TopicCard';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Home() {
    const savedTopics = useSelector((state) => state.topics.topics);
    const [ currentTab, setCurrentTab ] = useState(savedTopics[0].id);

    const handleTabChange = (e, newValue) => {
        setCurrentTab(newValue);
        setCurrentTopic(savedTopics.find(topic => topic.id === newValue));
    }

    return (
        <>
            <Tabs 
                textColor='secondary' 
                indicatorColor='secondary' 
                variant='scrollable' 
                scrollButtons='auto' 
                allowScrollButtonsMobile 
                value={currentTab}
                onChange={handleTabChange} 
                className='max-w-fit mx-auto'
            >
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
                <TopicCard currentTab={currentTab} key={currentTab} />
            </Container>
        </>
    )
}