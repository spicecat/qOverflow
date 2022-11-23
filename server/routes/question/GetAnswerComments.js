const config = require('../../config.json');
const Comment = require('../../db/models/Comment');
const { getAllComments } = require('../../utils/getData');
const { getAnswer } = require('../../utils/question');

async function GetAnswerComments(req, res) {
    const { question_id, answer_id } = req.params;

    const answer = await getAnswer(question_id, answer_id);
    if (!answer) return res.status(404).send(config.errorNotFound);

    // Fetch comments if expired
    if (Number(answer.lastCommentFetch) + config.commentExpires < Date.now()) {
        const comments = await getAllComments({ answer_id, question_id });
        return res.send({ comments });
    } else {
        const comments = await Comment.find({ parent_id: answer_id });
        return res.send({ comments });
    }
}

module.exports = GetAnswerComments;
