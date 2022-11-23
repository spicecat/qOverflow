const ResetRequest = require('../../db/models/ResetRequest');

async function RequestReset(req, res) {
    const { username } = req.body;

    const request = await ResetRequest.create({ user: username });

    console.log(
        `Your request to reset your password has been received. Visit http://localhost:3000/users/recover/${request.id} to reset your password.`
    );

    return res.sendStatus(200);
}

module.exports = RequestReset;
