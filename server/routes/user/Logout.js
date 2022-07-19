const Token = require('../../db/models/Token');

async function Logout(req, res, next) {
    const user = req.user;

    await Token.findOne({ user: user.id });

    return res.sendStatus(200);
}

module.exports = Logout;
