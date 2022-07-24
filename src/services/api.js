import superagent from 'superagent';
import Throttle from 'superagent-throttle';
import { API, API_KEY } from 'var';

const throttle = new Throttle({
    active: true,
    rate: 2,
    ratePer: 1000,
    concurrent: 2
});

const createEndpoint = (path) => async (op, endpoint, data) =>
    endpoint.includes('/undefined')
        ? { success: false, status: 400 }
        : superagent[op](`${API}${path}${endpoint}`)
            .use(throttle.plugin())
            .set('Authorization', `bearer ${API_KEY}`)
            .set('Content-Type', 'application/json' )
            .query(data)
            .send(data)
            .then(({ body }) => {
                console.log('api', op, endpoint, data, body);
                return body;
            })
            .catch(({ response = {}, status }) => {
                console.log('err', op, endpoint, data, response, status)
                return { ...response.body, status };
            })

export { createEndpoint };
