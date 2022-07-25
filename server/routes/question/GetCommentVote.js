const createRequest = require('../../utils/api');
const getUserLevel = require('../../utils/getUserLevel');
const Vote = require('../../db/models/Vote');

async function GetCommentVote(req, res) {
    const { user } = req;
    const { questionID, commentID } = req.params;

    // Verify that user has level required to vote
    if (getUserLevel(user.points) < 2)
        return res.send({ vote: null });

    // Find cached vote and return it
    const cachedVote = await Vote.findOne({
        parentID: commentID,
        creator: user.username,
    });

    if (cachedVote) return res.send({ vote: cachedVote.status });

    // Retrieve uncached vote and cache it
    const { success, vote } = await createRequest(
        'get',
        `/questions/${questionID}/comments/${commentID}/vote/${user.username}`
    );

    if (!success) return res.send({ vote: null });
    
    const newVote = await Vote.create({
        parentID: commentID,
        creator: user.username,
        status: vote ?? null,
        docModel: 'Comment',
    });

    return res.send({ vote: newVote.status });
}

module.exports = GetCommentVote;
