import superagent from 'superagent';

const API = process.env.REACT_APP_API_ROOT;
const API_KEY = process.env.REACT_APP_API_KEY;

const callAPI = (op, url, query) => {
    try {
        return superagent[op](API + url)
            .query(query)
            .set('Authorization', `bearer ${API_KEY}`)
            .then(({ body }) => body);
    } catch (err) {
        return err.status;
    }
}

export { API, API_KEY, callAPI };