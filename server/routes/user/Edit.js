const createRequest = require('server/utils/api');
const deriveKeyFromPassword = require('server/utils/auth');
const User = require('server/db/models/User');
const config = require('server/config.json');

async function Edit(req, res) {
    const { user } = req;
    const { email, password } = req.body;

    let userBody = {};
    if (email) userBody = { ...userBody, email };
    if (password) {
        const { salt, key } = await deriveKeyFromPassword(password);
        userBody = { ...userBody, salt, key };
    }

    const { success } = await createRequest(
        'patch',
        `/users/${user.username}`,
        userBody
    );

    await User.findOneAndDelete({ username: user.username });

    return success
        ? res.sendStatus(200)
        : res.status(500).send(config.errorGeneric);
}

module.exports = Edit;
