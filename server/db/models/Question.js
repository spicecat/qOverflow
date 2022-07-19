const mongoose = require('mongoose');

const Question = mongoose.Schema(
    {
        title: { type: String, required: true },
        text: { type: String, required: true },
        status: { type: String, required: true, default: 'open' },
        views: { type: Number, required: true, default: 0 },
        answers: { type: Number, required: true, default: 0 },
        comments: { type: Number, required: true, default: 0 },
        upvotes: { type: Number, required: true, default: 0 },
        downvotes: { type: Number, required: true, default: 0 },
        hasAccepted: { type: Boolean, required: true, default: false },
        creator: { type: String, required: true },
        reopen: [String],
        close: [String],
        protect: [String],
        lastAnswerFetch: { type: Date, default: new Date(0) },
        lastCommentFetch: { type: Date, default: new Date(0) },
        createdAt: { type: Date, required: true, default: Date.now },
    },
    { timestamps: { createdAt: false, updatedAt: true } }
);

module.exports = mongoose.model('Question', Question);
