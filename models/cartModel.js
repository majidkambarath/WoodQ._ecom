const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  // ItemQty:{
  //   type:Number,
  //   default:1,
  // },
  // TotalPrice:{
  //   type:Number,
  //   default:0,
  // },
  Total:{
    type:Number,
    default:0,
  },
  cartItems: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: "product",
      },
      qty: {
        type: Number,
        required: true,
        default: 0,
      },
     
    },
  ],
  
});

module.exports = mongoose.model("cart", cartSchema);
