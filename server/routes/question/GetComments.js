const config = require('../../config.json');
const Comment = require('../../db/models/Comment');
const { getAllComments } = require('../../utils/getData');
const { getQuestion } = require('../../utils/question');

async function GetComments(req, res) {
    const { question_id } = req.params;

    const question = await getQuestion(question_id);
    if (!question) return res.status(404).send(config.errorNotFound);

    // Fetch comments if expired
    if (Number(question.lastCommentFetch) + config.commentExpires < Date.now()) {
        const comments = await getAllComments({ question_id });
        return res.send({ comments });
    } else {
        const comments = await Comment.find({ parent_id: question_id });
        return res.send({ comments });
    }
}

module.exports = GetComments;
