const createRequest = require('../../utils/api');

const Question = require('../../db/models/Question');

async function Seach(req, res, next) {
    const { success, questions } = await createRequest(
        'get',
        `/questions/search`,
        req.params
    );

    const questionSet = questions.map((question) => ({
        id: question.question_id,
        ...question,
    }));

    await Question.create(questionSet);

    return success
        ? res.send(questionSet)
        : res.status(500).send('Something went wrong.');
}

module.exports = Seach;
