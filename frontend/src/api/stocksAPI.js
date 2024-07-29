const ENDPOINT = '/api/stocks';
export default stocksAPI = {
    searchStocksByQuery: async (query) => {
        const response = await fetch(`/api/stocks/search/?query=${query}`);
        return response.json();
    },
    getStockQuoteBySymbol: async (symbol) => {
        const response = await fetch(`/api/stocks/quote/?symbol=${symbol}`);
        return response.json();
    },
    getStockDailyDataBySymbol: async (symbol) => {
        const response = await fetch(`/api/stocks/daily/?symbol=${symbol}`);
        return response.json();
    },
    getStockWeeklyDataBySymbol: async (symbol) => {
        const response = await fetch(`/api/stocks/weekly/?symbol=${symbol}`);
        return response.json();
    },
    getStockMonthlyDataBySymbol: async (symbol) => {
        const response = await fetch(`/api/stocks/monthly/?symbol=${symbol}`);
        return response.json();
    }
}