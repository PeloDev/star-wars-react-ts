import axios from 'axios';

const BASE_URL = 'https://5allelwtuk.execute-api.us-east-1.amazonaws.com/dev/';

async function get(route: string, params: any) {
    let query = "?" + Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return axios.get(BASE_URL + route + query);
}

async function post(route: string, params: Object) {
    return axios.post(BASE_URL + route, params);
}

const api = { get, post };

// Back-end requests
export async function fetchPeople(page = 1) {
    post('/graphql', {
        query: `
            query($page: Int) {
                getAllPeople(page: $page) {name}
            }
        `,
        variables: { page: page }
    })
    .then(result => {
        console.log(result.data);
    })
    .catch(e => {
        console.log(e.response.data);
    });
}

export default api;