import Cookies from 'js-cookie';
import superagent from 'superagent';
import Throttle from 'superagent-throttle';

const throttle = new Throttle({
    active: true,
    rate: 2,
    ratePer: 1000,
    concurrent: 2,
});

export const createEndpoint = (path) => (op, endpoint) => {
    let request = superagent[op](`${process.env.REACT_APP_API_ROOT}${path}${endpoint}`)
        .use(throttle.plugin)
        .set('Content-Type', 'application/json');
    if (Cookies.get('token'))
        request = request.set('Authorization', `bearer ${Cookies.get('token')}`);
    return request;
}
