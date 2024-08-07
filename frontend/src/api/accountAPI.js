const ENDPOINT = 'http://localhost:4000/api/account';

export const getUserSettings = async (user_id) => {
    const response = await fetch(`${ENDPOINT}/settings?user_id=${encodeURIComponent(user_id)}`);
    switch (response.status) {
        case 200:
            const data = await response.json();
            return data[0].settings;
        default:
            throw new Error('Failed to fetch user settings');
    }
}
export const createUserSettingsProfile = async (user_id) => {
    const response = await fetch(`${ENDPOINT}/settings?user_id=${encodeURIComponent(user_id)}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    });
    switch (response.status) {
        case 201:
            return response.json();
        default:
            throw new Error('Failed to create user settings profile');
    }
};
export const updateUserSettings = async (user_id, settings) => {
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
};
export const resetUserSettings = async (user_id) => {
    const response = await fetch(`${ENDPOINT}/settings?user_id=${encodeURIComponent(user_id)}`, {
        method: 'DELETE'
    });
    switch(response.status) {
        case 200:
            return;
        default:
            throw new Error('Failed to reset user settings');
    }
};
export const getUserSavedTopics = async (user_id) => {
    const response = await fetch(`${ENDPOINT}/topics?user_id=${encodeURIComponent(user_id)}`);
    switch (response.status) {
        case 200:
            const json = await response.json();
            return json.map(topicObject => {
                return {
                    id: topicObject.topic_id,
                    topic: topicObject.topics.topic,
                    pageNum: 1
                }
            })
        default:
            throw new Error('Failed to fetch user topics');
    }
};
export const updateUserSavedTopics = async (user_id, topic_ids) => {
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
};
export const deleteUserSavedTopics = async (user_id) => {
    const response = await fetch(`${ENDPOINT}/topics?user_id=${encodeURIComponent(user_id)}`, {
        method: 'DELETE'
    });
    switch(response.status) {
        case 204:
            return;
        default:
            throw new Error('Failed to delete user topics');
    }
};
export const getUserSavedStocks = async (user_id) => {
    const response = await fetch(`${ENDPOINT}/stocks?user_id=${encodeURIComponent(user_id)}`);
    switch(response.status){
        case 200:
            return response.json();
        default:
            throw new Error('Failed to fetch user saved stocks');
    }
};

export const updateUserSavedStocks = async (user_id, stock_tickers) => {
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
};

export const deleteUserSavedStocks = async (user_id) => {
    const response = await fetch(`${ENDPOINT}/stocks?user_id=${encodeURIComponent(user_id)}`, {
        method: 'DELETE'
    });
    switch(response.status){
        case 204:
            return;
        default:
            throw new Error('Failed to delete user saved stocks');
    }
};

export const getUserProfile = async (user_id) => {
    const response = await fetch(`${ENDPOINT}/user?user_id=${encodeURIComponent(user_id)}`);
    switch (response.status) {
        case 200:
            return response.json();
        case 401:
            throw new Error('Unauthorized');
        default:
            throw new Error('Failed to fetch user data');
    }
}
