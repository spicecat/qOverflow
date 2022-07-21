const superagent = require('superagent');

const Throttle = require('superagent-throttle');
const throttle = new Throttle({
    active: true,
    rate: 5,
    ratePer: 1000,
    concurrent: 2,
});

const createRequest = async (op, endpoint, data) => {
    const request = superagent[op](`${process.env.API_URL}${endpoint}`)
        .use(throttle.plugin())
        .set('Authorization', `bearer ${process.env.API_KEY}`)
    if (op === 'get' || op === 'delete') {
        return request
            .query(data)
            .then((res) => res.body)
            .catch((err) => {
                console.log(err.response.body);
                return err.response.body;
            });
    } else {
        return request
            .send(data)
            .then((res) => res.body)
            .catch((err) => {
                console.log(err.response.body);
                return err.response.body;
            });
    }
};

module.exports = createRequest;
