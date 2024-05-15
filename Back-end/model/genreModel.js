const mongoose = require('mongoose');

const Genre = new mongoose.Schema({
    //..................................
    name: {
        type: String,
        require: true,
        unique: true
    },
    //..................................
    description: {
        type: String,
    },
    //..................................
    is_Hide: {
        type: Boolean,
        default: false
    }
    //..................................
});

const model = mongoose.model('GenreData', Genre);

module.exports = model;