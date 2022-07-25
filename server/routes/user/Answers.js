const config = require('../../config.json');
const Answer = require('../../db/models/Answer');
const fetchAnswers = require('../../utils/fetchAnswers');

async function Answers(req, res) {
    const { user: {lastAnswerFetch, username} } = req;

    if (Number(lastAnswerFetch) + config.answerExpires > Date.now()) {
        const cachedAnswers = await Answer.find({
            creator: username,
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
            return Mail.findByIdAndUpdate(message.id, message, {
                upsert: true,
            });
        });

    const cachedAnswers = await Answer.find({
        creator: username,
    }).sort({ createdAt: 'desc' });

    return res.send({ answers: cachedAnswers });
}

module.exports = Answers;
