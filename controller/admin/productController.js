const category = require('../../models/categoryModel');
const product = require('../../models/productModel');

//productLO

const loProduct = async (req,res)=>{
    const categories = await category.find({status:true});
    console.log(categories);
    res.render('admin/product.ejs',{categories})
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
    res.redirect('/admin/product_page')
 
    } catch (error) {
        console.log(error.message);
        
    }

}

//product page

const productPost =  async (req,res)=>{
    
const productq = await product.find();
    res.render('admin/productPage.ejs',{productq})
}



const productEdit = async(req,res)=>{
try {
    const id = req.query.id;
   

    const productq = await product.findById({_id:id});
        if(productq){
            res.render('admin/edit',{products:productq})
            console.log('edit success');
        }else{
            res.redirect('/admin/product_page')
        }
    

} catch (error) {
    console.log(error.message);
}

}

const productUpadte = async(req,res)=>{

    try {
        const id = req.query.id;
        const productName =req.body.ProductName
        const  category =req.body.category
        const image = req.file.filename
        const productPrice =req.body.productPrice
        const  salePrice =req.body.salePrice
        const productq = await product.findByIdAndUpdate({_id:id},{$set:{productName,category,image,productPrice,salePrice}});
            res.redirect('/admin/product_page')
            console.log('update success');
        
    
    } catch (error) {
        console.log(error.message);
    
    }


}

const productDelete = async(req,res)=>{
    try {
        const id=req.query.id;
        const productq = product.findByIdAndDelete({_id:id}).then(()=>{
            console.log('delete sucuess');
            res.redirect('/admin/product_page')
        })
        
    } catch (error) {
        console.log(error.message);
        
    }

}

module.exports = {
    loProduct,
    inserProduct,
    productPost,
    productEdit,
    productDelete,
    productUpadte
    
    
}
