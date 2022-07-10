import superagent from 'superagent';

const API = process.env.REACT_APP_API_ROOT;
const API_KEY = process.env.REACT_APP_API_KEY;

const createEndpoint = (path) => async (op, endpoint, data) => {
    try {
        return await superagent[op](`${API}${path}${endpoint}`)
            .set('Authorization', `bearer ${API_KEY}`)
            .query(data)
            .send(data)
            .then(({ body }) => body);
    } catch ({ response = {}, status }) {
        return { ...response.body, status };
    }
};

export { createEndpoint };
