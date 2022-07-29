const config = require('server/config.json');
const { getQuestion } = require('server/utils/question');

async function GetQuestion(req, res) {
    const { question_id } = req.params;

    const question = await getQuestion(question_id);
    if (question) return res.send({ question });
    else return res.status(400).send(config.errorNotFound);
}

module.exports = GetQuestion;
