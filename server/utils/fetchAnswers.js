const createRequest = require('./api');
const config = require('server/config.json');

const defaultAcc = { success: true, requests: [] };

async function fetchAnswers(
    url,
    recentTimestamp = 0,
    acc = defaultAcc,
    after = ''
) {
    const request = await createRequest('get', url, { after });

    if (!request.success) return config.errorGeneric;
    if (!request.answers.length) return acc;

    const newAcc = {
        success: true,
        requests: [...acc.requests, ...request.answers],
    };

    const oldest = request.answers[request.answers.length - 1];
    if (oldest.createdAt < recentTimestamp) {
        return newAcc;
    }

    return fetchAnswers(url, recentTimestamp, newAcc, oldest['answer_id']);
}

module.exports = fetchAnswers;
