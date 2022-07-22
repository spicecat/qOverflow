const getUserLevel = require('../../utils/getUserLevel');

async function Remember(req, res) {
    const user = req.user;

    return res.send({
        user: {
            username: user.username,
            email: user.email,
            points: user.points,
            level: getUserLevel(user.points),
        }
    });
}

module.exports = Remember;
