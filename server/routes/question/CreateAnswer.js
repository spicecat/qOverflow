const Answer = require('../../db/models/Answer');
const Question = require('../../db/models/Question');
const User = require('../../db/models/User');
const config = require('../../config.json');
const getUserLevel = require('../../utils/getUserLevel');
const createRequest = require('../../utils/api');

async function CreateAnswer(req, res, next) {
    const user = req.user;
    const { text } = req.body;
    const { questionID } = req.params;

    // Verify that the user has the level
    if (getUserLevel(user.points) < 1) {
        return res.status(403).send(config.errorForbidden);
    }

    // Retrieve question from cache and verify compatible status
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

    // Verify that request includes required information
    if (!text) {
        return res.status(400).send(config.errorIncomplete);
    }

    // Create question with BDPA server
    const { success, answer } = await createRequest(
        'post',
        `/questions/${questionID}/answers`,
        {
            creator: user.username,
            text,
        }
    );

    if (!success) return res.status(500).send(config.errorGeneric);

    await Answer.create({ ...answer, _id: answer.answer_id, questionID });

    // Increment user points by 2
    await createRequest('patch', `/users/${user.username}/points`, {
        operation: 'increment',
        amount: 2,
    });

    await User.findByIdAndUpdate(user.id, { points: { $inc: 2 } });

    return res.sendStatus(200);
}

module.exports = CreateAnswer;
