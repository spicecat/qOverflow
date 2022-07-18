const Question = require('../../db/models/Question');
const fetchQuestions = require('../../utils/fetchQuestions');

async function Questions(req, res, next) {
    const user = req.user;

    const cachedQuestions = await Question.find({
        creator: user.username,
    }).sort({ createdAt: 'desc' });

    return res.send(cachedQuestions);
}

module.exports = Questions;
