const Question = require('server/db/models/Question');
const createRequest = require('server/utils/api');

async function refreshQuestion(question_id) {
    const { question, success } = await createRequest(
        'get',
        `/questions/${question_id}`
    );
    if (!success) return false;

    // Refresh cache
    const newQuestion = {
        ...question,
        id: question.question_id,
    };

    return Question.findByIdAndUpdate(question.id, newQuestion, {
        upsert: true,
    });
}

module.exports = refreshQuestion;
