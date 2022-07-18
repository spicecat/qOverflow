const config = require('../../config.json');
const Question = require('../../db/models/Question');

async function CreateComment(req, res, next) {
    const user = req.user;
    const { questionID } = req.params;
    const { text } = req.body;

    const cachedQuestion = await Question.findById(questionID);

    if (getUserLevel(user.points) < 3 && cachedQuestion?.creator !== username) {
        return res.status(403).send(config.errorForbidden);
    }

    if (!text) {
        return res.status(400).send(config.errorIncomplete);
    }

    const { success } = await createRequest(
        'post',
        `/questions/${questionID}/comments`,
        {
            creator: user.username,
            text,
        }
    );

    await Comment.create({
        ...comment,
        id: comment_id,
        docModel: 'Question',
        parentID: questionID,
    });

    return success
        ? res.sendStatus(200)
        : res.status(500).send(config.errorGeneric);
}

module.exports = CreateComment;
