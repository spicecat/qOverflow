const createRequest = require('../../utils/api');
const getUserLevel = require('../../utils/getUserLevel');
const Vote = require('../../db/models/Vote');

async function GetAnswerVote(req, res, next) {
    const user = req.user;
    const { questionID, answerID } = req.params;

    // Verify that user has required level
    if (getUserLevel(user.points) < 2) {
        return res.send({ vote: null });
    }

    // Find cached vote and return
    const cachedVote = await Vote.findOne({
        parentID: answerID,
        creator: user.username,
    });

    if (cachedVote) return res.send({ vote: vote.status });

    // Retrieve vote and cache it
    const { success, vote } = await createRequest(
        'get',
        `/questions/${questionID}/answers/${answerID}/vote/${user.username}`
    );

    if (!success) return res.send({ vote: null });

    const newVote = await Vote.create({
        parentID: answerID,
        creator: user.username,
        status: vote,
        docModel: 'Answer',
    });

    return res.send({ vote: newVote.status });
}

module.exports = GetAnswerVote;
