const { default: mongoose } = require('mongoose');
const cart = require('../../models/cartModel');

const finddata = async(req,res,next)=>{
    let count = 0;
    let Id = req.session.userlo
    let findCount = await cart.findOne({userId:mongoose.Types.ObjectId(Id)});
    if(findCount){
        count = findCount.cartItems.length
        next()
    
    }else{
        count = 0;
        next()

    }
}
  



module.exports = finddata