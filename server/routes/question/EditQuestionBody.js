const config = require('../../config.json');
const Question = require('../../db/models/Question');
const { getQuestion, refreshQuestion } = require('../../utils/question');
const createRequest = require('../../utils/api');
const getUserLevel = require('../../utils/getUserLevel');

async function EditQuestionStatusClosed(req, res) {
    const { user } = req;
    const { question_id } = req.params;
    const { etext, etitle } = req.body;
    let eObj = [etext, etitle];
    // Verify user has required level
    if (getUserLevel(user.points) < 7) {
        return res.status(403).send(config.errorForbidden);
    }

    // Get cached question and make sure it exists
    const question = await getQuestion(question_id);
    if (!question) return res.status(404).send(config.errorNotFound);

    // Toggle question vote
    if (question.edit.length === 0) {
        if (!etext || !etitle) {
            return res.status(400).send(config.errorIncomplete);
        }

        await Question.findByIdAndUpdate(question_id, {
            editText: eObj,
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
            eObj,
        });

        const { success } = await createRequest('patch', `/questions/${question_id}`, {
            etext,
            eObj,
        });

        return success
            ? res.send({ text: question.text })
            : res.status(500).send(config.errorGeneric);
    }

    return res.sendStatus(200);
}

module.exports = EditQuestionStatusClosed;
