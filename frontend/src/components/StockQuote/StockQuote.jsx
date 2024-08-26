import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import WarningAmberOutlined from "@mui/icons-material/WarningAmberOutlined";
import StockQuoteFigure from "./StockQuoteFigure";
import { currencyFormatter } from "../../utils/formatters";

export default function StockQuote ({ data, loading, error }){
    if (loading) {
        return (
            <Grid container spacing={2}>
                <StockQuoteFigure 
                label="Previous close" 
                value="loading..." 
                />
                <StockQuoteFigure 
                    label="Regular Market Volume" 
                    value="loading..." 
                />
                <StockQuoteFigure 
                    label="52 Week Range" 
                    value="loading..." 
                />
                <StockQuoteFigure 
                    label="Open" 
                    value="loading..." 
                />
                <StockQuoteFigure 
                    label="Day's Range" 
                    value="loading..." 
                />
                <StockQuoteFigure 
                    label="Avg. 3mo. Volume" 
                    value="loading..." 
                />
            </Grid>
        )
    } else if (error) {
        return (
            <Grid container>
                <Grid item>
                    <WarningAmberOutlined />
                    <Typography>Error: {error}</Typography>
                </Grid>
            </Grid>
        )
    } else return (
        <Grid container rowGap={2} columnGap={4}>
              <StockQuoteFigure 
                label="Previous Close" 
                value={currencyFormatter(data.regularMarketPreviousClose)} 
              />
              <StockQuoteFigure 
                label="Regular Market Volume" 
                value={data.regularMarketVolume} 
              />
              <StockQuoteFigure 
                label="52 Week Range" 
                value={`${currencyFormatter(data.fiftyTwoWeekRange.low)} - ${currencyFormatter(data.fiftyTwoWeekRange.high)}`} 
              />
              <StockQuoteFigure 
                label="Open" 
                value={currencyFormatter(data.regularMarketOpen)} 
              />
              <StockQuoteFigure 
                label="Day's Range" 
                value={`${currencyFormatter(data.regularMarketDayRange.low)} - ${currencyFormatter(data.regularMarketDayRange.high)}`} 
              />
              <StockQuoteFigure 
                label="Avg. 3mo. Volume" 
                value={data.averageDailyVolume3Month} 
              />
        </Grid>
    )
}