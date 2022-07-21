const config = require('../config.json');

async function verifyRequest(req, res, next) {
    console.log(1313, req, 32323, req.params)
    if (0)
        return res.status(400).send(config.errorIncomplete);

    return next();
}

module.exports = verifyRequest;
