const ENDPOINT = 'http://localhost:4000/api/users';

export const register = async (email, password, first_name, last_name) => {
    if (!first_name) throw new Error('First name is required');
    if (!last_name) throw new Error('Last name is required');
    if (!email) throw new Error('Email is required');
    if (!password) throw new Error('Password is required');

    if (password.length < 6) throw new Error('Password must be at least 6 characters long');
    const response = await fetch(`${ENDPOINT}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, first_name, last_name })
    });
    switch (response.status) {
        case 201:
            return response.json();
        case 409:
            throw new Error('Username already exists');
        case 500:
            throw new Error('Oops! Something went wrong');
        default:
            throw new Error('Failed to register');
    }
}
export const login = async (email, password) => {
    if (!email) throw new Error('Email is required');
    if (!password) throw new Error('Password is required');
    const response = await fetch(`${ENDPOINT}/authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    switch (response.status) {
        case 200:
            return response.json();
        case 400:
            throw new Error('Invalid credentials');
        case 401:
            throw new Error('Invalid credentials');
        default:
            throw new Error('Failed to login');
    }
}
export const logout = async () => {
    const response = await fetch(`${ENDPOINT}/logout`);
    switch (response.status) {
        case 200:
            return response.json();
        default:
            throw new Error('Failed to logout');
    }
}
