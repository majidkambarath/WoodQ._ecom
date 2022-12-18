const mongoose = require('mongoose');
const otpSchema = new mongoose.Schema({
    otp:{
        type:Number,
        requried:true,
    }
})

const otp = new mongoose.model("otp",otpSchema);
module.exports = otp;