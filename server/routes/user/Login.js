const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Token = require('../../db/models/Token');
const getUserLevel = require('../../utils/getUserLevel');

async function Login(req, res) {
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

    return res.send({
        token: token.token,
        user: {
            username: user.username,
            email: user.email,
            points: user.points,
            level: getUserLevel(user.points),
        }
    });
}

module.exports = Login;
