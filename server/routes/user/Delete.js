const createRequest = require('../../utils/api');
const config = require('../../config.json');

async function Logout(req, res) {
    const { user } = req;

    const { success } = await createRequest('delete', `/users/${user.username}`);

    if (!success) return res.status(500).send(config.errorFailed);

    return res.sendStatus(200);
}

module.exports = Logout;
