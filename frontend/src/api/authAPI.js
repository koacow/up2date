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
        return response.json();
    },
    async login(username, password) {
        const response = await fetch(`${ENDPOINT}/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        return response.json();
    },
    async logout() {
        const response = await fetch(`${ENDPOINT}/logout`);
        return response.json();
    },
    async getUser() {
        const response = await fetch(`${ENDPOINT}/user`);
        return response.json();
    },
};