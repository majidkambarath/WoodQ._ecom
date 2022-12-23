const User = require("../../models/userModel");

const custmoerPage = async (req, res) => {
  const datas = await User.find();
  //const block = await User.find({status:true})
  res.render("admin/custmoerPage", { datas });
};
// user block

const userBlock = async (req, res) => {
  const id = req.query.id;
  const userblock = await User.findById({ _id: id });
  if (userblock.status == true) {
    await User.findOneAndUpdate({ _id: id }, { $set: { status: false } });
    res.redirect("/admin/custmoer_page");
    console.log("block success");
  } else {
    await User.findOneAndUpdate({ _id: id }, { $set: { status: true } });
    res.redirect("/admin/custmoer_page");
  }
};

module.exports = {
  custmoerPage,
  userBlock,
};
