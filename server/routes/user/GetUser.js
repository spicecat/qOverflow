const createRequest = require('../../utils/api');
const config = require('../../config.json');
const User = require('../../db/models/User');
const getUserLevel = require('../../utils/getUserLevel');

async function GetUser(req, res) {
    const { username } = req.params;

    const cachedUser = await User.findOne({ username }).select([
        'username',
        'email',
        'points',
    ]);

    if (cachedUser) return res.send({ user: cachedUser });

    const { success, user } = await createRequest('get', `/users/${username}`);

    if (!success) return res.status(500).send(config.errorGeneric);

    const newUser = await User.create({ ...user, id: user.user_id });
    return res.send({
        user: {
            username: newUser.username,
            email: newUser.email,
            points: newUser.points,
            level: getUserLevel(newUser.points),
        },
    });
}

module.exports = GetUser;
