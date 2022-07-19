const Answer = require('../../db/models/Answer');
const Question = require('../../db/models/Question');
const config = require('../../config.json');
const getUserLevel = require('../../utils/getUserLevel');

async function CreateAnswer(req, res, next) {
    const user = req.user;
    const { text } = req.body;
    const { questionID } = req.params;

    if (getUserLevel(user.points) < 1) {
        return res.status(403).send(config.errorForbidden);
    }

    const cachedQuestion = await Question.findById(questionID);

    if (cachedQuestion.status === 'closed') {
        return res.status(403).send(config.errorForbidden);
    }

    if (
        cachedQuestion.status === 'protected' &&
        getUserLevel(user.points) < 5
    ) {
        return res.status(403).send(config.errorForbidden);
    }

    if (!text) {
        return res.status(400).send(config.errorIncomplete);
    }

    const { success, answer } = await createRequest(
        'post',
        `/questions/${questionID}/answers`,
        {
            creator: user.username,
            text,
        }
    );

    if (!success) return res.status(500).send(config.errorGeneric);

    await Answer.create({ ...answer, id: answer.answer_id, questionID });

    await createRequest('patch', `/users/${user.username}/points`, {
        operation: 'increment',
        amount: 2,
    });

    return res.sendStatus(200);
}

module.exports = CreateAnswer;
