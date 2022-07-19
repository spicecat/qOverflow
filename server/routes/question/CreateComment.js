const config = require('../../config.json');
const Question = require('../../db/models/Question');
const Comment = require('../../db/models/Comment');
const createRequest = require('../../utils/api');
const getUserLevel = require('../../utils/getUserLevel');

async function CreateComment(req, res, next) {
    const user = req.user;
    const { questionID } = req.params;
    const { text } = req.body;

    const cachedQuestion = await Question.findById(questionID);

    if (
        getUserLevel(user.points) < 3 &&
        cachedQuestion?.creator !== user.username
    ) {
        return res.status(403).send(config.errorForbidden);
    }

    if (!text) {
        return res.status(400).send(config.errorIncomplete);
    }

    const { success, comment } = await createRequest(
        'post',
        `/questions/${questionID}/comments`,
        {
            creator: user.username,
            text,
        }
    );

    if (!success) return res.status(500).send(config.errorGeneric);

    const newComment = await Comment.create({
        ...comment,
        _id: comment.comment_id,
        docModel: 'Question',
        parentID: questionID,
    });

    console.log(newComment.id);
    console.log(comment.comment_id);

    return res.sendStatus(200);
}

module.exports = CreateComment;
