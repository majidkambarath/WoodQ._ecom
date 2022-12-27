const cart = require('../../models/cartModel')
const user = require('../../models/userModel')
//const product = require('../../models/productModel');
const producta = require('../../models/productModel')
const { default: mongoose } = require('mongoose')
const User = require('../../models/userModel')
var ObjectId = require('mongoose').Types.ObjectId;
const session = require('express-session')

const viewcart = async(req,res)=>{
    if(req.session.userlo){
        console.log(req.session.userlo);
        try {
            const userId = req.session.userlo;
            const userdata = await User.findOne({userId:userId});
            const productItms = await cart.aggregate([
                {
                    $match:{userId:userId}
                },
                {
                    $unwind: "$cartItems",
                },
               
            ])

        } catch (error) {
            console.log(error.message);
        }
        res.render('user/cart.ejs')
    }else{
      
        res.redirect('/login')
    }
   
 
}
const addToCart = async(req,res)=>{ 
    if(req.session.userlo){
        try {
            const id = req.params.id
            const userId = req.session.userlo
            console.log(userId);
            const userdata = await User.findOne({userId:userId})
            const cartdata = await cart.findOne({userId:userId})
        console.log(cartdata);
           
            if(cartdata){
                const cartUpdate = await cart.updateOne({userId:userId},
                    {
                        $push:{cartItems:{
                            productId:id }}
                    })
                 console.log(cartUpdate);
            }else{
                const cartOb = new cart({
                    userId:userId,
                    cartItems:[{
                        productId:id,
                        qty:1
                    }]
                })
                await cartOb.save();
                res.redirect('/cart')
            }
            
        } catch (error) {
            console.log(error.message);
        }
    }else{
        res.redirect('/login')
    }


}
       

module.exports = {
   addToCart, 
    viewcart
}