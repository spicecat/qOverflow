const config = require('../../config.json');
const Mail = require('../../db/models/Mail');
const { getAllMail } = require('../../utils/getData');

async function Get(req, res) {
    const { lastMailFetch, username } = req.user;

    // Fetch mail if expired
    if (Number(lastMailFetch) + config.mailExpires < Date.now()) {
        const messages = await getAllMail({ username });
        return res.send({ messages });
    } else {
        const messages = await Mail.find({ receiver: username }).sort({
            createdAt: 'desc',
        });

        return res.send({ messages });
    }
}

module.exports = Get;
