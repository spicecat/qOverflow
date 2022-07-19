const createRequest = require('../../utils/api');
const config = require('../../config.json');

const Question = require('../../db/models/Question');

async function Search(req, res, next) {
    const { success, questions } = await createRequest(
        'get',
        `/questions/search`,
        req.query
    );

    if (!success) return res.status(500).send(config.errorGeneric);

    const questionSet = await questions
        .map((question) => ({
            id: question.question_id,
            ...question,
        }))
        .map(async (question) => {
            return await Question.findByIdAndUpdate(question.id, question, {
                upsert: true,
            });
        });

    return res.send({ questions: questionSet });
}

module.exports = Search;
