import StockPreviewCard from './StockPreviewCard';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getStockQuoteByTicker } from '../api/stocksAPI';

export default function StocksOverview() {
    const regions = useSelector((state) => state.stocks.overview.regions);
    const [ overviewData, setOverviewData ] = useState(regions);
    const columns = ['Ticker', 'Last Price', 'Change', 'Change %'];

    useEffect(() => {
        const getOverviewData = async () => {
            const data = {};
            for (let region in regions) {
                const stocks = await Promise.all(regions[region].map(async (ticker) => {
                    try {
                        const data = await getStockQuoteByTicker(ticker);
                        return { ticker, data, error: null };
                    } catch (error) {
                        console.error(error);
                        return { ticker, data: null, error: error.message };
                    }
                }));
                data[region] = stocks;
            }
            setOverviewData(data);
        }
        if(regions) {
            getOverviewData();
        }
    }, [regions]);

    return (
        <TableContainer>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={columns.length}>
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
                        overviewData["Americas"].map((stock, index) => {
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