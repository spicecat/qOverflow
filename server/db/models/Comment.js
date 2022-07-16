const mongoose = require('mongoose');

const Comment = mongoose.Schema(
    {
        parentID: { type: mongoose.Schema.Types.ObjectId, ref: 'docModel' },
        creator: { type: String, required: true },
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

module.exports = mongoose.model('Comment', Comment);
