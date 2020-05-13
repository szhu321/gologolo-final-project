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
    logoTexts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'LogoText'
        }
    ],
    logoImages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'LogoImage'
        }
    ],
    lastUpdate: {
        type: Date,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Logo', logoSchema);