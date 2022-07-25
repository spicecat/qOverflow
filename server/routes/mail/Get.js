const config = require('../../config.json');
const fetchMail = require('../../utils/fetchMail');
const Mail = require('../../db/models/Mail');
const User = require('../../db/models/User');

async function Get(req, res) {
    const { user } = req;

    // Retrieve cached mail
    const cachedMail = await Mail.find({ reciever: user.username }).sort({
        createdAt: 'desc',
    });

    // If there is cached mail and last fetch was recently, return
    if (
        cachedMail.length &&
        Number(user.lastMailFetch) + config.mailExpires > Date.now()
    ) {
        return res.send({ messages: cachedMail });
    }

    // Fetch the most recent mail
    const recentTimestamp = cachedMail[0] ? cachedMail[0].createdAt : 0;
    const { success, requests } = await fetchMail(
        `/mail/${user.username}`,
        recentTimestamp
    );

    if (!success) return res.status(500).send(config.errorGeneric);

    // Map over data and reformat it, before uploading to database
    await requests
        .reduce(async (acc, req) => {
            const reformat = req.messages.map((message) => ({
                ...message,
                _id: message.mail_id,
            }));
            return [...reformat, ...acc];
        }, [])
        .map(async (message) => {
            return Mail.findByIdAndUpdate(message.id, message, {
                upsert: true,
            });
        });

    // Set last fetch to current time
    await User.findByIdAndUpdate(user.id, { lastMailFetch: Date.now() });

    // Return updated cached Mail
    const updatedCache = await Mail.find({ receiver: user.username }).sort({
        createdAt: 'desc',
    });

    return res.send({ messages: updatedCache });
}

module.exports = Get;
