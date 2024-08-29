import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStockChartByTicker, getStockQuoteByTicker } from "../api/stocksAPI";
import { currencyFormatter } from "../utils/formatters";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import WarningAmberOutlined from "@mui/icons-material/WarningAmberOutlined";
import StockMetaData from "../components/StockMetaData/StockMetaData";
import StockMetaDataLoading from "../components/StockMetaData/StockMetaDataLoading";
import StockChart from "../components/StockChart/StockChart";
import StockChartLoading from "../components/StockChart/StockChartLoading";
import StockQuote from "../components/StockQuote/StockQuote";
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
            <Box className='mx-auto lg:w-4/5 w-full p-5' >
                <Typography variant='h6' component='h2' className='font-light tracking-wider'>
                    {ticker}
                </Typography>
                <Typography variant='h4' component='h1' color='error' className='flex flex-col justify-center items-center text-center md:block' >
                    <WarningAmberOutlined className='mr-2 size-11 md:size-6' /> 
                    Something went wrong while loading this stock's chart data or it might not be listed.
                </Typography>
            </Box>
        )
    } else {
        return (
        <Box className='md:mx-auto lg:w-4/5 w-screen h-[400px] md:h-[700px] lg:h-[1000px] p-5' >
            <Typography variant='h6' component='h2' className='font-light tracking-wider'>
                {ticker}
            </Typography>
            {
                chartData.meta ? 
                <StockMetaData metaData={chartData.meta} /> :
                <StockMetaDataLoading />
            }
            <Tabs 
                variant="scrollable"
                selectionFollowsFocus 
                allowScrollButtonsMobile 
                scrollButtons 
                value={chartRange} 
                onChange={handleTabChange} 
                indicatorColor='secondary' 
                textColor="secondary" 
            >
                {
                    Object.keys(possibleRanges).map((range) => {
                        return <Tab key={range} label={range} value={range} />
                    })
                }
            </Tabs>
            {
                chartLoading ? 
                <StockChartLoading /> : 
                <StockChart data={chartData} range={chartRange} loading={chartLoading} error={chartError} />
            }
            <StockQuote data={quoteData} loading={quoteLoading} error={quoteError} />
        </Box>
    )
}
}