const mongoose = require('mongoose');

const User = mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        points: { type: String, required: true, default: 0 },
        salt: { type: String, required: true },
        lastMailFetch: { type: Date, default: new Date(0) },
        lastAnswerFetch: { type: Date, default: new Date(0) },
    },
    { timestamps: { createdAt: false, updatedAt: true } }
);

User.virtual('token', {
    ref: 'Token',
    localField: '_id',
    foreignField: 'user',
    justOne: true,
});

User.virtual('resetRequest', {
    ref: 'ResetRequest',
    localField: 'username',
    foreignField: 'user',
    justOne: true,
});

User.virtual('answers', {
    ref: 'Answer',
    localField: 'username',
    foreignField: 'creator',
});

User.virtual('questions', {
    ref: 'Question',
    localField: 'username',
    foreignField: 'creator',
});

User.virtual('messages', {
    ref: 'Mail',
    localField: 'username',
    foreignField: 'reciever',
});

User.virtual('votes', {
    ref: 'Vote',
    localField: 'username',
    foreignField: 'creator',
});

module.exports = mongoose.model('User', User);
