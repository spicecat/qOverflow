const mongoose = require('mongoose');

const Answer = mongoose.Schema(
    {
        questionID: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
        creator: { type: String, required: true, ref: 'User' },
        createdAt: { type: Date, required: true },
        text: { type: String, required: true },
        upvotes: { type: Number, required: true, default: 0 },
        downvotes: { type: Number, required: true, default: 0 },
        accepted: { type: Boolean, require: true, default: false },
    },
    { timestamps: { createdAt: false, updatedAt: true } }
);

module.exports = mongoose.model('Answer', Answer);
