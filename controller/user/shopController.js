const cart = require('../../models/cartModel')
const user = require('../../models/userModel')
//const product = require('../../models/productModel');
const producta = require('../../models/productModel')
const mongoose = require('mongoose')
const User = require('../../models/userModel')
const session = require('express-session')

const viewcart = async(req,res)=>{

    if(req.session.userlo){
     
        try {
            const userId = req.session.userlo;
            //const userdata = await User.findOne({_id:userId});
            // console.log(userdata);
            const cartlist = await cart.aggregate([
                {
                    $match:{userId: new mongoose.Types.ObjectId(userId)},
                },
                {
                    $unwind:'$cartItems'
                },
               {
                $project:{
                    productItems:'$cartItems.productId',
                    qtyItems:'$cartItems.qty'
                }
               },
               {
                $lookup:{
                    from:"products",
                    localField:'productItems',
                    foreignField:'_id',
                    as:'cartdata'
                }
               },
              {
                $project:{
                    productId:"$productItems",
                    qtyItems:'$qtyItems',
                   productname :'$cartdata.productName',
                    category:'$cartdata.category',
                    image:'$cartdata.image',
                    price:'$cartdata.productPrice',
                    salePrice:'$cartdata.salePrice'
                }
              },
            
            
            ])
            res.render('user/cart.ejs',{cartlist})

        } catch (error) {
            console.log(error.message);
        }
      
    }else{
      
        res.redirect('/login')
    }
   
 
}
const addToCart = async(req,res)=>{ 
    
    if(req.session.userlo){
            const data = req.body;
            console.log(data)
            const id = data.proId;
            console.log(id)
            const Id = req.session.userlo
            const userId = mongoose.Types.ObjectId(Id)
            //const userdata = await User.findOne({_id:userId})
            const cartdata = await cart.findOne({userId:userId})
            if(cartdata){
               
                const cartUpdate = await cart.updateOne({userId:userId},
                    {
                        $push:{cartItems:{productId:id,qty:1 }}
                    }).then(()=>{
                        res.json({success:true})
                    })
                    
                }else{
                console.log("failed");
                const cartOb = new cart({
                    userId:userId,
                    cartItems:[{
                        productId:id,
                        qty:1
                    }]
                })
                await cartOb.save(); 
            }
        }else{
        res.redirect('/login')
    }
}
       

module.exports = {
   addToCart, 
    viewcart
}