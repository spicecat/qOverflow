const Mail = require('../../db/models/Mail');
const createRequest = require('../../utils/api');

async function Send(req, res, next) {
    const user = req.user;
    const { reciever, subject, text } = req.body;

    if (!reciever | !subject | !text) {
        return res
            .status(400)
            .send({
                success: false,
                error: 'Your message is missing information.',
            });
    }

    const { success } = await createRequest('post', `/mail/${username}`, {
        sender: user,
    });

    return success
        ? res.send({ success: true, message: 'Your message has been sent.' })
        : res.status(500).send('Something went wrong.');
}

module.exports = Send;
