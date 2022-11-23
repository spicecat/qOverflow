const config = require('../../config.json');
const User = require('../../db/models/User');
const Vote = require('../../db/models/Vote');
const Question = require('../../db/models/Question');
const createRequest = require('../../utils/api');
const getUserLevel = require('../../utils/getUserLevel');

async function upvote(res, user) {}

async function EditQuestionVote(req, res) {
    const { user } = req;
    const { question_id } = req.params;
    const { operation } = req.body;

    if (!operation) return res.status(400).send(config.errorIncomplete);

    // Filter out requests that do not have the permissions
    const userLevel = getUserLevel(user.points);

    if (operation === 'upvote' && userLevel < 2) {
        return res.status(403).send(config.errorForbidden);
    }

    if (operation === 'downvote' && userLevel < 5) {
        return res.status(403).send(config.errorForbidden);
    }

    const URL = `/questions/${question_id}/vote/${user.username}`;

    // Verify that the question exists
    const question = await Question.findById(question_id);
    if (!question) return res.status(404).send(config.errorNotFound);

    // Find the cached vote and record the status
    let cachedVote = await Vote.findOneAndDelete({
        parent_id: question_id,
        creator: user.username,
    });

    if (!cachedVote) {
        const { error, vote } = await createRequest('get', URL);
        cachedVote = !error ? { status: vote } : { status: null };
    }

    if (cachedVote.status === 'upvoted') {
        // Undo the previous upvote status
        const { success } = await createRequest('patch', URL, {
            operation: 'decrement',
            target: 'upvotes',
        });

        if (!success) return res.status(500).send();

        if (operation === 'downvote') {
            // Change the vote status to downvoted
            const { success } = await createRequest('patch', URL, {
                operation: 'increment',
                target: 'downvotes',
            });

            if (!success) {
                return res.status(500).send(config.errorGeneric);
            }

            // Cache the new vote
            await Vote.create({
                parent_id: question_id,
                creator: user.username,
                status: 'downvoted',
                docModel: 'Question',
            });

            // Decrement the question creator's points
            await createRequest('patch', `/users/${question.creator}/points`, {
                operation: 'decrement',
                amount: 6,
            });
            await User.findOneAndUpdate({ username: question.creator }, { $inc: { points: -6 } });

            // Decrement the user's points
            await createRequest('patch', `/users/${user.username}/points`, {
                operation: 'decrement',
                amount: 1,
            });
            await User.findByIdAndUpdate(user.id, { $inc: { points: -1 } });

            return res.send({ vote: 'downvoted' });
        } else {
            // Decrement the question creator's points
            const { success } = await createRequest('patch', `/users/${question.creator}/points`, {
                operation: 'decrement',
                amount: 5,
            });

            await User.findOneAndUpdate({ username: question.creator }, { $inc: { points: -5 } });

            if (!success) return res.status(500).send(config.errorGeneric);

            return res.send({ vote: null });
        }
    } else if (cachedVote.status === 'downvoted') {
        // Undo the previous vote status
        const { success } = await createRequest('patch', URL, {
            operation: 'decrement',
            target: 'downvotes',
        });

        if (!success) return res.status(500).send(config.errorGeneric);

        if (operation === 'upvote') {
            // Increment upvotes
            const { success } = await createRequest('patch', URL, {
                operation: 'increment',
                target: 'upvotes',
            });

            if (!success) return res.status(500).send(config.errorGeneric);

            // Cache the new vote
            await Vote.create({
                parent_id: question_id,
                creator: user.username,
                status: 'upvoted',
                docModel: 'Question',
            });

            // Increment question creator's points
            await createRequest('patch', `/users/${question.creator}/points`, {
                operation: 'increment',
                amount: 6,
            });
            await User.findOneAndUpdate({ username: question.creator }, { $inc: { points: 6 } });

            return res.send({ vote: 'upvoted' });
        } else {
            // Increment the question creator's points
            await createRequest('patch', `/users/${question.creator}/points`, {
                operation: 'increment',
                amount: 1,
            });
            await User.findOneAndUpdate({ username: question.creator }, { $inc: { points: 1 } });

            // Increment the user's points
            await createRequest('patch', `/users/${user.username}/points`, {
                operation: 'increment',
                amount: 1,
            });
            await User.findByIdAndUpdate(user.id, { $inc: { points: 1 } });

            return res.send({ vote: null });
        }
    } else {
        if (operation === 'upvote') {
            // Increment upvotes
            const { success } = await createRequest('patch', URL, {
                operation: 'increment',
                target: 'upvotes',
            });

            if (!success) return res.status(500).send(config.errorGeneric);

            // Cache the new vote
            await Vote.create({
                parent_id: question_id,
                creator: user.username,
                status: 'upvoted',
                docModel: 'Question',
            });

            // Increment question creator's points
            await createRequest('patch', `/users/${question.creator}/points`, {
                operation: 'increment',
                amount: 5,
            });
            await User.findOneAndUpdate({ username: question.creator }, { $inc: { points: 5 } });

            return res.send({ vote: 'upvoted' });
        } else if (operation === 'downvote') {
            // Change the vote status to downvoted
            const { success } = await createRequest('patch', URL, {
                operation: 'increment',
                target: 'downvotes',
            });

            if (!success) {
                return res.status(500).send(config.errorGeneric);
            }

            // Cache the new vote
            await Vote.create({
                parent_id: question_id,
                creator: user.username,
                status: 'downvoted',
                docModel: 'Question',
            });

            // Decrement the question creator's points
            await createRequest('patch', `/users/${question.creator}/points`, {
                operation: 'decrement',
                amount: 1,
            });
            await User.findOneAndUpdate({ username: question.creator }, { $inc: { points: -1 } });

            // Decrement the user's points
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
