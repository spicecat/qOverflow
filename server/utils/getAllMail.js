const createRequest = require('./api');
const config = require('../config.json');

const Mail = require('../db/models/Mail');

async function getAllMail(username, before, after = '') {
    const { success, messages } = await createRequest(
        'get',
        `/mail/${username}`,
        { after }
    );

    if (!success) throw new Error(config.errorGeneric);
    if (messages.length === 0) return 'You have no messages.';

    if (messages[messages.length - 1].createdAt < before) {
        return await Mail.create(
            messages.map((message) => ({ ...message, id: mail_id }))
        );
    } else {
        getAllMail(username, before, messages[messages.length - 1].mail_id);
    }
}

module.exports = getAllMail;
