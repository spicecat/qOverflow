const superagent = require('superagent');

const Throttle = require('superagent-throttle');
const throttle = new Throttle({
    active: true,
    rate: 5,
    ratePer: 1000,
    concurrent: 2,
});

const createRequest = async (op, endpoint, data) => {
    if (op === 'get' || op === 'delete') {
        return superagent[op](`${process.env.API_URL}${endpoint}`)
            .use(throttle.plugin())
            .set('Authorization', `bearer ${process.env.API_KEY}`)
            .query(data)
            .then((res) => res.body)
            .catch((err) => {
                console.log(err.response.body);
                return err.response.body;
            });
    } else {
        return superagent[op](`${process.env.API_URL}${endpoint}`)
            .use(throttle.plugin())
            .set('Authorization', `bearer ${process.env.API_KEY}`)
            .send(data)
            .then((res) => res.body)
            .catch((err) => {
                console.log(err.response.body);
                return err.response.body;
            });
    }
};

module.exports = createRequest;
