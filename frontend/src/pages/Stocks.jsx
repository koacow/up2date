import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';    
import Box from '@mui/material/Box';
import StocksOverview from '../components/StocksOverview';
import { useState } from 'react';
import StocksWatchList from '../components/StocksWatchList';

export default function Stocks() {
    const [currentTab, setCurrentTab] = useState('watchlist');

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const getRenderedTab = () => {
        switch (currentTab) {
            case 'watchlist':
                return <StocksWatchList />;
            case 'overview':
                return <StocksOverview />;
            default:
                return null;
        }
    }

    return (
        <Box>
            <Tabs value={currentTab} onChange={handleTabChange}>
                <Tab value='overview' label='Overview' />
                <Tab value='watchlist' label='Watch List' />
            </Tabs>
            {getRenderedTab()}
        </Box>
    )
}