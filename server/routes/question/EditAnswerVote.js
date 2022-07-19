const createRequest = require('../../utils/api');
const config = require('../../config.json');
const getUserLevel = require('../../utils/getUserLevel');

const Vote = require('../../db/models/Vote');
const Answer = require('../../db/models/Answer');

async function EditAnswerVote(req, res, next) {
    const user = req.user;
    const { questionID, answerID } = req.params;
    const { operation } = req.body;

    if (!operation) return res.status(400).send(config.errorIncomplete);

    const userLevel = getUserLevel(user.points);
    if (operation === 'upvote' && userLevel < 2) {
        return res.status(403).send(config.errorForbidden);
    }

    if (operation === 'downvote' && userLevel < 4) {
        return res.status(403).send(config.errorForbidden);
    }

    const URL = `/questions/${questionID}/answers/${answerID}/vote/${user.username}`;

    const cachedAnswer = await Answer.findById(answerID);
    var cachedVote = await Vote.findOneAndDelete({
        parentID: answerID,
        creator: user.username,
    });

    if (!cachedVote) {
        const { success, vote } = await createRequest('get', URL);

        cachedVote = success ? { status: vote } : { status: null };
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
                parentID: answerID,
                creator: user.username,
                status: 'downvoted',
                docModel: 'Answer',
            });

            await createRequest('patch', `/users/${user.username}/points`, {
                operation: 'decrement',
                amount: 1,
            });

            await createRequest(
                'patch',
                `/users/${cachedAnswer.creator}/points`,
                {
                    operation: 'decrement',
                    amount: 15,
                }
            );

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
                parentID: answerID,
                creator: user.username,
                status: 'upvoted',
                docModel: 'Answer',
            });

            await createRequest(
                'patch',
                `/users/${cachedAnswer.creator}/points`,
                {
                    operation: 'increment',
                    amount: 15,
                }
            );

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
                parentID: answerID,
                creator: user.username,
                status: 'upvoted',
                docModel: 'Answer',
            });

            await createRequest(
                'patch',
                `/users/${cachedAnswer.creator}/points`,
                {
                    operation: 'increment',
                    amount: 10,
                }
            );

            return res.send({ vote: 'upvoted' });
        } else if (operation === 'downvote') {
            const { success } = await createRequest('patch', URL, {
                operation: 'increment',
                target: 'downvotes',
            });

            if (!success) return res.status(500).send(config.errorGeneric);

            await Vote.create({
                parentID: answerID,
                creator: user.username,
                status: 'downvoted',
                docModel: 'Answer',
            });

            await createRequest('patch', `/users/${user.username}/points`, {
                operation: 'decrement',
                amount: 1,
            });

            await createRequest(
                'patch',
                `/users/${cachedAnswer.creator}/points`,
                {
                    operation: 'decrement',
                    amount: 5,
                }
            );

            return res.send({ vote: 'downvoted' });
        }
    }

    return res.send({ vote: null });
}

module.exports = EditAnswerVote;
