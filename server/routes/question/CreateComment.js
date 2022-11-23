const config = require('../../config.json');
const Comment = require('../../db/models/Comment');
const { getQuestion, refreshQuestion } = require('../../utils/question');
const createRequest = require('../../utils/api');
const getUserLevel = require('../../utils/getUserLevel');

async function CreateComment(req, res) {
    const { user } = req;
    const { question_id } = req.params;
    const { text } = req.body;

    // Verify question is not closed
    const question = await getQuestion(question_id);
    if (!question) return res.status(404).send(config.errorNotFound);
    if (question.status === 'closed') return res.status(403).send(config.errorForbidden);

    // Verify user has permissions to create comments
    if (getUserLevel(user.points) < 3 && question?.creator !== user.username)
        return res.status(403).send(config.errorForbidden);

    // Verify required items are in request body
    if (!text) return res.status(400).send(config.errorIncomplete);

    // Post comment with BDPA server
    const { success, comment } = await createRequest('post', `/questions/${question_id}/comments`, {
        creator: user.username,
        text,
    });

    if (!success) return res.status(500).send(config.errorGeneric);

    // Cache comment
    const newComment = await Comment.create({
        ...comment,
        _id: comment.comment_id,
        docModel: 'Question',
        parent_id: question_id,
    });

    return res.send({ comment: newComment });
}

module.exports = CreateComment;
