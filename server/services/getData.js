const Question = require('server/db/models/Question');
const User = require('server/db/models/User');
const fetchData = require('server/utils/fetchData');

async function getAllData(_job, done, Model, url, id, dataName) {
    console.log('[INFO]: Refreshing question database.');
    const data = await fetchData(url, id, dataName);

    if (!success) console.log(`[ERROR]: ${dataName} fetch failed`);

    for (const item of data)
        await Model.findByIdAndUpdate(item[id], {
            ...item,
            id: item[id],
        }, { upsert: true })

    done();
}

async function getAllQuestions(_job, done) {
    return getAllData(_job, done, Question, '/questions/search', 'question_id', 'questions')
}
async function getAllUsers(_job, done) {
    return getAllData(_job, done, User, '/users', 'user_id', 'users')
}

module.exports = {
    getAllQuestions,
    getAllUsers
};
