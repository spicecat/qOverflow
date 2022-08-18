const mongoose = require('mongoose');

const Badge = mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    rank: { type: String, required: true, enum: ['Gold', 'Silver', 'Bronze'] },
});

module.exports = mongoose.model('Badge', Badge);
