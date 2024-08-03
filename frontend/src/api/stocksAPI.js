const ENDPOINT = 'http:localhost:4000/api/stocks';

export const searchStocksByQuery = async (query) => {
    const response = await fetch(`${ENDPOINT}/search/?query=${encodeURIComponent(query)}`);
    switch (response.status) {
        case 200:
            return response.json();
        case 404:
            throw new Error('No results found');
        default:
            throw new Error('Failed to fetch stocks');
    }
};
export const getStockQuoteBySymbol = async (symbol) => {
    const response = await fetch(`${ENDPOINT}/quote/?symbol=${encodeURIComponent(symbol)}`);
    switch (response.status) {
        case 200:
            return response.json();
        default:
            throw new Error('Failed to fetch stock quote');
    }
};
export const getStockDailyDataBySymbol = async (symbol) => {
    const response = await fetch(`${ENDPOINT}/daily/?symbol=${encodeURIComponent(symbol)}`);
    switch (response.status) {
        case 200:
            return response.json();
        default:
            throw new Error('Failed to fetch daily stock data');
    }
};
export const getStockWeeklyDataBySymbol = async (symbol) => {
    const response = await fetch(`${ENDPOINT}/weekly/?symbol=${encodeURIComponent(symbol)}`);
    switch (response.status) {
        case 200:
            return response.json();
        default:
            throw new Error('Failed to fetch weekly stock data');
    }
};
export const getStockMonthlyDataBySymbol = async (symbol) => {
    const response = await fetch(`${ENDPOINT}/monthly/?symbol=${encodeURIComponent(symbol)}`);
    switch (response.status) {
        case 200:
            return response.json();
        default:
            throw new Error('Failed to fetch monthly stock data');
    }
};
