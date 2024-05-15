const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const User = new mongoose.Schema({
    //..................................
    userName: {
        type: String,
        require: true
    },
    //..................................
    googleId: {
        type: String,
    },
    //..................................
    email: {
        type: String,
        unique: true,
        require: true
    },
    //..................................
    password: {
        type: String,
        require: true
    },
    //..................................
    is_Block: {
        type: Boolean,
        default: false
    },
    //..................................
    is_verified: {
        type: Boolean,
        default: false,
    },
    //..................................
    is_Author: {
        type: Boolean,
        default: false
    },
    //...................................
    library: [{
        type: ObjectId,
        ref: 'NovelsData'
    }],
    //.....................................
    community: [{
        type: ObjectId,
        ref: 'CommunityData'
    }],
    //.....................................
});

const model = mongoose.model('UserData', User);

module.exports = model;