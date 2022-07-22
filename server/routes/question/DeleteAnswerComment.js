const Comment = require('../../db/models/Comment');
const config = require('../../config.json');
const createRequest = require('../../utils/api');

async function DeleteAnswerComment(req, res) {
    const user = req.user;
    const { questionID, answerID, commentID } = req.params;

    const comment = await Comment.findById(commentID);

    // Verify that a comment exists
    if (!comment) return res.status(404).send(config.errorNotFound);

    // Verify that the user is the creator
    if (comment.creator !== user.username) {
        return res.status(403).send(config.errorForbidden);
    }

    // Delete question with BDPA server
    const { success } = await createRequest(
        'delete',
        `/questions/${questionID}/answers/${answerID}/comments/${commentID}`
    );

    if (!success) return res.status(500).send(config.errorGeneric);

    await Comment.findByIdAndDelete(commentID);

    return res.sendStatus(200);
}

module.exports = DeleteAnswerComment;
