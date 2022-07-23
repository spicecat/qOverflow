const config = require('../config.json');

function trycatch(...callbacks) {
    return callbacks.map(
        callback => (req, res, next) => {
            try { callback(req, res, next); }
            catch { res.status(500).send(config.errorGeneric); }
        }
    )
}

module.exports = trycatch;
