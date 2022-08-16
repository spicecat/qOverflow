const config = require('../../config.json');
const createRequest = require('../../utils/api');
const getUserLevel = require('../../utils/getUserLevel');
const Vote = require('../../db/models/Vote');

async function GetAnswerVote(req, res) {
    const { user } = req;
    const { question_id, answer_id } = req.params;

    // Verify user has required level
    if (getUserLevel(user.points) < 2) return res.send({ vote: null });

    let cachedVote;
    try {
        // Find cached vote and return
        cachedVote = await Vote.findOne({
            parent_id: answer_id,
            creator: user.username,
        });
    } catch {
        return res.status(400).send(config.errorNotFound);
    }

    if (cachedVote) return res.send({ vote: cachedVote.status });

    // Retrieve vote and cache it
    const { success, vote } = await createRequest(
        'get',
        `/questions/${question_id}/answers/${answer_id}/vote/${user.username}`
    );

    if (!success) return res.send({ vote: null });

    const newVote = await Vote.create({
        parent_id: answer_id,
        creator: user.username,
        status: vote ?? null,
        docModel: 'Answer',
    });

    return res.send({ vote: newVote.status });
}

module.exports = GetAnswerVote;
