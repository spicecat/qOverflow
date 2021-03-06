const createRequest = require('../../utils/api');
const config = require('../../config.json');

const Question = require('../../db/models/Question');

async function GetQuestion(req, res) {
    const { questionID } = req.params;

    let cachedQuestion;
    try { cachedQuestion = await Question.findById(questionID); }
    catch { return res.status(400).send(config.errorNotFound); }

    // Retrieve uncached question and patch to cache
    if (!cachedQuestion) {
        const { success, question } = createRequest(
            'get',
            `/questions/${questionID}`
        );

        if (!success) return res.status(500).send(config.errorGeneric);

        await Question.create({ ...question, id: question.question_id });

        cachedQuestion = await Question.findById(questionID);
    }

    return res.send({ question: cachedQuestion });
}

module.exports = GetQuestion;
