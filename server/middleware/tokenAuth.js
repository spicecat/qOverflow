const Token = require('../db/models/Token');
const User = require('../db/models/User');
const jwt = require('jsonwebtoken');
const config = require('../config.json');

async function tokenAuth(req, res, next) {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send(config.errorUnauthed);
    }

    const result = await Token.findOne({ token: token });

    const date = new Date();
    if (!result) {
        return res.status(401).send(config.errorUnauthed);
    } else if (
        result.expires &&
        date.setDate(date.getDate + 1) > result.createdAt
    ) {
        await Token.findOneAndDelete({ token });
        return res.status(401).send(config.errorUnauthed);
    }

    const user = await User.findOne({ username: result.user });

    if (!user) return res.status(401).send(config.errorUnauthed);

    req.user = user;

    return next();
}

module.exports = tokenAuth;
