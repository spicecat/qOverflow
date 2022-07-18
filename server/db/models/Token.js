const mongoose = require('mongoose');

const Token = mongoose.Schema(
    {
        token: { type: String, required: true },
        expires: { type: Boolean, required: true, default: true },
        secret: {
            type: mongoose.Schema.Types.ObjectID,
            required: true,
            ref: 'User',
        },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.model('Tokens', Token);
