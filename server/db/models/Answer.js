const mongoose = require('mongoose');

const Answer = mongoose.Schema(
    {
        questionID: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
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

module.exports = mongoose.model('Answer', Answer);
