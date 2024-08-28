import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getStockQuoteByTicker } from '../../api/stocksAPI';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import StockPreviewCard from '../StockPreviewCard/StockPreviewCard';
import StocksWatchListLoading from './StocksWatchListLoading';
import StocksWatchListError from './StocksWatchListError';
import StocksWatchListEmpty from './StocksWatchListEmpty';
import StocksWatchListNoSession from './StocksWatchListNoSession';

export default function StocksWatchList() {
    const session = useSelector((state) => state.session.session);
    const watchList = useSelector((state) => state.stocks.watchList.stocks);
    const [ watchListData, setWatchListData ] = useState([]);
    const watchListLoading = useSelector((state) => state.stocks.watchList.loading);    
    const watchListError = useSelector((state) => state.stocks.watchList.error);

    useEffect(() => {
        const getWatchListData = async () => {
            if (session) {
                const data = [];
                for (let ticker of watchList) {
                    try {
                        const quote = await getStockQuoteByTicker(ticker);
                        data.push({ ticker, data: quote });
                    } catch (error) {
                        console.error(error);
                        if (error.message === 'Stock not found') {
                            data.push({ ticker, data: null, error: error.message });
                        }
                    }
                }
                setWatchListData(data);
            }
        }
        if (session) {
            getWatchListData();
        }
    }, [watchList])


    const render = () => {
        if (watchListLoading) {
            return <StocksWatchListLoading />;
        } else if (watchListError) {
            return <StocksWatchListError />
        } 
        else if (session && watchList.length) {
            return (
                    <Grid container rowGap={1} columnSpacing={1} >
                        {
                            watchListData.map((stock, index) => {
                                return (
                                    <Grid item xs={6} md={4} lg={3} key={index}>
                                        <StockPreviewCard ticker={stock.ticker} data={stock.data} action={'remove'} error={watchListError} />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
            )
        } else if (session && !watchList.length) {
            return <StocksWatchListEmpty />;
        } else {
            return <StocksWatchListNoSession />;
        }
    }


    return (
        <Box className='m-5 flex flex-col space-y-5 w-4/5 md:w-3/5'>
            <Typography 
                variant='h4' 
                component='h4'
                className='font-extrabold'
            >
                    Watch List
            </Typography>
            <Divider variant='middle' />
            {render()}
        </Box>
    )
}