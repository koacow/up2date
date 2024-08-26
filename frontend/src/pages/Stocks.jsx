import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';    
import Box from '@mui/material/Box';
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
            <StockSearch />
            <Box className='mx-auto flex flex-col items-center w-full'>
                <Tabs 
                    value={currentTab} 
                    onChange={handleTabChange}
                    className='flex justify-center'
                >
                    <Tab value='overview' label='Overview' className='w-60 md:w-96' />
                    <Tab value='watchlist' label='Watch List' className='w-60 md:w-96'/>
                </Tabs>
                {getRenderedTab()}
            </Box>
        </>
    )
}