const createRequest = require('./api');
const config = require('../config.json');

const defaultAcc = { success: true, requests: [] };

async function fetchUsers(
    recentTimestamp = 0,
    acc = defaultAcc,
    after = ''
) {
    const request = await createRequest('get', '/users', { after });

    if (!request.success) return config.errorGeneric;
    if (!request.users.length) return acc;

    const newAcc = {
        success: true,
        requests: [...acc.requests, request],
    };

    const oldest = request.users[request.users.length - 1];
    if (oldest.createdAt < recentTimestamp) {
        return newAcc;
    }

    return fetchUsers(recentTimestamp, newAcc, oldest['user_id']);
}

module.exports = fetchUsers;
