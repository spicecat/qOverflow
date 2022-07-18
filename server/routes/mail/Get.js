const config = require('../../config.json');
const fetchMail = require('../../utils/fetchMail');
const Mail = require('../../db/models/Mail');
const User = require('../../db/models/User');

async function Get(req, res, next) {
    const user = req.user;

    const cachedMail = await Mail.find({ reciever: user.username }).sort({
        createdAt: 'desc',
    });

    if (
        cachedMail.length &&
        user.lastMailFetch + config.mailExpires > Date.now()
    ) {
        return res.send({ messages: cachedMail });
    }

    const recentTimestamp = cachedMail[0] ? cachedMail[0].createdAt : 0;
    const { success, requests } = await fetchMail(
        `/mail/${username}`,
        recentTimestamp
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

    await User.findByIdAndUpdate(user.id, { lastMailFetch: Date.now() });

    const updatedCache = await Mail.find({ reciever: username }).sort({
        createdAt: 'desc',
    });

    return res.send({ messages: updatedCache });
}

module.exports = Get;
