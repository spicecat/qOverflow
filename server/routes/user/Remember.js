const getUserLevel = require('server/utils/getUserLevel');
const Badge = require('../../db/models/Badge');

async function Remember(req, res) {
    const { user } = req;

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
            username: user.username,
            email: user.email,
            points: user.points,
            level: getUserLevel(user.points),
            badgeCount,
        },
    });
}

module.exports = Remember;
