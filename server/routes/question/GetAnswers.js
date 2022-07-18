const config = require('../../config.json');

const Question = require('../../db/models/Question');
const Answer = require('../../db/models/Answer');
const Comment = require('../../db/models/Comment');

async function GetAnswers(req, res, next) {
    const { questionID } = req.params;

    var question = await Question.findById(questionID);

    if (question.lastAnswerFetch + config.answerExpires < Date.now()) {
        const { success, requests } = await fetchAnswers(
            `/questions/${questionID}/answers`
        );

        if (!success) return res.status(500).send(config.errorGeneric);

        await requests
            .reduce(async (acc, req) => {
                const reformat = req.answers.map((answer) => ({
                    ...answer,
                    id: answer.answer_id,
                }));
                return [...reformat, ...acc];
            }, [])
            .map(async (answer) => {
                return await Answer.findByIdAndUpdate(answer.id, answer, {
                    upsert: true,
                });
            });
    }

    const answers = await Answer.find({ questionID });

    return res.send({ success: true, answers });
}

module.exports = GetAnswers;