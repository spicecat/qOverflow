const Token = require('../db/models/Token');
const User = require('../db/models/User');
const config = require('../config.json');

async function tokenAuth(req, res, next) {
    const authHeader = req.get('Authorization');

    const token = authHeader?.split(' ')[1];

    // Verify token is included in request
    if (!token) return res.status(401).send(config.errorUnauthed);

    const result = await Token.findOne({ token });

    // Verify token expiration
    const date = new Date();
    if (!result) {
        return res.status(401).send(config.errorUnauthed);
    } else if (result.expires && date.setDate(date.getDate + 1) > result.createdAt) {
        await Token.findOneAndDelete({ token });
        return res.status(401).send(config.errorUnauthed);
    }

    const user = await User.findOne({ username: result.user });

    if (!user) return res.status(401).send(config.errorUnauthed);

    req.user = user;

    return next();
}

module.exports = tokenAuth;
