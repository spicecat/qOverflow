const Badge = require('../../db/models/Badge');

async function GetBadges(req, res) {
    const { user } = req;

    const badges = await Badge.find();

    const response = badges.reduce(
        (acc, badge) => {
            if (user.badges.includes(badge.title)) {
                acc.obtained.push(badge);
            } else {
                acc.unobtained.push(badge);
            }

            return acc;
        },
        { obtained: [], unobtained: [] }
    );

    return res.send({ badges: response });
}

module.exports = GetBadges;
