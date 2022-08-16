const Answer = require('../db/models/Answer');
const Comment = require('../db/models/Comment');
const Mail = require('../db/models/Mail');
const Question = require('../db/models/Question');
const User = require('../db/models/User');
const fetchData = require('../utils/fetchData');

async function getAllData(Model, url, id, dataName) {
    console.log(`[INFO]: Refreshing ${dataName} database.`);
    let data = await fetchData(url, id, dataName);
    data = data.map((item) => ({
        ...item,
        id: item[id],
    }));

    for (const item of data) await Model.findByIdAndUpdate(item[id], item, { upsert: true });
    return data;
}

async function getAllAnswers({ question_id, username }) {
    if (question_id)
        return getAllData(Answer, `/questions/${question_id}/answers`, 'answer_id', 'answers');
    else if (username)
        return getAllData(Answer, `/users/${username}/answers`, 'answer_id', 'answers');
}

async function getAllComments({ answer_id, question_id }) {
    if (answer_id)
        return getAllData(
            Comment,
            `/questions/${question_id}/answers/${answer_id}/comments`,
            'comment_id',
            'comments'
        );
    else return getAllData(Comment, `/questions/${question_id}/comments`, 'comment_id', 'comments');
}

async function getAllMail({ username }) {
    return getAllData(Mail, `/mail/${username}`, 'mail_id', 'messages');
}

async function getAllQuestions(username) {
    if (username)
        return getAllData(Question, `/users/${username}/questions`, 'question_id', 'questions');
    else {
        return getAllData(Question, `/questions/search`, 'question_id', 'questions');
    }
}

async function getAllUsers() {
    return getAllData(User, `/users`, 'user_id', 'users');
}

module.exports = {
    getAllAnswers,
    getAllComments,
    getAllMail,
    getAllQuestions,
    getAllUsers,
    getAllMail,
};
