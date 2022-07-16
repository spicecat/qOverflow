const mongoose = require('mongoose');

const ResetRequestSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
});

module.exports = mongoose.model('ResetRequest', ResetRequestSchema);
