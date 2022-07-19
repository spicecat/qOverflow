const Question = require('../../db/models/Answer');
const config = require('../../config.json');
const createRequest = require('../../utils/api');

async function EditAnswer(req, res, next) {
    const user = req.user;
    const { text } = req.body;
    const { questionID } = req.params;

    if (!text) return res.status(400).send(config.errorIncomplete);

    const questionPull = await createRequest('get', `/questions/${questionID}`);

    if (!questionPull.success) return res.status(500).send(config.errorGeneric);
    if (questionPull.question.creator !== user.username) {
        return res.status(403).send(config.errorForbidden);
    }

    const patchQuestion = await createRequest(
        'patch',
        `/questions/${questionID}`,
        { text }
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
