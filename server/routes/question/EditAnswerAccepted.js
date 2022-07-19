const Answer = require('../../db/models/Answer');
const Question = require('../../db/models/Question');
const config = require('../../config.json');
const createRequest = require('../../utils/api');

async function EditAnswerAccepted(req, res, next) {
    const user = req.user;
    const { questionID, answerID } = req.params;

    // Find question and verify that it exists
    const cachedQuestion = await Question.findById(questionID);

    if (!cachedQuestion) return res.status(404).send(config.errorNotFound);

    // Verify that user owns the question and question does not already have an accepted answer
    if (
        cachedQuestion.creator !== user.username ||
        cachedQuestion.hasAccepted
    ) {
        return res.status(403).send(config.errorForbidden);
    }

    // Patch question with BDPA server
    const patchAnswer = await createRequest(
        'patch',
        `/questions/${questionID}/answers/${answerID}`,
        { accepted: true }
    );

    if (!patchAnswer.success) {
        return res.status(500).send(config.errorGeneric);
    }

    const cachedAnswer = await Answer.findByIdAndDelete(answerID);

    // Increment points of answer creator
    await createRequest('patch', `/users/${cachedAnswer.creator}/points`, {
        operation: 'increment',
        amount: 15,
    });

    return res.sendStatus(200);
}

module.exports = EditAnswerAccepted;
