const superagent = require('superagent');

const Throttle = require('superagent-throttle');
const throttle = new Throttle({
    active: true,
    rate: 5,
    ratePer: 1000,
    concurrent: 2,
});

const cleanObject = (data) =>
    Object.fromEntries(
        Object.entries(data)
            .filter(([, v]) => v)
    )

const stringifyQuery = (data = {}) =>
    Object.fromEntries(
        Object.entries(data)
            .map(([k, v]) => [k, typeof (v) === 'object' ? JSON.stringify(cleanObject(v)) : v])
    )

const createRequest = async (op, endpoint, data) => {
    let request = superagent[op](`${process.env.API_URL}${endpoint}`)
        .use(throttle.plugin())
        .set('Authorization', `bearer ${process.env.API_KEY}`);

    if (data)
        if (op === 'get' || op === 'delete')
            request = request.query(stringifyQuery(data));
        else if (op === 'post' || op === 'patch')
            request = request.send(data);

    return request
        .then((res) => {
            return res.body;
        })
        .catch((err) => {
            return err.response?.body || { error: 'Error' };
        });
};

module.exports = createRequest;
