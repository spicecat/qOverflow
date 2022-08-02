const mongoose = require('mongoose');

const User = mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        points: { type: Number, required: true, default: 0 },
        salt: { type: String, required: true },
        lastMailFetch: { type: Date, default: new Date(0) },
        lastAnswerFetch: { type: Date, default: new Date(0) },
        user_id: { type: String, required: true, unique: true },
    },
    { timestamps: { createdAt: false, updatedAt: true } }
);

module.exports = mongoose.model('User', User);
