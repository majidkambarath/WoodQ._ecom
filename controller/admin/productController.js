const category = require("../../models/categoryModel");
const product = require("../../models/productModel");
var sharp = require('sharp');

//productLO

const loProduct = async (req, res) => {
  const categories = await category.find({ status: true });
 
  res.render("admin/product.ejs", { categories });
};

// product inserting
const inserProduct = async (req, res) => {
  try {
  //  const images = [req.files[0].filename,req.files[1].filename,req.files[2].filename,req.files[3].filename]

   const unique  = []
   for(i=0 ; i<4 ;i++){
    const ImageName = req.body.ProductName + [i] + '-' + Date.now()+'.jpg';
    unique.push(ImageName)
    sharp(req.files[i].buffer).resize(200,200)
   .jpeg({quality : 100}).toFile('public/admin/productImage/'+ ImageName);
   }
   
 
    let data=req.body;
    const cata = await category.findOne({category:req.body.category})
    let productData = new product({
      productName: data.ProductName,
      category: cata.id,
      image: unique,
      productPrice: data.productPrice,
      salePrice: data.salePrice,
    });
    await productData.save();
    const dataaa =  await product.find();

    res.redirect("/admin/product_page");
  } catch (error) {
    console.log(error.message);
  }
};

//product page

const productPost = async (req, res) => {
  const productq = await product.aggregate([
    {
      $lookup:{
        from:'categories',
        localField:'category',
        foreignField:'_id',
        as:'catadata'
      }
    },
    {
      $project:{
        productName:'$productName',
        category:'$catadata.category',
        image:'$image',
        productPrice:'$productPrice',
        salePrice:'$salePrice'
      }
    }
  ])
 
  res.render("admin/productPage.ejs", { productq });
};

const productEdit = async (req, res) => {
  try {
    const id = req.query.id;
    const cataName = await product.aggregate([
      {
        $lookup:{
          from:'categories',
          localField:'category',
          foreignField:'_id',
          as:'catadata'
        }
      },
      {
        $project:{
          productName:'$productName',
          category:'$catadata.category',
          image:'$image',
          productPrice:'$productPrice',
          salePrice:'$salePrice'
        }
      }
    ])
    const productq = await product.findById({ _id: id });
    if (productq) {
      res.render("admin/edit", { products: productq ,cataName});
   
    } else {
      res.redirect("/admin/product_page");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const productUpadte = async (req, res) => {
  try {
    const cata = await category.findOne({category:req.body.category}) 


    if(req.files.length == 0 ){
      
      let data =req.body;
      const id = req.query.id;
      const productName = data.ProductName;
      const category =cata.id;
      const productPrice = data.productPrice;
      const salePrice = data.salePrice;
      const productq = await product.findByIdAndUpdate(
        { _id: id },
        { $set: { productName, category,  productPrice, salePrice } }
      );
      res.redirect("/admin/product_page");
      console.log("update no image");
    }else{
     
    const unique  = []
   for(i=0 ; i<4 ;i++){
    const ImageName = req.body.ProductName + [i] + '-' + Date.now()+'.jpg';
    unique.push(ImageName)
    sharp(req.files[i].buffer).resize(200,200)
   .jpeg({quality : 100}).toFile('public/admin/productImage/'+ ImageName);
   }
      let data =req.body;
      const id = req.query.id;
      const productName = data.ProductName;
      const category =cata.id;
      const images = unique;
      console.log(images);
      const productPrice = data.productPrice;
      const salePrice = data.salePrice;
      const productq = await product.findByIdAndUpdate(
        { _id: id },
        { $set: { productName, category,image:images , productPrice, salePrice } },
      
      );
      res.redirect("/admin/product_page");
      console.log("update success")
    }
  } catch (error) {
    console.log(error.message);
  }
};

const productDelete = async (req, res) => {
  try {
    const id = req.query.id;
    const productq = product.findByIdAndDelete({ _id: id }).then(() => {
      console.log("delete sucuess");
      res.redirect("/admin/product_page");
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loProduct,
  inserProduct,
  productPost,
  productEdit,
  productDelete,
  productUpadte,
};
