const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    cartItems:[{
            productId:{
                type:mongoose.Types.ObjectId,
                ref:'product',
            },
            qty:{
                type:Number,
                required:true,
            }
        }],
        // totalPrice:Number

})

module.exports = mongoose.model('cart',cartSchema)