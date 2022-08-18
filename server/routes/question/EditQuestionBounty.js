const Question = require('server/db/models/Question');
const User = require('server/db/models/User');
const createRequest = require('server/utils/api');
const getUserLevel = require('server/utils/getUserLevel');
const config = require('server/config.json');

async function EditQuestionBounty(req, res) {
    const { user } = req.user;
    const { question_id } = req.params;
    const { bounty } = req.body;

    if (!bounty) return res.status(400).send(config.errorIncomplete);
    const userLevel = getUserLevel(user.points);

    if (userLevel < 4 || user.points < bounty) {
        return res.status(403).send(config.errorForbidden);
    }

    await Question.findByIdAndUpdate(question_id, { hasBounty: bounty });

    await User.findOneAndUpdate(
        { username: cachedAnswer.creator },
        { $inc: { points: Math.abs(bounty) * -1 } }
    );
    await createRequest('patch', `/users/${cachedAnswer.creator}/points`, {
        operation: 'decrement',
        amount: bounty,
    });
}

module.exports = EditQuestionBounty;
