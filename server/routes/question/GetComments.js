const fetchComments = require('../../utils/fetchComments');
const config = require('../../config.json');

const Question = require('../../db/models/Question');
const Comment = require('../../db/models/Comment');

async function GetComments(req, res) {
    const { questionID } = req.params;

    let question;
    try { question = await Question.findById(questionID); }
    catch { return res.status(400).send(config.errorNotFound); }

    // Refresh comments if expired
    if (Number(question.lastCommentFetch) + config.commentExpires < Date.now()) {
        const { success, requests } = await fetchComments(
            `/questions/${questionID}/comments`
        );

        if (!success) return res.status(500).send(config.errorGeneric);

        // Reformat comments and patch to database
        await requests
            .map(({ comment_id, ...comment }) => {
                return {
                    ...comment,
                    id: comment_id,
                    parentID: questionID
                }
            })
            .map(async (comment) => {
                return Comment.findByIdAndUpdate(comment.id, comment, {
                    upsert: true,
                });
            });
    }
    const comments = await Comment.find({ parentID: questionID });

    return res.send({ comments });
}

module.exports = GetComments;
