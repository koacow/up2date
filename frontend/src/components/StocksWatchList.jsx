import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getStockQuoteByTicker } from '../api/stocksAPI';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import StockPreviewCard from '../components/StockPreviewCard';

export default function StocksWatchList() {
    const session = useSelector((state) => state.session.session);
    const watchList = useSelector((state) => state.stocks.watchList.stocks);
    const [ watchListData, setWatchListData ] = useState([]);
    const watchListLoading = useSelector((state) => state.stocks.watchList.loading);    
    const watchListError = useSelector((state) => state.stocks.watchList.error);
    const columns = ['Ticker', 'Last Price', 'Change', 'Change %'];

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
            return <Typography>Loading...</Typography>
        } else if (watchListError) {
            return <Typography>Error: {watchListError}</Typography>
        } else if (session && watchList) {
            return (
                <Box>
                    <TableContainer>
                        <Table stickyHeader >
                            <TableHead>
                                <TableRow>
                                    {
                                        columns.map((column, index) => {
                                            return (
                                                <TableCell key={index}>{column}</TableCell>
                                            )
                                        })
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    watchListData.map((stock, index) => {
                                        return (
                                            <StockPreviewCard key={index} ticker={stock.ticker} data={stock.data} />
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )
        } else if (session && !watchList) {
            return <Typography>You haven't saved any stocks, visit the Overview page to save some.</Typography>;
        } else {
            return <Typography>Sign in to view your saved stocks</Typography>;
        }
    }


    return (
        <>
            {render()}
        </>
    )
}