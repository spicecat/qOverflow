const User = require('../db/models/User');
const fetchUsers = require('../utils/fetchUsers');

async function getAllUsers(job, done) {
    console.log('[INFO]: Refreshing user database.');
    const { success, requests } = await fetchUsers();

    if (!success) console.log('[ERROR]: User fetch failed');

    const completeUsers = await requests.reduce(async (acc, req) => {
        const reformat = req.users.map((user) => ({
            ...user,
            id: user.user_id,
        }));
        return [...reformat, ...acc];
    }, []);

    completeUsers.map(
        async (user) =>
            User.findOneAndUpdate({ username: user.username }, user, {
                upsert: true,
            })
    );

    done();
}

module.exports = getAllUsers;
