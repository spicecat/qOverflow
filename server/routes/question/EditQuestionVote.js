const createRequest = require('../../utils/api');
const config = require('../../config.json');
const getUserLevel = require('../../utils/getUserLevel');
const Vote = require('../../db/models/Vote');

async function EditQuestionVote(req, res, next) {
    const user = req.user;
    const { questionID } = req.params;
    const { operation } = req.body;

    const userLevel = getUserLevel(user.points);
    if (operation === 'upvote' && userLevel < 2) {
        return res.status(403).send(config.errorForbidden);
    }

    if (operation === 'downvote' && userLevel < 4) {
        return res.status(403).send(config.errorForbidden);
    }

    const URL = `/questions/${questionID}/vote/${user.username}`;

    if (!operation) return res.status(400).send(config.errorIncomplete);

    var cachedVote = await Vote.findOneAndDelete({
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

            if (!success) return res.status(500).send(config.errorGeneric);

            await Vote.create({
                parentID: questionID,
                creator: user.username,
                status: 'downvoted',
                docModel: 'Question',
            });

            return res.send({ success: true, vote: 'downvoted' });
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
                parentID: questionID,
                creator: user.username,
                status: 'upvoted',
                docModel: 'Question',
            });

            return res.send({ success: true, vote: 'upvoted' });
        }
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

            return res.send({ success: true, vote: 'upvoted' });
        } else if (operation === 'downvote') {
            const { success } = await createRequest('patch', URL, {
                operation: 'increment',
                target: 'downvotes',
            });

            if (!success) return res.status(500).send(config.errorGeneric);

            await Vote.create({
                parentID: questionID,
                creator: user.username,
                status: 'downvoted',
                docModel: 'Question',
            });

            return res.send({ success: true, vote: 'downvoted' });
        }
    }

    return res.send({ success: true, vote: null });
}

module.exports = EditQuestionVote;
