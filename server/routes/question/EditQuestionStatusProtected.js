const config = require('../../config.json');
const Question = require('../../db/models/Question');
const { getQuestion, refreshQuestion } = require('../../utils/question');
const getUserLevel = require('../../utils/getUserLevel');
const createRequest = require('../../utils/api');

async function EditQuestionStatusProtected(req, res) {
    const { user } = req;
    const { question_id } = req.params;

    // Verify user has required level
    if (getUserLevel(user.points) < 8) {
        return res.status(403).send(config.errorForbidden);
    }

    // Verify question exists
    const question = await getQuestion(question_id);
    if (!question) return res.status(404).send(config.errorNotFound);

    // Verify question does not have incompatible status
    if (question.status === 'closed' || question.status === 'protected') {
        return res.status(400).send({
            success: false,
            error: 'This question is already closed or protected.',
        });
    }

    // Toggle vote
    if (question.protect.includes(user.username)) {
        await Question.findByIdAndUpdate(question_id, {
            $pull: { protect: user.username },
        });

        return res.sendStatus(200);
    } else {
        await Question.findByIdAndUpdate(question_id, {
            $push: { protect: user.username },
        });
    }

    // Patch question status if required
    if (question.protect.length === 2) {
        const question = await Question.findByIdAndUpdate(question_id, {
            protect: [],
            status: 'protected',
        });

        await User.findOneAndUpdate({ username: creator }, { $push: { badges: 'Protected' } });

        const { success } = await createRequest('patch', `/questions/${question_id}`, {
            status: 'protected',
        });
        await Question.findByIdAndUpdate(question_id, { status: 'protected' });

        return success
            ? res.send({ status: question.status })
            : res.status(500).send(config.errorGeneric);
    }

    return res.sendStatus(200);
}

module.exports = EditQuestionStatusProtected;
