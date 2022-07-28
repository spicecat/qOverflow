const ResetRequest = require('server/db/models/ResetRequest');
const User = require('server/db/models/User');
const createRequest = require('server/utils/api');
const deriveKeyFromPassword = require('server/utils/auth');
const config = require('server/config.json');

async function RequestReset(req, res) {
    const { password } = req.body;
    const { id } = req.params;

    const request = await ResetRequest.findByIdAndDelete(id);

    if (!request) {
        res.status(500).send(config.errorGeneric);
    }

    const { salt, key } = deriveKeyFromPassword(password);

    const { success } = await createRequest('patch', `/users/${request.user}`, {
        salt,
        key,
    });

    await User.findOneAndDelete({ username: request.user });

    return success
        ? res.sendStatus(200)
        : res.status(500).send(config.errorGeneric);
}

module.exports = RequestReset;
