import { LineChart } from "@mui/x-charts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { currencyFormatter } from "../../utils/formatters";

const dataKeys = ['open', 'high', 'low', 'close'];
const labels = ['Open', 'High', 'Low', 'Close'];
export default function StockChart({ data, loading, error, range }){
    const timeFormatter = (date, context) => {
        if (!date) return 'No data';

        const hour = new Date(date).getHours() > 12 ? new Date(date).getHours() - 12 : new Date(date).getHours();
        const minute = new Date(date).getMinutes();
        const minuteString = minute < 10 ? `0${minute}` : minute;
        const ampm = new Date(date).getHours() >= 12 ? 'PM' : 'AM';

        if (range === '1D' && context.location === 'tooltip') {
            return `${new Date(date).toLocaleDateString()} ${hour}:${minuteString} ${ampm}`;
        } else if (range === '1D') {
            return `${hour}:${minuteString} ${ampm}`;
        } else if (context.location === 'tooltip') {
            return `${new Date(date).toLocaleDateString()} ${hour}:${minuteString} ${ampm}`;
        } else {
            return new Date(date).toLocaleDateString();
        }
    }

    if (error) {
        return (
            <Box className='w-full h-96 flex justify-center items-center text-center'>
                <Typography variant='h6' component='h3' color='error' >Oops something went wrong when we were fetching the stock chart data. Try again later</Typography>
            </Box>
        )
    } 
    return (
        <LineChart
            dataset={data.quotes}
            xAxis={[
                {
                    dataKey: 'date',
                    valueFormatter: timeFormatter,
                    disableTicks: true,
                    tickLabelPlacement: 'tick',
                    tickLabelInterval: (value, index) => index % 2 === 0,
                }
            ]}
            series={
                dataKeys.map((key, index) => {
                    return {
                        dataKey: key,
                        label: labels[index],
                        valueFormatter: (value) => currencyFormatter(value, data.currency),
                        showMark: false,
                        curve: 'linear',
                        connectNulls: false,
                    }
                })
            }
            axisHighlight={{
                x: 'line',
                y: 'line',
            }}
            grid={{ horizontal: true }}
            loading={loading}
        />
    )
}