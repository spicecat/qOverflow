const mongoose = require('mongoose');
const calculateUserBadges = require('../../utils/badges/userBadges');

const User = mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        points: { type: Number, required: true, default: 0 },
        salt: { type: String, required: true },
        lastMailFetch: { type: Date, default: new Date(0) },
        lastAnswerFetch: { type: Date, default: new Date(0) },
        user_id: { type: String, required: true, unique: true },
        badges: [String],
    },
    { timestamps: { createdAt: false, updatedAt: true } }
);

User.post('findOneAndUpdate', async (doc) => {
    const badges = calculateUserBadges(doc.points);
    doc.badges = [...new Set([...doc.badges, ...badges])];
    await doc.save();
});

module.exports = mongoose.model('User', User);
