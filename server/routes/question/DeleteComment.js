const Comment = require('../../db/models/Comment');

async function DeleteComment(req, res, next) {
    const { questionID, commentID } = req.params;

    const comment = await Comment.findById(commentID);

    if (!comment) return res.status(404).send(config.errorNotFound);

    if (comment.creator !== user.username) {
        return res.status(403).send(config.errorForbidden);
    }

    const { success } = await createRequest(
        'delete',
        `/questions/${questionID}/comments/${commentID}`
    );

    Comment.findByIdAndDelete(commentID);

    return success
        ? res.send({ success: true })
        : res.status(500).send('Something went wrong.');
}

module.exports = DeleteComment;
