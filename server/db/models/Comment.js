const mongoose = require('mongoose');

const Comment = mongoose.Schema(
    {
        parentID: { type: mongoose.Schema.Types.ObjectId, refPath: 'docModel' },
        createdAt: { type: Date, required: true },
        text: { type: String, required: true },
        upvotes: { type: Number, required: true, default: 0 },
        downvotes: { type: Number, required: true, default: 0 },
        docModel: {
            type: String,
            required: true,
            enum: ['Question', 'Answer'],
        },
    },
    { timestamps: { createdAt: false, updatedAt: true } }
);

Comment.virtual('creator', {
    ref: 'User',
    localField: 'creator',
    foreignField: 'username',
    justOne: true,
});

module.exports = mongoose.model('Comment', Comment);
