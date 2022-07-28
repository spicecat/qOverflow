const config = require('server/config.json');
const User = require('server/db/models/User');
const Vote = require('server/db/models/Vote');
const { getQuestion, refreshQuestion } = require('server/services/questionServices');
const createRequest = require('server/utils/api');
const getUserLevel = require('server/utils/getUserLevel');

async function downvote(res, user) {
    {
        const { success } = await createRequest('patch', URL, {
            operation: 'increment',
            target: 'downvotes',
        });
        if (!success) return res.status(500).send(config.errorGeneric);
        await Vote.create({
            parent_id: question_id,
            creator: user.username,
            status: 'downvoted',
            docModel: 'Question',
        });
    }
    {
        const { success } = await createRequest('patch', `/users/${user.username}/points`, {
            operation: 'decrement',
            amount: 1,
        });
        if (!success) return res.status(500).send(config.errorGeneric);
        await User.findByIdAndUpdate(user.id, { $inc: { points: -1 } });
    }
}

async function upvote(res, user) {
    const { success } = await createRequest('patch', URL, {
        operation: 'increment',
        target: 'upvotes',
    });
    if (!success) return res.status(500).send(config.errorGeneric);
    await Vote.create({
        parent_id: question_id,
        creator: user.username,
        status: 'upvoted',
        docModel: 'Question',
    });
}

async function EditQuestionVote(req, res) {

    const { user } = req;
    const { question_id } = req.params;
    const { operation } = req.body;

    if (!operation) return res.status(400).send(config.errorIncomplete);

    const userLevel = getUserLevel(user.points);

    if (operation === 'upvote' && userLevel < 2)
        return res.status(403).send(config.errorForbidden);

    if (operation === 'downvote' && userLevel < 4)
        return res.status(403).send(config.errorForbidden);

    const URL = `/questions/${question_id}/vote/${user.username}`;

    const question = await getQuestion(question_id);
    if (!question) return res.status(404).send(config.errorNotFound);

    let cachedVote = await Vote.findOneAndDelete({
        parent_id: question_id,
        creator: user.username,
    });

    if (!cachedVote) {
        const { success, vote } = await createRequest('get', URL);
        if (!success) return res.status(500).send(config.errorGeneric);
        cachedVote = vote ?? null;
    }

    if (cachedVote === 'upvoted') {
        {
            const { success } = await createRequest('patch', URL, {
                operation: 'decrement',
                target: 'upvotes',
            });
            if (!success) return res.status(500).send(config.errorGeneric);
        }
        if (operation === 'downvote') {
            await downvote(res, user);
            {
                const { success } = await createRequest(
                    'patch',
                    `/users/${question.creator}/points`,
                    {
                        operation: 'decrement',
                        amount: 6,
                    }
                );
                if (!success) return res.status(500).send(config.errorGeneric);
            }
        } else {
            const { success } = await createRequest(
                'patch',
                `/users/${question.creator}/points`,
                {
                    operation: 'decrement',
                    amount: 5,
                }
            );
            if (!success) return res.status(500).send(config.errorGeneric);
            return res.send({ vote: 'upvoted' });
        }
    } else if (cachedVote === 'downvoted') {
        {
            const { success } = await createRequest('patch', URL, {
                operation: 'decrement',
                target: 'downvotes',
            });
            if (!success) return res.status(500).send(config.errorGeneric);
        }
        if (operation === 'upvote') {
            await upvote(res, user);
            {
                const { success } = await createRequest('patch', `/users/${question.creator}/points`, {
                    operation: 'increment',
                    amount: 6,
                });
                if (!success) return res.status(500).send(config.errorGeneric);
            }
            return res.send({ vote: 'upvoted' });
        } else {
            {
                const { success } = await createRequest('patch', `/users/${question.creator}/points`, {
                    operation: 'increment',
                    amount: 1,
                });
                if (!success) return res.status(500).send(config.errorGeneric);
            }
            {
                const { success } = await createRequest('patch', `/users/${user.username}/points`, {
                    operation: 'increment',
                    amount: 1,
                });
                if (!success) return res.status(500).send(config.errorGeneric);
                await User.findByIdAndUpdate(user.id, { $inc: { points: 1 } });
            }
        }
    } else {
        if (operation === 'upvote') {
            await upvote(res, user);
            {
                const { success } = await createRequest('patch', `/users/${question.creator}/points`, {
                    operation: 'increment',
                    amount: 5,
                });
                if (!success) return res.status(500).send(config.errorGeneric);
            }
            return res.send({ vote: 'upvoted' });
        } else if (operation === 'downvote') {
            await downvote(res, user);
            {
                const { success } = await createRequest('patch', `/users/${question.creator}/points`, {
                    operation: 'decrement',
                    amount: 1,
                });
                if (!success) return res.status(500).send(config.errorGeneric);
            }
            return res.send({ vote: 'downvoted' });
        }
    }
    return res.send({ vote: null });
}

module.exports = EditQuestionVote;
