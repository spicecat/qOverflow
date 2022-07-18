const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Token = require('../../db/models/Token');

async function Login(req, res, next) {
    const user = req.user;
    const remember = req.body.remember;

    await Token.deleteMany({ user: user.username });

    const secretKey = mongoose.Types.ObjectId();
    const accessToken = jwt.sign({ id: user.id }, secretKey.toString());

    const token = await Token.create({
        _id: secretKey,
        token: accessToken,
        expires: remember,
    });

    return res.send({ success: true, token: token.accessToken, user });
}

module.exports = Login;
