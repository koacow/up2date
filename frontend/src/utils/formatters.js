export const currencyFormatter = (value) => {
    const string = value.toFixed(2).toString();
    const [ dollars, cents ] = string.split('.');
    const dollarsString = dollars.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return cents ? `$${dollarsString}.${cents}` : `$${dollarsString}:00`;
}