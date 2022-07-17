const createRequest = require('./api');
const config = require('../config.json');

const defaultAcc = { success: true, requests: [] };

async function fetchQuestions(
    recentTimestamp = 0,
    acc = defaultAcc,
    after = ''
) {
    const request = await createRequest('get', '/questions/search', { after });

    if (!request.success) return config.errorGeneric;
    if (!request.questions.length) return acc;

    const newAcc = {
        success: true,
        requests: [...acc.requests, request],
    };

    const oldest = request.questions[request.questions.length - 1];
    if (oldest.createdAt < recentTimestamp) {
        return newAcc;
    }

    return fetchQuestions(recentTimestamp, newAcc, oldest['question_id']);
}

module.exports = fetchQuestions;
