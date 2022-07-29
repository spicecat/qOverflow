const config = require('server/config.json');
const Answer = require('server/db/models/Answer');
const { getQuestion, refreshQuestion } = require('server/utils/question');
const createRequest = require('server/utils/api');

async function EditAnswerAccepted(req, res) {
    const { user } = req;
    const { question_id, answer_id } = req.params;

    // Find question and verify that it exists
    const question = await getQuestion(question_id);
    if (!question) return res.status(404).send(config.errorNotFound);

    // Verify user owns question and question does not already have an accepted answer
    if (
        question.creator !== user.username ||
        question.hasAccepted
    )
        return res.status(403).send(config.errorForbidden);

    // Patch question with BDPA server
    const patchAnswer = await createRequest(
        'patch',
        `/questions/${question_id}/answers/${answer_id}`,
        { accepted: true }
    );

    if (!patchAnswer.success) {
        return res.status(500).send(config.errorGeneric);
    }

    const cachedAnswer = await Answer.findByIdAndDelete(answer_id);

    // Increment points of answer creator
    await createRequest('patch', `/users/${cachedAnswer.creator}/points`, {
        operation: 'increment',
        amount: 15,
    });

    return res.sendStatus(200);
}

module.exports = EditAnswerAccepted;
