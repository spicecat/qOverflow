const User = require('../db/models/User');
const fetchUsers = require('../utils/fetchUsers');

async function getAllUsers(job, done) {
    console.log('[INFO]: Refreshing user database.');
    const { success, requests } = await fetchUsers();

    if (!success) console.log('[ERROR]: User fetch failed');

    await User.deleteMany();

    requests.map(async ({ users }) => {
        await User.create(
            users.map((user) => ({
                ...user,
                id: user.user_id,
            }))
        );
    });

    done();
}

module.exports = getAllUsers;
