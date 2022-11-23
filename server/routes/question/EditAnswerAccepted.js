const config = require('../../config.json');
const Answer = require('../../db/models/Answer');
const Question = require('../../db/models/Question');
const User = require('../../db/models/User');
const { getQuestion, refreshQuestion } = require('../../utils/question');
const createRequest = require('../../utils/api');

async function EditAnswerAccepted(req, res) {
    const { user } = req;
    const { question_id, answer_id } = req.params;

    // Find question and verify that it exists
    const question = await getQuestion(question_id);

    if (!question) return res.status(404).send(config.errorNotFound);
    const { hasBounty } = question;
    // Verify user owns question and question does not already have an accepted answer
    if (question.creator !== user.username || question.hasAccepted) {
        return res.status(403).send(config.errorForbidden);
    }

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

    // Update hasAcceptedAnswer
    await createRequest('patch', `/questions/${question_id}`, {
        hasAcceptedAnswer: true,
    });
    await Question.findByIdAndUpdate(question_id, { hasAcceptedAnswer: true });

    // Increment points of answer creator
    if (hasBounty) {
        await User.findOneAndUpdate(
            { username: cachedAnswer.creator },
            { $inc: { points: 15 + hasBounty } }
        );
        await createRequest('patch', `/users/${cachedAnswer.creator}/points`, {
            operation: 'increment',
            amount: 15 + hasBounty,
        });
    } else {
        await User.findOneAndUpdate({ username: cachedAnswer.creator }, { $inc: { points: 15 } });
        await createRequest('patch', `/users/${cachedAnswer.creator}/points`, {
            operation: 'increment',
            amount: 15,
        });
    }
    return res.sendStatus(200);
}

module.exports = EditAnswerAccepted;
