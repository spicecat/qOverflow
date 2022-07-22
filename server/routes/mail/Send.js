const Mail = require('../../db/models/Mail');
const config = require('../../config.json');
const createRequest = require('../../utils/api');

async function Send(req, res) {
    const { username } = req.user;
    const { receiver, subject, text } = req.body;

    // Verify that required form data exists
    if (!receiver | !subject | !text) {
        return res.status(400).send(config.errorIncomplete);
    }

    const { success, message } = await createRequest('post', `/mail`, {
        sender: username,
        receiver,
        subject,
        text,
    });

    if (!success) return res.status(500).send(config.errorGeneric);

    // Cache newly created mail
    await Mail.create({ ...message, _id: message.mail_id });

    return res.sendStatus(200);
}

module.exports = Send;
