export default authAPI = {
    async register(username, password, first_name, last_name) {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, first_name, last_name })
        });
        return response.json();
    },
    async login(username, password) {
        const response = await fetch('/api/auth/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        return response.json();
    },
    async logout() {
        const response = await fetch('/api/auth/logout');
        return response.json();
    },
    async getUser() {
        const response = await fetch('/api/auth/user');
        return response.json();
    },
}