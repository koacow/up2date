import { LineChart } from "@mui/x-charts";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
export default function StockChart({ data, range, loading }){

    const timeFormatter = (date) => {
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

    const currencyFormatter = (value) => {
        const string = value.toFixed(2).toString();
        const [ dollars, cents ] = string.split('.');
        const dollarsString = dollars.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return cents ? `$${dollarsString}.${cents}` : `$${dollarsString}:00`;
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
            series={[
                {
                    dataKey: 'close',
                    showMark: false,
                    label: 'Close',
                    valueFormatter: currencyFormatter,
                },
                {
                    dataKey: 'open',
                    showMark: false,
                    label: 'Open',
                    valueFormatter: currencyFormatter,
                },
                {
                    dataKey: 'high',
                    showMark: false,
                    label: 'High',
                    valueFormatter: currencyFormatter,
                },
                {
                    dataKey: 'low',
                    showMark: false,
                    label: 'Low',
                    valueFormatter: currencyFormatter,
                }
            ]}
            slotProps={{
                legend: {
                    hidden: true
                },
                loadingOverlay:{},
                noDataOverlay: {},
            }}
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