import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStockChartByTicker, getStockQuoteByTicker } from "../api/stocksAPI";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import StockChart from "../components/StockChart";
import Grid from "@mui/material/Grid";


export default function Stock(){
    const { ticker } = useParams();

    const [ quoteData, setQuoteData ] = useState({});

    const [ chartRange, setChartRange ] = useState('1D');
    const possibleRanges = {
        '1D': 1,
        '5D': 5,
        '1M': 30,
        '6M': 180,
        '1Y': 365,
        '5Y': 1825,
        'MAX': 1826
    }
    const [ chartData, setChartData ] = useState({});
    const [ chartLoading, setChartLoading ] = useState(true);
    const [ chartError, setChartError ] = useState(null);

    const handleTabChange = (e, newValue) => {
        setChartRange(newValue);
    }

    useEffect(() => {
        const getChartData = async () => {
            try {
                const range = possibleRanges[chartRange];
                setChartLoading(true);
                const data = await getStockChartByTicker(ticker, range);
                setChartData({
                    ...data,
                    quotes: data.quotes.map((quote, index) => {
                        return {
                            ...quote,
                            index,
                            date: new Date(quote.date)
                        }
                    })
                });
            } catch (error) {
                setChartError(error.message);
            }
            setChartLoading(false);
        }
        getChartData();
    }, [chartRange, ticker])

    useEffect(() => {
        const getQuoteData = async () => {
            try {
                const data = await getStockQuoteByTicker(ticker);
                setQuoteData(data);
            } catch (error) {
                setQuoteData({ error: error.message });
            }
        }
        getQuoteData();
    }, [ticker])

    const render = () => {
        if (chartError) {
            return <Typography>Error: {error}</Typography>
        } else if (!chartData.meta) {
            return <Typography>Loading...</Typography>
        } else {
            return (
                <Box>
                    <Typography variant='h6' component='h2'>{ticker}</Typography>
                    <Typography variant='h4' component='h1'>{chartData.meta.shortName}</Typography>
                    <Typography variant='h4' component='h1'>{chartData.meta.regularMarketPrice}</Typography>
                    <Tabs value={chartRange} onChange={handleTabChange} >
                        {
                            Object.keys(possibleRanges).map((range) => {
                                return <Tab key={range} label={range} value={range} />
                            })
                        }
                    </Tabs>
                    <StockChart data={chartData} range={chartRange} loading={chartLoading}/>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Typography variant='h6' component='h3'>Previous close: {quoteData.regularMarketPreviousClose}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant='h6' component='h3'>Regular Market Volume: {quoteData.regularMarketPreviousClose}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant='h6' component='h3'>52 Week Range: {quoteData.fiftyTwoWeekRange.low} - {quoteData.fiftyTwoWeekRange.high}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant='h6' component='h3'>Open: {quoteData.regularMarketOpen}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant='h6' component='h3'>Day's Range: {quoteData.regularMarketDayRange.low} - {quoteData.regularMarketDayRange.high}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant='h6' component='h3'>Avg. Volume: {quoteData.averageDailyVolume3Month}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            )
        }
    }
    return render();
}