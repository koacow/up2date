import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';    
import Box from '@mui/material/Box';
import StocksFollowing from '../components/StocksWatchList';
import StocksOverview from '../components/StocksOverview';
import { useState } from 'react';

export default function Stocks() {
    const [currentTab, setCurrentTab] = useState('watch-list');

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const getRenderedTab = () => {
        switch (currentTab) {
            case 'watch-list':
                return <StocksFollowing />;
            case 'overview':
                return <StocksOverview />;
            default:
                return null;
        }
    }

    return (
        <Box>
            <Tabs value={currentTab} onChange={handleTabChange}>
                <Tab value='watch-list' label='Watch List' />
                <Tab value='overview' label='Overview' />
            </Tabs>
            {getRenderedTab()}
        </Box>
    )
}