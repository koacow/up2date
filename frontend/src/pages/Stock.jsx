import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStockChartByTicker, getStockQuoteByTicker } from "../api/stocksAPI";
import { currencyFormatter } from "../utils/formatters";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import WarningAmberOutlined from "@mui/icons-material/WarningAmberOutlined";
import StockChart from "../components/StockChart/StockChart";
import StockQuote from "../components/StockQuote";
import Skeleton from "@mui/material/Skeleton";

export default function Stock(){
    const { ticker } = useParams();

    
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
    
    const [ quoteData, setQuoteData ] = useState({});
    const [ quoteLoading, setQuoteLoading ] = useState(true);
    const [ quoteError, setQuoteError ] = useState(null);

    const handleTabChange = (e, newValue) => {
        setChartRange(newValue);
    }
    

    // Fetch stock chart data
    useEffect(() => {
        const getChartData = async () => {
            setChartLoading(true);
            try {
                const range = possibleRanges[chartRange];
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

    // Fetch stock quote data
    useEffect(() => {
        const getQuoteData = async () => {
            setChartLoading(true);
            try {
                const data = await getStockQuoteByTicker(ticker);
                setQuoteData(data);
            } catch (error) {
                setQuoteError(error.message);
            }
            setQuoteLoading(false);
        }
        getQuoteData();
    }, [ticker])

    if (chartError) {
        return (
            <Box>
                <Typography variant='h6' component='h2'>{ticker}</Typography>
                <WarningAmberOutlined />
                <Typography variant='h4' component='h1'>Error</Typography>
                <Typography variant='body1'>{chartError}</Typography>
            </Box>
        )
    } else if (chartLoading) {
        return (
            <Box>
                <Typography variant='h6' component='h2'>{ticker}</Typography>
                {
                    chartData.meta ? 
                    (
                        <>
                            <Typography variant='h4' component='h1'>{chartData.meta.shortName}</Typography>
                            <Typography variant='h4' component='h1'>{currencyFormatter(chartData.meta.regularMarketPrice)}</Typography>
                        </>
                    ) : (
                        <>
                            <Skeleton variant='text' />
                            <Skeleton variant='text' />
                        </>
                    )
                }
                <Skeleton variant='rect' />
                <Skeleton variant='rect' />
                <Skeleton variant='rect' />
            </Box>
        )
    } else {
        return (
        <Box>
            <Typography variant='h6' component='h2'>{ticker}</Typography>
            <Typography variant='h4' component='h1'>{chartData.meta.shortName}</Typography>
            <Typography variant='h4' component='h1'>{currencyFormatter(chartData.meta.regularMarketPrice)}</Typography>
            <Tabs value={chartRange} onChange={handleTabChange} >
                {
                    Object.keys(possibleRanges).map((range) => {
                        return <Tab key={range} label={range} value={range} />
                    })
                }
            </Tabs>
            <StockChart data={chartData} range={chartRange} loading={chartLoading} error={chartError} />
            <StockQuote data={quoteData} loading={quoteLoading} error={quoteError} />
        </Box>
    )
}
}