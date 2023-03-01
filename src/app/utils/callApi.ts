import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export const callApi = axios.create({
    baseURL: `${BASE_URL}`,
})