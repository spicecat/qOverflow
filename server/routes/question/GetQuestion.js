const createRequest = require('../../utils/api');

async function GetQuestion(req, res, next) {
    const { questionID } = req.params;

    const { success, question } = createRequest(
        'get',
        `/questions/${questionID}`
    );

    return success
        ? res.send(question)
        : res.status(500).send('Something went wrong.');
}

module.exports = GetQuestion;
