const config = require('../../config.json');
const Question = require('../../db/models/Question');
const Answer = require('../../db/models/Answer');
const Comment = require('../../db/models/Comment');
const fetchAnswers = require('../../utils/fetchAnswers');

async function GetAnswers(req, res) {
    const { questionID } = req.params;

    const question = await Question.findById(questionID);

    // Fetch answers if expired
    if (Number(question.lastAnswerFetch) + config.answerExpires < Date.now()) {
        const { success, requests } = await fetchAnswers(
            `/questions/${questionID}/answers`
        );

        if (!success) return res.status(500).send(config.errorGeneric);

        // Reformat questions and patch to cache
        await requests
            .map(({ answer_id, ...answer }) => {
                return {
                    ...answer,
                    id: answer_id,
                    questionID
                }
            })
            .map(async (answer) => {
                if (answer.accepted) {
                    await Question.findByIdAndUpdate(questionID, {
                        hasAccepted: true,
                    });
                }

                return Answer.findByIdAndUpdate(answer.id, answer, {
                    upsert: true,
                });
            });
    }

    const answers = await Answer.find({ questionID });

    return res.send({ answers });
}

module.exports = GetAnswers;
