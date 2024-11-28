/**
 * Axios instance configuration with interceptors for handling authentication
 * @module axios-instance
 * @description Creates and configures an axios instance with base URL, headers, and interceptors for handling authentication tokens
 */

import axios from "axios";


const axios_instance = axios.create({
    baseURL: import.meta.env.PROD ? import.meta.env.VITE_PROD_BASE_URL : import.meta.env.VITE_DEV_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

/**
 * Request interceptor to add authentication token to requests
 * @param {Object} config - Axios request configuration
 * @returns {Object} Modified request configuration with authentication header
 */
axios_instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);


/**
 * Response interceptor to handle token refresh on 401 errors
 * @param {Object} response - Axios response object
 * @param {Object} error - Error object from failed request
 * @returns {Promise} Resolved with response data or rejected with error
 */
axios_instance.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');

                if (!refreshToken) {
                    localStorage.clear();
                    window.location.href = '/';
                    return Promise.reject(error);
                }

                const response = await axios_instance.post('/auth/refresh-token', {
                    refresh_token: refreshToken
                });

                const { access_token, token_type, user } = response.data;

                localStorage.setItem('token', access_token);
                localStorage.setItem('user', JSON.stringify(user));

                originalRequest.headers.Authorization = `${token_type} ${access_token}`;

                axios_instance.defaults.headers.common['Authorization'] = `${token_type} ${access_token}`;

                return axios_instance(originalRequest);

            } catch (refreshError) {
                localStorage.clear();
                window.location.href = '/';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    });




export default axios_instance;