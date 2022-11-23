const config = require('../../config.json');
const Question = require('../../db/models/Question');
const { getQuestion, refreshQuestion } = require('../../utils/question');
const createRequest = require('../../utils/api');
const getUserLevel = require('../../utils/getUserLevel');

async function EditQuestionStatusClosed(req, res) {
    const { user } = req;
    const { question_id } = req.params;

    // Verify user has required level
    if (getUserLevel(user.points) < 9) {
        return res.status(403).send(config.errorForbidden);
    }

    // Get cached question and make sure it exists
    const question = await getQuestion(question_id);
    if (!question) return res.status(404).send(config.errorNotFound);

    // Verify is does not have an incompatible status
    if (question.status === 'closed') {
        return res.status(400).send({
            success: false,
            error: 'This question is already closed.',
        });
    }

    // Toggle question vote
    if (question.close.includes(user.username)) {
        await Question.findByIdAndUpdate(question_id, {
            $pull: { close: user.username },
        });

        return res.sendStatus(200);
    } else {
        await Question.findByIdAndUpdate(question_id, {
            $push: { close: user.username },
        });
    }

    // Patch question status if required
    if (question.close.length === 2) {
        const question = await Question.findByIdAndUpdate(question_id, {
            close: [],
            status: 'closed',
        });

        const { success } = await createRequest('patch', `/questions/${question_id}`, {
            status: 'closed',
        });
        await Question.findByIdAndUpdate(question_id, { status: 'closed' });

        return success
            ? res.send({ status: question.status })
            : res.status(500).send(config.errorGeneric);
    }

    return res.sendStatus(200);
}

module.exports = EditQuestionStatusClosed;
