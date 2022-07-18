const mongoose = require('mongoose');

const ResetRequest = mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    expireAt: { type: Date, expires: 1800 },
});

module.exports = mongoose.model('ResetRequest', ResetRequest);
