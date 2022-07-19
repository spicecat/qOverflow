const createRequest = require('../../utils/api');
const getUserLevel = require('../../utils/getUserLevel');
const Vote = require('../../db/models/Vote');

async function GetAnswerCommentVote(req, res, next) {
    const user = req.user;
    const { questionID, answerID, commentID } = req.params;

    if (getUserLevel(user.points) < 2) {
        return res.send({ vote: null });
    }

    const cachedVote = await Vote.findOne({
        parentID: commentID,
        creator: user.username,
    });

    if (cachedVote) return res.send({ vote: vote.status });

    const { success, vote } = await createRequest(
        'get',
        `/questions/${questionID}/answers/${answerID}/comments/${commentID}/vote/${user.username}`
    );

    if (!success) return res.send({ vote: null });

    const newVote = await Vote.create({
        parentID: commentID,
        creator: user.username,
        status: vote,
        docModel: 'Comment',
    });

    return res.send({ vote: newVote.status });
}

module.exports = GetAnswerCommentVote;
