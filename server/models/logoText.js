const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logoTextSchema = new Schema({
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    fontSize: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('LogoText', logoTextSchema);