const Badge = require('server/db/models/Badge');

async function GetBadges(req, res) {
    const { user } = req;

    const badges = await Badge.find();

    const response = badges.reduce(
        (acc, badge) => {
            if (user.badges.includes(badge.title)) {
                acc.obtained.append(badge);
            } else {
                acc.unobtained.append(badge);
            }

            return acc;
        },
        { obtained: [], unobtained: [] }
    );

    return res.send(response);
}

module.exports = GetBadges;
