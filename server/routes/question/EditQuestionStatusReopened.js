const Question = require('../../db/models/Answer');
const getUserLevel = require('../../utils/getUserLevel');
const config = require('../../config.json');
const createRequest = require('../../utils/api');

async function EditQuestionStatusReopened(req, res) {
    const user = req.user;
    const { questionID } = req.params;

    // Verify that user has permissions
    if (getUserLevel(user.points) < 7) {
        return res.status(403).send(config.errorForbidden);
    }

    // Verify question's existence
    const cachedQuestion = await Question.findById(questionID);
    if (!cachedQuestion) return res.status(404).send(config.errorNotFound);

    // Make sure that question has compatible status
    if (
        cachedQuestion.status === 'protected' ||
        cachedQuestion.status === 'open'
    ) {
        return res.status(400).send({
            success: false,
            error: 'This question is already open.',
        });
    }

    // Toggle vote
    if (cachedQuestion.reopen.includes(user.username)) {
        await Question.findByIdAndUpdate(questionID, {
            reopen: { $pull: user.username },
        });

        return res.sendStatus(200);
    } else {
        await Question.findByIdAndUpdate(questionID, {
            reopen: { $push: user.username },
        });
    }

    // Patch question status if required
    if (cachedQuestion.reopen.length === 2) {
        const cachedQuestion = await Question.findByIdAndUpdate(questionID, {
            reopen: [],
            status: 'open',
        });

        const { success } = await createRequest(
            'patch',
            `/questions/${questionID}`,
            { status: 'open' }
        );
        await Question.findByIdAndUpdate(questionID, { status: 'open' });

        return success
            ? res.send({ status: cachedQuestion.status })
            : res.status(500).send(config.errorGeneric);
    }

    return res.sendStatus(200);
}

module.exports = EditQuestionStatusReopened;
