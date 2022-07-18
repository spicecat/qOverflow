const Answer = require('../../db/models/Answer');
const fetchAnswers = require('../../utils/fetchAnswers');
const config = require('../../config.json');

async function Answers(req, res, next) {
    const user = req.user;

    if (user.lastAnswerFetch + config.answerExpires > Date.now()) {
        const cachedAnswers = await Answer.find({
            creator: user.username,
        }).sort({ createdAt: 'desc' });

        return res.send(cachedAnswers);
    }

    const { success, requests } = await fetchAnswers(
        `/users/${username}/answers`
    );

    if (!success) return res.status(500).send(config.errorGeneric);

    await requests
        .reduce(async (acc, req) => {
            const reformat = req.messages.map((message) => ({
                ...message,
                id: message.mail_id,
            }));
            return [...reformat, ...acc];
        }, [])
        .map(async (message) => {
            return await Mail.findByIdAndUpdate(message.id, message, {
                upsert: true,
            });
        });

    const cachedAnswers = await Answer.find({
        creator: user.username,
    }).sort({ createdAt: 'desc' });

    return res.send(cachedAnswers);
}

module.exports = Answers;
