import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStockChartByTicker } from "../api/stocksAPI";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { LineChart } from '@mui/x-charts/LineChart';


export default function Stock(){
    const { ticker } = useParams();

    const [chartRange, setChartRange] = useState('1D');
    const possibleRanges = {
        '1D': 1,
        '5D': 5,
        '1M': 30,
        '6M': 180,
        '1Y': 365,
        '5Y': 1825,
        'MAX': 1826
    }
    const [chartData, setChartData] = useState({});
    const [ error, setError ] = useState(null);

    const handleTabChange = (e, newValue) => {
        setChartRange(newValue);
    }

    useEffect(() => {
        const getChartData = async () => {
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
                setError(error.message);
            }
        }
        getChartData();
    }, [chartRange, ticker])

    const render = () => {
        if (error) {
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
                    <LineChart
                        dataset={chartData.quotes}
                        xAxis={[
                            {
                                dataKey: 'date',
                                valueFormatter: (date) => new Date(date).getMinutes().toString(),
                                label: 'Date',
                            }
                        ]}
                        series={[
                            {
                                dataKey: 'close',
                                showMark: false,
                                label: 'Close',
                            }
                        ]}
                        height={700}
                        width={1200}
                    />
                </Box>
            )
        }
    }
    return render();
}