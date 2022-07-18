const mongoose = require('mongoose');

const ResetRequest = mongoose.Schema({
    user: { type: String, required: true },
    expireAt: { type: Date, expires: 1800 },
});

module.exports = mongoose.model('ResetRequest', ResetRequest);
