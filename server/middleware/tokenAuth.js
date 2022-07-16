const Token = require('../db/models/Token');

async function tokenAuth(req, res, next) {
    const token = req.query.token || req.body.token;

    if (!token) {
        return res.status(401).send('Your request is missing session token.');
    }

    const result = await Token.findByIdAndDelete(token);

    const date = new Date();

    if (!result) {
        return res.status(401).send('The user is unauthenticated.');
    } else if (
        result.expires &&
        date.setDate(date.getDate + 1) > result.createdAt
    ) {
        await Token.findByIdAndDelete(token);
        return res.status(401).send('Session token has expired.');
    }

    req.user = result.username;

    return next();
}

module.exports = tokenAuth;
