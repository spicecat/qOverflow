const Question = require('../../db/models/Question');
const config = require('../../config.json');

async function CreateQuestion(req, res, next) {
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

    await Question.create({ ...question, id: question_id });

    return success ? res.send() : res.status(500).send(config.errorGeneric);
}

module.exports = CreateQuestion;
