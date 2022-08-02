const config = require('server/config.json');
const Answer = require('server/db/models/Answer');
const User = require('server/db/models/User');
const { getQuestion, refreshQuestion } = require('server/utils/question');
const getUserLevel = require('server/utils/getUserLevel');
const createRequest = require('server/utils/api');

async function CreateAnswer(req, res) {
    const { user } = req;
    const { text } = req.body;
    const { question_id } = req.params;

    // Verify user has level
    if (getUserLevel(user.points) < 1) {
        return res.status(403).send(config.errorForbidden);
    }

    // Retrieve question from cache and verify compatible status
    const question = await getQuestion(question_id);
    if (!question) return res.status(404).send(config.errorNotFound);

    if (question.status === 'closed')
        return res.status(403).send(config.errorForbidden);

    if (
        question.status === 'protected' &&
        getUserLevel(user.points) < 5
    ) {
        return res.status(403).send(config.errorForbidden);
    }

    // Verify request includes required information
    if (!text)
        return res.status(400).send(config.errorIncomplete);

    // Create question with BDPA server
    const { success, answer } = await createRequest(
        'post',
        `/questions/${question_id}/answers`,
        {
            creator: user.username,
            text,
        }
    );

    if (!success) return res.status(500).send(config.errorGeneric);

    await Answer.create({ ...answer, _id: answer.answer_id, question_id });

    // Increment user points by 2
    await createRequest('patch', `/users/${user.username}/points`, {
        operation: 'increment',
        amount: 2,
    });

    await User.findByIdAndUpdate(user.id, { $inc: { $points: 2 } });

    return res.sendStatus(200);
}

module.exports = CreateAnswer;
