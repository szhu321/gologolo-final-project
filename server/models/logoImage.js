const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logoImageSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    logoId: {
        type: Schema.Types.ObjectId,
        ref: 'Logo',
        required: true
    }
});

module.exports = mongoose.model('LogoImage', logoImageSchema);