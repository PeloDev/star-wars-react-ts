import axios from 'axios';

const BASE_URL = 'https://url...';

async function get(route: string, params: any) {
    let query = "?" + Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return axios.get(BASE_URL + route + query);
}

async function post(route: string, params: Object) {
    return axios.post(BASE_URL + route, params);
}

const api = { get, post };

export default api;