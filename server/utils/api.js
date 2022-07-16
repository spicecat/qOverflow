const superagent = require('superagent');

const Throttle = require('superagent-throttle');
const throttle = new Throttle({
    active: true,
    rate: 1,
    ratePer: 10000,
    concurrent: 2,
});

const createRequest = async (op, endpoint, data) =>
    superagent[op](`${process.env.API_URL}${endpoint}`)
        .use(throttle.plugin())
        .set('Authorization', `bearer ${process.env.API_KEY}`)
        .query(data)
        .send(data)
        .then((res) => res.body);

module.exports = createRequest;
