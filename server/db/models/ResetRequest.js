const mongoose = require('mongoose');

const ResetRequest = mongoose.Schema({
    expireAt: { type: Date, expires: 1800 },
});

ResetRequest.virtual('user', {
    ref: 'User',
    localField: 'user',
    foreignField: 'username',
    justOne: true,
});

module.exports = mongoose.model('ResetRequest', ResetRequest);
