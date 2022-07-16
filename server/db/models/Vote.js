const mongoose = require('mongoose');

const Comment = mongoose.Schema(
    {
        parentID: { type: mongoose.Schema.Types.ObjectId, ref: 'docModel' },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        status: {
            type: String,
            required: true,
            enum: ['upvoted', 'downvoted'],
        },
        docModel: {
            type: String,
            required: true,
            enum: ['Question', 'Answer', 'Comment'],
        },
    },
    { timestamps: { createdAt: false, updatedAt: true } }
);

module.exports = mongoose.model('Comment', Comment);
