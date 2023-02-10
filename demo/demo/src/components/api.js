import axios from 'axios';

const baseURL = {
    local: "http://localhost:8080/"
}
export const api = axios.create({
    baseURL: baseURL.dev
});
