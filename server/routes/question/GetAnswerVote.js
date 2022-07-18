const createRequest = require('../../utils/api');
const config = require('../../config.json');

const Vote = require('../../db/models/Vote');

async function GetAnswerVote(req, res, next) {
    const user = req.user;
    const { questionID, answerID } = req.params;

    const cachedVote = await Vote.findOne({
        parentID: answerID,
        creator: user.username,
    });

    if (cachedVote) return res.send({ success: true, vote: vote.status });

    const { success, vote } = await createRequest(
        'get',
        `/questions/${questionID}/answers/${answerID}/vote/${user.username}`
    );

    if (!success) return res.status(500).send(config.errorGeneric);

    const newVote = await Vote.create({
        parentID: answerID,
        creator: user.username,
        status: vote,
        docModel: 'Answer',
    });

    return res.send({ success: true, vote: newVote.status });
}

module.exports = GetAnswerVote;
