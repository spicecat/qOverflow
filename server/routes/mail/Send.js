const Mail = require('server/db/models/Mail');
const User = require('../../db/models/User');
const config = require('server/config.json');
const createRequest = require('server/utils/api');

async function Send(req, res) {
    const { username } = req.user;
    const { receiver, subject, text } = req.body;

    // Verify required form data exists
    if (!receiver | !subject | !text) {
        return res.status(400).send(config.errorIncomplete);
    }

    const cachedReciever = await User.findOne({ username: reciever });

    if (!cachedReciever) {
        return res.status(404).send(config.errorNotFound);
    }

    const { success, message } = await createRequest('post', `/mail`, {
        sender: username,
        receiver,
        subject,
        text,
    });

    if (!success) return res.status(500).send(config.errorGeneric);

    // Cache newly created mail
    const newMessage = await Mail.create({ ...message, _id: message.mail_id });

    return res.send({ message: newMessage });
}

module.exports = Send;
