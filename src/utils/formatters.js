export const currencyFormatter = (value, currency='USD') => {
    if (value === null) return '$0.00';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
}

export const dateFormatter = (value) => {
    if (value === null) return;
    const date = new Date(Date.parse(value));
    return date.toDateString();
}

export const currencyToSymbol = (currency) => {
    
}