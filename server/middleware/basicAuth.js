const deriveKeyFromPassword = require('../utils/auth');
const createRequest = require('../utils/api');
const config = require('../config.json');

const User = require('../db/models/User');

async function basicAuth(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Your request is malformed.');
    }

    const cacheUser = await User.findOne({ username });
    if (cacheUser) {
        const { key } = await deriveKeyFromPassword(password, cacheUser.salt);
        const checkCacheAuth = await createRequest(
            'post',
            `/users/${username}/auth`,
            {
                key,
            }
        );

        if (checkCacheAuth.success) {
            req.user = cacheUser;
            return next();
        }
    }

    const { user, success } = await createRequest('get', `/users/${username}`);
    if (!success) return res.status(500).send(config.errorGeneric);

    const dbUser = await User.create({ ...user, id: user.user_id });

    const { key } = await deriveKeyFromPassword(password, user.salt);
    const checkAuth = await createRequest('post', `/users/${username}/auth`, {
        key,
    });

    if (checkAuth.success) {
        req.user = dbUser;
        return next();
    } else {
        return res.status(403).send(config.errorFailed);
    }
}

module.exports = basicAuth;
