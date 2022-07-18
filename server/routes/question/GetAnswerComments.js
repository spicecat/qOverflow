const fetchComments = require('../../utils/fetchComments');
const config = require('../../config.json');

const Answer = require('../../db/models/Answer');
const Comment = require('../../db/models/Comment');

async function GetAnswerComments(req, res, next) {
    const { questionID, answerID } = req.params;

    var answer = await Answer.findById(answerID);

    if (answer.lastCommentFetch + config.commentExpires < Date.now()) {
        const { success, requests } = await fetchComments(
            `/questions/${questionID}/answers/${answerID}/comments`
        );

        if (!success) return res.status(500).send(config.errorGeneric);

        await requests
            .reduce(async (acc, req) => {
                const reformat = req.comments.map((comment) => ({
                    ...comment,
                    id: comment.comment_id,
                }));
                return [...reformat, ...acc];
            }, [])
            .map(async (comment) => {
                return await Comment.findByIdAndUpdate(comment.id, comment, {
                    upsert: true,
                });
            });
    }

    const comments = await Comment.find({ parentID: answerID });

    return res.send({ comments });
}

module.exports = GetAnswerComments;
