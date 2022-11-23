const Answer = require('../../db/models/Answer');
const config = require('../../config.json');
const createRequest = require('../../utils/api');

async function EditAnswer(req, res) {
    const { user } = req;
    const { text } = req.body;
    const { question_id, answer_id } = req.params;

    if (!text) return res.status(400).send(config.errorIncomplete);

    // Retrieve latest question data
    const answerPull = await createRequest(
        'get',
        `/questions/${question_id}/answers/${answer_id}`
    );

    if (!answerPull.success) return res.status(500).send(config.errorGeneric);

    // Verify user owns comment
    if (answerPull.answer.creator !== user.username) {
        return res.status(403).send(config.errorForbidden);
    }

    // Patch answer with BDPA server
    const patchAnswer = await createRequest(
        'patch',
        `/questions/${question_id}/answers/${answer_id}`,
        body
    );

    if (!patchAnswer.success) {
        return res.status(500).send(config.errorGeneric);
    }

    // Cache updated question
    const answer = { ...answerPull.answer, id: answerPull.answer.answer_id };
    const newAnswer = await Answer.findByIdAndUpdate(answer.id, answer, {
        upsert: true,
    });

    return res.send({ answer: newAnswer });
}

module.exports = EditAnswer;
