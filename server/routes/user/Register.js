const createRequest = require('../../utils/api');
const deriveKeyFromPassword = require('../../utils/auth');

const User = require('../../db/models/User');

async function Register(req, res, next) {
    const { username, email, password } = req.body;

    if (!username || !email | !passowrd) {
        return res.status(400).send('Your request is missing information.');
    }

    const { salt, key } = await deriveKeyFromPassword(password);

    const response = await createRequest('post', '/users', {
        username,
        email,
        salt,
        key,
    });

    await User.create({ username, email, points, salt });

    return response.success
        ? res.send()
        : res.status(500).send('Something went wrong.');
}

module.exports = Register;
