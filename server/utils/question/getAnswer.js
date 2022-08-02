const createRequest = require('server/utils/api');

const Answer = require('server/db/models/Answer');

async function getAnswer(question_id, answer_id) {
    let cachedAnswer;

    try {
        cachedAnswer = await Answer.findById(answer_id);
    } catch {
        return;
    }

    // Retrieve uncached answer and patch to cache
    if (!cachedAnswer) {
        const { success, answer } = await createRequest(
            'get',
            `/questions/${question_id}/answers/${answer_id}`
        );
        if (!success) return;
        return Answer.findByIdAndUpdate(answer.answer_id, answer, {
            upsert: true,
            new: true,
        });
    } else return cachedAnswer;
}

module.exports = getAnswer;
