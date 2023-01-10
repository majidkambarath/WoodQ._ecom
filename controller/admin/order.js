
const order = require('../../models/order')

exports.order_page = async(req,res)=>{
    try {
        let findData = await order.find()
    console.log(findData);
    res.render('admin/order',{findData})
    } catch (error) {
        console.log(error);
    }
    
}

exports.order_upte = async(req,res)=>{
    try {
        let {OrderId,order_status} = req.body
        await order.updateOne({_id:OrderId},{$set:{orderStatus:order_status}})
        res.redirect('/admin/order_page')
 
     } catch (error) {
        console.log(error);
    }
}