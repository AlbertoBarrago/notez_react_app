import axios from "axios";


const axios_instance = axios.create({
    baseURL: import.meta.env.PROD ? import.meta.env.VITE_PROD_BASE_URL : import.meta.env.VITE_DEV_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

axios_instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);


axios_instance.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post('/api/v1/auth/refresh-token', {
                    refresh_token: refreshToken
                });

                const { access_token, token_type, user } = response.data;

                localStorage.setItem('token', access_token);
                localStorage.setItem('user', JSON.stringify(user));

                // Update the original request headers
                originalRequest.headers.Authorization = `${token_type} ${access_token}`;

                // Update default headers for future requests
                axios_instance.defaults.headers.common['Authorization'] = `${token_type} ${access_token}`;

                return axios_instance(originalRequest);

            } catch (refreshError) {
                localStorage.clear();
                window.location.href = '/';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);




export default axios_instance;