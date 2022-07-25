const Token = require('../../db/models/Token');

async function Logout(req, res) {
    const { user } = req;

    await Token.findOne({ user: user.id });

    return res.sendStatus(200);
}

module.exports = Logout;
