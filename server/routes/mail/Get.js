const config = require('../../config.json');
const createRequest = require('../../utils/api');

async function Get(req, res, next) {
    const { username } = req.params;
    const { after } = req.query;

    const { success, mail } = await createRequest('get', `/mail/${username}`, {
        after,
    });

    return success
        ? res.send({ success: true, messages })
        : res.status(500).send({ success: false, error: config.errorGeneric });
}

module.exports = Get;
