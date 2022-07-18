const createRequest = require('../../utils/api');
const config = require('../../config.json');
const getUserLevel = require('../../utils/getUserLevel');
const Vote = require('../../db/models/Vote');

async function GetCommentVote(req, res, next) {
    const user = req.user;
    const { questionID, commentID } = req.params;

    if (getUserLevel(user.points) < 2) {
        return res.send({ success: true, vote: null });
    }

    const cachedVote = await Vote.findOne({
        parentID: commentID,
        creator: user.username,
    });

    if (cachedVote) return res.send({ success: true, vote: vote.status });

    const { success, vote } = await createRequest(
        'get',
        `/questions/${questionID}/comments/${commentID}/vote/${user.username}`
    );

    if (!success) return res.send({ success: true, vote: null });

    const newVote = await Vote.create({
        parentID: commentID,
        creator: user.username,
        status: vote,
        docModel: 'Comment',
    });

    return res.send({ success: true, vote: newVote.status });
}

module.exports = GetCommentVote;
