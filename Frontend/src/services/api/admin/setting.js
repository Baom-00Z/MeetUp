// src/plugins/axios.js
import axios from "axios";
import router from "@/router/index.js";

const axiosInstance = axios.create({
    baseURL: "https://backend.test/api",
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const status = error.response.status;

            if (status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                router.push({ name: "login" });
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
