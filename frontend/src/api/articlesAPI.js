const ENDPOINT = '/api/articles';
export default articlesAPI = {
    getArticlesByQuery: async (query, pageNum = 1) => {
        const response = await fetch(`${ENDPOINT}/search?query=${encodeURIComponent(query)}&pageNum=${pageNum}`);
        return response.json();
    },
    getAllTopics: async () => {
        const response = await fetch(`${ENDPOINT}/topics`);
        return response.json();
    },
    getArticlesByTopic: async (topic_id, pageNum = 1) => {
        const response = await fetch(`${ENDPOINT}/${topic_id}?pageNum=${pageNum}`);
        return response.json();
    }
}