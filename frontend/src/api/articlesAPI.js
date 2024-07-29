export default articlesAPI = {
    getArticlesByQuery: async (query, pageNum = 1) => {
        const response = await fetch(`/api/articles/search/?query=${query}`);
        return response.json();
    },
    getAllTopics: async () => {
        const response = await fetch('/api/articles/topics');
        return response.json();
    },
    getArticlesByTopic: async (topic_id, pageNum = 1) => {
        const response = await fetch(`/api/articles/${topic_id}?pageNum=${pageNum}`);
        return response.json();
    }
}