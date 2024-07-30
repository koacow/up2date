const ENDPOINT = '/api/auth';

export default authAPI = {
    async register(username, password, first_name, last_name) {
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
    },
    async login(username, password) {
        const response = await fetch(`${ENDPOINT}/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        switch (response.status) {
            case 200:
                return response.json();
            case 401:
                throw new Error('Invalid credentials');
            default:
                throw new Error('Failed to login');
        }
    },
    async logout() {
        const response = await fetch(`${ENDPOINT}/logout`);
        switch (response.status) {
            case 200:
                return response.json();
            default:
                throw new Error('Failed to logout');
        }
    },
    async getUser() {
        const response = await fetch(`${ENDPOINT}/user`);
        switch (response.status) {
            case 200:
                return response.json();
            case 401:
                throw new Error('Unauthorized');
            default:
                throw new Error('Failed to fetch user data');
        }
    },
};