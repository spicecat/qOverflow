const { getAllQuestions, getAllUsers } = require('./getData');

async function refreshQuestions(_job, done) {
    await getAllQuestions();
    done();
}
async function refreshUsers(_job, done) {
    await getAllUsers();
    done();
}

module.exports = {
    refreshQuestions,
    refreshUsers,
};
