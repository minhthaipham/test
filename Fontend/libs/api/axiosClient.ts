import axios,{ AxiosInstance, AxiosRequestConfig } from 'axios'
import * as queryString from 'querystring'
import * as https from 'https'
import { configs } from '@/utils/constant';
import { getToken } from '@/Provider/localStorageProvider';
const agent = new https.Agent({
    rejectUnauthorized: false,
});

const config: AxiosRequestConfig = {
    baseURL:    configs.baseURL,
    paramsSerializer: {
        encode: (string: string) => queryString.parse(string),
        serialize: (params: any): string => queryString.stringify(params || {}),
    },
    withCredentials: false,
    timeout: 1000 * 300,
};

const axiosClient: AxiosInstance = axios.create(config);

axiosClient.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response;
        }

        return response;
    }
);

export default axiosClient;