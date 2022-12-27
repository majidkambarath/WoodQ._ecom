const product = require('../../models/productModel')
const cartModel = require('../../models/cartModel');
var ObjectId = require('mongoose').Types.ObjectId;
const { default: mongoose } = require('mongoose')

const shoppage = async(req,res)=>{
    const show = await product.find();
    res.render('user/shop',{show})
}

const viewpage = async(req,res)=>{
    let id = req.params.id
    
    let userId = req.session.userlo
    
      let count = 0;
     let findCount = await cartModel.findOne({userId: new mongoose.Types.ObjectId(userId)})
       if(findCount){
          count = findCount.cartItems.length
       }else{
        count = 0;
       }
  

    const show = await product.findById({_id:id});
   console.log(show)
    const shows =await product.find().limit(4);
    res.render('user/viewpage',{show,shows,count,id})

}

module.exports={
    shoppage,
    viewpage
}
