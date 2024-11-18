import axios from "axios";
import auth from "@/services/login/index.js";
const auth_instance = new auth();

const axios_instance = axios.create({
    baseURL: import.meta.env.PROD ? import.meta.env.VITE_PROD_BASE_URL : import.meta.env.VITE_DEV_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

axios_instance.interceptors.request.use(async (config) => {
    const token = await auth_instance.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axios_instance;