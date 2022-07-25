const Question = require('../../db/models/Answer');
const getUserLevel = require('../../utils/getUserLevel');
const config = require('../../config.json');
const createRequest = require('../../utils/api');

async function EditQuestionStatusProtected(req, res) {
    const { user } = req;
    const { questionID } = req.params;

    // Verify that user has required level
    if (getUserLevel(user.points) < 6) {
        return res.status(403).send(config.errorForbidden);
    }

    // Verify that question exists
    const cachedQuestion = await Question.findById(questionID);
    if (!cachedQuestion) return res.status(404).send(config.errorNotFound);

    // Verify that question does not have incompatible status
    if (
        cachedQuestion.status === 'closed' ||
        cachedQuestion.status === 'protected'
    ) {
        return res.status(400).send({
            success: false,
            error: 'This question is already closed or protected.',
        });
    }

    // Toggle vote
    if (cachedQuestion.protect.includes(user.username)) {
        await Question.findByIdAndUpdate(questionID, {
            protect: { $pull: user.username },
        });

        return res.sendStatus(200);
    } else {
        await Question.findByIdAndUpdate(questionID, {
            protect: { $push: user.username },
        });
    }

    // Patch question status if required
    if (cachedQuestion.protect.length === 2) {
        const cachedQuestion = await Question.findByIdAndUpdate(questionID, {
            protect: [],
            status: 'protected',
        });

        const { success } = await createRequest(
            'patch',
            `/questions/${questionID}`,
            { status: 'protected' }
        );
        await Question.findByIdAndUpdate(questionID, { status: 'protected' });

        return success
            ? res.send({ status: cachedQuestion.status })
            : res.status(500).send(config.errorGeneric);
    }

    return res.sendStatus(200);
}

module.exports = EditQuestionStatusProtected;
