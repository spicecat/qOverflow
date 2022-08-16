const config = require('../../config.json');
const Answer = require('../../db/models/Answer');
const { getAllAnswers } = require('../../utils/getData');
const { getQuestion } = require('../../utils/question');

async function GetAnswers(req, res) {
    const { question_id } = req.params;
    const question = await getQuestion(question_id);

    if (!question) return res.status(404).send(config.errorNotFound);

    // Fetch answers if expired
    if (Number(question.lastAnswerFetch) + config.answerExpires < Date.now()) {
        const answers = await getAllAnswers({ question_id });
        return res.send({ answers });
    } else {
        const answers = await Answer.find({ question_id });
        return res.send({ answers });
    }
}

module.exports = GetAnswers;
