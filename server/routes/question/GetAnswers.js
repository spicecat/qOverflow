const config = require('server/config.json');
const Answer = require('server/db/models/Answer');
const Question = require('server/db/models/Question');
const { getQuestion, refreshQuestion } = require('server/services/questionServices');
const fetchAnswers = require('server/utils/fetchAnswers');

async function GetAnswers(req, res) {
    const { question_id } = req.params;

    const question = await getQuestion(question_id);
    if (!question) return res.status(404).send(config.errorNotFound);

    // Fetch answers if expired
    if (Number(question.lastAnswerFetch) + config.answerExpires < Date.now()) {
        const { success, requests } = await fetchAnswers(
            `/questions/${question_id}/answers`
        );

        if (!success) return res.status(500).send(config.errorGeneric);

        // Reformat questions and patch to cache
        await requests
            .map(({ answer_id, ...answer }) => {
                return {
                    ...answer,
                    id: answer_id,
                    question_id
                }
            })
            .map(async (answer) => {
                if (answer.accepted) {
                    await Question.findByIdAndUpdate(question_id, {
                        hasAccepted: true,
                    });
                }

                return Answer.findByIdAndUpdate(answer.id, answer, {
                    upsert: true,
                });
            });
    }

    const answers = await Answer.find({ question_id });

    return res.send({ answers });
}

module.exports = GetAnswers;
