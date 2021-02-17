import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);
const API_ROOT = 'http://localhost:8000/api';
const responseBody = response => {
    return response.body
};

let token = null;

const tokenPlugin = secured => {
    return (request) => {
        if(token && secured) {
            request.set('Authorization', `Bearer ${token}`);
        }
    }
}

export const requests = {
    get: (url, secured = false) => {
        return superagent.get(`${API_ROOT}${url}`).set('Content-Type', 'application/json').use(tokenPlugin(secured)).then(responseBody)
    },
    post: (url, body = null, secured = true) => {
        return superagent.post(`${API_ROOT}${url}`, JSON.stringify(body)).set('Content-Type', 'application/json').use(tokenPlugin(secured)).then(responseBody)
    },
    update: (url, body = null, secured = true) => {
        return superagent.put(`${API_ROOT}${url}`, JSON.stringify(body)).set('Content-Type', 'application/json').use(tokenPlugin(secured)).then(responseBody)
    },
    upload: (url, body, file, secured = true) => {
        return superagent.post(`${API_ROOT}${url}`).attach('file', file)
        .use(tokenPlugin(secured))
        .then(responseBody)
    },
    delete: (url, secured = true) => {
        return superagent.del(`${API_ROOT}${url}`).set('Content-Type', 'application/json').use(tokenPlugin(secured)).then(responseBody)
    },
    getFooballApi: (url, secured = false) => {
        console.log('requesting');
        return superagent.get(url).set('X-Auth-Token', '518d821986ae465eb82b2f8e85174ed5').then(responseBody)
    },
    setToken: (newJwtToken) => {token = newJwtToken}
}   