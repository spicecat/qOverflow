const createRequest = require('./api');
const config = require('../config.json');

const defaultAcc = { success: true, requests: [] };

async function fetchMail(
    url,
    recentTimestamp = 0,
    acc = defaultAcc,
    after = ''
) {
    const request = await createRequest('get', url, { after });

    if (!request.success) return config.errorGeneric;
    if (!request.messages.length) return acc;

    const newAcc = {
        success: true,
        requests: [...acc.requests, request],
    };

    const oldest = request.messages[request.messages.length - 1];
    if (oldest.createdAt < recentTimestamp) {
        return newAcc;
    }

    return fetchMail(url, recentTimestamp, newAcc, oldest['answer_id']);
}

module.exports = fetchMail;
