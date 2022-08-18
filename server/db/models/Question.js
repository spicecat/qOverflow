const mongoose = require('mongoose');

const Question = mongoose.Schema(
    {
        answers: { type: Number, required: true, default: 0 },
        comments: { type: Number, required: true, default: 0 },
        createdAt: { type: Date, required: true, default: Date.now },
        creator: { type: String, required: true },
        downvotes: { type: Number, required: true, default: 0 },
        hasAcceptedAnswer: { type: Boolean, required: true, default: false },
        lastAnswerFetch: { type: Date, default: new Date(0) },
        lastCommentFetch: { type: Date, default: new Date(0) },
        protect: [String],
        reopen: [String],
        close: [String],
        edit: [String],
        editText: { type: String },
        tags: [String],
        question_id: { type: String, required: true },
        status: { type: String, required: true, default: 'open' },
        text: { type: String, required: true },
        title: { type: String, required: true },
        upvotes: { type: Number, required: true, default: 0 },
        views: { type: Number, required: true, default: 0 },
    },
    { timestamps: { createdAt: false, updatedAt: true } }
);

module.exports = mongoose.model('Question', Question);
