const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    backgroundColor: {
        type: String,
        required: true
    },
    borderColor: {
        type: String,
        required: true
    },
    borderRadius: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    borderWidth: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    padding: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    margins: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    lastUpdate: {
        type: Date,
        required: true
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Logo', logoSchema);