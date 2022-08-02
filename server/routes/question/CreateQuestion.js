const config = require('server/config.json');
const Question = require('server/db/models/Question');
const User = require('server/db/models/User');
const createRequest = require('server/utils/api');

async function CreateQuestion(req, res) {
    const { user: {username, user_id} } = req;
    const { title, text } = req.body;

    if (!title || !text)
        return res.status(400).send(config.errorIncomplete);

    const { success, question } = await createRequest('post', `/questions`, {
        creator: username,
        title,
        text,
    });

    if (!success) return res.status(500).send(config.errorGeneric);

    await Question.create({ ...question, _id: question.question_id });

    // Increment user points by 1
    await createRequest('patch', `/users/${username}/points`, {
        operation: 'increment',
        amount: 1,
    });

    await User.findByIdAndUpdate(user_id, { $inc: { points: 1 } });

    return res.sendStatus(200);
}

module.exports = CreateQuestion;
