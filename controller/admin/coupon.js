const coupon = require("../../models/coupon");

const coupon_page = async (req, res) => {
  try {
    let findCoupon = await coupon.find();
    res.render("admin/coupon", { findCoupon });
  } catch (error) {
    console.log(error.message);
  }
};

const add_Coupon_page = async (req, res) => {
  try {
    res.render("admin/addCoupon");
  } catch (error) {
    console.log(error.message);
  }
};

const coupon_insert = async (req, res) => {
  try {
    let { Name, Discount,minDiscount, startingDate, expriyDate } = req.body;
    let coupomInsert = new coupon({
      couponName: Name.toUpperCase(),
      discount: Discount,
      minDiscount:minDiscount,
      startingDate: startingDate,
      expiryDate: expriyDate,
    });
    await coupomInsert.save();
    res.redirect("/admin/coupon_page");
  } catch (error) {
    console.log(error.message);
  }
};
const coupon_blocking = async (req, res) => {
  try {
    let couponId = req.query.id;

    let block = await coupon.findById({ _id: couponId });
    if (block.active == true) {
      await coupon.updateOne({ _id: couponId }, { $set: { active: false } });
      res.redirect("/admin/coupon_page");
    } else {
      await coupon.updateOne({ _id: couponId }, { $set: { active: true } });
      res.redirect("/admin/coupon_page");
    }
  } catch (error) {
    console.log(error.message);
  }
};



module.exports = {
  coupon_page,
  add_Coupon_page,
  coupon_insert,
  coupon_blocking,

  
};
