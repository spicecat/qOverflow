const config = require('server/config.json');
const Mail = require('server/db/models/Mail');
const User = require('server/db/models/User');
const { getAllMail } = require('server/utils/getData');

async function Get(req, res) {
    const { user: lastMailFetch, username } = req;

    // Fetch mail if expired
    if (Number(lastMailFetch) + config.mailExpires < Date.now()) {
        const messages = await getAllMail({ username });
        return res.send({ messages });
    }
    else {
        const messages = await Mail.find({ receiver: username }).sort({
            createdAt: 'desc',
        });
        return res.send({ messages });
    }
}

module.exports = Get;
