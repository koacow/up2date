export const isValidEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
}

export const isStrongPassword = (password) => {
    if (!/[a-z]+/.test(password)) return 1;
    if (!/[A-Z]+/.test(password)) return 2;
    if (!/[0-9]+/.test(password)) return 3;
    if (!/[$@#&!]+/.test(password)) return 4;
    if (password.length < 6) return 5;

    return 0;
}
