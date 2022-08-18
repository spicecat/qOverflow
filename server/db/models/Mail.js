const mongoose = require('mongoose');

const Mail = mongoose.Schema(
    {
        createdAt: { type: Date, required: true, default: Date.now },
        mail_id: { type: String, required: true },
        receiver: { type: String, required: true },
        sender: { type: String, required: true },
        subject: { type: String, required: true },
        text: { type: String, required: true },
        read: { type: Boolean, required: true, default: false },
    },
    { timestamps: false }
);

module.exports = mongoose.model('Mail', Mail);
