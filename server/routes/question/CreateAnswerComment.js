const Comment = require('../../db/models/Comment');
const Answer = require('../../db/models/Answer');
const Question = require('../../db/models/Question');
const config = require('../../config.json');
const createRequest = require('../../utils/api');
const getUserLevel = require('../../utils/getUserLevel');

async function CreateAnswerComment(req, res) {
    const { username } = req.user;
    const { questionID, answerID } = req.params;
    const { text } = req.body;

    // Retrieve answer from cache
    const cachedAnswer = await Answer.findById(answerID);

    // Verify that question is not closed
    const cachedQuestion = await Question.findById(questionID);
    if (!cachedQuestion || cachedQuestion.status === 'closed') {
        return res.status(403).send(config.errorForbidden);
    }

    // Verify that user has permissions to comment
    if (getUserLevel(user.points) < 3 && cachedAnswer?.creator !== username) {
        return res.status(403).send(config.errorForbidden);
    }

    // Verify that text is included in request body
    if (!text) {
        return res.status(400).send({ success: false });
    }

    // Post question with BDPA server
    const { success, comment } = await createRequest(
        'post',
        `/questions/${questionID}/answers/${answerID}/comments`,
        {
            creator: username,
            text,
        }
    );

    if (!success) return res.status(500).send(config.errorGeneric);

    // Cache question
    await Comment.create({
        ...comment,
        _id: comment.comment_id,
        docModel: 'Answer',
        parentID: answerID,
    });

    return res.sendStatus(200);
}

module.exports = CreateAnswerComment;
