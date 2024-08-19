import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { fetchQuotesForWatchList } from '../state/slices/stockSlice';
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
    const watchList = useSelector((state) => state.stocks.saved.stocks);
    const watchListLoading = useSelector((state) => state.stocks.saved.loading);    
    const watchListError = useSelector((state) => state.stocks.saved.error);
    const columns = ['Ticker', 'Last Price', 'Change', 'Change %'];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchQuotesForWatchList());
    }, []);


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
                                    watchList.map((stock, index) => {
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