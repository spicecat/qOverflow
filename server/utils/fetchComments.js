const createRequest = require('./api');
const config = require('server/config.json');

const defaultAcc = { success: true, requests: [] };

async function fetchComments(
    url,
    recentTimestamp = 0,
    acc = defaultAcc,
    after = ''
) {
    const request = await createRequest('get', url, { after });

    if (!request.success) return config.errorGeneric;
    if (!request.comments.length) return acc;

    const newAcc = {
        success: true,
        requests: [...acc.requests, ...request.comments],
    };

    const oldest = request.comments[request.comments.length - 1];
    if (oldest.createdAt < recentTimestamp) {
        return newAcc;
    }

    return fetchComments(url, recentTimestamp, newAcc, oldest['comment_id']);
}

module.exports = fetchComments;
