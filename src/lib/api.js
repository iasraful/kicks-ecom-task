import axios from 'axios';

const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const productsApi = {
    getAll: (params = {}) => apiClient.get('/products', { params }),
    getById: (id) => apiClient.get(`/products/${id}`),
    getCategories: () => apiClient.get('/categories'),
};

export default apiClient;
