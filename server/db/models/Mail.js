const mongoose = require('mongoose');

const Mail = mongoose.Schema(
    {
        sender: { type: String, required: true },
        subject: { type: String, required: true },
        text: { type: String, required: true },
        createdAt: { type: Date, required: true },
    },
    { timestamps: false }
);

Mail.virtual('reciever', {
    ref: 'User',
    localField: 'reciever',
    foreignField: 'username',
    justOne: true,
});

module.exports = mongoose.model('Mail', Mail);
