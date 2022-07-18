const mongoose = require('mongoose');

const Token = mongoose.Schema(
    {
        expires: { type: Boolean, required: true, default: true },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

Token.virtual('user', {
    ref: 'User',
    localField: 'user',
    foreignField: 'username',
    justOne: true,
});

module.exports = mongoose.model('Tokens', Token);
