const createRequest = require('../../utils/api');
const config = require('../../config.json');
const getUserLevel = require('../../utils/getUserLevel');
const Vote = require('../../db/models/Vote');
const Question = require('../../db/models/Question');
const User = require('../../db/models/User');

async function EditQuestionVote(req, res) {
    const { user } = req;
    const { questionID } = req.params;
    const { operation } = req.body;

    if (!operation) return res.status(400).send(config.errorIncomplete);

    const userLevel = getUserLevel(user.points);

    if (operation === 'upvote' && userLevel < 2)
        return res.status(403).send(config.errorForbidden);

    if (operation === 'downvote' && userLevel < 4)
        return res.status(403).send(config.errorForbidden);

    const URL = `/questions/${questionID}/vote/${user.username}`;

    const cachedQuestion = await Question.findById(questionID);
    let cachedVote = await Vote.findOneAndDelete({
        parentID: questionID,
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

            await createRequest('patch', `/users/${user.username}/points`, {
                operation: 'decrement',
                amount: 1,
            });

            await User.findByIdAndUpdate(user.id, { $inc: { points: -1 } });

            if (!success) return res.status(500).send(config.errorGeneric);

            await Vote.create({
                parentID: questionID,
                creator: user.username,
                status: 'downvoted',
                docModel: 'Question',
            });

            await createRequest(
                'patch',
                `/users/${cachedQuestion.creator}/points`,
                {
                    operation: 'decrement',
                    amount: 6,
                }
            );

            return res.send({ vote: 'downvoted' });
        }

        await createRequest(
            'patch',
            `/users/${cachedQuestion.creator}/points`,
            {
                operation: 'decrement',
                amount: 5,
            }
        );
    } else if (cachedVote.status === 'downvoted') {
        const { success } = await createRequest('patch', URL, {
            operation: 'decrement',
            target: 'downvotes',
        });

        await createRequest('patch', `/users/${user.username}/points`, {
            operation: 'increment',
            amount: 1,
        });

        await User.findByIdAndUpdate(user.id, { $inc: { points: 1 } });

        if (!success) return res.status(500).send(config.errorGeneric);

        if (operation === 'upvote') {
            const { success } = await createRequest('patch', URL, {
                operation: 'increment',
                target: 'upvotes',
            });

            if (!success) return res.status(500).send(config.errorGeneric);

            await Vote.create({
                parentID: questionID,
                creator: user.username,
                status: 'upvoted',
                docModel: 'Question',
            });

            await createRequest(
                'patch',
                `/users/${cachedQuestion.creator}/points`,
                {
                    operation: 'increment',
                    amount: 6,
                }
            );

            return res.send({ vote: 'upvoted' });
        }

        await createRequest(
            'patch',
            `/users/${cachedQuestion.creator}/points`,
            {
                operation: 'increment',
                amount: 1,
            }
        );
    } else {
        if (operation === 'upvote') {
            const { success } = await createRequest('patch', URL, {
                operation: 'increment',
                target: 'upvotes',
            });

            if (!success) return res.status(500).send(config.errorGeneric);

            await Vote.create({
                parentID: questionID,
                creator: user.username,
                status: 'upvoted',
                docModel: 'Question',
            });

            await createRequest(
                'patch',
                `/users/${cachedQuestion.creator}/points`,
                {
                    operation: 'increment',
                    amount: 5,
                }
            );

            return res.send({ vote: 'upvoted' });
        } else if (operation === 'downvote') {
            const { success } = await createRequest('patch', URL, {
                operation: 'increment',
                target: 'downvotes',
            });

            if (!success) return res.status(500).send(config.errorGeneric);

            await createRequest(
                'patch',
                `/users/${cachedQuestion.creator}/points`,
                {
                    operation: 'decrement',
                    amount: 1,
                }
            );

            await Vote.create({
                parentID: questionID,
                creator: user.username,
                status: 'downvoted',
                docModel: 'Question',
            });

            await createRequest('patch', `/users/${user.username}/points`, {
                operation: 'decrement',
                amount: 1,
            });
            await User.findByIdAndUpdate(user.id, { $inc: { points: -1 } });

            return res.send({ vote: 'downvoted' });
        }
    }

    return res.send({ vote: null });
}

module.exports = EditQuestionVote;
