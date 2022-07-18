const mongoose = require('mongoose');

const Answer = mongoose.Schema(
    {
        questionID: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
        createdAt: { type: Date, required: true },
        text: { type: String, required: true },
        upvotes: { type: Number, required: true, default: 0 },
        downvotes: { type: Number, required: true, default: 0 },
        accepted: { type: Boolean, require: true, default: false },
        lastCommentFetch: { type: Date, default: new Date(0) },
    },
    { timestamps: { createdAt: false, updatedAt: true } }
);

Answer.virtual('creator', {
    ref: 'User',
    localField: 'creator',
    foreignField: 'username',
    justOne: true,
});

Answer.virtual('commentList', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'parentID',
});

module.exports = mongoose.model('Answer', Answer);
