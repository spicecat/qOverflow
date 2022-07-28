const fetchComments = require('server/utils/fetchComments');
const config = require('server/config.json');

const Answer = require('server/db/models/Answer');
const Comment = require('server/db/models/Comment');

async function GetAnswerComments(req, res) {
    const { question_id, answer_id } = req.params;

    const answer = await Answer.findById(answer_id);

    // Refresh comments if expired
    if (Number(answer.lastCommentFetch) + config.commentExpires < Date.now()) {
        const { success, requests } = await fetchComments(
            `/questions/${question_id}/answers/${answer_id}/comments`
        );

        if (!success) return res.status(500).send(config.errorGeneric);

        // Refomat requests and patch to database
        await requests
            .map(({ comment_id, ...comment }) => {
                return {
                    ...comment,
                    id: comment_id,
                    parent_id: answer_id
                }
            })
            .map(async (comment) => {
                return Comment.findByIdAndUpdate(comment.id, comment, {
                    upsert: true,
                });
            });
    }

    const comments = await Comment.find({ parent_id: answer_id });

    return res.send({ comments });
}

module.exports = GetAnswerComments;
