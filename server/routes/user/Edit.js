const createRequest = require('../../utils/api');
const User = require('../../db/models/User');

async function Edit(req, res, next) {
    const user = req.user;
    const { email, password } = req.body;

    var userBody = {};
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
