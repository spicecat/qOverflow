async function CreateAnswerComment(req, res, next) {
    const user = req.user;
    const { questionID, answerID } = req.params;
    const { text } = req.body;

    if (!text) {
        return res.status(400).send('Your request is missing information.');
    }

    const { success } = await createRequest(
        'post',
        `/questions/${questionID}/answers/${answerID}/comments`,
        {
            creator: user,
            text,
        }
    );

    return success ? res.send() : res.status(500).send('Something went wrong.');
}

module.exports = CreateAnswerComment;
