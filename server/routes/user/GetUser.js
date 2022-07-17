const createRequest = require('../../utils/api');

const User = require('../../db/models/User');

async function GetUser(req, res, next) {
    const { username } = req.params;

    const cachedUser = await User.find({ username }).select([
        'username',
        'email',
        'points',
    ]);

    if (cachedUser) return res.send(cachedUser);

    const { success, user } = await createRequest(
        'get',
        `/users/${req.query.user}`
    );

    if (!success) return res.status(500).send(config.errorGeneric);

    const newUser = await User.create({ ...user, id: user.user_id });
    return res.send({
        username: newUser.username,
        email: newUser.email,
        points: newUser.points,
    });
}

module.exports = GetUser;
