const config = require('server/config.json');
const Question = require('server/db/models/Question');
const User = require('server/db/models/User');
const createRequest = require('server/utils/api');

async function CreateQuestion(req, res) {
    const user = req.user;
    const { title, text } = req.body;

    if (!title || !text) return res.status(400).send(config.errorIncomplete);

    const { success, question } = await createRequest('post', `/questions`, {
        creator: user.username,
        title,
        text,
    });

    if (!success) return res.status(500).send(config.errorGeneric);

    const newQuestion = await Question.create({ ...question, _id: question.question_id });

    // Increment user points by 1
    await createRequest('patch', `/users/${user.username}/points`, {
        operation: 'increment',
        amount: 1,
    });

    await User.findByIdAndUpdate(user.id, { $inc: { points: 1 } });

    return res.send({ question: newQuestion });
}

module.exports = CreateQuestion;
