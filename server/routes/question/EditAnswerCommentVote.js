const createRequest = require('../../utils/api');
const config = require('../../config.json');
const getUserLevel = require('../../utils/getUserLevel');
const Vote = require('../../db/models/Vote');

async function EditAnswerCommentVote(req, res) {
    const { user } = req;
    const { question_id, answer_id, comment_id } = req.params;
    const { operation } = req.body;

    // Verify an operation is in response body
    if (!operation) return res.status(400).send(config.errorIncomplete);

    // Verify user has required permissions
    const userLevel = getUserLevel(user.points);
    if (operation === 'upvote' && userLevel < 2) {
        return res.status(403).send(config.errorForbidden);
    }

    if (operation === 'downvote' && userLevel < 5) {
        return res.status(403).send(config.errorForbidden);
    }

    const URL = `/questions/${question_id}/answers/${answer_id}/comments/${comment_id}/vote/${user.username}`;

    // Get cached vote, and refresh cache if not present
    let cachedVote = await Vote.findOneAndDelete({
        parent_id: comment_id,
        creator: user.username,
    });

    if (!cachedVote) {
        const { error, vote } = await createRequest('get', URL);

        cachedVote = !error ? { status: vote } : { status: null };
    }

    if (cachedVote.status === 'upvoted') {
        // Undo upvote if previously upvoted
        const { success } = await createRequest('patch', URL, {
            operation: 'decrement',
            target: 'upvotes',
        });

        if (!success) return res.status(500).send(config.errorGeneric);

        // If downvote, increment downvotes and cache vote
        if (operation === 'downvote') {
            const { success } = await createRequest('patch', URL, {
                operation: 'increment',
                target: 'downvotes',
            });

            if (!success) return res.status(500).send(config.errorGeneric);

            await Vote.create({
                parent_id: comment_id,
                creator: user.username,
                status: 'downvoted',
                docModel: 'Comment',
            });

            return res.send({ vote: 'downvoted' });
        }
    } else if (cachedVote.status === 'downvoted') {
        // Decrement downvotes if previously downvoted
        const { success } = await createRequest('patch', URL, {
            operation: 'decrement',
            target: 'downvotes',
        });

        if (!success) return res.status(500).send(config.errorGeneric);

        // If operation is upvoted, cache and change vote
        if (operation === 'upvote') {
            const { success } = await createRequest('patch', URL, {
                operation: 'increment',
                target: 'upvotes',
            });

            if (!success) return res.status(500).send(config.errorGeneric);

            await Vote.create({
                parent_id: comment_id,
                creator: user.username,
                status: 'upvoted',
                docModel: 'Comment',
            });

            return res.send({ vote: 'upvoted' });
        }
    } else {
        if (operation === 'upvote') {
            // Increment upvotes
            const { success } = await createRequest('patch', URL, {
                operation: 'increment',
                target: 'upvotes',
            });

            if (!success) return res.status(500).send(config.errorGeneric);

            await Vote.create({
                parent_id: comment_id,
                creator: user.username,
                status: 'upvoted',
                docModel: 'Comment',
            });

            return res.send({ vote: 'upvoted' });
        } else if (operation === 'downvote') {
            // Increment downvotes
            const { success } = await createRequest('patch', URL, {
                operation: 'increment',
                target: 'downvotes',
            });

            if (!success) return res.status(500).send(config.errorGeneric);

            await Vote.create({
                parent_id: comment_id,
                creator: user.username,
                status: 'downvoted',
                docModel: 'Comment',
            });

            return res.send({ vote: 'downvoted' });
        }
    }

    return res.send({ vote: null });
}

module.exports = EditAnswerCommentVote;
