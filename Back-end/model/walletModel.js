const mongoose = require('mongoose');

const Wallet = new mongoose.Schema({
    //..................................
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserData",
        require: true
    },
    //..................................
    walletAmount: {
        type: Number,
        default: 0
    },
    //..................................
    amountAdd: [{
        amount: {
            type: Number,
        },
        //----------------
        date: {
            type: Date,
        }
        //----------------
    }],
    //..................................
    amountUse: [{
        amount: {
            type: Number,
            require: true
        },
        //----------------
        novelId: {
            type: String,
            require: true
        },
        //----------------
        novelName: {
            type: String,
            require: true
        },
        //----------------
        chapterNo: {
            type: Number,
            require: true
        },
        //----------------
        date: {
            type: Date,
            require: true
        }
        //----------------
    }],
    //..................................
});

const model = mongoose.model('WalletData', Wallet);

module.exports = model;