const Question = require('../../db/models/Question');

async function Questions(req, res) {
    const {
        user: { username },
    } = req;

    const cachedQuestions = await Question.find({
        creator: username,
    }).sort({ createdAt: 'desc' });

    return res.send({ questions: cachedQuestions });
}

module.exports = Questions;
