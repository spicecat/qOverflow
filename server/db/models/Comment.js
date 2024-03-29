const mongoose = require('mongoose');

const Comment = mongoose.Schema(
    {
        parent_id: { type: mongoose.Schema.Types.ObjectId, refPath: 'docModel' },
        comment_id: { type: String, required: true },
        creator: { type: String, required: true },
        text: { type: String, required: true },
        upvotes: { type: Number, required: true, default: 0 },
        downvotes: { type: Number, required: true, default: 0 },
        createdAt: { type: Date, required: true, default: Date.now },
        docModel: {
            type: String,
            required: true,
            enum: ['Question', 'Answer'],
        },
    },
    { timestamps: { createdAt: false, updatedAt: true } }
);

module.exports = mongoose.model('Comment', Comment);
