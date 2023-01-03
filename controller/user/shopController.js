const cart = require("../../models/cartModel");
const user = require("../../models/userModel");
//const product = require('../../models/productModel');
const producta = require("../../models/productModel");
const mongoose = require("mongoose")
const User = require("../../models/userModel");
const session = require("express-session");
// const { count } = require('../../models/cartModel')

const viewcart = async (req, res) => {
  if (req.session.userlo) {
    try {
      const userId = req.session.userlo;
      //const userdata = await User.findOne({_id:userId});
      // console.log(userdata);
      const countItems = await cart.findOne({userId:userId})
      const Itemss = countItems.ItemQty
      console.log(Itemss);
      const cartlist = await cart.aggregate([
        {
          $match: { userId: new mongoose.Types.ObjectId(userId) },
        },
        {
          $unwind: "$cartItems",
        },
        {
          $project: {
          
            productId: "$cartItems.productId",
            qtyItems: "$cartItems.qty",
       

          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "carts",
          },
        },
        {
          $project: {
       
            productId: 1,
            qtyItems: 1,
            carts: { $arrayElemAt: ["$carts", 0] },
            // productId:'$productId',
            // qtyItems:'$qtyItems',
            // productName:'$carts.productName',
            // image:'$carts.image',
            // productPrice:'$carts.productPrice',
            // salePrice:'$carts.salePrice'
          },
        },
        {
          $addFields: {
            TotalPrice: {
              $sum: { $multiply: ["$qtyItems", "$carts.salePrice"] },
            },
          },
        },
        // {
        //     $addFields:{
        //         Total:{
        //             $sum: { $multiply :["$ItemQty","$TotalPrice"]}
        //         }
        //     }
        // }
        
      ]);
 
      
      res.render("user/cart.ejs", { cartlist, userId, Itemss });
      // console.log(cartlist);
    } catch (error) {
      console.log(error.message);
    }
  } else {
    res.redirect("/login");
  }
};
const addToCart = async (req, res) => {
  if (req.session.userlo) {
    const data = req.body;
    console.log(data);
    const id = data.proId;
    console.log(id);
    const Id = req.session.userlo;
    const userId = mongoose.Types.ObjectId(Id);
    let productOb = {
      productId: id,
      qty: 1,
    };
    //const userdata = await User.findOne({_id:userId})
    const cartdata = await cart.findOne({ userId: userId });
    if (cartdata) {
      let productEx = cartdata.cartItems.findIndex(
        (cartItems) => cartItems.productId == id
      );
      console.log(productEx);

      if (productEx != -1) {
        const inc = await cart
          .updateOne(
            { userId: userId,"cartItems.productId": id },
            {
              $inc: { "cartItems.$.qty": 1,"ItemQty":1},
          
            }
          )
          .then(() =>{
            res.redirect("/view_product");
          });
      } else {
        const cartUpdate = await cart
          .updateOne(
            { userId: userId },
            {
              $push: { cartItems: { productId: id, qty: 1 } }, $inc:{"ItemQty":1}
              
            }
          ).then(() => {
            res.json({ success: true });
          });
          
      }
    } else {
      console.log("failed");
      const cartOb = new cart({
        userId: userId,
        cartItems: [productOb],
      });
      await cartOb.save();
    }
  } else {
    res.redirect("/login");
  }
};

const changeQuantity = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const prodtId = data.prodt;
    const cartId = data.cart;
    const count = data.change;
    console.log(count);
    const change = parseInt(count);
    console.log(change);
   if(change == 1){
    const inc = await cart
    .updateOne(
      { _id: cartId, "cartItems.productId": prodtId },
      {
        $inc: { "cartItems.$.qty": change,ItemQty:1 },
      }
    )
    .then(() => {
      res.json({ success: true });
    });
   }else{
    const inc = await cart
    .updateOne(
      { _id: cartId, "cartItems.productId": prodtId },
      {
        $inc: { "cartItems.$.qty": change,ItemQty:-1 },
      }
    )
    .then(() => {
      res.json({ success: true });
    });
   }
   
  } catch (error) {
    console.log(error.message);
  }
};

const deleteCart = async (req, res) => {
  try {
    const prodId = req.query.id;
  
    const Id = req.session.userlo;
    const userId = mongoose.Types.ObjectId(Id);
    // const count = await cart.aggregate([
    //   {
    //     $match:{userId:userId}
    //   },
    //   {
    //     $unwind:"$cartItems"
    //   },
    //   {
    //     $project:{
    //       ItemQty:'$ItemQty',
    //       productItems:'$cartItems.productId'
    //     }
    //   },
    //   {
    //     $lookup:{
    //       from:'products',
    //       localField:'productItems',
    //       foreignField:'_id',
    //       as:'count'
    //     }
    //   },
    //   {
    //     $project:{
    //       count:'$ItemQty',
    //       productPrice:'$count.salePrice'
    //     }
    //   }
    // ])
    // console.log(count[0].productPrice);
    // const price = count[0].productPrice
    
    const cartData = await cart
      .updateOne(
        { userId: userId },
        {
          $pull: { cartItems: { productId: prodId} },
        }
      )
      .then(() => {
        res.redirect("/cart");
      });

    // console.log(cartData);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addToCart,
  viewcart,
  changeQuantity,
  deleteCart,
};
