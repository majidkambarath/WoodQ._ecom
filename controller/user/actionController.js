const User = require("../../models/userModel");
const product = require("../../models/productModel");
const order = require("../../models/order");
const bcryptjs = require("bcryptjs");

const { default: mongoose } = require("mongoose");
const securePassword = async (password) => {
  try {
    console.log("chage hash");
    const passwordHash = await bcryptjs.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
};

exports.about_page = (req, res) => {
  res.render("user/about");
};
exports.service_page = (req, res) => {
  res.render("user/service");
};
exports.contact_page = (req, res) => {
  res.render("user/contact");
};
exports.confirmPaswd = async (req, res) => {
  try {
    let userId = req.session.userlo;
    let password = req.body.currentpassword;

    const userData = await User.findOne({ _id: userId });
    const match = await bcryptjs.compare(password, userData.password);
    if (match) {
      const spassword = await securePassword(req.body.newPassword);
      await User.updateOne(
        { _id: userId },
        { $set: { password: spassword } }
      ).then(() => {
        res.redirect("/profile?success=password change successfly");
      });
    } else {
      res.redirect("/profile?failed=current password is not match");
    }
  } catch (error) {
    console.log(error);
  }
};
exports.searchData = async (req, res) => {
  try {
    console.log(req.body);
    let data = req.body;
    let val = data.val;
    let find = await product.find({ productName: { $regex: val,$options:'i' } });
    console.log(find);

    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
exports.error_page = (req, res) => {
  try {
    res.render("user/layouts/404.ejs");
  } catch (error) {
    console.log(error);
  }
};
exports.error500_page = (req, res) => {
  try {
    res.render("user/layouts/500.ejs");
  } catch (error) {
    console.log(error);
  }
};
exports.history_clean = async (req, res) => {
  try {
    let data = req.body;
    let orderId = data.orderId;
    let userId = req.session.userlo;
    console.log(orderId);
    let orderData = await order.deleteMany(
      { userId: userId },
      { _id: orderId }
    );
    console.log(orderData);

    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

exports.return_confirm = async(req,res)=>{
  try {
    let data = req.body;
    let orderId = data.orderId
     await order.updateOne({_id:orderId},{$set:{ orderStatus: "refunded Pending"} }).then((res.json({success:true})))
    
  } catch (error) {
    console.log(error);
  }
}

exports.wallet_page =async (req,res)=>{
  try {
    let userId = req.session.userlo;
     const userData = await User.findOne({_id:mongoose.Types.ObjectId(userId)})
  
    console.log(userData.wallet.Transitions);
    res.render('user/wallet',{userData})
  } catch (error) {
    console.log(error);
  }
}
