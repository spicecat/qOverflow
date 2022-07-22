const fetchComments = require('../../utils/fetchComments');
const config = require('../../config.json');

const Answer = require('../../db/models/Answer');
const Comment = require('../../db/models/Comment');

async function GetAnswerComments(req, res) {
    const { questionID, answerID } = req.params;

    const answer = await Answer.findById(answerID);

    // Refresh comments if expired
    if (Number(answer.lastCommentFetch) + config.commentExpires < Date.now()) {
        const { success, requests } = await fetchComments(
            `/questions/${questionID}/answers/${answerID}/comments`
        );

        if (!success) return res.status(500).send(config.errorGeneric);

        // Refomat requests and patch to database
        await requests
            .map(({ comment_id, ...comment }) => {
                return {
                    ...comment,
                    id: comment_id,
                    parentID: answerID
                }
            })
            .map(async (comment) => {
                return Comment.findByIdAndUpdate(comment.id, comment, {
                    upsert: true,
                });
            });
    }

    const comments = await Comment.find({ parentID: answerID });

    return res.send({ comments });
}

module.exports = GetAnswerComments;
