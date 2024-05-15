const mongoose = require("mongoose");

const otpVerificationSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const model = mongoose.model('otpVerification', otpVerificationSchema);

module.exports = model;