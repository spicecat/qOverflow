async function GetVote(req, res, next) {
    const user = req.user;
    const { token, questionID, answerID, commentID, ...body } = req.query;

    if (!questionID) {
        return res.status(400).send('Your request is missing something.');
    }

    var requestURL = '';
    if (answerID && commentID) {
        requestURL = `/questions/${questionID}/answers/${answerID}/comments/${commentID}/vote/${user}`;
    } else if (answerID) {
        requestURL = `/questions/${questionID}/answers/${answerID}/vote/${user}`;
    } else if (commentID) {
        requestURL = `/questions/${questionID}/comments/${commentID}/vote/${user}`;
    } else {
        requestURL = `/questions/${questionID}/vote/${user}`;
    }

    const { success } = await createRequest('get', requestURL, body);

    return success ? res.send() : res.status(500).send('Something went wrong.');
}

module.exports = GetVote;
