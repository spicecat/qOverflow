const mongoose = require('mongoose');

const Token = mongoose.Schema(
    {
        token: { type: String, required: true },
        user: { type: String, required: true },
        expires: { type: Boolean, required: true, default: true },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.model('Tokens', Token);
