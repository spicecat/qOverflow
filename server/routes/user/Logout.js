const Token = require('../../db/models/Token');

async function Logout(req, res, next) {
    const user = req.user;
    await Token.findOneAndDelete({ user });

    return res.send({ success: true });
}

module.exports = Logout;
