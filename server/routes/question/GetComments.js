const fetchComments = require('../../utils/fetchComments');
const config = require('../../config.json');

const Question = require('../../db/models/Question');
const Comment = require('../../db/models/Comment');

async function GetComments(req, res) {
    const { questionID } = req.params;

    const question = await Question.findById(questionID);
    console.log(11,question)
    // Refresh comments if expired
    if (Number(question.lastCommentFetch) + config.commentExpires < Date.now()) {
        console.log(22,question)
        const { success, requests } = await fetchComments(
            `/questions/${questionID}/comments`
            );
        console.log(33,requests)
            
        if (!success) return res.status(500).send(config.errorGeneric);

        // Reformat comments and patch to database
        await requests
            .reduce(async (acc, req) => {
                const reformat = req.comments.map((comment) => ({
                    ...comment,
                    id: comment.comment_id,
                }));
                return [...reformat, ...acc];
            }, [])
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
