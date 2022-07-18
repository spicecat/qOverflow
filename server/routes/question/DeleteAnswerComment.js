const Comment = require('../../db/models/Comment');
const config = require('../../config.json');

async function DeleteAnswerComment(req, res, next) {
    const user = req.user;
    const { questionID, answerID, commentID } = req.params;

    const comment = await Comment.findById(commentID);

    if (!comment) return res.status(404).send(config.errorNotFound);

    if (comment.creator !== user.username) {
        return res.status(403).send(config.errorForbidden);
    }

    const { success } = await createRequest(
        'delete',
        `/questions/${questionID}/answers/${answerID}/comments/${commentID}`
    );

    await Comment.findByIdAndDelete(commentID);

    return success
        ? res.send({ success: true })
        : res.status(500).send('Something went wrong.');
}

module.exports = DeleteAnswerComment;