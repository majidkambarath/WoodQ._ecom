const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
   productName:{
    type:String
   },
   category:{
    type:mongoose.Types.ObjectId,
    ref:'category',
   },
   image:{
      type:Array
   },
   productPrice:{
    type:Number
   },
   salePrice:{
    type:Number
   }
   
    
})

const product = new mongoose.model("product",productSchema);
module.exports = product;