const cart = require("../../models/cartModel");
const user = require("../../models/userModel");
const producta = require("../../models/productModel");
const mongoose = require("mongoose");
const User = require("../../models/userModel");
const session = require("express-session");

const viewcart = async (req, res) => {
  try {
    const userId = req.session.userlo;

    const countItems = await cart.findOne({ userId: userId });

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
        },
      },
      {
        $addFields: {
          TotalPrice: {
            $sum: { $multiply: ["$qtyItems", "$carts.salePrice"] },
          },
        },
      },
    ]);

    const subtotal = cartlist.reduce((acc, cur) => {
      acc = acc + cur.TotalPrice;
      return acc;
    }, 0);
    const len = cartlist.length;
  res.render("user/cart.ejs", { cartlist, userId, len, subtotal });
 
   
  } catch (error) {
    console.log(error.message);
  }
};
const addToCart = async (req, res) => {
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
  const cartdata = await cart.findOne({ userId: userId });
  if (cartdata) {
    let productEx = cartdata.cartItems.findIndex(
      (cartItems) => cartItems.productId == id
    );
    console.log(productEx);

    if (productEx != -1) {
      const inc = await cart
        .updateOne(
          { userId: userId, "cartItems.productId": id },
          {
            $inc: { "cartItems.$.qty": 1 },
          }
        )
        .then(() => {
          res.redirect("/view_product");
        });
    } else {
      const cartUpdate = await cart
        .updateOne(
          { userId: userId },
          {
            $push: { cartItems: { productId: id, qty: 1 } },
          }
        )
        .then(() => {
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

    const inc = await cart
      .updateOne(
        { _id: cartId, "cartItems.productId": prodtId },
        {
          $inc: { "cartItems.$.qty": change },
        }
      )
      .then(() => {
        res.json({ success: true });
      });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteCart = async (req, res) => {
  try {
    const prodId = req.query.id;
    const Id = req.session.userlo;
    const userId = mongoose.Types.ObjectId(Id);

    const cartData = await cart
      .updateOne(
        { userId: userId },
        {
          $pull: { cartItems: { productId: prodId } },
        }
      )
      .then(() => {
        res.redirect("/cart");
      });

  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addToCart,
  viewcart,
  changeQuantity,
  deleteCart
};
