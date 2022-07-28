const createRequest = require('./api');

const defaultAcc = [];

async function fetchQuestions(
    acc = defaultAcc,
    after = ''
) {
    const { success, questions } = await createRequest('get', '/questions/search', { after });

    if (!success || !questions.length) return acc;

    const newAcc = [...acc, ...questions];
    const oldest = users[questions.length - 1];

    return fetchQuestions(newAcc, oldest.question_id);
}

module.exports = fetchQuestions;
