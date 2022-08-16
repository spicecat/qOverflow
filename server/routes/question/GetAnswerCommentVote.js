const config = require('../../config.json');
const createRequest = require('../../utils/api');
const getUserLevel = require('../../utils/getUserLevel');
const Vote = require('../../db/models/Vote');

async function GetAnswerCommentVote(req, res) {
    const { user } = req;
    const { question_id, answer_id, comment_id } = req.params;

    // Verify user has permission to vote
    if (getUserLevel(user.points) < 2) {
        return res.send({ vote: null });
    }

    let cachedVote;
    try {
        // Find cached vote
        const cachedVote = await Vote.findOne({
            parent_id: comment_id,
            creator: user.username,
        });
    } catch {
        return res.status(400).send(config.errorNotFound);
    }

    if (cachedVote) return res.send({ vote: cachedVote.status });

    // Fetch vote and cache it
    const { success, vote } = await createRequest(
        'get',
        `/questions/${question_id}/answers/${answer_id}/comments/${comment_id}/vote/${user.username}`
    );

    if (!success) return res.send({ vote: null });

    const newVote = await Vote.create({
        parent_id: comment_id,
        creator: user.username,
        status: vote ?? null,
        docModel: 'Comment',
    });

    return res.send({ vote: newVote.status });
}

module.exports = GetAnswerCommentVote;
