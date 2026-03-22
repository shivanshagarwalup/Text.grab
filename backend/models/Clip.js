const mongoose = require('mongoose');

const clipSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 6
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: '1h' } // TTL of 1 hour
    }
});

module.exports = mongoose.model('Clip', clipSchema);
