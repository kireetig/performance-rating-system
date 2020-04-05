import axios from 'axios';
import { WEB_TOKEN } from '../contants/storageContants';

const common_axios = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT
});

// Set default headers to common_axios ( as Instance )
common_axios.defaults.headers.common['Authorization'] = localStorage.getItem(WEB_TOKEN);

export const axiosInstance = common_axios;