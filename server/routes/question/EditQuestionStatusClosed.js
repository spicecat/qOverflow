const Question = require('../../db/models/Answer');
const getUserLevel = require('../../utils/getUserLevel');
const config = require('../../config.json');
const createRequest = require('../../utils/api');

async function EditQuestionStatusClosed(req, res) {
    const user = req.user;
    const { questionID } = req.params;

    // Verify that user has required level
    if (getUserLevel(user.points) < 7) {
        return res.status(403).send(config.errorForbidden);
    }

    // Get cached question and make sure it exists
    const cachedQuestion = await Question.findById(questionID);
    if (!cachedQuestion) return res.status(404).send(config.errorNotFound);

    // Verify that is does not have an incompatible status
    if (cachedQuestion.status === 'closed') {
        return res.status(400).send({
            success: false,
            error: 'This question is already closed.',
        });
    }

    // Toggle question vote
    if (cachedQuestion.close.includes(user.username)) {
        await Question.findByIdAndUpdate(questionID, {
            close: { $pull: user.username },
        });

        return res.sendStatus(200);
    } else {
        await Question.findByIdAndUpdate(questionID, {
            close: { $push: user.username },
        });
    }

    // Patch question status if required
    if (cachedQuestion.close.length === 2) {
        const cachedQuestion = await Question.findByIdAndUpdate(questionID, {
            close: [],
            status: 'closed',
        });

        const { success } = await createRequest(
            'patch',
            `/questions/${questionID}`,
            { status: 'closed' }
        );
        await Question.findByIdAndUpdate(questionID, { status: 'closed' });

        return success
            ? res.send({ status: cachedQuestion.status })
            : res.status(500).send(config.errorGeneric);
    }

    return res.sendStatus(200);
}

module.exports = EditQuestionStatusClosed;
