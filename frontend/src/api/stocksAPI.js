const ENDPOINT = 'http:localhost:4000/api/stocks';

export const searchStocksByQuery = async (query) => {
    const response = await fetch(`${ENDPOINT}/search/?query=${query}`);
    return response.json();
};
export const getStockQuoteBySymbol = async (symbol) => {
    const response = await fetch(`${ENDPOINT}/quote/?symbol=${symbol}`);
    return response.json();
};
export const getStockDailyDataBySymbol = async (symbol) => {
    const response = await fetch(`${ENDPOINT}/daily/?symbol=${symbol}`);
    return response.json();
};
export const getStockWeeklyDataBySymbol = async (symbol) => {
    const response = await fetch(`${ENDPOINT}/weekly/?symbol=${symbol}`);
    return response.json();
};
export const getStockMonthlyDataBySymbol = async (symbol) => {
    const response = await fetch(`${ENDPOINT}/monthly/?symbol=${symbol}`);
    return response.json();
};
