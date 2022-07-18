const createRequest = require('../../utils/api');
const config = require('../../config.json');

const Vote = require('../../db/models/Vote');

async function GetQuestionVote(req, res, next) {
    const user = req.user;
    const { questionID } = req.params;

    const cachedVote = await Vote.findOne({
        parentID: questionID,
        creator: user.username,
    });

    if (cachedVote) return res.send({ success: true, vote: vote.status });

    const { success, vote } = await createRequest(
        'get',
        `/questions/${questionID}/vote/${user.username}`
    );

    if (!success) return res.send({ success: true, vote: null });

    const newVote = await Vote.create({
        parentID: questionID,
        creator: user.username,
        status: vote,
        docModel: 'Question',
    });

    return res.send({ success: true, vote: newVote.status });
}

module.exports = GetQuestionVote;
