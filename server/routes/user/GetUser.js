const createRequest = require('../../utils/api');
const config = require('../../config.json');
const User = require('../../db/models/User');
const getUserLevel = require('../../utils/getUserLevel');
const Badge = require('../../db/models/Badge');

async function GetUser(req, res) {
    const { username } = req.params;

    const cachedUser = await User.findOne({ username });

    if (cachedUser)
        return res.send({
            user: {
                username: cachedUser.username,
                email: cachedUser.email,
                points: cachedUser.points,
                level: getUserLevel(cachedUser.points),
            },
        });

    const { success, user } = await createRequest('get', `/users/${username}`);

    if (!success) return res.status(500).send(config.errorGeneric);

    const newUser = await User.findByIdAndUpdate(user.user_id, user, {
        upsert: true,
        new: true,
    });

    const badges = await Badge.find({ title: { $in: user.badges } });

    const badgeCount = badges.reduce(
        (acc, badge) => {
            if (badge.rank === 'Gold') {
                acc.gold = acc.gold++;
            } else if (badge.rank === 'Silver') {
                acc.silver = acc.silver++;
            } else if (badge.rank === 'Bronze') {
                acc.bronze = acc.bronze++;
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
        user: {
            username: newUser.username,
            email: newUser.email,
            points: newUser.points,
            level: getUserLevel(newUser.points),
            badgeCount,
        },
    });
}

module.exports = GetUser;
