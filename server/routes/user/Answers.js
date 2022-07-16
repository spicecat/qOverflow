const createRequest = require('../../utils/api');

async function Answers(req, res, next) {
    const user = req.user;

    const { success, answers } = await createRequest(
        'get',
        `/users/${user}/answers`,
        req.query
    );

    return success
        ? res.send(answers)
        : res.status(500).send('Something went wrong.');
}

module.exports = Answers;
