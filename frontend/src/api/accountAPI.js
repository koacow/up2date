const ENDPOINT = '/api/account';

export default accountAPI = {
    getUserSettings: async () => {
        const response = await fetch(`${ENDPOINT}/settings`);
        switch (response.status) {
            case 200:
                return response.json();
            case 404:
                return defaultSettings;
            default:
                throw new Error('Failed to fetch user settings');
        }
    },
    createUserSettingsProfile: async (user_id) => {
        const response = await fetch(`${ENDPOINT}/settings?user_id=${encodeURIComponent(user_id)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(defaultSettings)
        });
        switch (response.status) {
            case 201:
                return response.json();
            default:
                throw new Error('Failed to create user settings profile');
        }
    },
    updateUserSettings: async (user_id, settings) => {
        const response = await fetch(`${ENDPOINT}/settings?user_id=${encodeURIComponent(user_id)}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settings)
        });
        switch (response.status) {
            case 200:
                return response.json();
            default:
                throw new Error('Failed to update user settings');
        }
    },
    resetUserSettings: async (user_id) => {
        const response = await fetch(`${ENDPOINT}/settings?user_id=${encodeURIComponent(user_id)}`, {
            method: 'DELETE'
        });
        switch(response.status) {
            case 200:
                return;
            default:
                throw new Error('Failed to reset user settings');
        }
    },
    getUserSavedTopics: async (user_id) => {
        const response = await fetch(`${ENDPOINT}/topics?user_id=${encodeURIComponent(user_id)}`);
        switch (response.status) {
            case 200:
                return response.json();
            default:
                throw new Error('Failed to fetch user topics');
        }
    },
    updateUserSavedTopics: async (user_id, topic_ids) => {
        const response = await fetch(`${ENDPOINT}/topics?user_id=${encodeURIComponent(user_id)}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ topic_ids })
        });
        switch (response.status) {
            case 201:
                return response.json();
            default:
                throw new Error('Failed to update user topics');
        }
    },
    deleteUserSavedTopics: async (user_id) => {
        const response = await fetch(`${ENDPOINT}/topics?user_id=${encodeURIComponent(user_id)}`, {
            method: 'DELETE'
        });
        switch(response.status) {
            case 204:
                return;
            default:
                throw new Error('Failed to delete user topics');
        }
    },
    getUserSavedStocks: async (user_id) => {
        const response = await fetch(`${ENDPOINT}/stocks?user_id=${encodeURIComponent(user_id)}`);
        switch(response.status){
            case 200:
                return response.json();
            default:
                throw new Error('Failed to fetch user saved stocks');
        }
    },
    updateUserSavedStocks: async (user_id, stock_tickers) => {
        const response = await fetch(`${ENDPOINT}/stocks?user_id=${encodeURIComponent(user_id)}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ stock_tickers })
        });
        switch(response.status){
            case 201:
                return response.json();
            default:
                throw new Error('Failed to update user saved stocks');
        }
    },
    deleteUserSavedStocks: async (user_id) => {
        const response = await fetch(`${ENDPOINT}/stocks?user_id=${encodeURIComponent(user_id)}`, {
            method: 'DELETE'
        });
        switch(response.status){
            case 204:
                return;
            default:
                throw new Error('Failed to delete user saved stocks');
        }
    }
};