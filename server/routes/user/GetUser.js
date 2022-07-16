const createRequest = require('../../utils/api');

const User = require('../../db/models/User');

async function GetUser(req, res, next) {
    const { success, user } = await createRequest(
        'get',
        `/users/${req.query.user}`
    );

    return success
        ? res.send({ success: true, user })
        : res.status(500).send('Something went wrong.');
}

module.exports = GetUser;
