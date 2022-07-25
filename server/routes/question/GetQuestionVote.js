const config = require('../../config.json');
const createRequest = require('../../utils/api');
const getUserLevel = require('../../utils/getUserLevel');
const Vote = require('../../db/models/Vote');

async function GetQuestionVote(req, res) {
    const { user } = req;
    const { questionID } = req.params;

    // Verify that user has level required to vote
    if (getUserLevel(user.points) < 2)
        return res.send({ vote: null });

    let cachedVote;
    try {
        // Retrieve cached vote and return it
        cachedVote = await Vote.findOne({
            parentID: questionID,
            creator: user.username,
        });
    } catch { return res.status(400).send(config.errorNotFound); }


    if (cachedVote) return res.send({ vote: cachedVote.status });

    // Retrieve uncached vote and patch to cache
    const { success, vote } = await createRequest(
        'get',
        `/questions/${questionID}/vote/${user.username}`
    );

    if (!success) return res.send({ vote: null });

    const newVote = await Vote.create({
        parentID: questionID,
        creator: user.username,
        status: vote ?? null,
        docModel: 'Question',
    });

    return res.send({ vote: newVote.status });
}

module.exports = GetQuestionVote;
