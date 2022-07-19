const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Token = require('../../db/models/Token');

async function Login(req, res, next) {
    const user = req.user;
    const remember = req.body.remember;

    const secretKey = mongoose.Types.ObjectId();
    const accessToken = jwt.sign({ id: user.id }, secretKey.toString());

    await Token.deleteMany({ user: user.username });

    const token = await Token.create({
        _id: secretKey,
        token: accessToken,
        expires: !remember,
        user: user.username,
    });

    return res.send({ token: token.token, user });
}

module.exports = Login;
