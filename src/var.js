import superagent from 'superagent';

const API = process.env.REACT_APP_API_ROOT;
const API_KEY = process.env.REACT_APP_API_KEY;

const createEndpoint = (path) => (op, endpoint, data) => {
    try {
        return superagent[op](`${API}${path}${endpoint}`)
            .query(data)
            .send(data)
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);
    } catch (err) {
        return err.status;
    }
};

export { API, API_KEY, createEndpoint };
