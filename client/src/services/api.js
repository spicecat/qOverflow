import Cookies from 'js-cookie';
import superagent from 'superagent';
import Throttle from 'superagent-throttle';

const throttle = new Throttle({
    active: true,
    rate: 2,
    ratePer: 1000,
    concurrent: 2,
});

export const createEndpoint = (path) => (op, endpoint, data, auth) => {
    let request = superagent[op](`${process.env.REACT_APP_API_ROOT}${path}${endpoint}`)
        .use(throttle.plugin)
        .set('Content-Type', 'application/json');

    if (auth) request = request.set('Authorization', auth);
    else if (Cookies.get('token'))
        request = request.set('Authorization', `bearer ${Cookies.get('token')}`);

    if (data)
        if (op === 'get' || op === 'delete') request = request.query(data);
        else if (op === 'post' || op === 'patch') request = request.send(data);

    return request
        .then(({ body, status }) => {
            return { ...body, status };
        })
        .catch(({ response, status }) => {
            return response ? { ...response?.body, status } : { error: 'Error' };
        });
};
