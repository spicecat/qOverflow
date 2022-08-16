const createRequest = require('../../utils/api');
const config = require('../../config.json');
const User = require('../../db/models/User');
const getUserLevel = require('../../utils/getUserLevel');

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
