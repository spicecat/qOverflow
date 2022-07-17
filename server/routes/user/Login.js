const Token = require('../../db/models/Token');

async function Login(req, res, next) {
    const user = req.user;
    const remember = req.body.remember;

    await Token.findByIdAndDelete(user.token);

    const token = await Token.create({
        user: user._id,
        expires: remember,
    });

    return res.send({ success: true, token: token.id, user });
}

module.exports = Login;
