export const currencyFormatter = (value) => {
    if (value === null) return '$0.00';
    const string = value.toFixed(2).toString();
    const [ dollars, cents ] = string.split('.');
    const dollarsString = dollars.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return cents ? `$${dollarsString}.${cents}` : `$${dollarsString}:00`;
}

export const dateFormatter = (value) => {
    if (value === null) return;
    const date = new Date(Date.parse(value));
    return date.toDateString();
}