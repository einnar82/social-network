import axios from 'axios'

const httpClient = (params) => {
    return axios.request({
        ...params,
        baseURL: process.env.BASE_URL || 'http://localhost:8000/api/'
    });
}

export default httpClient;