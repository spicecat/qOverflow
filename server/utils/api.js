const superagent = require('superagent');

const Throttle = require('superagent-throttle');
const throttle = new Throttle({
    active: true,
    rate: 5,
    ratePer: 1000,
    concurrent: 2,
});

const createRequest = async (op, endpoint, data) => {
    let request = superagent[op](`${process.env.API_URL}${endpoint}`)
        .use(throttle.plugin())
        .set('Authorization', `bearer ${process.env.API_KEY}`);
    if (data)
        if (op === 'get' || op === 'delete')
            request = request.query(data);
        else if (op === 'post' || op === 'patch')
            request = request.send(data);
    return request
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response?.body);
            return err.response?.body;
        }
};

module.exports = createRequest;
