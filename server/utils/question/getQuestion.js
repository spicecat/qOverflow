const createRequest = require('server/utils/api');

const Question = require('server/db/models/Question');

async function getQuestion(question_id) {
    let cachedQuestion;
    try { cachedQuestion = await Question.findById(question_id); }
    catch { return; }

    // Retrieve uncached question and patch to cache
    if (!cachedQuestion) {
        const { success, question } = await createRequest(
            'get',
            `/questions/${question_id}`
        );
        if (!success) return;
        return Question.create({ ...question, id: question.question_id });
    } else return cachedQuestion;
}

module.exports = getQuestion;
