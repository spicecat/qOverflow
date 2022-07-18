const mongoose = require('mongoose');

const Question = mongoose.Schema(
    {
        title: { type: String, required: true },
        text: { type: String, required: true },
        status: { type: String, required: true },
        createdAt: { type: Date, required: true },
        views: { type: Number, required: true },
        answers: { type: Number, required: true },
        comments: { type: Number, required: true },
        upvotes: { type: Number, required: true },
        downvotes: { type: Number, required: true },
        hasAccepted: { type: Boolean, required: true, default: false },
        lastAnswerFetch: { type: Date, default: new Date(0) },
        lastCommentFetch: { type: Date, default: new Date(0) },
    },
    { timestamps: { createdAt: false, updatedAt: true } }
);

Question.virtual('creator', {
    ref: 'User',
    localField: 'creator',
    foreignField: 'username',
    justOne: true,
});

Question.virtual('answersList', {
    ref: 'Answer',
    localField: '_id',
    foreignField: 'questionID',
});

Question.virtual('commentsList', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'parentID',
});

module.exports = mongoose.model('Question', Question);
