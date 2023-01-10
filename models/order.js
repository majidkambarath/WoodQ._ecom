const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId
    },
    name:{
        type:String
    },
    phone:{
        type:Number
    },
    deliveryDetails:{
        FirstName : String,
        LastName : String,
        Address : String,
        State: String,
        Email : String,
        phone : Number,
        postCode :Number
    },
    orderItems:[
        {
            productId:mongoose.Types.ObjectId,
            quantity:Number,
        },
    ],
    couponUsed:{
        type:mongoose.Types.ObjectId,
        default:null
    },
    totalPrice:{
        type:Number
    },
    discountPrice:{
        type:Number
    },
    orderStatus:{
        type:String,
        default:'processing'
    },
    paymentMethod:{
        type:String
    },
    orderDate:{
        type:Date,
        default:Date.now()
    },
    deliveryDate:{
        type:String,
        default:new Date(Date.now() + 5*24*60*60*1000).toISOString().slice(0,10)
    }
})

const order = new mongoose.model("order",orderSchema);
module.exports = order;