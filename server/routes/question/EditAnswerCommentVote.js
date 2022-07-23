const createRequest = require('../../utils/api');
const config = require('../../config.json');
const getUserLevel = require('../../utils/getUserLevel');
const Vote = require('../../db/models/Vote');

async function EditAnswerCommentVote(req, res) {
    const user = req.user;
    const { questionID, answerID, commentID } = req.params;
    const { operation } = req.body;

    // Verify that an operation is in response body
    if (!operation) return res.status(400).send(config.errorIncomplete);

    // Verify that user has required permissions
    const userLevel = getUserLevel(user.points);
    if (operation === 'upvote' && userLevel < 2) {
        return res.status(403).send(config.errorForbidden);
    }

    if (operation === 'downvote' && userLevel < 4) {
        return res.status(403).send(config.errorForbidden);
    }

    const URL = `/questions/${questionID}/answers/${answerID}/comments/${commentID}/vote/${user.username}`;

    // Get the cached vote, and refresh cache if not present
    let cachedVote = await Vote.findOneAndDelete({
        parentID: commentID,
        creator: user.username,
    });

    if (!cachedVote) {
        const { success, vote } = await createRequest('get', URL);

        cachedVote = success ? { status: vote } : { status: null };
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
                parentID: commentID,
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
                parentID: commentID,
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
                parentID: commentID,
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
                parentID: commentID,
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
