async function DeleteAnswerComment(req, res, next) {
    const user = req.user;
    const { questionID, answerID, commentID } = req.params;

    const { success } = await createRequest(
        'delete',
        `/questions/${questionID}/answers/${answerID}/comments/${commentID}`
    );

    return success ? res.send() : res.status(500).send('Something went wrong.');
}

module.exports = DeleteAnswerComment;
