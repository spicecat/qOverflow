const createRequest = require('../../utils/api');
const config = require('../../config.json');

const Vote = require('../../db/models/Vote');

async function GetAnswerCommentVote(req, res, next) {
    const user = req.user;
    const { questionID, answerID, commentID } = req.params;

    const cachedVote = await Vote.findOne({
        parentID: commentID,
        creator: user.username,
    });

    if (cachedVote) return res.send({ success: true, vote: vote.status });

    const { success, vote } = await createRequest(
        'get',
        `/questions/${questionID}/answers/${answerID}/comments/${commentID}/vote/${user.username}`
    );

    if (!success) return res.status(500).send(config.errorGeneric);

    const newVote = await Vote.create({
        parentID: commentID,
        creator: user.username,
        status: vote,
        docModel: 'Comment',
    });

    return res.send({ success: true, vote: newVote.status });
}

module.exports = GetAnswerCommentVote;
