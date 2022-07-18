const Question = require('../../db/models/Answer');
const getUserLevel = require('../../utils/getUserLevel');
const config = require('../../config.json');
const createRequest = require('../../utils/api');

async function EditQuestionStatusReopen(req, res, next) {
    const user = req.user;
    const { questionID } = req.params;

    if (getUserLevel(user.points) < 7) {
        return res.status(403).send(config.errorForbidden);
    }

    const cachedQuestion = await Question.findById(questionID);
    if (!cachedQuestion) return res.status(404).send(config.errorNotFound);

    if (
        cachedQuestion.status === 'protected' ||
        cachedQuestion.status === 'open'
    ) {
        return res.status(400).send({
            success: false,
            error: 'This question is already open.',
        });
    }

    if (cachedQuestion.reopen.includes(user.username)) {
        await Question.findByIdAndUpdate(questionID, {
            reopen: { $pull: user.username },
        });

        return res.send({ success: true });
    } else {
        await Question.findByIdAndUpdate(questionID, {
            reopen: { $push: user.username },
        });
    }

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

        return success
            ? res.send({ success: true, status: cachedQuestion.status })
            : res.status(500).send(config.errorGeneric);
    }

    return res.send({ success: true });
}

module.exports = EditQuestionStatusReopen;
