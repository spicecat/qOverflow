const config = require('server/config.json');
const Comment = require('server/db/models/Comment');
const { getQuestion, refreshQuestion } = require('server/utils/question');
const fetchComments = require('server/utils/fetchComments');

async function GetComments(req, res) {
    const { question_id } = req.params;

    const question = await getQuestion(question_id);
    if (!question) return res.status(404).send(config.errorNotFound);

    // Refresh comments if expired
    if (Number(question.lastCommentFetch) + config.commentExpires < Date.now()) {
        const { success, requests } = await fetchComments(
            `/questions/${question_id}/comments`
        );

        if (!success) return res.status(500).send(config.errorGeneric);

        // Reformat comments and patch to database
        await requests
            .map(({ comment_id, ...comment }) => {
                return {
                    ...comment,
                    id: comment_id,
                    parent_id: question_id
                }
            })
            .map(async (comment) => {
                return Comment.findByIdAndUpdate(comment.id, comment, {
                    upsert: true,
                });
            });
    }
    const comments = await Comment.find({ parent_id: question_id });

    return res.send({ comments });
}

module.exports = GetComments;
