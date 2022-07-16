async function DeleteComment(req, res, next) {
    const user = req.user;
    const { questionID, commentID } = req.params;

    const { success } = await createRequest(
        'delete',
        `/questions/${questionID}/comments/${commentID}`
    );

    return success ? res.send() : res.status(500).send('Something went wrong.');
}

module.exports = DeleteComment;
