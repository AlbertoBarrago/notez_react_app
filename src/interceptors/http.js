import axios from "axios";
import auth from "@/services/auth/index.js";

const axiosInstance = axios.create();
const auth_instance = new auth();
axiosInstance.interceptors.request.use(
    async (config) => {
        const token =  auth_instance.getToken();

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        } else {
            throw new Error('Token not found');
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;