const createRequest = require('../../utils/api');
const config = require('../../config.json');
const { checkOutdated } = require('../../utils/checkOutdated');
const getAllMail = require('../../utils/getAllMail');
const Mail = require('../../db/models/Mail');

async function Get(req, res, next) {
    const { username } = req.params;

    const messages = Mail.find({ reciever: username }).sort({
        createdAt: 'descending',
    });

    if (mail.length === 0 && checkOutdated(mail[0], config.mailExpires)) {
        try {
            await getAllMail();
        } catch {
            return res
                .status(500)
                .send({ success: false, error: config.errorGeneric });
        }
    } else {
        return res.send({ success: true, messages });
    }

    const newMessages = Mail.find({ reciever, username }).sort({
        createdAt: 'descending',
    });

    return res.send({ success: true, messages: newMessages });
}

module.exports = Get;
