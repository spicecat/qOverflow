const createRequest = require('../../utils/api');

async function Questions(req, res, next) {
    const user = req.user;

    const { success, questions } = await createRequest(
        'get',
        `/users/${user}/questions`,
        req.query
    );

    return success
        ? res.send(questions)
        : res.status(500).send('Something went wrong.');
}

module.exports = Questions;
