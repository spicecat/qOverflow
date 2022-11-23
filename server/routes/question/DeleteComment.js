const Comment = require('../../db/models/Comment');
const config = require('../../config.json');
const createRequest = require('../../utils/api');

async function DeleteComment(req, res) {
    const { user } = req;
    const { question_id, comment_id } = req.params;

    const comment = await Comment.findById(comment_id);

    if (!comment) return res.status(404).send(config.errorNotFound);

    // Verify user owns comment
    if (comment.creator !== user.username) {
        return res.status(403).send(config.errorForbidden);
    }

    // Delete comment with BDPA server
    const { success } = await createRequest(
        'delete',
        `/questions/${question_id}/comments/${comment_id}`
    );

    if (!success) return res.status(500).send(config.errorGeneric);

    await Comment.findByIdAndDelete(comment_id);

    return res.sendStatus(200);
}

module.exports = DeleteComment;
