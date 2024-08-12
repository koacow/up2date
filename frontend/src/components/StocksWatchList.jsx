import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { fetchUserSavedStocks, fetchSavedStocksData } from '../state/slices/stockSlice';
import { Box } from '@mui/material';
import StockPreviewCard from '../components/StockPreviewCard';

export default function StocksWatchList() {
    const session = useSelector((state) => state.session.session);
    const savedStocks = useSelector((state) => state.stocks.saved.stocks);
    const savedStocksLoading = useSelector((state) => state.stocks.saved.loading);    
    const savedStocksError = useSelector((state) => state.stocks.saved.error);

    const dispatch = useDispatch();

    const render = () => {
        if (savedStocksLoading) {
            return <Typography>Loading...</Typography>
        } 
        if (savedStocksError) {
            return <Typography>Error: {savedStocksError}</Typography>
        } 
        if (session && savedStocks) {
            return (
                <Box>
                    {
                        savedStocks.map((stock, index) => {
                            return (
                                <StockPreviewCard key={index} stock={stock} />
                            )
                        })
                    }
                </Box>
            )
        } 
        if (session && !savedStocks) {
            return <Typography>You haven't saved any stocks, visit the Overview page to save some.</Typography>;
        }
        return <Typography>Sign in to view your saved stocks</Typography>;
    }

    useEffect(() => {
        if (session) {
            dispatch(fetchUserSavedStocks());
            dispatch(fetchSavedStocksData());
        }
    }, [session]);

    return (
        <>
            {render()}
        </>
    )
}