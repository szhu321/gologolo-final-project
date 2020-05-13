const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdLogos: [ //list of logo ids
        {
            type: Schema.Types.ObjectId, //logo id.
            ref: 'Logo'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);