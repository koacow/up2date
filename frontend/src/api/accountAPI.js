export default accountAPI = {
    getUserSettings: async () => {
        const response = await fetch('/api/account/settings');
        return await response.json();
    },
    createUserSettingsProfile: async (user_id) => {
        const response = await fetch(`/api/account/settings?user_id=${user_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(defaultSettings)
        });
        return await response.json();
    },
    updateUserSettings: async (user_id, settings) => {
        const response = await fetch(`/api/account/settings?user_id=${user_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settings)
        });
        return await response.json();
    },
    resetUserSettings: async (user_id) => {
        const response = await fetch(`/api/account/settings?user_id=${user_id}`, {
            method: 'DELETE'
        });
        return await response.json();
    },
    getUserSavedTopics: async (user_id) => {
        const response = await fetch(`/api/account/topics?user_id=${user_id}`);
        return await response.json();
    },
    updateUserSavedTopics: async (user_id, topic_ids) => {
        const response = await fetch(`/api/account/topics?user_id=${user_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ topic_ids })
        });
        return await response.json();
    },
    deleteUserSavedTopics: async (user_id) => {
        const response = await fetch(`/api/account/topics?user_id=${user_id}`, {
            method: 'DELETE'
        });
        return await response.json();
    },
    getUserSavedStocks: async (user_id) => {
        const response = await fetch(`/api/account/stocks?user_id=${user_id}`);
        return await response.json();
    },
    updateUserSavedStocks: async (user_id, stock_tickers) => {
        const response = await fetch(`/api/account/stocks?user_id=${user_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ stock_tickers })
        });
        return await response.json();
    },
    deleteUserSavedStocks: async (user_id) => {
        const response = await fetch(`/api/account/stocks?user_id=${user_id}`, {
            method: 'DELETE'
        });
        return await response.json();
    }
};