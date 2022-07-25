const Answer = require('../../db/models/Answer');
const config = require('../../config.json');
const createRequest = require('../../utils/api');

async function EditAnswer(req, res) {
    const { user } = req;
    const { text } = req.body;
    const { questionID, answerID } = req.params;

    if (!text) return res.status(400).send(config.errorIncomplete);

    // Retrieve the latest question data
    const answerPull = await createRequest(
        'get',
        `/questions/${questionID}/answers/${answerID}`
    );

    if (!answerPull.success) return res.status(500).send(config.errorGeneric);

    // Verify that the user owns the comment
    if (answerPull.answer.creator !== user.username) {
        return res.status(403).send(config.errorForbidden);
    }

    // Patch answer with BDPA server
    const patchAnswer = await createRequest(
        'patch',
        `/questions/${questionID}/answers/${answerID}`,
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
