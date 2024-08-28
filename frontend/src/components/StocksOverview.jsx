import StockPreviewCard from './StockPreviewCard/StockPreviewCard';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getStockQuoteByTicker } from '../api/stocksAPI';

export default function StocksOverview() {
    const regions = useSelector((state) => state.stocks.overview.regions);
    const [ overviewData, setOverviewData ] = useState(regions);

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
        <>
            {
                overviewData && Object.keys(overviewData).map((region, index) => {
                    return (
                        <Box key={index} className='m-5 flex flex-col space-y-5 w-90-svw md:w-80-svw lg:w-70-svw'>
                            <Typography variant='h4' component='h4' className='font-extrabold'>{region}</Typography>
                            <Divider variant='middle' />
                            <Grid container rowGap={1} columnSpacing={1}>
                                {
                                    overviewData[region].map((stock, index) => {
                                        return (
                                            <Grid item xs={6} md={4} lg={3} key={index}>
                                                <StockPreviewCard ticker={stock.ticker} data={stock.data} error={stock.error} action={'add'} />
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                        </Box>
                    )
                })
            }
        </>
    )
}