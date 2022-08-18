const mongoose = require('mongoose');
const calculateAnswerBadges = require('../../utils/badges/answerBadges');
const User = require('./User');

const Answer = mongoose.Schema(
    {
        question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
        answer_id: { type: String, required: true },
        creator: { type: String, required: true },
        text: { type: String, required: true },
        upvotes: { type: Number, required: true, default: 0 },
        downvotes: { type: Number, required: true, default: 0 },
        accepted: { type: Boolean, required: true, default: false },
        createdAt: { type: Date, required: true },
        lastCommentFetch: { type: Date, default: new Date(0) },
    },
    { timestamps: { createdAt: false, updatedAt: true } }
);

Answer.post('findOneAndUpdate', (doc) => {
    const badges = calculateAnswerBadges(doc.points);

    User.findOneAndUpdate({ username: doc.creator }, { $addToSet: { tags: { $each: badges } } });
});

module.exports = mongoose.model('Answer', Answer);
