const Question = require('../../db/models/Answer');
const getUserLevel = require('../../utils/getUserLevel');
const config = require('../../config.json');
const createRequest = require('../../utils/api');

async function EditQuestionStatusClosed(req, res, next) {
    const user = req.user;
    const { questionID } = req.params;

    if (getUserLevel(user.points) < 7) {
        return res.status(403).send(config.errorForbidden);
    }

    const cachedQuestion = await Question.findById(questionID);
    if (!cachedQuestion) return res.status(404).send(config.errorNotFound);

    if (cachedQuestion.status === 'closed') {
        return res.status(400).send({
            success: false,
            error: 'This question is already closed.',
        });
    }

    if (cachedQuestion.close.includes(user.username)) {
        await Question.findByIdAndUpdate(questionID, {
            close: { $pull: user.username },
        });

        return res.send({ success: true });
    } else {
        await Question.findByIdAndUpdate(questionID, {
            close: { $push: user.username },
        });
    }

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

        return success
            ? res.send({ success: true, status: cachedQuestion.status })
            : res.status(500).send(config.errorGeneric);
    }

    return res.send({ success: true });
}

module.exports = EditQuestionStatusClosed;
