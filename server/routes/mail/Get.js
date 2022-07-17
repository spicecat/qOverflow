const config = require('../../config.json');
const paginatedFetch = require('../../utils/paginatedFetch');
const isExpired = require('../../utils/isExpired');
const Mail = require('../../db/models/Mail');

async function Get(req, res, next) {
    const user = req.user;

    const cachedMail = await Mail.find({ reciever: user.username }).sort({
        createdAt: 'desc',
    });

    if (cachedMail.length && !isExpired(cachedMail[0], config.mailExpires)) {
        return res.send({ success: true, messages: cachedMail });
    }

    const recentTimestamp = cachedMail[0] ? cachedMail[0].createdAt : 0;
    const { success, requests } = await paginatedFetch(
        `/mail/${username}`,
        'mail',
        recentTimestamp
    );

    if (!success) return res.status(500).send(config.errorGeneric);

    requests.map(async ({ messages }) => {
        await Mail.create(
            messages.map((message) => ({ ...message, id: mail_id }))
        );
    });

    const updatedCache = await Mail.find({ reciever: username }).sort({
        createdAt: 'desc',
    });

    return res.send({ success: true, messages: updatedCache });
}

module.exports = Get;
