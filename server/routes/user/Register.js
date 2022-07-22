const createRequest = require('../../utils/api');
const deriveKeyFromPassword = require('../../utils/auth');
const config = require('../../config.json');
const User = require('../../db/models/User');

async function Register(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email | !password) {
        return res.status(400).send(config.errorIncomplete);
    }

    const { salt, key } = await deriveKeyFromPassword(password);

    const { success } = await createRequest('post', '/users', {
        username,
        email,
        salt,
        key,
    });

    if (!success) return res.status(500).send(config.errorGeneric);

    await User.create({ username, email, salt });

    return res.sendStatus(200);
}

module.exports = Register;
