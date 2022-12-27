const product = require('../../models/productModel')
const shoppage = async(req,res)=>{
    const show = await product.find();
    res.render('user/shop',{show})
}

const viewpage = async(req,res)=>{

 
    const show = await product.findById({_id:req.query.id});
    console.log(show);
    const shows =await product.find().limit(4);
    res.render('user/viewpage',{show,shows})
}

module.exports={
    shoppage,
    viewpage
}
