const Mail = require('../../db/models/Mail');
const createRequest = require('../../utils/api');

async function Send(req, res, next) {
    const user = req.user;
    const { reciever, subject, text } = req.body;

    if (!reciever | !subject | !text) {
        return res.status(400).send('Your request is missing information.');
    }

    const { success, message } = await createRequest(
        'post',
        `/mail/${username}`,
        {
            sender: user,
        }
    );

    Mail.create({ ...message, id: message.mail_id });

    return success
        ? res.send({ success: true })
        : res.status(500).send('Something went wrong.');
}

module.exports = Send;
