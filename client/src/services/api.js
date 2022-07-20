import superagent from 'superagent';
import Throttle from 'superagent-throttle';
import { API, API_KEY } from 'var';

const throttle = new Throttle({
    active: true,
    rate: 2,
    ratePer: 1000,
    concurrent: 2,
});

const createEndpoint = (path) => async (op, endpoint, data, auth) => {
    var request = superagent[op](`${API}${path}${endpoint}`)
        .use(throttle.plugin)
        .set('Content-Type', 'application/json');

    if (auth) {
        request = request.set('Authorization', `bearer ${API_KEY}`);
    }

    if (op === 'get' || op === 'delete') {
        request
            .query(data)
            .then(({ body }) => {
                console.log('api', op, path, endpoint, data, body);
                return body;
            })
            .catch((err) => console.log(666, err));
    } else {
        request
            .send(data)
            .then(({ body }) => {
                console.log('api', op, path, endpoint, data, body);
                return body;
            })
            .catch((err) => console.log(666, err));
    }
};

export { createEndpoint };
