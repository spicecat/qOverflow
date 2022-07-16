async function EditAnswer(req, res, next) {
    const user = req.user;
    const { token, ...body } = req.body;
    const { questionID, answerID } = req.params;

    const { success } = await createRequest(
        'patch',
        `/questions/${questionID}/answers/${answerID}`,
        body
    );

    return success ? res.send() : res.status(500).send('Something went wrong.');
}

module.exports = EditAnswer;
