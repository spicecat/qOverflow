const createRequest = require('../../utils/api');
const deriveKeyFromPassword = require('../../utils/auth');
const config = require('../../config.json');
const User = require('../../db/models/User');

async function Register(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send(config.errorIncomplete);
    }

    const { salt, key } = await deriveKeyFromPassword(password);

    const { success, error, user } = await createRequest('post', '/users', {
        username,
        email,
        salt,
        key,
    });

    if (!success)
        switch (error) {
            case 'an item with that "username" already exists':
                return res.status(409).send({ error });
            case 'an item with that "email" already exists':
                return res.status(409).send({ error });
            default:
                return res.status(500).send(config.errorGeneric);
        }

    await User.create(user);

    return res.sendStatus(201);
}

module.exports = Register;
