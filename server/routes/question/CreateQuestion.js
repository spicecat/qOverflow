const Question = require('../../db/models/Question');
const User = require('../../db/models/User');
const config = require('../../config.json');
const createRequest = require('../../utils/api');

async function CreateQuestion(req, res) {
    const user = req.user;
    const { title, text } = req.body;

    if (!title || !text) {
        return res.status(400).send(config.errorIncomplete);
    }

    const { success, question } = await createRequest('post', `/questions`, {
        creator: user.username,
        title,
        text,
    });

    if (!success) return res.status(500).send(config.errorGeneric);

    await Question.create({ ...question, _id: question.question_id });

    // Increment user points by 1
    await createRequest('patch', `/users/${user.username}/points`, {
        operation: 'increment',
        amount: 1,
    });

    await User.findByIdAndUpdate(user.id, { points: { $inc: 1 } });

    return res.sendStatus(200);
}

module.exports = CreateQuestion;
