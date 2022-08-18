const config = require('server/config.json');
const Question = require('server/db/models/Question');
const { getQuestion, refreshQuestion } = require('server/utils/question');
const createRequest = require('server/utils/api');
const getUserLevel = require('server/utils/getUserLevel');

async function EditQuestionStatusClosed(req, res) {
    const { user } = req;
    const { question_id } = req.params;
    const { text } = req.body;

    // Verify user has required level
    if (getUserLevel(user.points) < 7) {
        return res.status(403).send(config.errorForbidden);
    }

    // Get cached question and make sure it exists
    const question = await getQuestion(question_id);
    if (!question) return res.status(404).send(config.errorNotFound);

    // Toggle question vote
    if (question.edit.length === 0) {
        if (!text) {
            return res.status(400).send(config.errorIncomplete);
        }

        await Question.findByIdAndUpdate(question_id, {
            editText: text,
            $push: { edit: user.username },
        });

        return res.sendStatus(200);
    }

    if (question.edit.includes(user.username)) {
        await Question.findByIdAndUpdate(question_id, {
            $pull: { edit: user.username },
        });

        return res.sendStatus(200);
    } else {
        await Question.findByIdAndUpdate(question_id, {
            $push: { close: user.username },
        });
    }

    // Patch question status if required
    if (question.edit.length === 2) {
        const question = await Question.findByIdAndUpdate(question_id, {
            edit: [],
            text,
        });

        const { success } = await createRequest('patch', `/questions/${question_id}`, {
            text,
        });

        return success
            ? res.send({ text: question.text })
            : res.status(500).send(config.errorGeneric);
    }

    return res.sendStatus(200);
}

module.exports = EditQuestionStatusClosed;