const fetchComments = require('../../utils/fetchComments');
const config = require('../../config.json');

const Question = require('../../db/models/Question');
const Comment = require('../../db/models/Comment');

async function GetComments(req, res, next) {
    const { questionID } = req.params;

    var question = await Question.findById(questionID);

    if (question.lastCommentFetch + config.commentExpires < Date.now()) {
        const { success, requests } = await fetchComments(
            `/questions/${questionID}/comments`
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

    const comments = await Comment.find({ parentID: questionID });

    return res.send({ comments });
}

module.exports = GetComments;
