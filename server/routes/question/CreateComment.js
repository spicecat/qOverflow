const config = require('../../config.json');
const Question = require('../../db/models/Question');
const Comment = require('../../db/models/Comment');
const createRequest = require('../../utils/api');
const getUserLevel = require('../../utils/getUserLevel');

async function CreateComment(req, res) {
    const user = req.user;
    const { questionID } = req.params;
    const { text } = req.body;

    const cachedQuestion = await Question.findById(questionID);

    // Verify that question is not closed
    if (!cachedQuestion || cachedQuestion.status === 'closed') {
        return res.status(403).send(config.errorForbidden);
    }

    // Verify that user has the permissions to create comments
    if (
        getUserLevel(user.points) < 3 &&
        cachedQuestion?.creator !== user.username
    ) {
        return res.status(403).send(config.errorForbidden);
    }

    // Verify that required items are in request body
    if (!text) {
        return res.status(400).send(config.errorIncomplete);
    }

    // Post comment with BDPA server
    const { success, comment } = await createRequest(
        'post',
        `/questions/${questionID}/comments`,
        {
            creator: user.username,
            text,
        }
    );

    if (!success) return res.status(500).send(config.errorGeneric);

    // Cache comment
    const newComment = await Comment.create({
        ...comment,
        _id: comment.comment_id,
        docModel: 'Question',
        parentID: questionID,
    });

    return res.sendStatus(200);
}

module.exports = CreateComment;
