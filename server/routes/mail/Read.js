const Mail = require('../../db/models/Mail');
const config = require('../../config.json');

async function Read(req, res) {
    const { mail_id } = req.params;

    const cachedMail = await Mail.findByIdAndUpdate(mail_id, { read: true });

    return cachedMail ? res.sendStatus(200) : res.status(404).send(config.errorNotFound);
}

module.exports = Read;
