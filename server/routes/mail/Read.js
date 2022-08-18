const createRequest = require('server/utils/api');
const deriveKeyFromPassword = require('server/utils/auth');
const Mail = require('server/db/models/Mail');
const config = require('server/config.json');

async function Read(req, res) {
    const { id } = req.body;

    const cachedMail = await Mail.findByIdAndUpdate(id, { read: true });

    return cachedMail ? res.sendStatus(200) : res.status(404).send(config.errorNotFound);
}

module.exports = Edit;
