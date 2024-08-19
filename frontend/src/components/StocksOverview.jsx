import StockPreviewCard from './StockPreviewCard';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOverviewQuotes } from '../state/slices/stockSlice';
import { useEffect } from 'react';

export default function StocksOverview() {
    const dispatch = useDispatch();
    const regionsData = useSelector((state) => state.stocks.overview.regions);
    const loading = useSelector((state) => state.stocks.overview.loading);
    const error = useSelector((state) => state.stocks.overview.error);
    const columns = ['Ticker', 'Last Price', 'Change', 'Change %'];

    useEffect(() => {
        dispatch(fetchOverviewQuotes());
    }, []);

    return (
        <TableContainer>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant='h4' component='h4'>Americas</Typography>
                        </TableCell>
                    </TableRow>
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
                        regionsData['Americas'].map((stock, index) => {
                            return (
                                <StockPreviewCard key={index} ticker={stock.ticker} data={stock.data} />
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}