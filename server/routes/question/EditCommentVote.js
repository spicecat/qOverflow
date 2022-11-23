const createRequest = require('../../utils/api');
const config = require('../../config.json');
const getUserLevel = require('../../utils/getUserLevel');
const Vote = require('../../db/models/Vote');

async function EditAnswerVote(req, res) {
    const { user } = req;
    const { question_id, comment_id } = req.params;
    const { operation } = req.body;

    if (!operation) return res.status(400).send(config.errorIncomplete);

    const userLevel = getUserLevel(user.points);
    if (operation === 'upvote' && userLevel < 2) {
        return res.status(403).send(config.errorForbidden);
    }

    if (operation === 'downvote' && userLevel < 5) {
        return res.status(403).send(config.errorForbidden);
    }

    const URL = `/questions/${question_id}/comments/${comment_id}/vote/${user.username}`;

    let cachedVote = await Vote.findOneAndDelete({
        parent_id: comment_id,
        creator: user.username,
    });

    if (!cachedVote) {
        const { error, vote } = await createRequest('get', URL);

        cachedVote = !error ? { status: vote } : { status: null };
    }

    if (cachedVote.status === 'upvoted') {
        const { success } = await createRequest('patch', URL, {
            operation: 'decrement',
            target: 'upvotes',
        });

        if (!success) return res.status(500).send(config.errorGeneric);

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
        const { success } = await createRequest('patch', URL, {
            operation: 'decrement',
            target: 'downvotes',
        });

        if (!success) return res.status(500).send(config.errorGeneric);

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

module.exports = EditAnswerVote;
