const mongoose = require('mongoose');
const couponSchema = new mongoose.Schema({
  couponName :{
    type:String
  },
  discount:{
    type:Number
  },
  minDiscount:{
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
  },
  users:[
    {
        userId:mongoose.Types.ObjectId
      
    }
  ]

})

const coupon = new mongoose.model("coupon",couponSchema);
module.exports = coupon;