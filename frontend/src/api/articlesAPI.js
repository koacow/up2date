const ENDPOINT = '/api/articles';

export const getArticlesByQuery = async (query, pageNum = 1) => {
    const response = await fetch(`${ENDPOINT}/search?query=${encodeURIComponent(query)}&pageNum=${pageNum}`);
    switch (response.status) {
        case 200:
            return response.json();
        case 404:
            return [];
        default:
            throw new Error('Failed to fetch articles');
    }
};
export const getAllTopics = async () => {
    const response = await fetch(`${ENDPOINT}/topics`);
    switch (response.status) {
        case 200:
            return response.json();
        case 404:
            return [];
        default:
            throw new Error('Failed to fetch topics');
    }
};
export const getArticlesByTopic = async (topic_id, pageNum = 1) => {
    const response = await fetch(`${ENDPOINT}/${topic_id}?pageNum=${pageNum}`);
    switch (response.status) {
        case 200:
            return response.json();
        case 404:
            return [];
        default:
            throw new Error('Failed to fetch articles');
    }
};
