const ResetRequest = require('../../db/models/ResetRequest');

async function RequestReset(req, res, next) {
    const { username } = req.query;

    const request = await ResetRequest.create({ user: username });
    console.log(
        `Your request to reset your password has been reciever. Visit http://localhost:3000/reset/${request.id} to reset your password.`
    );

    return res.send({ success: true });
}

module.exports = RequestReset;
