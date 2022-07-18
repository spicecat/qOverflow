const Token = require('../../db/models/Token');

async function Logout(req, res, next) {
    const user = req.user;

    await Token.findByIdAndDelete(user.token);

    return res.sendStatus(200);
}

module.exports = Logout;
