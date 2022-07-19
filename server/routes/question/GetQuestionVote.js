const createRequest = require('../../utils/api');
const getUserLevel = require('../../utils/getUserLevel');
const Vote = require('../../db/models/Vote');

async function GetQuestionVote(req, res, next) {
    const user = req.user;
    const { questionID } = req.params;

    if (getUserLevel(user.points) < 2) {
        return res.send({ vote: null });
    }

    const cachedVote = await Vote.findOne({
        parentID: questionID,
        creator: user.username,
    });

    if (cachedVote) return res.send({ vote: vote.status });

    const { success, vote } = await createRequest(
        'get',
        `/questions/${questionID}/vote/${user.username}`
    );

    if (!success) return res.send({ vote: null });

    const newVote = await Vote.create({
        parentID: questionID,
        creator: user.username,
        status: vote,
        docModel: 'Question',
    });

    return res.send({ vote: newVote.status });
}

module.exports = GetQuestionVote;
