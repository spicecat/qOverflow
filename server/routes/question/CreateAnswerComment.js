const config = require('../../config.json');
const Answer = require('../../db/models/Answer');
const Comment = require('../../db/models/Comment');
const { getQuestion } = require('../../utils/question');
const createRequest = require('../../utils/api');
const getUserLevel = require('../../utils/getUserLevel');

async function CreateAnswerComment(req, res) {
    const user = req.user;
    const { question_id, answer_id } = req.params;
    const { text } = req.body;

    // Retrieve answer from cache
    const cachedAnswer = await Answer.findById(answer_id);

    // Verify question is not closed
    const question = await getQuestion(question_id);
    if (!question) return res.status(404).send(config.errorNotFound);
    if (question.status === 'closed') return res.status(403).send(config.errorForbidden);

    // Verify user has permissions to comment
    if (getUserLevel(user.points) < 3 && cachedAnswer?.creator !== user.username) {
        return res.status(403).send(config.errorForbidden);
    }

    // Verify text is included in request body
    if (!text) return res.status(400).send({ success: false });

    // Post question with BDPA server
    const { success, comment } = await createRequest(
        'post',
        `/questions/${question_id}/answers/${answer_id}/comments`,
        {
            creator: user.username,
            text,
        }
    );

    if (!success) return res.status(500).send(config.errorGeneric);

    // Cache question
    const newComment = await Comment.create({
        ...comment,
        _id: comment.comment_id,
        docModel: 'Answer',
        parent_id: answer_id,
    });

    return res.send({ comment: newComment });
}

module.exports = CreateAnswerComment;
