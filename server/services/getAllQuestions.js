const Question = require('../db/models/Question');
const fetchQuestions = require('../utils/fetchQuestions');

async function getAllQuestions(job, done) {
    console.log('[INFO]: Refreshing question database.');
    const { success, requests } = await fetchQuestions(`/questions/search`);

    if (!success) console.log('[ERROR]: Question fetch failed');

    const completeQuestions = await requests.reduce(async (acc, req) => {
        const reformat = req.questions.map((question) => ({
            ...question,
            id: question.question_id,
        }));
        return [...reformat, ...acc];
    }, []);

    completeQuestions.map(
        async (question) =>
            Question.findByIdAndUpdate(question.id, question, {
                upsert: true,
            })
    );

    done();
}

module.exports = getAllQuestions;
