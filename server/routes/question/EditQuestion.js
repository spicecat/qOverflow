const Question = require('../../db/models/Answer');
const config = require('../../config.json');

async function EditAnswer(req, res, next) {
    const user = req.user;
    const { token, ...body } = req.body;
    const { questionID } = req.params;

    const questionPull = await createRequest('get', `/questions/${questionID}`);

    if (!questionPull.success) return res.status(500).send(config.errorGeneric);
    if (questionPull.question.creator !== user.username) {
        return res.status(403).send(config.errorForbidden);
    }

    const patchQuestion = await createRequest(
        'patch',
        `/questions/${questionID}/answers/${answerID}`,
        body
    );

    if (!patchQuestion.success) {
        return res.status(500).send(config.errorGeneric);
    }

    const question = {
        ...questionPull.question,
        id: questionPull.question.question_id,
    };
    await Question.findByIdAndUpdate(question.id, question, { upsert: true });

    return res.sendStatus(200);
}

module.exports = EditAnswer;
