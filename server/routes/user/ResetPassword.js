const ResetRequest = require('../../db/models/ResetRequest');

const createRequest = require('../../utils/api');
const deriveKeyFromPassword = require('../../utils/auth');

async function RequestReset(req, res, next) {
    const { password } = req.body;
    const { id } = req.params;

    const request = await ResetRequest.findByIdAndDelete(id);

    if (!request) {
        res.status(500).send('Something went wrong.');
    }

    const { salt, key } = deriveKeyFromPassword(password);

    const { success } = await createRequest('patch', `/users/${request.user}`, {
        salt,
        key,
    });

    return success
        ? res.send('Your password has been changed.')
        : res.status(500).send('Something went wrong.');
}

module.exports = RequestReset;
