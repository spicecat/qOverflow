const config = require('../../config.json');
const Question = require('../../db/models/Question');
const { getQuestion } = require('../../utils/question');
const getUserLevel = require('../../utils/getUserLevel');
const createRequest = require('../../utils/api');

async function EditQuestionStatusReopened(req, res) {
    const { user } = req;
    const { question_id } = req.params;

    // Verify user has permissions
    if (getUserLevel(user.points) < 9) {
        return res.status(403).send(config.errorForbidden);
    }

    // Get question
    const question = await getQuestion(question_id);
    if (!question) return res.status(404).send(config.errorNotFound);

    // Make sure that question has compatible status
    if (question.status === 'protected' || question.status === 'open') {
        return res.status(400).send({
            success: false,
            error: 'This question is already open.',
        });
    }

    // Toggle vote
    if (question.reopen.includes(user.username)) {
        await Question.findByIdAndUpdate(question_id, {
            $pull: { reopen: user.username },
        });

        return res.sendStatus(200);
    } else {
        await Question.findByIdAndUpdate(question_id, {
            $push: { reopen: user.username },
        });
    }

    // Patch question status if required
    if (question.reopen.length === 2) {
        const question = await Question.findByIdAndUpdate(question_id, {
            reopen: [],
            status: 'open',
        });

        await User.findOneAndUpdate({ username: creator }, { $push: { badges: 'Zombie' } });

        const { success } = await createRequest('patch', `/questions/${question_id}`, {
            status: 'open',
        });
        await Question.findByIdAndUpdate(question_id, { status: 'open' });

        return success
            ? res.send({ status: question.status })
            : res.status(500).send(config.errorGeneric);
    }

    return res.sendStatus(200);
}

module.exports = EditQuestionStatusReopened;
