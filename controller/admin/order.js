const order = require("../../models/order");
const user = require("../../models/userModel")
const { default: mongoose } = require("mongoose");
exports.order_page = async (req, res) => {
  try {
    let findData = await order.find();

    res.render("admin/order", { findData });
  } catch (error) {
    console.log(error);
  }
};

exports.order_upte = async (req, res) => {
  try {
    let data = req.body;
    let orderId = data.orderId;
    let status = data.orderStatus;
    await order.updateOne({ _id: orderId }, { $set: { orderStatus: status } });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

exports.saleReport = async (req, res) => {
  try {
    let salestatus = await order.find({ orderStatus: "Devliverd" });
    console.log(salestatus);
    res.render("admin/saleReport", { salestatus });
  } catch (error) {
    console.log(error);
  }
};

exports.orderDetails = async (req,res)=>{
  try {
    let Id = req.query.id;
    let userId = req.query.userId;
    const orderData = await order.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(Id) },
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
    
  const userData = await user.findOne({_id:userId})
  let Transitions = userData.wallet.Transitions
 
    res.render("admin/orderDetails", { orderData,Transitions });
  
  } catch (error) {
    console.log(error);
  }
}

exports.order_refund = async(req,res)=>{
  try {
    let data = req.body;
    let Id = data.orderId;
    const orderData = await order.findOne({_id:Id})
   const refund_confirm = await order.updateOne({_id:Id},{$set:{ orderStatus: "refunded"} })
    console.log(refund_confirm);
    let userId = orderData.userId 
    let total = orderData.totalPrice
    console.log(orderData);
    const userDatea =  await user.updateOne({_id:mongoose.Types.ObjectId(userId)},
    {
      $inc:{"wallet.totalAmount":total},
      $push:{"wallet.Transitions":{
      amonut:  total,
      Date: new Date(Date.now() + 5*24*60*60*1000).toISOString().slice(0,10),
      status:  "Received"
      }},
      "upsert":true
    }



    ).then(res.json({success:true}))
  
    console.log(userDatea);
  } catch (error) {
    console.log(error);
  }
}
