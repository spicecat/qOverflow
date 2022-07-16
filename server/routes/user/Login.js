const Token = require('../../db/models/Token');

async function Login(req, res, next) {
    const user = req.user;
    const remember = req.body.remember;

    await Token.destroy({ where: { ownerID: user.id } });

    const token = await user.createToken({
        expires: remember,
    });

    return res.send({ success: true, token: token.id, user });
}

module.exports = Login;
