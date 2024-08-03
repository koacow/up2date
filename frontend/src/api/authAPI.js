const ENDPOINT = 'http://localhost:4000/api/users';

export const register = async (username, password, first_name, last_name) => {
    const response = await fetch(`${ENDPOINT}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, first_name, last_name })
    });
    switch (response.status) {
        case 201:
            return response.json();
        case 409:
            throw new Error('Username already exists');
        default:
            throw new Error('Failed to register');
    }
}
export const login = async (email, password) => {
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
