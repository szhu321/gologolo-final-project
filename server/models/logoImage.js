const mongoose = require('mogoose');

const Schema = mongoose.Schema;

const logoImageSchema = new Schema({
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
    }
});