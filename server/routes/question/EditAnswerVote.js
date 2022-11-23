const createRequest = require('../../utils/api');
const config = require('../../config.json');
const getUserLevel = require('../../utils/getUserLevel');
const Vote = require('../../db/models/Vote');
const Answer = require('../../db/models/Answer');

async function EditAnswerVote(req, res) {
    const { user } = req;
    const { question_id, answer_id } = req.params;
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

    const URL = `/questions/${question_id}/answers/${answer_id}/vote/${user.username}`;

    // Get cached vote and answer, refresh cache if not present
    let cachedAnswer;
    try {
        cachedAnswer = await Answer.findById(answer_id);
    } catch {
        return res.status(400).send(config.errorNotFound);
    }

    let cachedVote = await Vote.findOneAndDelete({
        parent_id: answer_id,
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

        if (operation === 'downvote') {
            // Undo upvote if previously upvoted
            const { success } = await createRequest('patch', URL, {
                operation: 'increment',
                target: 'downvotes',
            });

            if (!success) return res.status(500).send(config.errorGeneric);

            await Vote.create({
                parent_id: answer_id,
                creator: user.username,
                status: 'downvoted',
                docModel: 'Answer',
            });

            await createRequest('patch', `/users/${user.username}/points`, {
                operation: 'decrement',
                amount: 1,
            });

            await createRequest('patch', `/users/${cachedAnswer.creator}/points`, {
                operation: 'decrement',
                amount: 15,
            });

            return res.send({ vote: 'downvoted' });
        }

        await createRequest('patch', `/users/${cachedAnswer.creator}/points`, {
            operation: 'decrement',
            amount: 10,
        });
    } else if (cachedVote.status === 'downvoted') {
        const { success } = await createRequest('patch', URL, {
            operation: 'decrement',
            target: 'downvotes',
        });

        if (!success) return res.status(500).send(config.errorGeneric);

        await createRequest('patch', `/users/${user.username}/points`, {
            operation: 'increment',
            amount: 1,
        });

        if (operation === 'upvote') {
            const { success } = await createRequest('patch', URL, {
                operation: 'increment',
                target: 'upvotes',
            });

            if (!success) return res.status(500).send(config.errorGeneric);

            await Vote.create({
                parent_id: answer_id,
                creator: user.username,
                status: 'upvoted',
                docModel: 'Answer',
            });

            await createRequest('patch', `/users/${cachedAnswer.creator}/points`, {
                operation: 'increment',
                amount: 15,
            });

            return res.send({ vote: 'upvoted' });
        }

        await createRequest('patch', `/users/${cachedAnswer.creator}/points`, {
            operation: 'increment',
            amount: 5,
        });
    } else {
        if (operation === 'upvote') {
            const { success } = await createRequest('patch', URL, {
                operation: 'increment',
                target: 'upvotes',
            });

            if (!success) return res.status(500).send(config.errorGeneric);

            await Vote.create({
                parent_id: answer_id,
                creator: user.username,
                status: 'upvoted',
                docModel: 'Answer',
            });

            await createRequest('patch', `/users/${cachedAnswer.creator}/points`, {
                operation: 'increment',
                amount: 10,
            });

            return res.send({ vote: 'upvoted' });
        } else if (operation === 'downvote') {
            const { success } = await createRequest('patch', URL, {
                operation: 'increment',
                target: 'downvotes',
            });

            if (!success) return res.status(500).send(config.errorGeneric);

            await Vote.create({
                parent_id: answer_id,
                creator: user.username,
                status: 'downvoted',
                docModel: 'Answer',
            });

            await createRequest('patch', `/users/${user.username}/points`, {
                operation: 'decrement',
                amount: 1,
            });

            await createRequest('patch', `/users/${cachedAnswer.creator}/points`, {
                operation: 'decrement',
                amount: 5,
            });

            return res.send({ vote: 'downvoted' });
        }
    }

    return res.send({ vote: null });
}

module.exports = EditAnswerVote;
