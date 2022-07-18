const Answer = require('../../db/models/Answer');
const config = require('../../config.json');
const getUserLevel = require('../../utils/getUserLevel');

async function CreateAnswer(req, res, next) {
    const user = req.user;
    const { title, text } = req.body;
    const { questionID } = req.params;

    if (getUserLevel(user.points) < 1) {
        return res.status(403).send(config.errorForbidden);
    }

    if (!title || !text) {
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
