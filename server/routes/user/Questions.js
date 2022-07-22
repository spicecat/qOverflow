const Question = require('../../db/models/Question');

async function Questions(req, res) {
    const user = req.user;

    const cachedQuestions = await Question.find({
        creator: user.username,
    }).sort({ createdAt: 'desc' });

    return res.send({ questions: cachedQuestions });
}

module.exports = Questions;
