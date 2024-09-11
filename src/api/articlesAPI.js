const BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;
const ENDPOINT = `${BACKEND_ENDPOINT}/articles`;

export const getArticlesByQuery = async (query, pageNum = 1) => {
    const response = await fetch(`${ENDPOINT}/search?query=${encodeURIComponent(query)}&pageNum=${pageNum}`);
    switch (response.status) {
        case 200:
            return response.json();
        default:
            throw new Error('Failed to fetch articles');
    }
};
export const getAllTopics = async () => {
    const response = await fetch(`${ENDPOINT}/topics`);
    switch (response.status) {
        case 200:
            return response.json();
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
            throw new Error('Topic not found');
        default:
            throw new Error('Failed to fetch articles');
    }
};

export const getTopHeadlines = async (pageNum = 1) => {
    const response = await fetch(`${ENDPOINT}/top-headlines?pageNum=${pageNum}`);
    switch (response.status) {
        case 200:
            return response.json();
        default:
            throw new Error('Failed to fetch top headlines');
    }
}
