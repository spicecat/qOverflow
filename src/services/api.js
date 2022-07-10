import superagent from 'superagent';
import Throttle from 'superagent-throttle'
import { API, API_KEY } from '../var'

const throttle = new Throttle({
    active: true,
    rate: 5,
    ratePer: 3000,
    concurrent: 2
})

const createEndpoint = (path) => async (op, endpoint, data) => {
    try {
        const { body } = await superagent[op](`${API}${path}${endpoint}`)
            .use(throttle.plugin())
            .set('Authorization', `bearer ${API_KEY}`)
            .query(data)
            .send(data);
        console.log('api', op, endpoint, data, body)
        return body
    } catch ({ response = {}, status }) {
        console.log('err', op, endpoint, data, response, status)
        return { ...response.body, status };
    }
};

export { createEndpoint };
