import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';    
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import StocksOverview from '../components/StocksOverview';
import StocksWatchList from '../components/StocksWatchList/StocksWatchList';
import StockSearch from '../components/StockSearch';
import { useState } from 'react';

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
        <>
            <Container>
                <StockSearch />
            </Container>
            <Box>
                <Tabs value={currentTab} onChange={handleTabChange}>
                    <Tab value='overview' label='Overview' />
                    <Tab value='watchlist' label='Watch List' />
                </Tabs>
                {getRenderedTab()}
            </Box>
        </>
    )
}