const Comment = require('../../db/models/Comment');
const config = require('../../config.json');
const createRequest = require('../../utils/api');

async function DeleteComment(req, res) {
    const user = req.user;
    const { questionID, commentID } = req.params;

    const comment = await Comment.findById(commentID);

    if (!comment) return res.status(404).send(config.errorNotFound);

    // Verify that the user owns the comment
    if (comment.creator !== user.username) {
        return res.status(403).send(config.errorForbidden);
    }

    // Delete comment with BDPA server
    const { success } = await createRequest(
        'delete',
        `/questions/${questionID}/comments/${commentID}`
    );

    if (!success) return res.status(500).send(config.errorGeneric);

    await Comment.findByIdAndDelete(commentID);

    return res.sendStatus(200);
}

module.exports = DeleteComment;
