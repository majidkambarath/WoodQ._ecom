
// const cart = require("../../models/cartModel");
// const { default: mongoose } = require("mongoose");
// const coupon = require("../../models/coupon");
// const order = require("../../models/order");

// //paypal requrie

// exports.paypalgate = async (req, res) => {
//   try {
//     if (req.body.payment_method == "COD") {
//       let {
//         firstName,
//         lastName,
//         address,
//         state,
//         PostCode,
//         email,
//         Phone,
//         couponId,
//         discountPrice,
//       } = req.body;
//       let finalPrice = parseInt(discountPrice);
//       let zip = parseInt(PostCode);
//       let ph = parseInt(Phone);
//       const coupId = couponId;
//       const userId = req.session.userlo;
//       const orderItemss = await cart.aggregate([
//         {
//           $match: { userId: mongoose.Types.ObjectId(userId) },
//         },
//         {
//           $unwind: "$cartItems",
//         },
//         {
//           $project: {
//             productId: "$cartItems.productId",
//             quantity: "$cartItems.qty",
//           },
//         },
//       ]);

//       const cartItems = await cart.aggregate([
//         {
//           $match: { userId: mongoose.Types.ObjectId(userId) },
//         },
//         {
//           $unwind: "$cartItems",
//         },
//         {
//           $project: {
//             productId: "$cartItems.productId",
//             qtyItems: "$cartItems.qty",
//           },
//         },
//         {
//           $lookup: {
//             from: "products",
//             localField: "productId",
//             foreignField: "_id",
//             as: "carts",
//           },
//         },
//         {
//           $project: {
//             productId: 1,
//             qtyItems: 1,
//             carts: { $arrayElemAt: ["$carts", 0] },
//           },
//         },
//         {
//           $addFields: {
//             TotalPrice: {
//               $sum: { $multiply: ["$qtyItems", "$carts.salePrice"] },
//             },
//           },
//         },
//       ]);
//       const subtotal = cartItems.reduce((acc, cur) => {
//         acc = acc + cur.TotalPrice;
//         return acc;
//       }, 0);
//       if (coupId === "") {
//         const orderdetails = new order({
//           userId: userId,
//           name: firstName,
//           phone: ph,
//           deliveryDetails: {
//             FirstName: firstName,
//             LastName: lastName,
//             Address: address,
//             State: state,
//             Email: email,
//             phone: ph,
//             postCode: zip,
//           },
//           orderItems: orderItemss,
//           paymentMethod: req.body.payment_method,
//           totalPrice: subtotal,
//         });
//         await orderdetails.save();
//         await cart.deleteOne({ userId: userId });
//         res.redirect("/");
//       } else {
//         await coupon.updateOne(
//           { _id: coupId },
//           { $push: { users: { userId } } }
//         );
//         const orderdetails = new order({
//           userId: userId,
//           name: firstName,
//           phone: ph,
//           deliveryDetails: {
//             FirstName: firstName,
//             LastName: lastName,
//             Address: address,
//             State: state,
//             Email: email,
//             phone: ph,
//             postCode: zip,
//           },
//           orderItems: orderItemss,
//           couponUsed: coupId,
//           totalPrice: subtotal,
//           paymentMethod: req.body.payment_method,
//           discountPrice: finalPrice,
//         });
//         await orderdetails.save();

//         await cart.deleteOne({ userId: userId });

//         res.redirect("/");
//       }
//     } else {
//       const userId = req.session.userlo;
//       let orderData = await order.findOne({userId:userId})
//       console.log(orderData.totalPrice);
   

//   } catch (error) {
//     console.log(error);
//     res.render("user/layouts/404.ejs");
//   }
// };
