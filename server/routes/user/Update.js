const createRequest = require('../../utils/api');
const deriveKeyFromPassword = require('../../utils/auth');

async function RequestReset(req, res, next) {
    const user = req.user;

    const { success } = await createRequest(
        'patch',
        `/users/${user}`,
        req.body
    );

    return success
        ? res.send('Your account details have been changed.')
        : res.status(500).send('Something went wrong.');
}

module.exports = RequestReset;
