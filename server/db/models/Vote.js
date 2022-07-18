const mongoose = require('mongoose');

const Vote = mongoose.Schema(
    {
        parentID: { type: mongoose.Schema.Types.ObjectId, refPath: 'docModel' },
        creator: { type: String, required: true },
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
        expireAt: { type: Date, expire: 1800 },
    },
    { timestamps: { createdAt: false, updatedAt: true } }
);

module.exports = mongoose.model('Vote', Vote);