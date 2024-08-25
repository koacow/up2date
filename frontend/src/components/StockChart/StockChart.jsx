import { LineChart } from "@mui/x-charts";
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
            <Typography variant='h6' component='h3'>Error: {error}</Typography>
        )
    } else if (!data.quotes) {
        return (
            <Typography variant='h6' component='h3'>No data</Typography>
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