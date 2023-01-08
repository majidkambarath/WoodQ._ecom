const mongoose = require('mongoose');
const couponSchema = new mongoose.Schema({
  couponName :{
    type:String
  },
  discount:{
    type:Number
  },
  startingDate:{
    type:Date
  },
  expiryDate:{
    type:Date
  },
  active:{
    type:Boolean,
    default:true
  }

})

const coupon = new mongoose.model("coupon",couponSchema);
module.exports = coupon;