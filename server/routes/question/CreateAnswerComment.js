const Comment = require('../../db/models/Comment');
const Answer = require('../../db/models/Answer');

async function CreateAnswerComment(req, res, next) {
    const { username } = req.user;
    const { questionID, answerID } = req.params;
    const { text } = req.body;

    const cachedAnswer = await Answer.findById(answerID);

    if (getUserLevel(user.points) < 3 && cachedAnswer?.creator !== username) {
        return res.status(403).send(config.errorForbidden);
    }

    if (!text) {
        return res.status(400).send({ success: false });
    }

    const { success, comment } = await createRequest(
        'post',
        `/questions/${questionID}/answers/${answerID}/comments`,
        {
            creator: username,
            text,
        }
    );

    await Comment.create({
        ...comment,
        id: comment_id,
        docModel: 'Answer',
        parentID: answerID,
    });

    return success
        ? res.send({ success: true })
        : res.status(500).send('Something went wrong.');
}

module.exports = CreateAnswerComment;
