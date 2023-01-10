const order = require('../../models/order')
const cart = require('../../models/cartModel');
const { default: mongoose } = require('mongoose');
const coupon = require('../../models/coupon');

exports.orderPlace =async (req,res)=>{
    try {
        console.log(req.body);
        let {firstName,lastName,address,state,PostCode,email,Phone,couponId,discountPrice} = req.body
        let finalPrice = parseInt(discountPrice)
        let zip = parseInt(PostCode)
        let ph = parseInt(Phone)
       const coupId = couponId
        const userId = req.session.userlo;
        console.log(userId);
        if(req.body.payment_method=='COD'){
            const orderItemss = await cart.aggregate([
                {
                    $match:{userId:mongoose.Types.ObjectId(userId)}
                },
                {
                    $unwind:"$cartItems"
                },
                {
                    $project: {
                      productId: "$cartItems.productId",
                      quantity: "$cartItems.qty",
                    },
                  }
            ])
            console.log(orderItemss);
            
            const cartItems = await cart.aggregate([
                {
                    $match:{userId:mongoose.Types.ObjectId(userId)}
                },
                {
                    $unwind:"$cartItems"
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
                  if(coupId === ''){
                    const orderdetails = new order({
                        userId:userId,
                        name:firstName,
                        phone:ph,
                        deliveryDetails:{
                            FirstName:firstName,
                            LastName:lastName,
                            Address:address,
                            State:state,
                            Email:email,
                            phone:ph,
                            postCode:zip
                        },
                        orderItems: orderItemss,
                        paymentMethod:req.body.payment_method,
                        totalPrice:subtotal
                        // discountPrice:finalPrice
                    })
                    await orderdetails.save();
                    await cart.deleteOne({userId:userId})
                    res.redirect('/')
                  }else{
                    await coupon.updateOne({_id:coupId},{$push:{users:{ userId}}})
                    const orderdetails = new order({
                        userId:userId,
                        name:firstName,
                        phone:ph,
                        deliveryDetails:{
                            FirstName:firstName,
                            LastName:lastName,
                            Address:address,
                            State:state,
                            Email:email,
                            phone:ph,
                            postCode:zip
                        },
                        orderItems: orderItemss,
                        couponUsed:coupId,
                        totalPrice:subtotal,
                        paymentMethod:req.body.payment_method,
                        discountPrice:finalPrice
                    })
                    await orderdetails.save();
                    await cart.deleteOne({userId:userId})
                   
                    res.redirect('/')
                  }
                 
        }else{
            console.log('online pay');
        }
        
    } catch (error) {
        console.log(error);
    }
}

exports.order_view = async (req,res)=>{
  try {
    res.render('user/orderdetails')
  } catch (error) {
    console.log(error);
  }

}

exports.order_cancel = async(req,res)=>{
  try {
    let coupId = req.query.id;
    console.log(coupId);
    await order.updateOne({_id:coupId},{$set:{orderStatus:'cancelled'}})
    res.redirect('/profile')
  } catch (error) {
    console.log(error);
  }
}
