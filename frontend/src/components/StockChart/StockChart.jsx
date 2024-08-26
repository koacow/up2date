import { LineChart } from "@mui/x-charts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { currencyFormatter } from "../../utils/formatters";

const dataKeys = ['open', 'high', 'low', 'close'];
const labels = ['Open', 'High', 'Low', 'Close'];
export default function StockChart({ data, loading, error, range }){
    const timeFormatter = (date) => {
        if (!date) return 'No data';
        if (range === '1D') {
            const hour = new Date(date).getHours() > 12 ? new Date(date).getHours() - 12 : new Date(date).getHours();
            const minute = new Date(date).getMinutes();
            const minuteString = minute < 10 ? `0${minute}` : minute;
            const ampm = new Date(date).getHours() >= 12 ? 'PM' : 'AM';
            return `${hour}:${minuteString} ${ampm}`;
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
                        valueFormatter: currencyFormatter,
                        showMark: false,
                        curve: 'linear',
                    }
                })
            }
            axisHighlight={{
                x: 'line',
                y: 'line',
            }}
            grid={{ horizontal: true }}
            height={700}
            loading={loading}
        />
    )
}