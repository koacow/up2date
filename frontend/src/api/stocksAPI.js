const ENDPOINT = 'http://localhost:4000/api/stocks';

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
export const getStockQuoteByTicker = async (ticker) => {
    const response = await fetch(`${ENDPOINT}/quote/${ticker}`);
    switch (response.status) {
        case 200:
            return response.json();
        case 404:
            throw new Error('Stock not found');
        default:
            throw new Error('Failed to fetch stock quote');
    }
};
export const getStockChartByTicker = async (ticker, range) => {
    const response = await fetch(`${ENDPOINT}/chart/${ticker}?range=${range}`);
    switch (response.status) {
        case 200:
            return response.json();
        default:
            throw new Error('Failed to fetch stock chart data');
    }
};