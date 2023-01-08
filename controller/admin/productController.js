const category = require("../../models/categoryModel");
const product = require("../../models/productModel");

//productLO

const loProduct = async (req, res) => {
  const categories = await category.find({ status: true });
  console.log(categories);
  res.render("admin/product.ejs", { categories });
};

// product inserting
const inserProduct = async (req, res) => {
  try {
   const images = [req.files[0].filename,req.files[1].filename,req.files[2].filename,req.files[3].filename]

    let data=req.body;
    const cata = await category.findOne({category:req.body.category})
    let productData = new product({
      productName: data.ProductName,
      category: cata.id,
      image: images,
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
  console.log(productq);
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
      console.log("edit success");
    } else {
      res.redirect("/admin/product_page");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const productUpadte = async (req, res) => {
  try {
    if(typeof req.file === "undefined"){
      let data =req.body;
      const id = req.query.id;
      const productName = data.ProductName;
      const category =data.category;
      const productPrice = data.productPrice;
      const salePrice = data.salePrice;
      const productq = await product.findByIdAndUpdate(
        { _id: id },
        { $set: { productName, category,  productPrice, salePrice } }
      );
      res.redirect("/admin/product_page");
      console.log("update success");
    }else{
      let data =req.body;
      const id = req.query.id;
      const productName = data.ProductName;
      const category =data.category;
      const image = req.file.filename;
      const productPrice = data.productPrice;
      const salePrice = data.salePrice;
      const productq = await product.findByIdAndUpdate(
        { _id: id },
        { $set: { productName, category, image, productPrice, salePrice } }
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
