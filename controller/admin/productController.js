const product = require('../../models/productModel');


const loProduct = (req,res)=>{
    res.render('admin/product.ejs')
}


// product inserting
const inserProduct = async (req,res)=>{

    try {
        let productData = new product({
            productName:req.body.ProductName,
            category:req.body.category,
            image: req.file.filename,
            productPrice:req.body.productPrice,
            salePrice:req.body.salePrice
        })
         console.log(req.file);
 const dataStore = productData.save();
 const productq = await product.find(); 
 res.render('admin/productPage',{details : productq})
 
    } catch (error) {
        console.log(error.message);
        
    }

}

const productPost =  async (req,res)=>{
    const productq = await product.find();
    res.render('admin/productPage.ejs' ,{details : productq})
}

module.exports = {
    loProduct,
    inserProduct,
    productPost
}