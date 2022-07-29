const config = require('server/config.json');
const Answer = require('server/db/models/Answer');
const { getAllAnswers } = require('server/utils/getData');

async function Answers(req, res) {
    const { user: { lastAnswerFetch, username } } = req;

    if (Number(lastAnswerFetch) + config.answerExpires < Date.now()) {
        const answers = await getAllAnswers({ username });
        return res.send({ answers });
    } else {
        const answers = await Answer.find({ creator: username });
        return res.send({ answers });
    }
}

module.exports = Answers;
