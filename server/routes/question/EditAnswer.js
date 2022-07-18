const Answer = require('../../db/models/Answer');
const config = require('../../config.json');

async function EditAnswer(req, res, next) {
    const user = req.user;
    const body = req.body;
    const { questionID, answerID } = req.params;

    const answerPull = await createRequest(
        'get',
        `/questions/${questionID}/answers/${answerID}`
    );

    if (!answerPull.success) return res.status(500).send(config.errorGeneric);
    if (answerPull.answer.creator !== user.username) {
        return res.status(403).send(config.errorForbidden);
    }

    const patchAnswer = await createRequest(
        'patch',
        `/questions/${questionID}/answers/${answerID}`,
        body
    );

    if (!patchAnswer.success) {
        return res.status(500).send(config.errorGeneric);
    }

    const answer = { ...answerPull.answer, id: answerPull.answer.answer_id };
    const newAnswer = await Answer.findByIdAndUpdate(answer.id, answer, {
        upsert: true,
    });

    return res.send({ answer: newAnswer });
}

module.exports = EditAnswer;
