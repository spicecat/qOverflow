const Question = require('../db/models/Question');
const fetchQuestions = require('../utils/fetchQuestions');

async function getAllQuestions(job, done) {
    console.log('[INFO]: Refreshing question database.');
    const { success, requests } = await fetchQuestions();

    if (!success) console.log('[ERROR]: Question fetch failed');

    await Question.deleteMany();

    requests.map(async ({ questions }) => {
        await Question.create(
            questions.map((question) => ({
                ...question,
                id: question.question_id,
            }))
        );
    });

    done();
}

module.exports = getAllQuestions;
