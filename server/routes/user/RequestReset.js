const ResetRequest = require('../../db/models/ResetRequest');

async function RequestReset(req, res, next) {
    const { username } = req.query;

    const request = await ResetRequest.create({ user: username });

    return res.send({ id: request.id });
}

module.exports = RequestReset;
