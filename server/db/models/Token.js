const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        expires: { type: Boolean, required: true, default: true },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.model('Tokens', TokenSchema);
