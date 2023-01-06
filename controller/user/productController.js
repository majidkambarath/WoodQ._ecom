const product = require("../../models/productModel");
const cartModel = require("../../models/cartModel");
var ObjectId = require("mongoose").Types.ObjectId;
const { default: mongoose } = require("mongoose");
const wishlist = require("../../models/wishlist");
const category = require("../../models/categoryModel");
const shoppage = async (req, res) => {
  try {
    const id = req.query.id;
    const catadata = await category.find();
    if (id) {
      const show = await product.find({ category: id });
      res.render("user/shop", { show, catadata });
    } else {
      const show = await product.find();
      res.render("user/shop", { show, catadata });
    }
  } catch (error) {
    console.log(error.message);
    res.render('user/layouts/404.ejs')
  }
};

const viewpage = async (req, res) => {
  try {
    let id = req.params.id;

    let userId = req.session.userlo;

    let count = 0;
    let findCount = await cartModel.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });
    if (findCount) {
      count = findCount.cartItems.length;
    } else {
      count = 0;
    }

    let find = 0;
    let findwish = await wishlist.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });
    if (findwish) {
      find = findwish.products.length;
    } else {
      find = 0;
    }

    const show = await product.findById({ _id: id });
    console.log(show);
    const shows = await product.find().limit(4);
    res.render("user/viewpage", { show, shows, count, id, find });
  } catch (error) {
    console.log(error.message);
  
    res.render('user/layouts/404.ejs')
  }
};

module.exports = {
  shoppage,
  viewpage,
};
