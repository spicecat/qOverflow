const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Token = require('../../db/models/Token');
const Badge = require('../../db/models/Badge');
const getUserLevel = require('../../utils/getUserLevel');

async function Login(req, res) {
    const { user } = req;
    const { remember } = req.body;

    const secretKey = mongoose.Types.ObjectId();
    const accessToken = jwt.sign({ id: user.id }, secretKey.toString());

    await Token.deleteMany({ user: user.username });

    const token = await Token.create({
        _id: secretKey,
        token: accessToken,
        expires: !remember,
        user: user.username,
    });

    const badges = await Badge.find({ title: { $in: user.badges } });

    const badgeCount = badges.reduce(
        (acc, badge) => {
            if (badge.rank === 'Gold') {
                acc.gold = acc.gold + 1;
            } else if (badge.rank === 'Silver') {
                acc.silver = acc.silver + 1;
            } else if (badge.rank === 'Bronze') {
                acc.bronze = acc.bronze + 1;
            }

            return acc;
        },
        {
            gold: 0,
            silver: 0,
            bronze: 0,
        }
    );

    return res.send({
        token: token.token,
        user: {
            username: user.username,
            email: user.email,
            points: user.points,
            level: getUserLevel(user.points),
            badgeCount,
        },
    });
}

module.exports = Login;
