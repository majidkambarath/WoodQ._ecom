const User = require("../../models/userModel");

const custmoerPage = async (req, res) => {
  try {
    const datas = await User.find();
    res.render("admin/custmoerPage", { datas });
  } catch (error) {
    console.log(error);
  }
};
// user block

const userBlock = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  custmoerPage,
  userBlock,
};
