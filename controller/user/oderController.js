const order = require("../../models/order");
const cart = require("../../models/cartModel");
const { default: mongoose } = require("mongoose");
const coupon = require("../../models/coupon");
var paypal = require("paypal-rest-sdk");

require("dotenv").config();
paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: process.env.PAYPAL_CLIENT,
  client_secret: process.env.PAYPAL_SECRET,
});

exports.orderPlace = async (req, res) => {
  try {
    console.log(req.body);
    let {
      firstName,
      lastName,
      address,
      state,
      PostCode,
      email,
      Phone,
      couponId,
      Total,
      discountPrice,
    } = req.body;
    let finalPrice = parseInt(discountPrice);
    let zip = parseInt(PostCode);
    let ph = parseInt(Phone);
    const coupId = couponId;
    const userId = req.session.userlo;
    if (req.body.payment_method == "COD") {
      const orderItemss = await cart.aggregate([
        {
          $match: { userId: mongoose.Types.ObjectId(userId) },
        },
        {
          $unwind: "$cartItems",
        },
        {
          $project: {
            productId: "$cartItems.productId",
            quantity: "$cartItems.qty",
          },
        },
      ]);

      const cartItems = await cart.aggregate([
        {
          $match: { userId: mongoose.Types.ObjectId(userId) },
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
      const subtotal = cartItems.reduce((acc, cur) => {
        acc = acc + cur.TotalPrice;
        return acc;
      }, 0);
      if (coupId === "") {
        const orderdetails = new order({
          userId: userId,
          name: firstName,
          phone: ph,
          deliveryDetails: {
            FirstName: firstName,
            LastName: lastName,
            Address: address,
            State: state,
            Email: email,
            phone: ph,
            postCode: zip,
          },
          orderItems: orderItemss,
          paymentMethod: req.body.payment_method,
          totalPrice: subtotal,
          // discountPrice:finalPrice
        });
        await orderdetails.save();
        await cart.deleteOne({ userId: userId });
        res.redirect("/");
      } else {
        await coupon.updateOne(
          { _id: coupId },
          { $push: { users: { userId } } }
        );
        const orderdetails = new order({
          userId: userId,
          name: firstName,
          phone: ph,
          deliveryDetails: {
            FirstName: firstName,
            LastName: lastName,
            Address: address,
            State: state,
            Email: email,
            phone: ph,
            postCode: zip,
          },
          orderItems: orderItemss,
          couponUsed: coupId,
          totalPrice: subtotal,
          paymentMethod: req.body.payment_method,
          discountPrice: finalPrice,
        });
        await orderdetails.save();

        await cart.deleteOne({ userId: userId });

        res.render("user/success");
      }
    } else {
      let orderData = await order.findOne({userId:userId})
      const create_payment_json = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          return_url: "http://localhost:4040/payment_success",
          cancel_url: "http://localhost:4040/payment",
        },
        transactions: [
          {
            item_list: {
              items: [
                {
                  name: "item",
                  sku: "item",
                  price: discountPrice||Total,
                  currency: "USD",
                  quantity: 1,
                },
              ],
            },
            amount: {
              currency: "USD",
              total: discountPrice||Total,
            },
            description: "This is the payment description.",
          },
        ],
      };

      paypal.payment.create(
        create_payment_json,
        async function (error, payment) {
          if (error) {
            throw error;
          } else {
            for (let i = 0; i < payment.links.length; i++) {
              if (payment.links[i].rel === "approval_url") {
                res.redirect(payment.links[i].href);
              }
            }
          }
        }
      );
    }
    const orderItemss = await cart.aggregate([
      {
        $match: { userId: mongoose.Types.ObjectId(userId) },
      },
      {
        $unwind: "$cartItems",
      },
      {
        $project: {
          productId: "$cartItems.productId",
          quantity: "$cartItems.qty",
        },
      },
    ]);
    const cartItems = await cart.aggregate([
      {
        $match: { userId: mongoose.Types.ObjectId(userId) },
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
    const subtotal = cartItems.reduce((acc, cur) => {
      acc = acc + cur.TotalPrice;
      return acc;
    }, 0);
    if (coupId === "") {

       orderdetails = {
        userId: userId,
        name: firstName,
        phone: ph,
        deliveryDetails: {
          FirstName: firstName,
          LastName: lastName,
          Address: address,
          State: state,
          Email: email,
          phone: ph,
          postCode: zip,
        },
        orderItems: orderItemss,
        paymentMethod: req.body.payment_method,
        totalPrice: subtotal,
        // discountPrice:finalPrice
      };
    } else {
      await coupon.updateOne({ _id: coupId }, { $push: { users: { userId } } });
       orderdetails = {
        userId: userId,
        name: firstName,
        phone: ph,
        deliveryDetails: {
          FirstName: firstName,
          LastName: lastName,
          Address: address,
          State: state,
          Email: email,
          phone: ph,
          postCode: zip,
        },
        orderItems: orderItemss,
        couponUsed: coupId,
        totalPrice: subtotal,
        paymentMethod: req.body.payment_method,
        discountPrice: finalPrice,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

exports.order_details = async (req, res) => {
  try {
    let orderId = req.query.id;
    const orderData = await order.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(orderId) },
      },
      {
        $unwind: "$orderItems",
      },
      {
        $project: {
          name: "$name",
          phone: "$phone",
          orderdetails: "$deliveryDetails",
          quantity: "$orderItems.quantity",
          productId: "$orderItems.productId",
          coupon: "$couponUsed",
          totalPrice: "$totalPrice",
          discountPrice: "$discountPrice",
          orderStatus: "$orderStatus",
          paymentMethod: "$paymentMethod",
          orderDate: "$orderDate",
          deliveryDate: "$deliveryDate",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $project: {
          name: 1,
          phone: 1,
          orderdetails: 1,
          quantity: 1,
          productId: 1,
          coupon: 1,
          totalPrice: 1,
          discountPrice: 1,
          orderStatus: 1,
          paymentMethod: 1,
          orderDate: 1,
          deliveryDate: 1,
          product: { $arrayElemAt: ["$product", 0] },
        },
      },
    ]);

    res.render("user/orderdetails", { orderData });
    req.session.orderId = orderId;
  } catch (error) {
    console.log(error);
  }
};

exports.order_cancel = async (req, res) => {
  try {
    let coupId = req.query.id;
    await order.updateOne(
      { _id: coupId },
      { $set: { orderStatus: "cancelled" } }
    );
    res.redirect("/profile");
  } catch (error) {
    console.log(error);
  }
};
exports.order_invoice = async (req, res) => {
  try {
    let couponId = req.query.id;

    const couponData = await order.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(couponId) },
      },
      {
        $unwind: "$orderItems",
      },
      {
        $project: {
          name: "$name",
          phone: "$phone",
          orderdetails: "$deliveryDetails",
          quantity: "$orderItems.quantity",
          productId: "$orderItems.productId",
          coupon: "$couponUsed",
          totalPrice: "$totalPrice",
          discountPrice: "$discountPrice",
          orderStatus: "$orderStatus",
          paymentMethod: "$paymentMethod",
          orderDate: "$orderDate",
          deliveryDate: "$deliveryDate",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $project: {
          name: 1,
          phone: 1,
          orderdetails: 1,
          quantity: 1,
          productId: 1,
          coupon: 1,
          totalPrice: 1,
          discountPrice: 1,
          orderStatus: 1,
          paymentMethod: 1,
          orderDate: 1,
          deliveryDate: 1,
          product: { $arrayElemAt: ["$product", 0] },
        },
      },
      {
        $addFields: {
          TotalPrice: {
            $sum: { $multiply: ["$quantity", "$product.salePrice"] },
          },
        },
      },
    ]);
    const subtotal = couponData.reduce((acc, cur) => {
      acc = acc + cur.TotalPrice;
      return acc;
    }, 0);
    console.log(couponData);
    res.render("user/invoice", { couponData, subtotal });
  } catch (error) {
    console.log(error);
  }
};

exports.payment_success = async (req, res) => {
  try {
    let userId = req.session.userlo
    const orderr = new order(orderdetails)
    await orderr.save()
    await cart.deleteOne({ userId: userId });
    res.render("user/success");
  } catch (error) {
    console.log(error);
  }
};
