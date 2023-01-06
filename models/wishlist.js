const mongoose = require('mongoose')
const wishlistSchema = new mongoose.Schema({
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    },
    products:[
        {
            productId:{
                type:mongoose.Types.ObjectId,
                ref:"product"
            }
        }
    ]
})

module.exports = mongoose.model("wishlist",wishlistSchema)