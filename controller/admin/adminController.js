const order = require("../../models/order");
const user = require("../../models/userModel.js");
const dashboard = async (req, res) => {
  try {
    const find = await order.find();
    const sum = find.reduce((acc, cur) => {
      acc = acc + cur.totalPrice;
      return acc;
    }, 0);

    const findconut = await order.find().count();
    const count = await user.find().count();
    const stutas = await order.find({ orderStatus: "Devliverd" }).count();
    res.render("admin/admin.ejs", { sum, count, findconut, stutas });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    if (req.session.admin) {
      res.redirect("/admin");
    } else {
      res.render("admin/adminlo");
    }
  } catch (error) {
    console.log(error);
  }
 
};

const adminveri = async (req, res) => {
  try {
    const email = "admin@gmail.com";
  const password = "123";
  if (req.body.email === email && req.body.password === password) {
    req.session.admin = req.body.email;
    console.log(req.session.admin);
    res.redirect("/admin");
  } else {
    res.render("admin/adminlo", { wrong: "Admin not found" });
  }
  } catch (error) {
    console.log(error);
  }
  
};

module.exports = {
  dashboard,
  login,
  adminveri,
};
