const ResetRequest = require('../../db/models/ResetRequest');
const User = require('../../db/models/User');
const createRequest = require('../../utils/api');
const deriveKeyFromPassword = require('../../utils/auth');
const config = require('../../config.json');

async function RequestReset(req, res, next) {
    const { password } = req.body;
    const { id } = req.params;

    const request = await ResetRequest.findByIdAndDelete(id);

    if (!request) {
        res.status(500).send(config.errorGeneric);
    }

    const { salt, key } = deriveKeyFromPassword(password);

    const { success } = await createRequest('patch', `/users/${req.user}`, {
        salt,
        key,
    });

    await User.findOneAndDelete({ username: req.user });

    return success
        ? res.send({ success: true })
        : res.status(500).send(config.errorGeneric);
}

module.exports = RequestReset;